/*
 * @Author: NaNSix 
 * @Date: 2018-09-30 16:54:23 
 * @Last Modified by: NaNSix
 * @Last Modified time: 2018-09-30 17:56:52
 */

import Vue from 'vue'
import App from './App'
import router from './router'
import _ from "loadsh"
import {
  WechatPlugin
} from 'vux'

/*
引入css reset.css 重置原始样式 ic
*/
import '@/assets/css/reset.css'
import '@/assets/css/common_wx.css'


import '@/assets/vue/axios.js'
import '@/assets/vue/filters.js'
import '@/assets/vue/globalComonents.js'
import '@/assets/vue/prototype.js'

/*
 *   添加Fastclick移除移动端点击延迟
 * */
const FastClick = require('fastclick');
FastClick.attach(document.body);

Vue.config.productionTip = false;
Vue.prototype.HOST = '/api';
/*
 *   引入微信
 * */

Vue.use(WechatPlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});
