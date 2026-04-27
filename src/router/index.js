import { createRouter, createWebHashHistory } from "vue-router"

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/ai/index.vue"),
    },
    {
      path: "/one",
      name: "one",
      component: () => import("../views/one/index.vue"),
    },
  ],
})

export default router
