<!-- eslint-disable max-len -->
<template>
  <div>
    <q-tabs v-model="activeTab">
      <q-tab name="secao1">Adicionar</q-tab>
      <q-tab name="secao2">Excluir</q-tab>
      <q-tab name="secao3">Editar</q-tab>
    </q-tabs>

    <q-tab-panels v-model="activeTab">
      <q-tab-panel name="secao1">
        <div class="image-container">
            <q-img class="cadastro-img" src="../assets/cadastro.png" fit="cover"></q-img>
        </div>
        <h5>Adicionar Usuario</h5>
        <q-input   v-model="nome" label="Nome"></q-input>
        <q-input   v-model="cpf" type="number" label="CPF"></q-input>
        <q-input   v-model="codigoAcesso" label="Código de Acesso"></q-input>
        <q-btn class="botao" color="primary" label="Adicionar" @click="adicionarUsuario">
          <q-icon name="check"/>
        </q-btn>
      </q-tab-panel>

      <q-tab-panel name="secao2">
        <h5>Excluir Usuario</h5>
        <q-select
          v-model="usuarioSelecionado"
          :options="usuarios"
          option-value="nome"
          option-label="nome"
          label="Selecione um usuário"
        ></q-select>
        <q-btn class="botao" color="negative" label="Excluir" @click="excluirUsuario" :disable="!usuarioSelecionado"></q-btn>

      </q-tab-panel>

          <q-tab-panel name="secao3">
      <h5>Editar Usuario</h5>
      <q-select
        v-model="usuarioSelecionado"
        :options="usuarios"
        option-value="nome"
        option-label="nome"
        label="Selecione um usuário"
      ></q-select>
      <q-input v-model="novoNome" label="Novo Nome"></q-input>
      <q-input v-model="novoCpf" label="Novo CPF"></q-input>
      <q-input v-model="novoAcesso" label="Novo Acesso"></q-input>
      <q-select v-model="novoTipo" :options="options" label="Tipo"></q-select>
      <q-btn class="botao" color="primary" label="Editar" @click="editarUsuario" :disable="!usuarioSelecionado"></q-btn>
    </q-tab-panel>

    </q-tab-panels>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  data() {
    return {
      activeTab: 'secao1',
      cpf: '',
      codigoAcesso: '',
      nome: '',
      tipo: '',
      usuarios: [],
      usuarioSelecionado: null,
      novoNome: '',
      novoTipo: '',
      novoCpf: '',
      novoAcesso: '',
      model: ref(null),
    };
  },
  mounted() {
    this.buscarUsuarios();
  },
  methods: {
    async adicionarUsuario() {
      try {
        await axios.post('http://localhost:3000/usuarios', {
          nome: this.nome,
          cpf: this.cpf,
          codigo_acesso: this.codigoAcesso,
          tipo: 'INQUILINO',
        });
        console.log('Usuário adicionado com sucesso!');
        this.nome = '';
        this.cpf = '';
        this.codigo_acesso = '';
        this.tipo = '';
        this.buscarUsuarios();
      } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
      }
    },
    async buscarUsuarios() {
      try {
        const response = await axios.get('http://localhost:3000/usuarios');
        this.usuarios = response.data;
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    },
    async excluirUsuario() {
      if (!this.usuarioSelecionado) return;

      const userId = this.usuarioSelecionado.id;

      try {
        await axios.delete(`http://localhost:3000/usuarios/${userId}`);
        console.log('Usuário excluído com sucesso!');
        this.buscarUsuarios();
        this.usuarioSelecionado = null;
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    },
    async editarUsuario() {
      if (!this.usuarioSelecionado) return;

      const userId = this.usuarioSelecionado.id;

      try {
        const response = await axios.get(`http://localhost:3000/usuarios/${userId}`);
        const userData = response.data;

        const data = {
          nome: this.novoNome || userData.nome,
          cpf: this.novoCpf || userData.cpf,
          codigo_acesso: this.novoAcesso || userData.codigo_acesso,
          tipo: this.novoTipo || userData.tipo,
        };

        await axios.put(`http://localhost:3000/usuarios/${userId}`, data);
        console.log('Usuário editado com sucesso!');
        this.buscarUsuarios();
        this.usuarioSelecionado = null;
        this.novoNome = '';
        this.novoCpf = '';
        this.novoAcesso = '';
        this.novoTipo = '';
      } catch (error) {
        console.error('Erro ao editar usuário:', error);
      }
    },
  }
};
</script>
<style>
h5 {
    margin: 5px;

}
.botao{
margin: 10px;

}
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;

}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
}

.cadastro-img {
  max-width: 160px;
  max-height: 80%;
  height: auto;
}
</style>
