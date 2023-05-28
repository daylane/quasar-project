<template>
  <div class="containerEncomendas">
    <q-tabs v-model="activeTab">
      <q-tab name="cadastrar">Cadastrar</q-tab>
      <q-tab name="encomendas">Encomendas</q-tab>
    </q-tabs>

    <q-tab-panels v-model="activeTab">
      <q-tab-panel name="cadastrar">
        <div class="image-container">
            <q-img class="cadastro-img" src="../assets/boxIcon.png" fit="cover"></q-img>
        </div>
        <h5>Adicionar Apartamentos</h5>
        <q-select v-model="destinatario"
      @update:model-value="handleChange"
      :options="apartamentos"
      color="black"
      label="Apartamento de Destino"
      :rules="[val => (!!val) || 'Campo obrigatório']" behavior="menu"/>

      <q-input v-model="dataRecebimento" color="black"
      label="Data de recebimento" type="date"
      :rules="[val => (!!val) || 'Campo obrigatório']"/>

      <q-input
      disable
      readonly
      v-model="cpf"
      label="CPF da Desinatario"
      type="number"
      :rules="[val => (!!val) || 'Campo obrigatório']"
      />

      <q-input v-model="recebedor" label="Quem irá recebeber?"
      disable
      readonly
      type="text"
      :rules="[val => (!!val) || 'Campo obrigatório']"/>

        <q-btn class="botao" color="primary" label="Adicionar" @click="handleSubmit">
          <q-icon name="check"/>
        </q-btn>
      </q-tab-panel>

      <q-tab-panel name="encomendas">
        <h5>Atualizar Encomendas</h5>
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
        </q-table>
      </div>
      <q-dialog v-model="icon">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <h5>Encomenda Coletada</h5>
      <q-input v-model="coletor" label="Coletor"></q-input>
      <q-input v-model="dataRetirada" type="date" label="Data"></q-input>
      <q-btn class="botao" color="primary" label="Editar" @click="atualizarEncomendas"></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import {
  computed,
  defineComponent, onMounted, ref
} from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'CadastroEncomenda',

  setup() {
    const cpf = ref('');
    const destinatario = ref('');
    const activeTab = ref('cadastrar');
    const nomeUsuario = computed(() => JSON.parse(localStorage.getItem('usuario')));
    const recebedor = ref(nomeUsuario.value.nome);
    const dataRecebimento = ref('');
    const apartamentos = ref([]);
    const filter = ref('');
    const model = ref(null);
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
        name: 'destinatario',
        label: 'Destinatario',
        align: 'left',
        field: 'destinatario'
      },
      {
        name: 'recebedor',
        label: 'Recebedor',
        align: 'left',
        field: 'recebedor'
      },
      {
        name: 'coletor',
        label: 'Coletor',
        align: 'left',
        field: 'coletor'
      },
      {
        name: 'dataRetirada',
        label: 'Data Retirada',
        align: 'left',
        field: 'dataRetirada'
      },
      {
        name: 'editar',
        label: 'Editar',
        align: 'left',
        field: 'editar'
      },
    ];
    const rows = ref([]);
    const icon = ref(false);
    const coletor = ref('');
    const dataRetirada = ref('');

    const getApartment = async () => {
      try {
        const res = await axios.get('http://localhost:3000/apartamentos');
        const identificacao = res.data;
        apartamentos.value = identificacao.map((item) => (item.identificacao));
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: error,
        });
      }
    };
    const getCpf = async (id) => {
      try {
        const res = await axios.get('http://localhost:3000/apartamentos/', { params: { identificacao: id } });
        const apCpf = res.data.map((item) => (item.cpf));
        cpf.value = apCpf;
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: error,
        });
      }
    };
    const buscarEncomendas = async () => {
      try {
        const res = await axios.get('http://localhost:3000/encomendas');
        rows.value = res.data.filter((data) => data.dataRetirada === '' && data.coletor === '');
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: error,
        });
      }
    };

    onMounted(() => {
      getApartment();
      buscarEncomendas();
    });

    const handleChange = () => {
      getCpf(destinatario.value);
    };
    const handleSubmit = () => {
      sendOrders();
    };

    const handleClick = (props) => {
      icon.value = true;
      model.value = props.row;
      cpf.value = props.row.cpf;
      destinatario.value = props.row.destinatario;
      recebedor.value = props.row.recebedor;
      coletor.value = props.row.coletor;
      dataRetirada.value = props.row.dataRetirada;
    };
    const $q = useQuasar();

    const atualizarEncomendas = async () => {
      const encomendaId = model.value.id;
      try {
        const data = {
          cpf: cpf.value,
          destinatario: destinatario.value,
          recebedor: recebedor.value,
          coletor: coletor.value,
          dataRetirada: dataRetirada.value,
        };
        await axios.put(`http://localhost:3000/encomendas/${encomendaId}`, data);
        buscarEncomendas();
        $q.notify({
          type: 'positive',
          message: 'Encomenda editada com sucesso',
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
    const sendOrders = async () => {
      try {
        const cpfValue = cpf.value[0];
        await axios.post('http://localhost:3000/encomendas', {
          cpf: cpfValue,
          destinatario: destinatario.value,
          recebedor: recebedor.value,
          dataRecebimento: dataRecebimento.value,
          coletor: '',
          dataRetirada: '',
        });
        $q.notify({
          type: 'positive',
          message: 'Cadastro realizado com sucesso',
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

    return {
      cpf,
      activeTab,
      destinatario,
      recebedor,
      dataRecebimento,
      apartamentos,
      coletor,
      model,
      dataRetirada,
      atualizarEncomendas,
      handleSubmit,
      handleChange,
      handleClick,
      filter,
      rows,
      columns,
      icon,
    };
  },
});
</script>
<style>

.containerEncomendas {
  min-height: 70vh;
  margin: auto;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  font-family: 'Poppins', sans-serif;
}
.contentEncomendas {
  width: 600px;
  overflow: hidden;
  position: relative;
}
.headerEncomendas {
  width: 100%;
  position: relative;
  align-items: center;
  padding: 0px 0px 0px 0px;
  flex-wrap: wrap;
  flex-direction: column;;
}
img{
  width: 70px;
  display: block;
  padding: auto;
}
.q-form{
  color: #000000;
}
.cadastrarButao{
  width: 100%;
  font-weight: bold;
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
