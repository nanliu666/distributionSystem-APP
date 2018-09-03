import Vue from 'vue'
import Router from 'vue-router'
import components from './components'

Vue.use(Router);
const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'login',
            meta: { requireAuth: false, title: '登录' },
            component: components.login
        },
        {
            path: '/homePage',
            name: 'homePage',
            meta: { requireAuth: true, title: '首页' },
            component: components.homePage,
            children: [{
                    path: "global",
                    name: "global",
                    meta: { requireAuth: true, title: "概览" },
                    component: components.global
                },
                {
                    path: "userList",
                    name: "userList",
                    meta: { requireAuth: true, title: "用户列表" },
                    component: components.userList
                },
                {
                    path: "lowerAgent",
                    name: "lowerAgent",
                    meta: { requireAuth: true, title: "下级代理" },
                    component: components.lowerAgent
                },
            ]
        },
        {
            path: '/updatePwd',
            name: 'updatePwd',
            meta: { requireAuth: true, title: '修改密码' },
            component: components.updatePwd
        },
    ]
});
export default router