<!-- eslint-disable max-len -->
<template>
  <div>
    <q-header reveal elevated class="bg-grey-9 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="logout" @click="handleSubmit" />
        <q-separator dark vertical inset />

        <q-toolbar-title>
          Encomendas
        </q-toolbar-title>

      </q-toolbar>
    </q-header>
    <q-tabs v-model="activeTab">
      <q-tab name="pendenciaEncomenda">Encomenda</q-tab>
      <q-tab name="historicoEncomenda">Historico</q-tab>
    </q-tabs>

    <q-tab-panels v-model="activeTab">
      <q-tab-panel name="historicoEncomenda">
        <h5>Histórico de Encomendas</h5>
        <q-table title="Historico de Encomendas" :rows="rowsHistorico" :columns="columns" row-key="id"
          no-data-label="Não tem registro encomedas!" >

          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Pesquisa">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

        </q-table>
      </q-tab-panel>

      <q-tab-panel name="pendenciaEncomenda">
        <h5>Retirar Encomendas</h5>
        <q-table title="Pêndencia de Encomendas" :rows="rowsPendencia" :columns="columns" row-key="id"
          no-data-label="Não tem novas encomedas!" >
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Pesquisa">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

        </q-table>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import axios from 'axios';
import router from 'src/router';
import { computed, ref } from 'vue';

export default {
  name: 'MyComponent',
  data() {
    return {
      activeTab: 'pendenciaEncomenda',
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
          name: 'cpf',
          label: 'CPF',
          align: 'left',
          field: 'cpf'
        },
        {
          name: 'destinatario',
          label: 'Destinatario',
          align: 'left',
          field: 'destinatario'
        },
        {
          name: 'coletor',
          label: 'Coletor',
          align: 'left',
          field: 'coletor'
        },
        {
          name: 'recebedor',
          label: 'Recebedor',
          align: 'left',
          field: 'recebedor'
        },
        {
          name: 'data_recebimento',
          label: 'Data de Recebimento',
          align: 'left',
          field: 'data_recebimento',
        },
        {
          name: 'data_retirada',
          label: 'Data de Retirada',
          align: 'left',
          field: 'data_retirada'
        },
      ],
      rowsPendencia: [],
      rowsHistorico: []
    };
  },

  mounted() {
    const chaveAcesso = computed(() => JSON.parse(localStorage.getItem('usuario')));
    this.fecthData(chaveAcesso.value.identificacao);
  },
  methods: {
    fecthData(chaveAcesso) {
      axios.get('http://localhost:3000/encomendas', { params: { destinatario: chaveAcesso } })
        .then((response) => {
          this.rowsPendencia = response.data.filter((data) => data.data_retirada === '');
          this.rowsHistorico = response.data.filter((data) => data.data_retirada !== '');
        }).catch((err) => {
          console.log(err);
        });
    },
  },
  setup() {
    const handleSubmit = () => {
      router.push()({ path: '/' });
    };

    return {
      handleSubmit,
    };
  },
};
</script>
<style>
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
<!-- const formatDate = (date, subs = '/') => {
  if (!date) return '';

  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);

  return [day, month, year].join(subs);
}; -->
