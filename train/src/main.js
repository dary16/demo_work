import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import components from "./components";
import store from "./store";
import "element-ui/lib/theme-chalk/index.css";
import "./style/reset.css";
import "./style/global.less";
import ElementUI from "element-ui";
import axios from "axios";
import * as util from "./utils/common.js";
import 'mint-ui/lib/style.css';
import {
    DatetimePicker
} from 'mint-ui';


Vue.config.productionTip = false;
//element-ui
Vue.use(ElementUI);
Vue.prototype.notify = ElementUI.Notification;
Vue.prototype.message = ElementUI.Message;
Vue.prototype.oMsgBox = ElementUI.MessageBox;
Vue.prototype.popBox = ElementUI.Popover;
Vue.prototype.util = util;

Vue.prototype.$http = axios;
// 日期时间选择器
Vue.component(DatetimePicker.name, DatetimePicker);

// 自定义组件格式，全局可用
Object.keys(components).forEach(key => {
    // 首字母大写
    var name = key.replace(/(\w)/, v => v.toUpperCase());

    //使用标签时前缀需要加 g- 以示区别
    Vue.component(`v${name}`, components[key]);
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");