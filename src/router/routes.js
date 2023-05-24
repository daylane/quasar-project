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
        component: () => import("pages/Main.vue"),
      },
      {
        path: "cadastroencomenda",
        component: () => import("pages/cadastroEncomendas.vue"),
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
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: ErrorNotFound,
  },
];

export default routes;
