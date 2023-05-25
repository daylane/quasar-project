<!-- eslint-disable max-len -->
<template>
  <div>
    <q-tabs v-model="activeTab">
      <q-tab name="encomendas">Encomenda</q-tab>
      <q-tab name="apartamentos">Apartamentos</q-tab>
    </q-tabs>

    <q-tab-panels v-model="activeTab">
      <q-tab-panel name="apartamentos">
        <h2>Pesquisar Apartamentos</h2>
        <q-table title="Apartamentos" class="table" :rows="rowsApartamentos" :columns="columnsApartamentos" row-key="id"
          :filter="filter" no-data-label="Não tem registro encomedas!">
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Pesquisa">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
      </q-tab-panel>

      <q-tab-panel name="encomendas">
        <h2>Pesquisar Encomendas</h2>
        <div class="q-pa-md">
          <q-table title="Encomendas" class="table" :rows="rowsEncomendas" :columns="columnsEncomendas" :filter="filter"
            row-key="id" no-data-label="Não tem encomendas!">
            <template v-slot:top-right>
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Pesquisa">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
          </q-table>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import axios from 'axios';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'buscaInfo',
  data() {
    return {
      activeTab: 'encomendas',
      filter: ref(''),
      columnsEncomendas: [
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
        }
      ],
      columnsApartamentos: [
        {
          name: 'id',
          label: 'Id',
          align: 'left',
          field: 'id',
          sortable: true
        },
        {
          name: 'identificacao',
          label: 'Identidicação',
          align: 'left',
          field: 'identificacao',
          sortable: true
        },
        {
          name: 'cpf',
          label: 'CPF',
          align: 'left',
          field: 'cpf'
        }
      ],
      rowsEncomendas: [],
      rowsApartamentos: []
    };
  },
  mounted() {
    this.fecthData();
    this.fecthDataApartamentos();
  },
  methods: {
    fecthData() {
      axios.get('http://localhost:3000/encomendas', { params: this.filter })
        .then((response) => {
          this.rowsEncomendas = response.data;
          this.rowsApartamentos = response.data;
        }).catch((err) => {
          console.log(err);
        });
    },
    fecthDataApartamentos() {
      axios.get('http://localhost:3000/apartamentos', { params: this.filter })
        .then((response) => {
          this.rowsApartamentos = response.data;
        }).catch((err) => {
          console.log(err);
        });
    },
  },
});

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
