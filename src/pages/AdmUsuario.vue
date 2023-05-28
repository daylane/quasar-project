<!-- eslint-disable max-len -->
coloque qnotify no código
<template>
  <div>
    <q-tabs v-model="activeTab">
      <q-tab name="secao1">Adicionar</q-tab>
      <q-tab name="secao2">Usuarios</q-tab>
    </q-tabs>

    <q-tab-panels v-model="activeTab">
      <q-tab-panel name="secao1">
        <div class="image-container">
            <q-img class="cadastro-img" src="../assets/cadastro.png" fit="cover"></q-img>
        </div>
        <h5>Adicionar Usuario</h5>
        <q-input v-model="nome" label="Nome"></q-input>
        <q-input v-model="cpf" type="number" label="CPF"></q-input>
        <q-input v-model="codigo_acesso" label="Código de Acesso"></q-input>
        <q-select v-model="tipo" :options="options" label="Tipo" > </q-select>
        <q-btn class="botao" color="primary" label="Adicionar" @click="adicionarUsuario">
          <q-icon name="check"/>
        </q-btn>
      </q-tab-panel>

      <q-tab-panel name="secao2">
        <h5>Administrar Usuarios</h5>
        <div class="row q-col-gutter-sm">
          <div class="col">
            <q-table
              class="table"
              :filter="filter"
              :rows="rows"
              :columns="columns"
              row-key="name"
              dense
            >
              <template v-slot:top-right>
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Pesquisa">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>

              <template v-slot:body-cell-editar="props">
                <q-td :props="props">
                  <q-btn dense round flat color="blue" @click="handleClick(props)" icon="edit"></q-btn>
                </q-td>
              </template>
              <template v-slot:body-cell-excluir="props">
                <q-td :props="props">
                  <q-btn dense round flat color="red" @click="excluirUsuario(props)" icon="delete"></q-btn>
                </q-td>
              </template>
            </q-table>
          </div>

          <q-dialog v-model="icon">
            <q-card>
              <q-card-section class="row items-center q-pb-none">
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>
              <q-card-section>
                <h5>Editar Usuario</h5>
                <q-input v-model="novoNome" label="Novo Nome"></q-input>
                <q-input v-model="novoCpf" label="Novo CPF"></q-input>
                <q-input v-model="novoAcesso" label="Novo Acesso"></q-input>
                <q-select v-model="novoTipo" :options="options" label="Tipo"></q-select>
                <q-btn class="botao" color="primary" label="Editar" @click="editarUsuario"></q-btn>
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import axios from 'axios';
import { useQuasar } from 'quasar';
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const activeTab = ref('secao1');
    const cpf = ref('');
    // eslint-disable-next-line camelcase
    const codigo_acesso = ref('');
    const nome = ref('');
    const tipo = ref('');
    const id = ref('');
    const usuarios = ref([]);
    const usuarioSelecionado = ref(null);
    const novoNome = ref('');
    const novoTipo = ref('');
    const novoCpf = ref('');
    const novoAcesso = ref('');
    const model = ref(null);
    const options = ['inquilino', 'porteiro', 'sindico'];
    const filter = ref('');
    const columns = [
      {
        name: 'id',
        label: 'Id',
        align: 'left',
        field: 'id',
        sortable: true
      },
      {
        name: 'nome',
        label: 'Nome',
        align: 'left',
        field: 'nome'
      },
      {
        name: 'cpf',
        label: 'CPF',
        align: 'left',
        field: 'cpf'
      },
      {
        name: 'codigo_acesso',
        label: 'Apartamentos',
        align: 'left',
        field: 'codigo_acesso'
      },
      {
        name: 'tipo',
        label: 'Tipo',
        align: 'left',
        field: 'tipo'
      },
      {
        name: 'editar',
        label: 'Editar',
        align: 'left',
        field: 'editar'
      },
      {
        name: 'excluir',
        label: 'Excluir',
        align: 'left',
        field: 'excluir'
      }
    ];
    const rows = ref([]);
    const icon = ref(false);

    const $q = useQuasar();

    const adicionarUsuario = async () => {
      try {
        await axios.post('http://localhost:3000/usuarios', {
          nome: nome.value,
          cpf: cpf.value,
          // eslint-disable-next-line camelcase
          codigo_acesso: codigo_acesso.value.toLocaleUpperCase(),
          tipo: tipo.value
        });
        nome.value = '';
        cpf.value = '';
        // eslint-disable-next-line camelcase
        codigo_acesso.value = '';
        tipo.value = '';
        buscarUsuarios();
        $q.notify({
          type: 'positive',
          message: 'Usuário adicionado com sucesso!',
          position: 'top',
        });
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: error,
          position: 'top',
        });
      }
    };

    const buscarUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3000/usuarios');
        usuarios.value = response.data;
        rows.value = response.data;
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: error,
          position: 'top',
        });
      }
    };

    const excluirUsuario = async (props) => {
      const userId = props.row.id;
      try {
        await axios.delete(`http://localhost:3000/usuarios/${userId}`);
        buscarUsuarios();
        $q.notify({
          type: 'positive',
          message: 'Usuario Excluido com Sucesso',
          position: 'top',
        });
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: error,
          position: 'top',
        });
      }
    };

    const handleClick = (props) => {
      icon.value = true;
      id.value = props.row.id;
      novoNome.value = props.row.nome;
      novoCpf.value = props.row.cpf;
      novoAcesso.value = props.row.codigo_acesso;
      novoTipo.value = props.row.tipo;
    };

    const editarUsuario = async () => {
      const userId = id.value;

      try {
        const data = {
          nome: novoNome.value,
          cpf: novoCpf.value,
          codigo_acesso: novoAcesso.value,
          tipo: novoTipo.value
        };
        await axios.put(`http://localhost:3000/usuarios/${userId}`, data);

        novoNome.value = '';
        novoCpf.value = '';
        novoAcesso.value = '';
        novoTipo.value = '';
        buscarUsuarios();
        $q.notify({
          type: 'positive',
          message: 'Usuario editado com sucesso',
          position: 'top',
        });
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: error,
          position: 'top',
        });
      }
    };

    onMounted(() => {
      buscarUsuarios();
    });

    return {
      activeTab,
      cpf,
      // eslint-disable-next-line camelcase
      codigo_acesso,
      nome,
      tipo,
      id,
      usuarios,
      usuarioSelecionado,
      novoNome,
      novoTipo,
      novoCpf,
      novoAcesso,
      model,
      options,
      filter,
      columns,
      rows,
      icon,
      adicionarUsuario,
      buscarUsuarios,
      excluirUsuario,
      handleClick,
      editarUsuario
    };
  }
};
</script>

<style>
.q-field__native {
  color: #000000 !important;
}

h5 {
  margin: 5px;
}

.botao {
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

.q-table__top {
  background-color: #748086;
  color: white;
}

.q-table__bottom {
  background-color: #748086;
  color: white;
}

.q-field__native {
  color: white;
}

.table thead tr:first-child th {
  background-color: #748086;
}

.table thead td {
  background-color: #000000;
}

.table thead tr:firt-child th {
  top: 0px;
}

.table th {
  color: white;
}
</style>
