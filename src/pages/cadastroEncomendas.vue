<template>
  <div class="q-pa-md">
    <h1>Cadastrar Encomendas</h1>

    <q-from @submit="onSubmit" class="q-gutter-md q-mt-xl">

      <q-input filled v-model="cpf" label="CPF da Encomenda" lazy-rules :rules="[
        (val) => val.trim() != '' || 'Campo obrigatório.'
      ]" />
      <q-input filled v-model="destinatario" label="Apartamento de Destino" lazy-rules :rules="[
        (val) => val.trim() != '' || 'Campo obrigatório.'
      ]" />

      <q-input filled v-model="recebedor" label="Quem está recebendo?" />

      <q-input filled v-model="coletor" label="Quem irá recebeber?" />

      <q-input filled v-model="dataRecebimento" label="Data de recebimento" lazy-rules :rules="[
        (val) => val.trim() != '' || 'Campo obrigatório.'
      ]" />

      <q-input filled v-model="dataRetirada" label="Data de retirada" />

    </q-from>

    <div class="flex flex-center q-mt">
      <q-btn type="submit" color="primary" label="Cadastrar" />
    </div>
  </div>
</template>

<script >
import { Notify, alert } from 'quasar';
import { ref, onMounted } from 'vue';
import { api } from 'src/boot/axios';

const cpf = ref('');
const destinatario = ref('');
const recebedor = ref('');
const coletor = ref('');
const dataRecebimento = ref('');
const dataRetirada = ref('');

const sendOrders = () => {
  api
    .post('/encomendas', {
      cpf: cpf.value,
      destinatario: destinatario.value,
      recebedor: recebedor.value,
      coletor: coletor.value,
      dataRecebimento: dataRecebimento.value,
      dataRetirada: dataRetirada.value,
    })
    .then(() => {
      Notify.create({
        type: 'positive',
        message: 'Cadastro Realizado',
      });
    })
    .catch((error) => {
      alert(error);
    });
};

const getApartment = async () => {
  try {
    const res = await api.get('/usuarios');
    cpf.value = res.data;
    // eslint-disable-next-line no-use-before-define
    validateData();
  } catch (error) {
    Notify.create({
      type: 'negative',
    });
  }
};

const validateData = () => {
  const apartmentsFound = cpf.value
    // eslint-disable-next-line no-shadow
    .flatMap((cpf) => cpf.apartamentos)
    .flat();
  console.log(apartmentsFound);
};

onMounted(() => {
  sendOrders();
});

export default {
  setup() {
    return {
      cpf,
      destinatario,
      recebedor,
      coletor,
      dataRecebimento,
      dataRetirada,
      getApartment,
    };
  },
};
</script>
