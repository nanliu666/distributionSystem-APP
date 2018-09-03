<!-- Created by linzy on 2018/06/27 -->
<template>
  <!--gInputCom组件用途 输入框
  props:
    value           v-model
    prefixIcon      前缀图标
    type            input框type类型 支持原生 同时支持sync
    clearable       是否显示清除按钮 默认true
    pwd             是否是密码 默认false 会有密码可视功能
  events:
    change          回调
  slots:
    prefix          前缀slot
    pwdSee          密码可视slot
  use:
-->
  <div class="gInputCom">
    <slot name="prefix">
      <i :class="['yiyifont prefixIcon',`${prefixIcon}`]"></i>
    </slot>
    <input :value="value" :type="type" :placeholder="placeholder"
           class="gInput__inner"
           @input="inputInput($event)">
    <slot name="pwdSee">
      <i v-show="pwd"
         :class="['pwdSeeIcon yiyifont',`yiyi-${type === 'password'?'Close':'open'}`]"
         @click.stop="iconClick('pwdSee')"></i>
    </slot>
    <icon v-show="value !== '' && clearable" type="clear" class="inputClearIcon"
          @click.native.stop="iconClick('clear')"></icon>
  </div>
</template>

<script>
  export default {
    name: 'gInputCom',
    props: {
      prefixIcon: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        default: '请输入'
      },
      value: {
        type: [String, Number],
        default: ''
      },
      clearable: {
        type: Boolean,
        default: false
      },
      pwd: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      // input框 input 回调
      inputInput(ev) {
        this.$emit('input', ev.target.value);
        this.$emit('change', '');
      },
      // 点击图标
      iconClick(from) {
        switch (from) {
          case 'clear':
            this.$emit('input', '');
            this.$emit('change', '');
            break;
          case 'pwdSee':
            let updateType = '';
            if (this.type === 'password') {
              updateType = 'text'
            } else {
              updateType = 'password'
            }
            this.$emit('update:type', updateType)
            break;
        }
      }
    }
  }
</script>

<style rel="stylesheet" lang="scss">
  @import '../../assets/scss/main.scss';

  .gInputCom {
    @extend %flex-center;
    height: 1rem;
    .gInput__inner {
      width: 100%;
      height: .8rem;
      flex: 1;
      font-size: 0.32rem;
      /*line-height: 1.5em;*/
      text-indent: 0.2rem;
    }
    .inputClearIcon {
      font-size: 0.3rem;
    }
    .pwdSeeIcon{
      width: 0.5rem;
      font-size: 0.4rem;
    }
  }
</style>
