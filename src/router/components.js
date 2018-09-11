/**
 * @author:yueq
 * @date 2018/8/23
 * 路由懒加载
 */
const login = resolve => require(['@/components/login/login'], resolve);
const homePage = resolve => require(['@/components/homePage/homePage'], resolve);
const updatePwd = resolve => require(['@/components/updatePwd/updatePwd'], resolve);
const global = resolve => require(['@/components/global/global'], resolve);
const lowerAgent = resolve => require(['@/components/lowerAgent/lowerAgent'], resolve);
const userList = resolve => require(['@/components/userList/userList'], resolve);
const userStatistics = resolve => require(['@/components/userStatistics/userStatistics'], resolve);

export default {
    login,
    homePage,
    updatePwd,
    global,
    userList,
    lowerAgent,
    userStatistics
}