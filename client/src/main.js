import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import store from "./store/index";
import VueRouter from "vue-router";
import UserService from "./AuthService";

Vue.config.productionTip = false;
Vue.use(VueRouter);

import HomeComponent from "./components/HomeComponent.vue";
import StationComponent from "./components/SelectLocker/StationComponent.vue";
import LockerComponent from "./components/SelectLocker/LockerComponent.vue";
import PaymentComponent from "./components/SelectLocker/PaymentComponent.vue";
import InUseComponent from "./components/SelectLocker/InUseComponent";
import SchoolComponent from "./components/SelectLocker/SchoolComponent";
import Home from "./components/Home.vue";
import AdminSchool from "./components/admin/SchoolComponent";
import AdminStation from "./components/admin/StationComponent";
import AdminLocker from "./components/admin/LockComponent";
import Test from "./components/SelectLocker/Test.vue";
const routes = [
  { path: "/active", name: "inUse", component: InUseComponent },
  { path: "/payment", component: PaymentComponent },
  {
    path: "/locker/:stationId/:schoolId",
    name: "selectLocker",
    component: LockerComponent
  },
  { path: "/school", name: "selectSchool", component: SchoolComponent },
  {
    path: "/stations/:id",
    name: "selectStation",
    component: StationComponent,
    meta: { requiresAuth: true }
  },
  { path: "/test/case", component: Test },
  { path: "/admin/school", name: "adminSchool", component: AdminSchool },
  {
    path: "/admin/stations/:id",
    name: "adminStation",
    component: AdminStation
  },
  { path: "/admin/lockers/:id", name: "adminLocker", component: AdminLocker },
  { path: "/", name: "home", component: HomeComponent }
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
