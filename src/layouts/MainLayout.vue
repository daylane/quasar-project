<template>
  <q-layout view="hHh LpR lFf">
    <q-header reveal elevated class="bg-grey-9 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-separator dark vertical inset />

        <q-toolbar-title>
          Menu
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="desktop" overlay elevated
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
      <q-list v-for="(linksList, index) in linksList" :key="index">
        <q-item clickable v-ripple :href="linksList.path">
          <q-item-section avatar>
            <q-icon :name="linksList.icon" />
          </q-item-section>
          <q-item-section>
            {{ linksList.title }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';

const linksList = [
  {
    title: 'Administrar Inquilinos',
    icon: 'person_add',
    path: '#/menu/admUsuario',
  },
  {
    title: 'Cadastrar Encomendas',
    icon: 'new_label',
    path: '#/menu/cadastroencomenda',
  },
  {
    title: 'Cadastrar Apartamentos',
    icon: 'domain_add',
    path: '#/menu/cadastroapartamento'
  },
  {
    title: 'Consultar Encomendas',
    icon: 'manage_search',
    path: '#/menu/inicial'
  },
  {
    title: 'Sair',
    icon: 'logout',
    path: '#/'
  }

];

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      linksList,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
