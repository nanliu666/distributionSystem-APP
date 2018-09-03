// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/*
 *   添加Fastclick移除移动端点击延迟
 * */
const FastClick = require('fastclick');
FastClick.attach(document.body);

/*
引入css reset.css 重置原始样式 ic
*/
import '@/assets/css/reset.css'
import '@/assets/css/common_wx.css'
import '@/assets/yiyifont/iconfont.css'


import '@/assets/vue/axios.js'
import '@/assets/vue/filters.js'
import '@/assets/vue/globalComonents.js'
import '@/assets/vue/prototype.js'

Vue.config.productionTip = false;
Vue.prototype.HOST = '/api';
/*
 *   引入微信
 * */
import {
    WechatPlugin
} from 'vux'
Vue.use(WechatPlugin);
// console.log(Vue.wechat)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
});