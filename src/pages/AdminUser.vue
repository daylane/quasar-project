<template>
   <q-page padding>
    <div class="row">
      <q-table
        :rows="usuarios"
        :row-key="id"
        :class="col-12"
        :loading="loading"
      >

        <template v-slot: top>
          <span class="text-h5">
            usuarios
          </span>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="mdi-pencil-outline" color="info" dense size="sm" @click="handleEdit(props.row)">
              <q-tooltip>
                Edit
              </q-tooltip>
            </q-btn>
            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="handleRemoveProduct(props.row)">
              <q-tooltip>
                Delete
              </q-tooltip>
            </q-btn>
          </q-td>
        </template>

      </q-table>
    </div>
   </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import useApi from 'src/composables/UseApi';
import useAuthUser from 'src/composables/UseAuthUser';
import useNotify from 'src/composables/UseNotify';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { columnsProduct } from './table';

export default defineComponent({
  name: 'PageProductList',
  setup() {
    const products = ref([]);
    const loading = ref(true);
    const router = useRouter();
    const table = 'product';
    const $q = useQuasar();

    const { listPublic, remove } = useApi();
    const { user } = useAuthUser();
    const { notifyError, notifySuccess } = useNotify();

    const handle = async () => {
      try {
        loading.value = true;
        products.value = await listPublic(table, user.value.id);
        loading.value = false;
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleEdit = (category) => {
      router.push({ name: 'form-product', params: { id: category.id } });
    };

    const handleRemoveUsuario = async (category) => {
      try {
        $q.dialog({
          title: 'Confirm',
          message: `Quer deletar?${category.name} ?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, category.id);
          notifySuccess('successfully deleted');
          getUsuarios();
        });
      } catch (error) {
        notifyError(error.message);
      }
    };

    onMounted(() => {
      getUsuarios();
    });

    return {
      columnsProduct,
      products,
      loading,
      handleEdit,
      handleRemoveUsuario,

    };
  }
});
</script>
