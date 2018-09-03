<!--created by yueq-->
<template>
    <div id="login" class="comBox">
      <g-mainBox bottom="1rem" @keyup.native.enter="login" style="height: 100%;">
        <div class="logoBox">
          <span class="logo">代理分销管理系统</span>
        </div>
        <g-input v-model.trim="loginForm.username" class="gInputClass"
                 clearable placeholder="账号名称">
          <i class="yiyifont yiyi-portrait" slot="prefix"></i>
        </g-input>
        <g-input v-model.trim="loginForm.password" class="gInputClass"
                 :type.sync="inputType" pwd
                 clearable placeholder="密码">
          <i class="yiyifont yiyi-password" slot="prefix"></i>
        </g-input>

        <div style="display: flex;align-items: center;">
          <g-input v-model.trim="picLyanzhengma" class="gInputClass imgCode"
                   clearable placeholder="验证码" >
            <i class="yiyifont yiyi-password" slot="prefix"></i>
          </g-input>
          <input type="button" id="code" @click="createCode" v-model="checkCode" class="yanzhengma_inp">
        </div>

        <div class="checkIcon">
          <check-icon :value.sync="selected" type="plain">
            <label class="agree" style="color: white;">我已阅读并同意</label></check-icon>
            <a class="agree" style="text-decoration: none;line-height: .86rem;" href="javascript:;" @click="show_agm">《合作协议》</a>

        </div>
        <x-button type="primary" :show-loading="btnLoding"
                  :disabled="btnDisabled || loginBtnDisabeld" class="loginBtn"
                  @click.native="login">登 录
        </x-button>

        <div @click="weChatLogin" style="width: 20%;margin: 1.2rem auto 0 auto;">
          <img src="./images/wx_icon.svg">
          <p class="weChat">微信登录</p>
        </div>
        <div class="copyRight">Copyright © 2018 广州众玩科技有限公司</div>
      </g-mainBox>

      <x-dialog v-model="showHideOnBlur" :dialog-style="{'max-width': '980px', width: '90%','background-color': 'white','margin-top':'10%'}">
        <div class="show_agm">
          <div class="amg_box">
            <h3>推广员/代理须知</h3>
            <p>我们公司是一家从事网络游戏设计、开发、制作的专业网络公司，具备丰富的网络运营经验及雄厚的互联网技术支持，现独立开发运行的游戏，以其精良的游戏制作、趣味性及互动性，已在当地市场取得建立了良好的市场基础及群众口碑。为开拓市场及扩大产品影响力，公司决定在本协议指定区域内进行市场推广选择了部分代理，为保障公司的平稳运行、促进双方的良好合作、保证项目的合法推广、避免法律纠纷及其他法律风险，特将该《协议》下发给代理，各代理务必认真学习及遵循《协议》精神，做到规范经营、依法行事，不得自误。内容如下：</p>
            <p>1、本公司所运营的游戏是一款旨在增进玩家感情、丰富市民业余生活的网络游戏，该游戏倡导的理念是"快乐游戏、健康生活"，这了游戏理念与公司的经营理念是完全一致的，即我公司及我公司推出的一切网络文化产品均是绿色、健康、合法的！因此，代理必须秉承这一经营宗旨，把握正确方向。注意维护企业及游戏品牌形象。</p>
            <p>2、我们游戏作为一款对抗性及竞技性游戏，必将秉承"游戏中是对手，生活中是朋友"这一游戏精神，代理应在游戏中宣传及引导这一理念，避免玩家中出现谩骂、侮辱甚至是斗殴等恶性事件，从而使社会公众及主流舆论对本公司产生误解。</p>
            <p>3、我公司运营的游戏，玩家进行游戏时评判输赢的只有当局积分，代理不得设置虚拟货币、回购或默许第三方回购及其他一切可能将游戏中的输赢和现实货币、财物进行兑换的行为。</p>
            <p>4、我公司的代理，并非公司员工，代理不得利用公司名义进行任何超出权限的商业活动或进行给公司带来负面影响的其他社会活动!</p>
            <p>5、代理在进行网络推广活动时，必须依照有关法律规定及公司政策行事，不得利用、引导或许可他人利用我们游戏从事赌博及其他为违法犯罪活动，否则一经发现，立即解除合作关系，并视情节轻重上报有关机关处理，决不姑息!</p>
            <p>6、代理有权雇佣或通过其他合作关系组建营销团队，营销团队成员并非公司员工，其与玩家的法律关系由双方自行商议决定，公司不予干涉，但代理必须保证团队其他成员必须严格按照法律规定、协议约定及本《协议》内容开展业务活动，否则因此产生的一切后果由代理承担。</p>
            <p>7、代理及其营销团队成员必须正面引导玩家健康游戏，对于发现有玩家或其他平台或机构利用我们从事赌博及其他为违法犯罪活动的，必须立即阻止，并向公司上报，情节严重的，公司有权向有关单位报案，代理有义务向公司提供有关证明材料，以便有关单位依法处理。</p>
            <p>8、我们游戏官方认可的唯一游戏道具为"钻石"，该道具仅用于玩家进入房间游戏之用，不得用于其他用途，推代理也不得向玩家收取其他游戏费用，发现玩家利用道具开展赌博或其他违法犯罪活动的，推广员/代理应拒绝发放钻石或向公司报告终止游戏。</p>
            <p>9、代理及玩家利用本游戏从事的任何违法犯罪活动与本公司无关，因此引发的一切法律后果，由其自行承担，因此给公司造成损失的，公司保留诉讼权利。望周知遵循！！！</p>
          </div>
          <div class="amg_btn">
            <x-button type="primary" mini action-type="button" @click.native="hide_agm">已阅读</x-button>
          </div>
        </div>
      </x-dialog>
    </div>
