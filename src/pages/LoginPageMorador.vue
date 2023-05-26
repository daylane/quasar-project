<!-- eslint-disable no-shadow, no-use-before-defined, no-unused-vars -->
<template>
  <div class="container">
    <div class="content">
      <div class="header">
        <img class="logo" src="../assets/iconLogin.png"/>
        <h5 class="title">LOGIN</h5>
      </div>
      <q-form class="form" @submit="handleSubmit">
        <div class="mt-3">
          <label style="color: #000000">CPF</label>
          <q-input v-model="cpf" type="number" color="black"
          :rules="[val => (!!val) || 'Campo obrigatório']"
          >
          <template v-slot:prepend>
              <q-icon name="account_circle" color="black"/>
          </template>
          </q-input>
        </div>
        <div class="mt-3">
          <label style="color:#000000">Chave de Acesso</label>
          <q-input v-model="chaveAcesso" type="text" color="black"
          :rules="[val => (!!val) || 'Campo obrigatório']"
          >
          <template v-slot:prepend>
              <q-icon name="key" color="black"/>
          </template>
          </q-input>
        </div>
        <q-btn push rounded color="secondary" class="loginButton" type="submit" label="Iniciar"/>
        <div v-if="error" class="text-negative q-mt-md">{{ error }}</div>
      </q-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const cpf = ref('');
    const chaveAcesso = ref('');
    const error = ref('');
    const router = useRouter();

    const $q = useQuasar();

    const handleSubmit = () => {
      login(cpf.value, chaveAcesso.value.toLocaleUpperCase());
    };

    const login = async (cpf, chaveAcesso) => {
      try {
        const response = await axios.get('http://localhost:3000/usuarios');
        const usuarios = response.data;
        const usuario = usuarios.find((u) => u.cpf === cpf && u.codigo_acesso === chaveAcesso);
        console.log(usuarios.find((u) => u.cpf === cpf && u.codigo_acesso === chaveAcesso));
        if (usuario) {
          localStorage.setItem('usuario', JSON.stringify(usuario));
          if (usuario.tipo === 'inquilino') {
            router.push({ path: '/encomendas' });
          } else {
            router.push({ path: '/menu/inicial' });
          }
        } else {
          $q.notify({
            type: 'negative',
            message: 'Credenciais Inválidas',
            position: 'top',
          });
        }
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Credenciais Inválidas',
          position: 'top',
        });
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
template{
  height: 100%;
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

.container {
  min-height: 100vh;
  margin: auto;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  font-family: 'Poppins', sans-serif;
  background-image: url(../assets/Blue.svg);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: top;
  object-fit: cover;
}

.title{
  font-weight: bold;
  font-size: 24px;
  color: #000;
  line-height: 1.2;
  text-align: center;
}

.logo {
  display: block;
  margin: 0 auto;
  padding: auto;

}

.content {
  width: 500px;
  overflow: hidden;
  position: relative;

}

.form {
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0px 50px 100px 50px;

}

.input {
  width: 100%;
}

.loginButton {
  width: 100%;
  font-weight: bold;
}

.header {
  width: 100%;
  position: relative;
  align-items: center;
  padding: 70px 0px 0px 0px;
  z-index: 1;
  flex-wrap: wrap;
  flex-direction: column;
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
