import { createRouter,createWebHashHistory,createWebHistory } from "vue-router";
import dashboard from "../views/dashboard.vue";
import person_kb from "../views/person_kb.vue";
import team_analysis from "../views/team_analysis.vue";
import profile_list from "../views/profile_list.vue";
import talent from "../views/talent.vue";
import department_communication from "../views/department_communication.vue";
import training from "../views/training.vue";
import userInfo from "../views/userInfo.vue";
import LoginPage from '../views/LoginPage.vue';
import changePassword from '../views/changePassword.vue';
import changePhone from '../views/changePhone.vue';
import TrainingDetails from '../views/TrainingDetails.vue';
import PersonDetail from '../views/PersonDetail.vue';
import ForgotPassword from '../views/ForgotPassword.vue'; 
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path:"/",
      redirect:"/login"
    },
    {
      path: "/home",
      name: "dashboard",
      component: dashboard,
    },
    {
      path:"/person_kb",
      name:"person_kb",
      component: person_kb, 
    },
    {
      path:"/team_analysis",
      name:"team_analysis",
      component: team_analysis,
    },
    {
      path:"/profile_list",
      name:"profile_list",
      component: profile_list,
    },
    {
      path:"/talent",
      name:"talent",
      component: talent,
    },
    {
      path:"/login/department_communication",
      name:"department_communication",
      component: department_communication,
        props: (route) => ({ 
        id: route.params.id,
      })
    },
    {
      path:"/training",
      name:"training",
      component: training,
    },
    {
      path:"/userInfo",
      name:"userInfo",
      component: userInfo,
      meta: { hideLayout: true }
    },
    {
      path:'/login',
      name:'Login',
      component: LoginPage,
      meta: {hideLayout: true}
    },
    {
      path:'/userInfo/changePassword',
      name:'changePassword',
      component: changePassword,
      meta: {hideLayout: true}
    },
    {
      path:'/userInfo/changePhone',
      name:'changePhone',
      component: changePhone,
      meta: {hideLayout: true}
    },
    {
      path:'/training/details',
      name:'TrainingDetails',
      component: TrainingDetails,
      meta: {hideLayout: true}
    },
    {
      path:'/detail/:id',
      name:'PersonDetail',
      component: PersonDetail,
      meta: {hideLayout: true},
      props: (route) => ({ 
        id: route.params.id,
        baseInfo: route.params.baseInfo 
      })
    },
    {
      path:'/forgot-password',
      name:'ForgotPassword',
      component: ForgotPassword,
      meta: {hideLayout: true}
    }
]
});

export default router

