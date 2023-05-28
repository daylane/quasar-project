/* eslint-disable quotes */
import ErrorNotFound from "pages/ErrorNotFound.vue";
import MainLayout from "layouts/MainLayout.vue";
import Login from "pages/LoginPageMorador.vue";

const routes = [
  {
    path: "/menu",
    component: MainLayout,
    children: [
      {
        path: "inicial",
        component: () => import("pages/BuscarPage.vue"),
      },
      {
        path: "cadastroencomenda",
        component: () => import("pages/cadastroEncomendas.vue"),
      },
      {
        path: "cadastroapartamento",
        component: () => import("pages/cadastroApartamento.vue"),
      },
      {
        path: "admUsuarioSindico",
        component: () => import("pages/AdmUsuario.vue"),
      },
      {
        path: "admUsuario",
        component: () => import("pages/cadastroUsuario.vue"),
      },
    ],
  },
  {
    path: "/encomendas",
    name: "Encomendas",
    component: () => import("pages/TelaEscolha.vue"),
  },
  {
    path: "/cadastrousuario",
    name: "Cadastro de Usuario",
    component: () => import("pages/cadastroUsuario.vue"),
  },
  {
    path: "/",
    name: "Login Usuario",
    component: Login,
  },
  {
    path: "/loginadm",
    name: "Login Adm",
    component: () => import("pages/LoginPageAdm.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: ErrorNotFound,
  },
];

export default routes;
