<template>
    <div id="homePage">
      <x-header style="background-color:#3B7755;position: fixed;width: 100%;">
        <span>{{this.$route.query.name}}</span>
        <x-icon slot="overwrite-left" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;" @click.native="showMaskClick"></x-icon>
      </x-header>
      <div>
        <popup v-model="showList" position="left">
          <div style="width:300px;">
            <ul class="clearfix">
              <li @click='goHome'>概览</li>
            </ul>
            <p class="listTitle">我的用户</p>
            <ul class="clearfix">
              <li @click='goUserList'>用户列表</li>
              <li @click='goUserStatistics'>用户统计</li>
            </ul>
            <p class="listTitle">我的代理</p>
            <ul class="clearfix">
              <li @click='goHigherAgent'>上级代理</li>
              <li @click='goLowerAgent'>下级代理</li>
              <li @click='goAgentCount'>代理统计</li>
            </ul>
            <p class="listTitle">我的收益</p>
            <ul class="clearfix">
              <li @click='goIncomeCount'>收益汇总</li>
              <li @click='goIncomeDetail'>收益明细</li>
              <li @click='goCashOutlay'>提现</li>
              <li @click='goCashDetail'>提现明细</li>
            </ul>
            <p class="listTitle">更多</p>
            <ul class="clearfix">
              <li @click='goMyInfo'>我的信息</li>
            </ul>

            <div  class="login_out"  @click="loginOut">
              <x-button type="warn" mini action-type="button">退出登录</x-button>
            </div>
          </div>
        </popup>
      </div>
      <!-- 主体内容 -->
      <div id="mainBox">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
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
      showList: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  activated() {},
  deactivated() {},
  methods: {
    showMaskClick() {
      this.showList = !this.showList;
    },

    //  跳转
    goHome() {
      this.showList = false;
      this.$router.push({ name: "global", query: { name: "概览" } });
    },
    goUserList() {
      this.showList = false;
      this.$router.push({ name: "userList", query: { name: "用户列表" } });
    },
    goUserStatistics() {
      this.showList = false;
      this.$router.push({ name: "userStatistics", query: { name: "用户统计" } });
    },
    goHigherAgent() {
      this.$router.push({});
    },
    goLowerAgent() {
      this.showList = false;
      this.$router.push({ name: "lowerAgent", query: { name: "下级代理" } });
    },
    goAddAgent() {
      this.$router.push({});
    },
    goAgentCount() {
      this.$router.push({});
    },
    goIncomeCount() {
      this.$router.push({});
    },
    goIncomeDetail() {
      this.$router.push({});
    },
    goCashDetail() {
      this.$router.push({});
    },
    goCashOutlay() {
      this.$router.push({});
    },
    goMyInfo() {
      this.$router.push({});
    },
    loginOut() {
      this.reLogin();
    }
  }
};
</script>

<style rel="stylesheet" lang="scss" scoped>
@import "../../assets/scss/main.scss";

#homePage {
  .vux-header {
    z-index: 502;
  }
  .vux-popup-dialog.vux-popup-left {
    top: 46px;
  }
  .vux-popup-dialog {
    background-color: white;
  }
  .clearfix {
    li {
      width: 26%;
      margin-left: 5.5%;
      margin-top: 6%;
      border: 1px solid #3b7755;
      height: 0.66rem;
      line-height: 0.66rem;
      border-radius: 4px;
      color: #3b7755;
      letter-spacing: 0.03rem;
      padding-left: 0.03rem;
      font-size: 0.26rem;
      float: left;
    }
  }
  .listTitle {
    height: 0.8rem;
    background-color: #f5f5f5;
    line-height: 0.8rem;
    margin-top: 5%;
    text-align: left;
    padding-left: 5.5%;
    font-size: 0.28rem;
    letter-spacing: 0.02rem;
  }
  .login_out {
    position: fixed;
    width: 300px;
    bottom: 0;
  }
  .login_out button {
    width: 100%;
    border: none;
    height: 0.8rem;
    border-radius: 0;
  }
  .weui-btn:after {
    border: none;
  }
  .bor {
    border: 1px solid #00d05a !important;
    color: #00d05a !important;
  }
}
</style>
