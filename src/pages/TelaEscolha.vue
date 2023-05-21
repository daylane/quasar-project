<template>
  <div>
    <q-tabs v-model="activeTab">
      <q-tab name="section1">Encomenda</q-tab>
      <q-tab name="section2">Historico</q-tab>
    </q-tabs>

    <q-tab-panels v-model="activeTab">
      <q-tab-panel name="section2">
        <h2>Seção 1</h2>

      </q-tab-panel>

      <q-tab-panel name="section1">
        <h2>Seção 2</h2>
        <q-table
          :rows="tableData"
          :columns="tableColumns"
          row-key="id"

        >

        </q-table>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MyComponent',
  data() {
    return {
      activeTab: 'section1',
      tableData: [{
        name: 'Frozen Yogurt',

      }],
      tableColumns: [
        {
          name: 'ID', required: true, align: 'left', field: 'id', sortable: true,
        },
        {
          name: 'Name', align: 'left', field: 'name', sortable: true,
        },
        {
          name: 'destinatario', align: 'left', field: 'destinatario', sortable: true,
        },
        {
          name: 'coletor', align: 'left', field: 'coletor', sortable: true,
        },
        {
          name: 'data_de_recebimento', align: 'left', field: 'data_de_recebimento', sortable: true,
        },
        { name: 'Actions', align: 'center', field: 'actions' },
      ],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get('http://localhost:3000/AP12345')
        .then((response) => {
          this.tableData = response.data;
        })
        .catch((error) => {
          console.error('Erro ao buscar dados:', error);
        });
    },
    editRow(row) {
      console.log('Editar linha:', row);
    },
  },
};
</script>
