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
                        import ("./views/weekPlan2.vue")
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
                },
                {
                    path: '/trainInfo',
                    name: "trainInfo",
                    component: () =>
                        import ("./views/common/trainInfo.vue")
                },
                {
                    path: '/suggestion',
                    name: "suggestion",
                    component: () =>
                        import ("./views/common/suggestion.vue")
                },
                {
                    path: '/suggestionEdit',
                    name: "suggestionEdit",
                    component: () =>
                        import ("./views/common/suggestionEdit.vue")
                },
                {
                    path: '/suggestionView',
                    name: "suggestionView",
                    component: () =>
                        import ("./views/common/suggestionView.vue")
                },
                {
                    path: '/record',
                    name: "record",
                    component: () =>
                        import ("./views/common/record.vue")
                },
                {
                    path: '/recordView',
                    name: "recordView",
                    component: () =>
                        import ("./views/common/recordView.vue")
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
        },
        {
            name: '404',
            path: '/404',
            component: () =>
                import ('./views/notFound')
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});