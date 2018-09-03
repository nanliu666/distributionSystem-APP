<template>
  <!--弹出框包裹的外边框组件-组件
    props:
      title         弹窗的标题
    events:
      @enterBtn     点击弹窗确定按钮
      @close        弹窗关闭回调
    slots:
      普通slot
    use:
    <g-dialog v-model="dialogVisible"
              title="弹窗标题"
              @enterBtn="enterBtn"
              @close="dialogClose">
    </g-dialog>
  -->
  <div v-transfer-dom>
    <x-dialog :show.sync="value" class="dialogCom"
              hide-on-blur :dialog-style="dialogStyle"
              @on-hide="btnClick('close')">
        <div class="top" v-show="title" v-if="topShow">{{title}}</div>
        <div class="middle">
          <slot></slot>
        </div>
        <div class="bottom" v-show="bottomShow" v-if="bottomShow">
          <x-button class="cancel" mini
                    @click.native.stop="btnClick('cancel')">
            {{cancelBtnText}}
          </x-button>
          <x-button class="enter" type="primary" mini :disabled="btnDisabled"
                    @click.native.stop="btnClick('enter')">
            {{enterBtnText}}
          </x-button>
        </div>
    </x-dialog>
  </div>
</template>
<script>
  export default {
    name: 'dialogCom',
    props: {
      value: {
        type: Boolean,
        default: true
      },
      topShow: {
        type: Boolean,
        default: true
      },
      bottomShow: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: '提示'
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      },
      enterBtnText: {
        type: String,
        default: '确定'
      },
      dialogStyle: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data() {
      return {
        btnDisabled: false,
      }
    },
    activated() {
      document.body.style.overflow = 'hidden'
    },
    deactivated() {
      document.body.style.overflow = 'auto'
    },
    methods: {
      btnClick(from) {
        switch (from) {
          case 'close':
            this.$emit('input', false);
            this.$emit('close');
            break;
          case 'cancel':
            this.$emit('input', false);
            break;
          case 'enter':
            this.$emit('enterBtn');
            this.btnDisabled = true;
            setTimeout(() => {
              this.btnDisabled = false;
            }, 1000);
            break;
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../../assets/scss/main.scss";

  .dialogCom {
    @media screen and (min-width: 1024px) {
      .weui-dialog {
        width: 6rem;
      }
    }
    .weui-dialog {
      max-width: none;
      border-radius: 0.1rem;
      overflow: hidden;
      background-color: $white;
    }
    .top {
      height: 1.2rem;
      @include font(0.34,1.2,#333);
      background: #ebebeb;
      text-align: center;
    }
    .middle {
      padding: 0.3rem;
      max-height: 8rem;
      overflow-y: auto;
    }
    .bottom {
      display: flex;
      height: 1rem;
      border-top: solid 1px #e0e0e0;
      .cancel {
        color: #333;
      }
      .enter {
        border-left: 1px solid #e0e0e0;
        color: $theme;
      }
      .weui-btn {
        flex: 1;
        font-size: 0.34rem !important;
        border-radius: 0 !important;
        background: $white;
        &:after {
          display: none;
        }
      }
      .weui-btn + .weui-btn {
        margin-top: 0;
      }
    }
  }
</style>
