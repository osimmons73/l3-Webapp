import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import store from "./store/index";
import VueRouter from "vue-router";
import UserService from "./AuthService";

Vue.config.productionTip = false;
Vue.use(VueRouter);

import HomeComponent from "./components/HomeComponent.vue";
import StationComponent from "./components/StationComponent.vue";
import LockerComponent from "./components/LockerComponent.vue";
import PaymentComponent from "./components/PaymentComponent.vue";
import InUseComponent from "./components/InUseComponent";
import Home from "./components/Home.vue";
import School from "./components/admin/SchoolComponent";
import Station from "./components/admin/StationComponent";
import Locker from "./components/admin/LockComponent";
const routes = [
  { path: "/active", component: InUseComponent },
  { path: "/payment", component: PaymentComponent },
  { path: "/locker", component: LockerComponent },
  {
    path: "/station",
    component: StationComponent,
    meta: { requiresAuth: true }
  },
  { path: "/test", component: Station },
  { path: "/admin/school", name: "adminSchool", component: School },
  { path: "/admin/stations/:id", name: "adminStation", component: Station },
  { path: "/admin/lockers/:id", name: "adminLocker", component: Locker },
  { path: "/", component: HomeComponent }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    //auth.loggedIn()
    const isLoggedIn = await UserService.getUser();
    if (!isLoggedIn) {
      next({
        path: "/",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

new Vue({
  render: h => h(App),
  store,
  router
}).$mount("#app");
