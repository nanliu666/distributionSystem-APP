<template>
    <div id="updatePwd" class="comBox">
      <g-mainBox bottom="1rem" @keyup.native.enter="login" style="height: 100%;">
        <div class="logoBox">
          <p class="logo">修改账号密码</p>
        </div>
        <p class="welcome"><span style="color:#9ED99D;">{{userName}}</span> 欢迎您，首次登录请先修改默认密码！</p>
        <g-input v-model.trim="updateForm.password" class="gInputClass"
                 :type.sync="inputType"
                 clearable placeholder="请输入旧密码">
          <i class="yiyifont yiyi-password" slot="prefix"></i>
        </g-input>
        <g-input v-model.trim="updateForm.new_password" class="gInputClass"
                 :type.sync="inputType"
                 clearable placeholder="请输入新密码">
          <i class="yiyifont yiyi-password" slot="prefix"></i>
        </g-input>
        <g-input v-model.trim="pwdAgain" class="gInputClass"
                 :type.sync="inputType"
                 clearable placeholder="请再次输入">
          <i class="yiyifont yiyi-password" slot="prefix"></i>
        </g-input>
        <x-button type="primary" :show-loading="btnLoding"
                  :disabled="btnDisabled || loginBtnDisabeld" class="loginBtn"
                  @click.native="updatePwd">提 交
        </x-button>
        <div class="copyRight">Copyright © 2018 广州众玩科技有限公司</div>
      </g-mainBox>
    </div>
</template>

<script>
  import {
    toastTips,
    loadingTips,
    alertTips
  } from "../../js/messageTips.js";
    export default {
        name: '',
        props: {},
        components: {},
        data() {
            return {
              inputType:'password',
              loginBtnDisabeld: false,
              btnLoding: false,
              userName:'',
              updateForm:{
                password:'',
                new_password:'',
              },
              pwdAgain:'',
            }
        },
        computed: {
          btnDisabled() {
            if (this.updateForm.password !== '' && this.updateForm.new_password !== '' && this.pwdAgain !== '') {
              return false;
            } else {
              return true;
            }
          }
        },
        watch: {},
        created() {
          this.userName = localStorage.getItem('loginName');
        },
        mounted() {
        },
        activated() {
        },
        deactivated() {
        },
        methods: {
          updatePwd(){
            if (this.btnDisabled) {
              return
            }
            const passwordReg = /^[A-Za-z0-9]{6,12}$/;
            if(!passwordReg.test(this.updateForm.password)){
              toastTips("warn", "13em", "请输入6~12位旧密码");
              return;
            }
            if(!passwordReg.test(this.updateForm.new_password)){
              toastTips("warn", "13em", "请输入6~12位新密码");
              return;
            }
            if(this.updateForm.new_password !== this.pwdAgain){
              toastTips("warn", "13em", "两次密码输入不一致");
              return;
            }

            this.loginBtnDisabeld = true;
            this.btnLoding = true;

            let _this = this;
            let userData = JSON.parse(localStorage.getItem('userData'));

            let params = {..._this.updateForm};
            this.axios({
              method: "POST",
              url: '/password/modify',
              data:params,
              headers: {
                'Authorization': 'Bearer ' + userData.bearer
              }
            }).then(function(res) {
              debugger;
              if(res.data.errCode === 0){
                toastTips();
                localStorage.removeItem('userData');
                localStorage.removeItem('loginName');
                this.$router.push({name: 'login'});
                return;
              }
            }).catch(err =>{
              if(err.response!= undefined){
                if(err.response.data.errCode === 400){
                  toastTips("warn", "13em", "旧密码输入错误");
                  this.updateForm.password = '';
                  this.updateForm.new_password = '';
                  this.pwdAgain = '';
                  this.loginBtnDisabeld = false;
                  this.btnLoding = false;
                  this.btnDisabled();
                }
              } else {
                this.$router.push({name: 'login'});
              }
            });
          }
        }
    }
</script>

<style rel="stylesheet" lang="scss" scoped>
  @import '../../assets/scss/main.scss';
  html,body{
    height: 100%;
    margin-top: 0;
  }
  #updatePwd{
    padding: 0 0.74rem;
    background:url("./images/bg.jpg") no-repeat center;
    background-size: cover;
    height: 100%;
    .logoBox {
      @extend %flex-center-center;
      height: 4rem;
    }
    .logo{
      font-size: .54rem;
      letter-spacing: .02rem;
      color: white;
    }
    .gInputClass{
      border-bottom: 0.01rem solid white;
      margin-bottom: 0.2rem;
      .yiyi-portrait,.yiyi-password{
        font-size: 0.4rem;
      }
    }
    .welcome{
      text-align: left;
      color: white;
      margin-bottom: .4rem;
      font-size: .28rem;
    }
    .loginBtn {
      margin-top: 1rem;
      padding-left: 0.28rem;
      padding-right: 0.28rem;
      font-size: 0.34rem;
      line-height: 0.8rem;
    }
    .copyRight {
      font-size: 0.28rem;
      text-align: center;
      line-height:3rem;
      color: white;
    }
  }
</style>
<style>
  #app{
    height: 100%!important;
  }
  .gInput__inner{
    background: transparent;
    color: white;
    font-size: .3rem;
  }
  .yiyifont{
    color: white;
  }
  .weui-icon-clear{
    color: white;
  }
  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: white;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: white;
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: white;
  }
  :-moz-placeholder { /* Firefox 18- */
    color: white;
  }
  .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before{
    color: white!important;
  }
</style>
