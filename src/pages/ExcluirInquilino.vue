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
        <h2>Adicionar Usuario</h2>
        <q-input v-model="cpf" label="CPF"></q-input>
        <q-input v-model="codigoAcesso" label="Código de Acesso"></q-input>
        <q-input v-model="nome" label="Nome"></q-input>
        <q-input v-model="tipo" label="Tipo"></q-input>
        <q-btn color="primary" label="Adicionar" @click="adicionarUsuario"></q-btn>
      </q-tab-panel>

      <q-tab-panel name="secao2">
        <h2>Excluir Inquilino</h2>
        <q-select
          v-model="usuarioSelecionado"
          :options="usuarios"
          option-value="nome"
          option-label="nome"
          label="Selecione um usuário"
        ></q-select>
        <q-btn color="primary" label="Excluir" @click="excluirUsuario" :disable="!usuarioSelecionado"></q-btn>
      </q-tab-panel>

      <q-tab-panel name="secao3">
        <h2>Editar Inquilino</h2>
        <q-select
          v-model="usuarioSelecionado"
          :options="usuarios"
          option-value="nome"
          option-label="nome"
          label="Selecione um usuário"
        ></q-select>
        <q-input v-model="novoNome" label="Novo Nome"></q-input>
        <q-input v-model="novoTipo" label="Novo Tipo"></q-input>
        <q-input v-model="novoCpf" label="Cpf"></q-input>
        <q-input v-model="novoAcesso" label="Novo Acesso"></q-input>
        <q-btn color="primary" label="Editar" @click="editarUsuario" :disable="!usuarioSelecionado"></q-btn>
      </q-tab-panel>

    </q-tab-panels>
  </div>
</template>

<script>
import axios from 'axios';

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
    };
  },
  mounted() {
    this.buscarUsuarios();
  },
  methods: {
    async adicionarUsuario() {
      try {
        await axios.post('http://localhost:3000/usuarios', {
          cpf: this.cpf,
          codigoAcesso: this.codigoAcesso,
          nome: this.nome,
          tipo: this.tipo,
        });
        console.log('Usuário adicionado com sucesso!');
        this.cpf = '';
        this.codigoAcesso = '';
        this.nome = '';
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
        await axios.put(`http://localhost:3000/usuarios/${userId}`, {
          nome: this.novoNome,
          tipo: this.novoTipo,
          cpf: this.novoCpf,
          codigoAacesso: this.novoAcesso,
        });
        console.log('Usuário editado com sucesso!');
        this.buscarUsuarios();
        this.usuarioSelecionado = null;
        this.novoCpf = '';
        this.novoAcesso = '';
        this.novoNome = '';
        this.novoTipo = '';
      } catch (error) {
        console.error('Erro ao editar usuário:', error);
      }
    },
  },
};
</script>