</template>

<script>
import { toastTips, loadingTips, alertTips } from "../../js/messageTips.js";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      inputType: "password",
      loginBtnDisabeld: false,
      btnLoding: false,
      showHideOnBlur: false,
      selected: true,
      codeNum: "",
      checkCode: "",
      picLyanzhengma: "",
      loginForm: {
        username: "",
        password: "",
        type: "username",
        code: ""
      }
    };
  },
  computed: {
    btnDisabled() {
      if (
        this.loginForm.loginName !== "" &&
        this.loginForm.password !== "" &&
        this.picLyanzhengma !== "" &&
        this.selected === true
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {},
  created() {
    this.createCode();
  },
  mounted() {},
  activated() {},
  deactivated() {},
  methods: {
    createCode() {
      let code = "";
      let codeLength = 4; //验证码的长度
      let random = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      );
      for (let i = 0; i < codeLength; i++) {
        let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
        code += random[index]; //根据索引取得随机数加到code上
      }
      this.checkCode = code; //把code值赋给验证码
    },
    //  登录
    login() {
      if (this.btnDisabled) {
        return;
      }
      // 匹配密码
      const passwordReg = /^[A-Za-z0-9]{6,12}$/;
      if (!passwordReg.test(this.loginForm.password)) {
        toastTips("warn", "13em", "请输入6~12位密码");
        return;
      }
      //  匹配验证码
      if (this.picLyanzhengma !== "") {
        this.picLyanzhengma.toUpperCase();
        if (this.picLyanzhengma.toUpperCase() !== this.checkCode) {
          toastTips("warn", "13em", "验证码输入有误");
          this.createCode(); //刷新验证码
          this.picLyanzhengma = "";
          return;
        }
      }
      this.loginBtnDisabeld = true;
      this.btnLoding = true;
      let tempObj = this._.omit(this.loginForm, "code");
      let params = { ...tempObj };
      this.axios
        .post("/account/login", params)
        .then(res => {
          let body = res.data.data;
          localStorage.setItem("userData", JSON.stringify(body));
          localStorage.setItem("loginName", this.loginForm.username);
          if (body.status === 1) {
            this.$router.push({ name: "updatePwd" });
            return;
          }
          if (body.status === 10) {
            this.$router.push({ name: "global", query: { name: "概览" } });
            return;
          }
        })
        .catch(err => {
          if (
            err.response.data.errCode === 10102 ||
            err.response.data.errCode === 422
          ) {
            alertTips("用户名或密码不正确，请重新输入");
            this.createCode();
            this.loginForm.username = "";
            this.loginForm.password = "";
            this.picLyanzhengma = "";
            this.loginBtnDisabeld = false;
            this.btnLoding = false;
            this.btnDisabled();
          }
        });
    },
    show_agm() {
      this.showHideOnBlur = true;
    },
    hide_agm() {
      this.showHideOnBlur = false;
    },
    weChatLogin() {
      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        window.location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8513a40d3d6a961e&redirect_uri=https%3a%2f%2fm.cs.qp.gzzhongw.net%2floading&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect";
      } else {
        window.location.href =
          "https://open.weixin.qq.com/connect/qrconnect?appid=wx691c6a6d3c48a13b&redirect_uri=https%3a%2f%2fm.cs.qp.gzzhongw.net%2floading&response_type=code&scope=snsapi_login&state=2#wechat_redirect";
      }
    }
  }
};
</script>

