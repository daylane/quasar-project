<template>
  <div class="container">
    <div class="content">
      <div class="header">
        <h3>Cadastrar Encomendas</h3>
      </div>
      <q-form class="q-gutter-md q-mt-xl" @submit="handleSubmit">
      <q-input
      v-model="cpf"
      label="CPF da Desinatario"
      type="number"
      :rules="[val => (!!val) || 'Campo obrigatório']"
      />
      <q-select v-model="destinatario" :options="apartamentos" label="Apartamento de Destino"
      :rules="[val => (!!val) || 'Campo obrigatório']" behavior="menu"/>

      <q-input v-model="coletor" label="Quem está recebendo?" type="text"
      :rules="[val => (!!val) || 'Campo obrigatório']"/>

      <q-input v-model="recebedor" label="Quem irá recebeber?" type="text"
      :rules="[val => (!!val) || 'Campo obrigatório']"/>

      <q-input v-model="dataRecebimento" label="Data de recebimento" type="date"
      :rules="[val => (!!val) || 'Campo obrigatório']"/>

      <div class="flex flex-center q-mt">
      <q-btn type="submit" color="primary" label="Cadastrar" />
      </div>
    </q-form>
    </div>
  </div>
</template>

<!-- <script >
// const validateData = () => {
//   const apartmentsFound = cpf.value
//     // eslint-disable-next-line no-shadow
//     .flatMap((cpf) => cpf.apartamentos)
//     .flat();
//   console.log(apartmentsFound);
// };

</script> -->
<script>
import axios from 'axios';
import { Notify } from 'quasar';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'CadastroEncomenda',

  setup() {
    const cpf = ref('');
    const destinatario = ref('');
    const recebedor = ref('');
    const coletor = ref('');
    const dataRecebimento = ref('');
    const apartamentos = ref([]);

    const getApartment = async () => {
      try {
        const res = await axios.get('http://localhost:3000/apartamentos');
        const identificacao = res.data;
        apartamentos.value = identificacao.map((item) => (item.identificacao));
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      getApartment();
    });

    const handleSubmit = () => {
      sendOrders();
    };

    const sendOrders = async () => {
      try {
        const response = await axios.post('http://localhost:3000/encomendas', {
          cpf: cpf.value,
          destinatario: destinatario.value,
          recebedor: recebedor.value,
          coletor: coletor.value,
          dataRecebimento: dataRecebimento.value,
          dataRetirada: '',
        });
        console.log(response);
        Notify.create({
          type: 'positive',
          message: 'Cadastro Realizado',
        });
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error,
        });
      }
    };

    return {
      cpf,
      destinatario,
      recebedor,
      coletor,
      dataRecebimento,
      apartamentos,
      handleSubmit,
    };
  },
});
</script>
<style>
.container {
  height: auto;
  margin: auto;
  padding: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.content {
  width: 40%;
}
.header {
  margin: 0 auto;
  text-align: center;
}
</style>
