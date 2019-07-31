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
            name: "login",
            component: () =>
                import ("./views/login.vue")
        },
        {
            path: "/layout",
            name: "layout",
            redirect: "/notAction",
            component: () =>
                import ("./views/layout.vue"),
            children: [{
                path: "/action",
                name: "action",
                component: () =>
                    import ("./views/action.vue")
            }, {
                path: "/weekPlan",
                name: "weekPlan",
                component: () =>
                    import ("./views/weekPlan.vue")
            }, {
                path: "/exit",
                name: "exit",
                component: () =>
                    import ("./views/exit.vue")
            }, {
                path: "/notAction",
                name: "notAction",
                component: () =>
                    import ("./views/notAction.vue")
            }, {
                path: "/info",
                name: "info",
                component: () =>
                    import ("./views/hasNoTrain/info.vue")
            }]
        },
        // {
        //     path: '/info',
        //     name: "info",
        //     component: () =>
        //         import ("./views/hasNoTrain/info.vue")
        // },
        {
            path: '/trainInfo',
            name: "trainInfo",
            component: () =>
                import ("./components/trainInfo.vue")
        },
        {
            path: '/suggestion',
            name: "suggestion",
            component: () =>
                import ("./views/hasNoTrain/suggestion.vue")
        },
        {
            path: '/errorRecord/:index',
            name: "errorRecord",
            component: () =>
                import ("./views/hasNoTrain/errorRecord.vue")
        },
        {
            path: '/record',
            name: "record",
            component: () =>
                import ("./views/hasNoTrain/dataRecord.vue")
        },
        {
            path: '/addSuggestion',
            name: "addSuggestion",
            component: () =>
                import ("./views/hasNoTrain/addSuggestion.vue")
        }
    ]
});