<!-- Created by linzy on 2018/04/08 -->
<template>
  <!--bottomBtn底部按钮组件
  props:
    one         只有一个按钮 默认true
    two         有两个按钮 默认false
    three       有三个按钮  默认false
    leftText    左侧按钮文本 默认返回
    centerText  中间按钮文本
    rightText   右侧按钮文本  默认确定
    leftStyle   左侧按钮属性
    centerType   中间按钮类型
  events:
    leftBtn     点击leftBtn回调
    centerBtn   点击centerBtn回调
    rightBtn    点击rightBtn回调
  slot        只有一个按钮时 普通slot
  use：
    <g-bottomBtn three hasPagination
                 @centerBtn="centerBtn" @rightBtn="rightBtn"></g-bottomBtn>
-->
  <div id="bottomBtnCom"
       :style="hasPagination?`padding: 0 0.2rem 0.2rem;height: 1rem;`:`padding: 0.2rem;height: 1.2rem;`">
    <x-button v-show="two || three" :style="leftStyle"
              :type="two?'primary':'warn'" plain :disabled="disabled || leftDisabled"
              @click.native="btnClick('left')">{{leftText}}
    </x-button>
    <x-button v-show="three" :type="(three && centerType)?'primary':'warn'" plain
              :disabled="disabled || centerDisabeld"
              :style="(two|| three)?`margin-left:0.2rem;`:''"
              @click.native="btnClick('center')">{{centerText}}
    </x-button>
    <x-button v-show="one || two || three"
              :disabled="disabled || rightDisabled"
              :style="(two|| three)?`margin-left:0.2rem;`:''"
              type="primary"
              @click.native="btnClick('right')">{{rightText}}
    </x-button>
  </div>
</template>
<script>
  export default {
    name: 'bottomBtn',
    props: {
      one: {
        type: Boolean,
        default: true
      },
      two: {
        type: Boolean,
        default: false
      },
      three: {
        type: Boolean,
        default: false
      },
      leftDisabled :{
        type: Boolean,
        default: false
      },
      centerType :{
        type: Boolean,
        default: false
      },
      leftText: {
        type: String,
        default: '返回'
      },
      centerText: {
        type: String,
        default: '中间'
      },
      rightText: {
        type: String,
        default: '确定'
      },
      centerDisabeld: {
        type: Boolean,
        default: false
      },
      rightDisabled: {
        type: Boolean,
        default: false
      },
      hasPagination: {
        type: Boolean,
        default: false
      },
      leftStyle: Object
    },
    data () {
      return {
        disabled: false
      }
    },
    methods: {
      btnClick(from) {
        this.disabled = true;
        setTimeout(()=>{
          this.disabled = false;
        },1000)
        switch (from) {
          case 'left':
            if (this.leftText === '返回') {
              this.$router.go(-1);
            } else {
              this.$emit('leftBtn');
            }
            break;
          case 'center':
            this.$emit('centerBtn');
            break;
          case 'right':
            this.$emit('rightBtn');
            break;
        }
      }
    }
  }
</script>

<style rel="stylesheet" lang="scss">
  @import '../../assets/scss/main.scss';

  #bottomBtnCom {
    height: 1.2rem;
    display: flex;
    .weui-btn {
      flex: 1;
      font-size: 0.34rem;
      letter-spacing: 0.05rem;
    }
    .weui-btn + .weui-btn {
      margin-top: 0;
    }
    .weui-btn_plain-primary {
      color: $theme;
      border: 1px solid $theme;
      background: #f5f8fe;
    }
    .weui-btn_plain-warn {
      color: $red;
      border: 1px solid $red;
      background: #fef7f7;
    }
  }
</style>
