<!-- eslint-disable no-shadow, no-use-before-defined, no-unused-vars -->
<template>
  <div class="container">
    <div class="content">
      <img class="logo" src="../assets/logo-app.svg" />
      <div class="header">
        <h3 style="color: #000000">LOGIN</h3>
        <p style="color: #000000">Encontre o seu pacote aqui</p>
      </div>
      <q-form class="form" @submit="handleSubmit">
        <div class="mt-3">
          <label style="color: #000000">CPF</label>
          <q-input v-model="cpf" type="number" color="black">
          <template>
              <q-icon class="fa-solid fa-user"/>
          </template>
          </q-input>
        </div>
        <div class="mt-3">
          <label style="color:#000000">Nº APARTAMENTO</label>
          <q-input v-model="chaveAcesso" type="text" color="black">
          <template>
              <q-icon class="fa-sharp fa-solid fa-building"/>
          </template>
          </q-input>
        </div>
        <q-btn outline color="secondary" label="Iniciar" class="loginButton" type="submit"/>
        <div v-if="error" class="text-negative q-mt-md">{{ error }}</div>
      </q-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const cpf = ref('');
    const chaveAcesso = ref('');
    const error = ref('');
    const router = useRouter();

    const handleSubmit = () => {
      login(cpf.value, chaveAcesso.value.toLocaleUpperCase());
    };

    const login = async (cpf, chaveAcesso) => {
      try {
        const response = await axios.get('http://localhost:3000/usuarios');
        const usuarios = response.data;
        const usuario = usuarios.find((u) => u.cpf === cpf && u.codigo_acesso === chaveAcesso);
        if (usuario) {
          localStorage.setItem('usuario', JSON.stringify(usuario));
          router.push({ path: '/encomendas' });
        } else {
          error.value = 'Credenciais Inválidas';
        }
      } catch (error) {
        error.value = 'Credenciais inválidas!';
      }
    };

    return {
      cpf,
      chaveAcesso,
      handleSubmit,
      error,
    };
  },
};
</script>
<style>
.container {
  height: auto;
  margin: auto;
  padding: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.logo {
  width: 120px;
  display: block;
  margin: 0 auto;
}

.content {
  width: 40%;
}

.form {
  margin: auto;
}

.input {
  width: 100%;
}

.loginButton {
  width: 100%;
}

.header {
  margin: 0 auto;
  text-align: center;
}

.mt-3 {
  margin-bottom: 1rem;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
