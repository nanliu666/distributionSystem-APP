<!-- Created by linzy on 2018/04/16  -->
<template>
  <!--增加-减少 number组件
    v-model    数值
    props
       min      最小值
       max      最大值
       step     一次增减多少 默认为1
       disabled 是否可用 默认为false
    events
       change   change回调
  -->
  <div class="numberCom">
    <button v-show="value > min"
            class="btn" :disabled="disabled"
            @click="reduceBtn">&minus;
    </button>
    <input :value="value" v-show="value > min"
           type="text" class="num"
           maxlength="3" :disabled="disabled" readonly>
    <button class="btn" :disabled="disabled || rightDisabled"
            @click="addBtn">+
    </button>
  </div>
</template>
<script>
  export default {
    name: 'numberCom',
    props: {
      value: {
        type: Number,
        default: 1
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 999
      },
      step: {
        type: Number,
        default: 1
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      rightDisabled () {
        if (this.value === this.max) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      // 点击减少按钮
      reduceBtn() {
        if (this.value - this.step < this.min) {
          this.$emit('input', this.min);
          this.$emit('change', this.min);
        } else {
          this.$emit('input', this.value - this.step);
          this.$emit('change', this.value - this.step);
        }
      },
      // 点击增加按钮
      addBtn() {
        if (this.value + this.step > this.max) {
          this.$emit('input', this.max);
          this.$emit('change', this.max);
        } else {
          this.$emit('input', this.value + this.step);
          this.$emit('change', this.value + this.step);
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../../assets/scss/main.scss";

  .numberCom {
    display: flex;
    height: 0.55rem;
    user-select: none;
    .btn {
      width: 0.55rem;
      height: 100%;
      color: #fff;
      background: $theme;
      border-radius: 0.05rem;
      &:disabled {
        color: #fff;
        background: #ddd;
      }
      &:active {
        background: rgba(78,152,232,0.6);
      }
    }
    .num {
      width: 0.86rem;
      height: 100%;
      font-size: 0.28rem;
      line-height: 0.55rem;
      color: #808080;
      margin: 0 0.2rem;
      text-align: center;
      background: #f2f2f2;
    }
  }
</style>
