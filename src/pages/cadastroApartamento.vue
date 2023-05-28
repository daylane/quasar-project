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
              <q-btn dense round flat color="red" @click="excluirApartamentos(props)" icon="delete"></q-btn>
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
          <q-input v-model="identificacao" label="Numero do Apartamento" type="String"
          :rules="[val => (!!val) || 'Campo Obrigatório']" />
        <q-input v-model="cpf" label="CPF" type="number" :rules="[val => (!!val) || 'Campo Obrigatório']" />
        <q-btn class="botao" color="primary" label="Adicionar" @click="adicionarApartamentos">
          <q-icon name="check"/>
        </q-btn>
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
// eslint-disable-next-line no-unused-vars
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'CadastroApartamentos',

  setup() {
    const cpf = ref('');
    const identificacao = ref('');

    const handleSubmit = () => {
      sendApartments();
    };

    const $q = useQuasar();

    const sendApartments = () => {
      try {
        axios.post('http:localhost:3000/apartamentos', {
          identificacao: identificacao.value.toLocaleUpperCase(),
          cpf: cpf.value,
        });
        $q.notify({
          type: 'positive',
          message: 'Cadastro Realizado',
          position: 'top'
        });
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: error,
          position: 'top'
        });
      }
    };

    const buscarApartamentos = () => {
      try {
        const response = axios.post('http:localhost:3000/apartamentos');
        this.rows = response.data;
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: error,
          position: 'top'
        });
      }
    };

    return {
      identificacao,
      cpf,
      handleSubmit,
      buscarApartamentos,
      activeTab: 'cadastrar',
      filter: ref(''),
      columns: [
        {
          name: 'id',
          label: 'Id',
          align: 'left',
          field: 'id',
          sortable: true
        },
        {
          name: 'identificacao',
          label: 'Identificacao',
          align: 'left',
          field: 'identificacao'
        },
        {
          name: 'cpf',
          label: 'CPF',
          align: 'left',
          field: 'cpf'
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
        },
      ],
      rows: [],
      icon: ref(false),
    };
  },
});
</script>
<style>
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
