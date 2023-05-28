<!-- eslint-disable max-len -->
<template>
  <div class="containerApartamentos">
    <q-tabs v-model="activeTab">
      <q-tab name="cadastrar">Cadastrar</q-tab>
      <q-tab name="apartamentos">Apartamentos</q-tab>
    </q-tabs>

    <q-tab-panels v-model="activeTab">
      <q-tab-panel name="cadastrar">
        <div class="image-container">
            <q-img class="cadastro-img" src="../assets/iconPredio.png" fit="cover"></q-img>
        </div>
        <h5>Adicionar Apartamentos</h5>
        <q-input v-model="identificacao" label="Numero do Apartamento" type="String"
          :rules="[val => (!!val) || 'Campo Obrigatório']" />
        <q-input v-model="cpf" label="CPF" type="number" :rules="[val => (!!val) || 'Campo Obrigatório']" />
        <q-btn class="botao" color="primary" label="Adicionar" @click="handleSubmit">
          <q-icon name="check"/>
        </q-btn>
      </q-tab-panel>

      <q-tab-panel name="apartamentos">
        <h5>Administrar Apartamentos</h5>
        <div class="row q-col-gutter-sm">
          <div class="col">
            <q-table
              class="table"
              :filter="filter"
              :rows="rows"
              :columns="columns"
              row-key="id"
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
                  <q-btn dense round flat color="red" @click="excluirApartamento(props)" icon="delete"></q-btn>
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
                <h5>Editar Apartamento</h5>
                <q-input v-model="editIdentificacao" label="Nova Identificação"></q-input>
                <q-input v-model="editCpf" label="Novo CPF"></q-input>
                <q-btn class="botao" color="primary" label="Editar" @click="editarApartamento"></q-btn>
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

    const identificacao = ref('');
    const cpf = ref('');
    const editIdentificacao = ref('');
    const editCpf = ref('');
    const model = ref(null);
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
        name: 'cpf',
        label: 'CPF',
        align: 'left',
        field: 'cpf'
      },
      {
        name: 'identificacao',
        label: 'Identificação',
        align: 'left',
        field: 'identificacao'
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

    const buscarApartamentos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/apartamentos');
        rows.value = response.data;
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: error,
          position: 'top',
        });
      }
    };

    const excluirApartamento = async (props) => {
      const apartamentoId = props.row.id;
      try {
        await axios.delete(`http://localhost:3000/apartamentos/${apartamentoId}`);
        buscarApartamentos();
        $q.notify({
          type: 'positive',
          message: 'Apartamento Excluido com sucesso!',
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
      model.value = props.row;
      editCpf.value = props.row.cpf;
      editIdentificacao.value = props.row.identificacao;
    };

    const editarApartamento = async () => {
      const apartamentoId = model.value.id;
      try {
        const data = {
          cpf: editCpf.value,
          identificacao: editIdentificacao.value
        };

        await axios.put(`http://localhost:3000/apartamentos/${apartamentoId}`, data);

        buscarApartamentos();
        icon.value = false;
        model.value = null;
        $q.notify({
          type: 'positive',
          message: 'Apartamento editado com sucesso!',
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

    const handleSubmit = async () => {
      try {
        const data = {
          identificacao: identificacao.value,
          cpf: cpf.value
        };

        await axios.post('http://localhost:3000/apartamentos', data);
        identificacao.value = '';
        cpf.value = '';
        $q.notify({
          type: 'positive',
          message: 'Apartamento adicionado com sucesso!',
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
      buscarApartamentos();
    });

    return {
      activeTab,
      identificacao,
      cpf,
      editIdentificacao,
      editCpf,
      model,
      filter,
      columns,
      rows,
      icon,
      excluirApartamento,
      handleClick,
      editarApartamento,
      handleSubmit
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
