import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/game/:gameCode",
    name: "Game",
    component: () => import("../views/Game.vue"),
  },
  // {
  // path: '/about',
  // name: 'About',
  // component: () => import ('../views/About.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
