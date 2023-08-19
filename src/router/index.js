//createRounter 创建rounter实例对象
//creatWebHistory 创建history模式的路由
import { createRouter, createWebHistory } from "vue-router";
import Evaluate from "@/views/Evaluate/index.vue";
import Manager from "@/views/Manager/index.vue";
import Query from "@/views/Query/index.vue";
import Analysis from "@/views/Analysis/index.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  routes: [
    {
      path: "/Query",
      component: Query,
      children: [
        {
          path: "Query",
          component: Query,
        },
        {
          path: "Analysis",
          component: Analysis,
        },
      ],
    },
    {
      path: "/Analysis",
      component: Analysis,
    },
    {
      path: "/Evaluate",
      component: Evaluate,
    },
    {
      path: "/Manager",
      component: Manager,
    },
  ],
});

export default router;
