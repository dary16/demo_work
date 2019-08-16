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
            redirect: "/notTrain",
        },
        {
            path: "/layout",
            name: "layout",
            component: () =>
                import ("./views/layout.vue"),
            children: [{
                    path: "/train",
                    name: "train",
                    component: () =>
                        import ("./views/train.vue")
                },
                {
                    name: "trainInfoList",
                    path: "/trainInfoList",
                    component: () =>
                        import ("./views/trainInfoList.vue")
                },
                {
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
                    path: "/test",
                    name: "test",
                    component: () =>
                        import ("./views/test.vue")
                }, {
                    path: "/notTrain",
                    name: "notTrain",
                    component: () =>
                        import ("./views/notTrain.vue")
                }, {
                    path: "/info",
                    name: "info",
                    component: () =>
                        import ("./views/common/info.vue")
                }, {
                    path: '/trainInfo',
                    name: "trainInfo",
                    component: () =>
                        import ("./views/common/trainInfo.vue")
                },
                {
                    path: '/trainInfoNot',
                    name: "trainInfoNot",
                    component: () =>
                        import ("./views/common/trainInfoNot.vue")
                },
                {
                    path: '/suggestion',
                    name: "suggestion",
                    component: () =>
                        import ("./views/common/suggestion.vue")
                },
                {
                    path: '/record',
                    name: "record",
                    component: () =>
                        import ("./views/common/record.vue")
                },
                {
                    path: '/errorRecord/:index',
                    name: "errorRecord",
                    component: () =>
                        import ("./views/common/errorRecord.vue")
                },
                {
                    path: '/addSuggestion',
                    name: "addSuggestion",
                    component: () =>
                        import ("./views/common/addSuggestion.vue")
                }
            ]
        }
    ]
});