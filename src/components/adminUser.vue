<!-- eslint-disable max-len -->
<template>
  <div class="q-pa-md">
    <h5>Gerenciar usuarios</h5>
    <q-table
      :title="adminUser"
      :data="data"
      :rows="rows"
      :columns="columns"
      row-key="id"
      class="col"
    />
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

const columns = [{
        name: 'name',
        required: true,
        label: 'Dessert (100g serving)',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
          },
          {
            name: 'Nome', align: 'center', label: 'Usuário', field: 'usuario', sortable: true
          },
          {
            name: 'CPF', label: 'CPF', field: 'CPF', sortable: true
          },
          { name: 'Tipo de Usuaŕio', label: 'Tipo Usuario', field: 'tipoUsuario' },

          ],
const rows = [{

          }]

export default (


  _name: 'AdminUser',
  _data(){
    return{
      columns,
      rows,
      usuarios[]
      },
      mounted9() {
        this.getUsuarios()
      }
      methods: {
        getUsuarios () {
          this.axios.get('http://localhost:3000/usuarios')
            .then((_res) => {
              console.log()
            })
            .catch((error) =>
            console.log(error))
        }
      }
    }
)


</script>
<style>


</style>
