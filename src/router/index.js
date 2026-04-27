import { createRouter, createWebHashHistory } from "vue-router"

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: () => import("../views/ai/index.vue"),
    // },
    {
      path: "/",
      name: "one",
      component: () => import("../views/one/index.vue"),
    },
    {
      path: "/ai",
      name: "one1",
      component: () => import("../views/ai/index.vue"),
    },
    {
      path: "/two",
      name: "two",
      component: () => import("../views/two/index.vue"),
    },
  ],
})

export default router
