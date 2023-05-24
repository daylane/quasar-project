<template>
  <div class="q-pa-md">
    <h1>Cadastrar Encomendas</h1>

    <q-form class="q-gutter-md q-mt-xl" onsubmit="handleSubmit">
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

      <q-input v-model="dataRecebimento" label="Data de recebimento" type="text"
      :rules="[val => (!!val) || 'Campo obrigatório']"/>

    </q-form>

    <div class="flex flex-center q-mt">
      <q-btn type="submit" color="primary" label="Cadastrar" />
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

export default defineComponent({
  name: 'CadastroEncomendas',
  // setup() {
  //   return {
  //     // cpf,
  //     // destinatario,
  //     // recebedor,
  //     // coletor,
  //     // dataRecebimento,
  //     // dataRetirada,
  //     // getApartment,
  //   };
  // },
});
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

    const handleSubmit = async () => {
      console.log('eu');
      sendOrders();
    };

    const sendOrders = async () => {
      await axios.post('http://localhost:3000/encomendas', {
        cpf: cpf.value,
        destinatario: destinatario.value,
        recebedor: recebedor.value,
        coletor: coletor.value,
        dataRecebimento: dataRecebimento.value,
        dataRetirada: '',
      }).then(() => {
        Notify.create({
          type: 'positive',
          message: 'Cadastro Realizado',
        });
      }).catch((error) => {
        Notify.create({
          type: 'negative',
          message: error,
        });
      });
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
