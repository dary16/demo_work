import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import getters from "./getters";
import mutations from "./mutation";

Vue.use(Vuex);

// 状态机入口文件
const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    state,
    getters,
    mutations
});

export default store;