<template>
    <div id="global">
      <div>
        <p class="title">账户余额</p>
        <grid class="income">
          <grid-item>
            <p class="number" slot="label">￥
              <countup :end-val="balance" :duration="1" :decimals="2"></countup>
            </p>
          </grid-item>
        </grid>
        <p class="title">数据中心</p>
        <grid :cols="2">
          <grid-item class="numCenter">
            <p slot="label">昨日收益</p>
            <p slot="label" class="data-center-num" style="color:#1dc767;;">{{yesterdayEarn}}</p>
          </grid-item>
          <grid-item class="numCenter" >
            <p slot="label" >已提现(截止昨日)</p>
            <p slot="label" class="data-center-num" style="color:#09a2de;">{{exchange_sum}}</p>
          </grid-item>
          <!--<grid-item class="numCenter">-->
            <!--<p slot="label">昨日新增用户</p>-->
            <!--<p slot="label" class="data-center-num" style="color:#ff9343;">0</p>-->
          <!--</grid-item>-->
          <!--<grid-item class="numCenter">-->
            <!--<p slot="label">昨日活跃用户</p>-->
            <!--<p slot="label" class="data-center-num" style="color:#ff0000;">0</p>-->
          <!--</grid-item>-->
        </grid>
      </div>
  <!-- 快捷入口 -->
  <div class="home-nav">
    <p class="title">快捷入口</p>
    <grid :cols="2">
      <grid-item link="">
        <span class="enterBtn" slot="label">
          <img src="./images/tixian.svg"/><br>
          <span>提现</span>
        </span>
      </grid-item>
      <grid-item link="">
        <span class="enterBtn" slot="label">
          <img src="./images/tongji.svg"/><br>
          <span>用户统计</span>
        </span>
      </grid-item>
    </grid>
    <grid :cols="2" style="margin-top: -1px;">
      <grid-item link="">
        <span class="enterBtn" slot="label">
          <img src="./images/daili.svg"/><br>
          <span>下级代理</span>
        </span>
      </grid-item>
      <grid-item link="">
        <span class="enterBtn" slot="label">
          <img src="./images/code.svg"/><br>
          <span>邀请二维码</span>
        </span>
      </grid-item>
    </grid>
  </div>
    </div>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      balance: 0, //账户余额
      yesterdayEarn: "", //昨日收益
      exchange_sum: "" //已提现
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getInfo();
  },
  mounted() {},
  activated() {},
  deactivated() {},
  methods: {
    getInfo() {
      let _this = this;
      let userData = JSON.parse(localStorage.getItem("userData"));
      this.axios({
        method: "POST",
        url: "/statistics/overview",
        headers: {
          Authorization: "Bearer " + userData.bearer
        }
      }).then(function(res) {
        _this.balance = res.data.data.balance;
        _this.yesterdayEarn =
          Number(res.data.data.yesterday_bonus) +
          Number(res.data.data.yesterday_rebate);
        _this.exchange_sum = res.data.data.exchange_sum;
      });
    }
  }
};
</script>

<style rel="stylesheet" lang="scss" scoped>
@import "../../assets/scss/main.scss";

#global {
  padding-top: 46px;
  .title {
    height: 0.8rem;
    background-color: #f5f5f5;
    line-height: 0.8rem;
    text-align: left;
    padding-left: 5.5%;
    font-size: 0.28rem;
    letter-spacing: 0.02rem;
  }
  .number {
    font-size: 36px;
    font-family: Source Sans Pro, Helvetica, Arial, sans-serif;
    font-weight: 600;
    color: #3b7755;
  }
  a {
    text-decoration: none;
  }
  .income {
    .weui-grid {
      padding: 34px 10px;
    }
  }
  .numCenter p {
    line-height: 26px;
  }
  .data-center-num {
    font-size: 24px;
    margin-top: 2px;
    font-weight: 600;
  }
  .home-nav {
    img {
      width: 0.5rem;
      margin-bottom: 0.1rem;
    }
  }
  .enterBtn {
    display: block;
  }
}
</style>