<style rel="stylesheet" lang="scss" scoped>
@import "../../assets/scss/main.scss";
html,
body {
  height: 100%;
  margin-top: 0;
}
#login {
  padding: 0 0.74rem;
  background: url("./images/bg.jpg") no-repeat center;
  background-size: cover;
  height: 100%;
  .logoBox {
    @extend %flex-center-center;
    height: 3.3rem;
  }
  .loginBtn {
    margin-top: 1rem;
    padding-left: 0.28rem;
    padding-right: 0.28rem;
    font-size: 0.34rem;
    line-height: 0.8rem;
  }
  .logo {
    font-size: 0.54rem;
    letter-spacing: 0.02rem;
    color: white;
  }
  .xSwitch {
    padding: 0.2rem 0;
    &:before {
      display: none;
    }
    .weui-label {
      font-size: 0.3rem;
    }
  }
  .yiyi-open {
    color: $theme;
  }
  .copyRight {
    font-size: 0.28rem;
    text-align: center;
    line-height: 1rem;
    color: white;
  }
  .gInputClass {
    border-bottom: 0.01rem solid white;
    margin-bottom: 0.2rem;
    .yiyi-portrait,
    .yiyi-password {
      font-size: 0.4rem;
    }
  }
  .vux-no-group-title {
    margin: 0;
    &:before {
      display: none;
    }
    &:after {
      display: none;
    }
  }
  .vux-check-icon {
    display: flex;
    justify-content: flex-start;
    margin: 0.2rem 0 0.3rem 0;
  }
  .imgCode {
    width: 60%;
  }
  .imgCode .gInput__inner {
    width: 60% !important;
  }
  #code {
    width: 36%;
    height: 0.82rem;
    margin-left: 4%;
    font-size: 0.46rem;
    letter-spacing: 0.09rem;
    text-align: center;
    padding-left: 0.09rem;
    background-color: #f2f2f5;
    font-style: italic;
    color: #0bb20c;
    border-radius: 0.08rem;
  }
  .weChat {
    margin-top: 0.09rem;
    font-size: 0.2rem;
    color: white;
    letter-spacing: 0.017rem;
    text-decoration: none;
  }
  .agree {
    font-size: 0.26rem;
  }
  .checkIcon {
    display: flex;
  }
  /*  弹出协议*/
  .show_agm {
    position: relative;
    box-sizing: border-box;
    padding: 15px 15px 50px 15px;
    height: 11.8rem;
    background-color: #fff;
    z-index: 2;
    .amg_box {
      width: 100%;
      height: 100%;
      overflow: auto;
      line-height: 20px;
      h3 {
        text-align: center;
      }
      p {
        font-size: 14px;
        text-align: left;
        padding: 2px;
        line-height: 1.6;
      }
    }
    .amg_btn {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
<style>
#app {
  height: 100% !important;
}
[class^="weui-icon-"]:before,
[class*=" weui-icon-"]:before {
  margin-left: 0 !important;
}
.weui-icon-success-circle,
.weui-icon-circle {
  font-size: 0.36rem;
  color: white !important;
  margin-top: 2px;
}
.gInput__inner {
  background: transparent;
  color: white;
  font-size: 0.3rem;
}
.yiyifont {
  color: white;
}
.weui-icon-clear {
  color: white;
}
::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: white;
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: white;
}
:-ms-input-placeholder {
  /* IE 10+ */
  color: white;
}
:-moz-placeholder {
  /* Firefox 18- */
  color: white;
}
.vux-check-icon > .weui-icon-success:before,
.vux-check-icon > .weui-icon-success-circle:before {
  color: white !important;
}
</style>
