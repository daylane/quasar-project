import ErrorNotFound from "pages/ErrorNotFound.vue";
import MainLayout from "layouts/MainLayout.vue";
import IndexPage from "../pages/IndexPage.vue";

const routes = [
  {
    path: "/menu",
    component: MainLayout,
    children: {
      path: "menu",
      component: IndexPage,
    },
  },
  {
    path: "/main",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/telaescolha",
        name: "encomendas",
        component: () => import("pages/TelaEscolha.vue"),
      },
    ],
  },
  {
    path: "/cadastrousuario",
    name: "Cadastro de Usuario",
    component: () => import("pages/cadastroUsuario.vue"),
  },
  {
    path: "/",
    name: "Login Usuario",
    component: () => import("pages/LoginPageMorador.vue"),
  },
  {
    path: "/encomendas",
    name: "encomendas",
    component: () => import("pages/encomendasRecebidas.vue"),
  },
  {
    path: "/cadastroencomendas",
    name: "Cadastro de encomendas",
    component: () => import("pages/cadastroEncomendas.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: ErrorNotFound,
  },
];

export default routes;
