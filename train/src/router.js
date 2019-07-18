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
            path: '/info',
            component: () =>
                import ("./views/hasNoTrain/info.vue")
        },
        {
            path: '/suggestion',
            component: () =>
                import ("./views/hasNoTrain/suggestion.vue")
        },
        {
            path: '/errorRecord',
            component: () =>
                import ("./views/hasNoTrain/errorRecord.vue")
        },
        {
            path: '/record',
            component: () =>
                import ("./views/hasNoTrain/dataRecord.vue")
        },
        {
            path: '/addSuggestion',
            component: () =>
                import ("./views/hasNoTrain/addSuggestion.vue")
        }
    ]
});