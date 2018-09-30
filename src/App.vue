<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import header from './components/homePage/homePage.vue'
import { toastTips, loadingTips, alertTips } from './js/messageTips'
export default {
  name: 'App',
  data() {
    return {
      interceptSW: true
    }
  },
  components: {
    headerNav: header
  },
  created() {
    // 初始判断是否登录 这时路由拦截还没有生效
    if (
      !localStorage.hasOwnProperty('loginName') &&
      location.pathname !== '/login'
    ) {
      this.$router.push({ name: 'login' })
    }
    // 路由拦截 判断是否退出登录
    this.$router.beforeEach((to, from, next) => {
      // 缓存返回登录的路径 方便登录完 返回
      if (to.name === 'login') {
        localStorage.setItem('fromPath', from.fullPath)
      }
      // 通过mete 中设定的requireAuth 来判断是否需要验证登录
      if (to.meta.requireAuth) {
        if (localStorage.hasOwnProperty('loginName')) {
          next()
        } else {
          next('/')
        }
      } else {
        next()
      }
    })
    //axios请求拦截器
    this.axios.interceptors.request.use(
      config => {
        //在请求发出之前进行一些操作
        if (config.method === 'post') {
          if (config.headers['Content-Type'] === 'multipart/form-data') {
            return config
          } else {
            config.data = this.qs.stringify(config.data)
          }
        }
        return config
      },
      err => {
        return Promise.reject(error)
      }
    )
    //    // axios回调拦截器
    //    this.axios.interceptors.response.use((res) => {
    //      let timenow = parseInt(new Date().getTime() / 1000); //获取当前时间
    //      let userData = JSON.parse(localStorage.getItem('userData'));
    //      let expire = userData.expire;
    //      let timeexpire = expire - timenow;
    //      if(timeexpire<=0){
    //        if (this.interceptSW) {
    //            this.interceptSW = false;
    //            toastTips("warn", "13em", "登录过期，请重新登陆");
    //            setTimeout(() => {
    //              this.reLogin();
    //              this.interceptSW = true;
    //            }, 500);
    //          }
    //      }
    //    })
  }
}
</script>

<style lang='less'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
