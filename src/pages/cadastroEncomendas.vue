<template>
  <div class="containerEncomendas">
    <div class="contentEncomendas">
      <div class="headerEncomendas">
        <img src="../assets/boxIcon.png">
        <h4 class="title">Cadastrar Encomendas</h4>
      </div>
      <q-form class="q-gutter-md q-mt-xl" @submit="handleSubmit">
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

      <div class="flex flex-center q-mt">
      <q-btn type="submit" push rounded color="secondary"
      class="Cadastrarbutao"
      label="Cadastrar" />
      </div>
    </q-form>
    </div>
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
    const cpf = ref([]);
    const destinatario = ref('');
    const nomeUsuario = computed(() => JSON.parse(localStorage.getItem('usuario')));
    const recebedor = ref(nomeUsuario.value.nome);
    const dataRecebimento = ref('');
    const apartamentos = ref([]);

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

    onMounted(() => {
      getApartment();
    });

    const handleChange = () => {
      getCpf(destinatario.value);
    };
    const handleSubmit = () => {
      sendOrders();
    };

    const $q = useQuasar();

    const sendOrders = async () => {
      try {
        const response = await axios.post('http://localhost:3000/encomendas', {
          cpf: cpf.value,
          destinatario: destinatario.value,
          recebedor: recebedor.value,
          dataRecebimento: dataRecebimento.value,
          coletor: '',
          dataRetirada: '',
        });
        console.log(response);
        $q.notify({
          type: 'positive',
          message: 'Cadastro Realizado',
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
      destinatario,
      recebedor,
      dataRecebimento,
      apartamentos,
      handleSubmit,
      handleChange,
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
</style>
