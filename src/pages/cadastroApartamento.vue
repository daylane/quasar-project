<!-- eslint-disable max-len -->
<template>
  <div class="containerApartamentos">
    <div class="contentApartamentos">
      <div class="hearderApartamentos">
        <h5> Cadastro de apartamentos</h5>
      </div>
      <q-form class="q-gutter-md-xl" @submit="handleSubmit">
        // eslint-disable-next-line max-len
        <q-input v-model="identificação" label="Numero do Apartamento" type="String"
          :rules="[val => (!!val) || 'Campo Obrigatório']" />
        <q-input v-model="cpf" label="CPF" type="number" :rules="[val => (!!val) || 'Campo Obrigatório']" />
        <div class="flex flex-center q-mt">
          <q-btn type="submit" color="primary" label="Cadastrar" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useQuasar } from 'quasar';
// eslint-disable-next-line no-unused-vars
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CadastroApartamentos',

  setup() {
    const cpf = ref('');
    const identificacao = ref('');

    const handleSubmit = () => {
      sendApartments();
    };

    const $q = useQuasar();

    const sendApartments = async () => {
      try {
        const response = await axios.post('http:localhost:3000/apartamentos', {
          identificacao: identificacao.value,
          cpf: cpf.value,
        });
        console.log(response);
        $q.notify({
          type: 'positive',
          message: 'Cadastro Realizado'
        });
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: error,
        });
      }
    };

    return {
      identificacao,
      cpf,
      handleSubmit
    };
  },
});
</script>
<style></style>
