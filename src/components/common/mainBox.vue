<template>
  <!--viewBox 主体div组件
  props:
    top         距离顶部的高度
    bottom      距离底部的高度
    noData      是否没有更多数据了 默认false 当没有数据时 传入true
    toHome      是否显示回到顶部 默认false
  slot
    普通slot
  use
     <g-mainBox top="0.96rem" bottom="0.64rem" paddingBottom="0.12rem"
               :noData="noData">
              // 内容
      </g-mainBox>
-->
  <!--view-box-->
  <div class="mainBoxCom" ref="mainBoxCom" :style="`height: calc(100% - ${top} - ${bottom})`">
    <slot></slot>
    <div id="noMoreBox" v-if="noData">
      <span class="text">暂无数据</span>
    </div>
    <div v-show="toHome" class="toHome" id="toHome" @click.stop="toHomeClick">
      <slot name="toHome">
        <i class="iconfont icon-Home">{{toHomeText}}</i>
      </slot>
    </div>
  </div>
</template>

<script>
import { ViewBox } from 'vux'

export default {
  name: 'mainBox',
  components: {
    ViewBox
  },
  props: {
    toHomeText: {
      type: String,
      default: '首页'
    },
    top: {
      type: String,
      default: '0px'
    },
    bottom: {
      type: String,
      default: '0px'
    },
    noData: {
      type: Boolean,
      default: false
    },
    toHome: {
      type: Boolean,
      default: false
    }
  },
  activated() {
    // toHome按钮移动
    let toHome = document.getElementById('toHome');
    if (toHome) {
      toHome.addEventListener('touchstart', this.start, false)
    }
  },
  deactivated() {
  },
  methods: {
    toHomeClick() {
      if (this.toHomeText === '首页') {
        // this.$router.push({ name: 'homepage' })
        this.$router.push({ name: "global", query: { name: "概览" } });
      } else {
        this.$emit('toHome')
      }
    },
    start(ev) {
      if (ev.targetTouches.length == 1) {
        let startData = ev.targetTouches[0];
        let offsetX = startData.clientX - $('#toHome').position().left;
        let offsetY = startData.clientY - $('#toHome').position().top;
        //          let maxX = $('#mainBoxCom').width() - $('#toHome').width();
        let maxX = $('#app').width() - $('#toHome').width();
        //          let maxY = $('#mainBoxCom').height() - $('#toHome').height();
        let maxY = $('#app').height() - $('#toHome').height();
        var toHome = document.getElementById('toHome');
        toHome.addEventListener('touchmove', function move(event) {
          console.log(event)
          event.preventDefault();  //阻止默认行为
          let moveData = event.targetTouches[0];
          let left = moveData.clientX - offsetX;
          let top = moveData.clientY - offsetY;
          if (left >= maxX) {
            left = maxX
          } else if (left <= 0) {
            left = 0
          }
          if (top >= maxY - $('#pagination').height() - $('#navBar').height()) {
            top = maxY - $('#pagination').height() - $('#navBar').height()
          } else if (top <= 0) {
            top = 0
          }
          $('#toHome').css({ left: left, top: top });
          event.preventDefault()
        })
      }
    }
  }
}
</script>

<style rel="stylesheet" lang="scss">
@import "../../assets/scss/main.scss";

.mainBoxCom {
  width: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  #noMoreBox {
    text-align: center;
    font-size: 0.3rem;
    line-height: 3em;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 0;
      width: 80%;
      height: 0.02rem;
      background: #d9d9d9;
    }
    .text {
      position: relative;
      z-index: 1;
      display: inline-block;
      color: #999;
      padding: 0 0.3rem;
      background: $bodyBg;
    }
  }
  .toHome {
    position: fixed;
    right: 0.2rem;
    bottom: 2.2rem;
    z-index: 8000;
    width: 1rem;
    height: 1rem;
    color: $white;
    line-height: 1rem;
    text-align: center;
    border-radius: 50%;
    background: rgba(70, 171, 242, 0.7);
    .icon-Home {
      font-size: 0.3rem;
    }
  }
  #vux_view_box_body {
    padding-bottom: 0;
  }
  .weui-tab__panel {
    padding-bottom: 0;
  }
}
</style>
