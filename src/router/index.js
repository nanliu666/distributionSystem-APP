import Vue from 'vue'
import Router from 'vue-router'
import components from './components' //引入组件路由懒加载配置文件

Vue.use(Router); // 使用路由插件
//定义路由
const router = new Router({
    mode: 'history',
    routes: [{ //路由嵌套
            path: '/',
            name: 'login',
            meta: {
                requireAuth: false,
                title: '登录'
            },
            component: components.login
        },
        {
            path: '/homePage',
            name: 'homePage',
            meta: {
                requireAuth: true,
                title: '首页'
            },
            component: components.homePage,
            children: [{
                    path: "global",
                    name: "global",
                    meta: {
                        requireAuth: true,
                        title: "概览"
                    },
                    component: components.global
                },
                {
                    path: "userList",
                    name: "userList",
                    meta: {
                        requireAuth: true,
                        title: "用户列表"
                    },
                    component: components.userList
                },
                {
                    path: "userStatistics",
                    name: "userStatistics",
                    meta: {
                        requireAuth: true,
                        title: "用户统计"
                    },
                    component: components.userStatistics
                },
                {
                    path: "lowerAgent",
                    name: "lowerAgent",
                    meta: {
                        requireAuth: true,
                        title: "下级代理"
                    },
                    component: components.lowerAgent
                },
            ]
        },
        {
            path: '/updatePwd',
            name: 'updatePwd',
            meta: {
                requireAuth: true,
                title: '修改密码'
            },
            component: components.updatePwd
        },
    ]
});
export default router