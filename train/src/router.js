import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [{
            path: "/",
            redirect: "/login"
        },
        {
            path: "/login",
            component: () =>
                import ("./views/login.vue")
        },
        {
            path: "/layout",
            component: () =>
                import ("./views/layout.vue")
        },
        {
            path: '/action',
            component: () =>
                import ("./views/hasNoTrain/info.vue")
        }
    ]
});