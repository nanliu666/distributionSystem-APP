
<!-- Created by linzy on 2018/04/27 -->
<template>
  <!--selectCom组件用途 下拉组件 主要用于在cell组件下的下拉
  props:
    placeholder         // 下拉框的placeholder
    value               // v-model="selectValue" selectValue默认''
  events:
    @change             // 组件的select change回调
  slots:              // default 放option标签
  use:
      <g-select slot="value" v-model="selectValue"
                @change="selectValueChange">
            <option v-for="(item,index) in 30" :key="item"
                    :value="item">{{item}}
            </option>
       </g-select>
  -->
  <div class="selectCom" :class="{placeholderClass:value}">
    <select :value="value"
            :style="`max-width: ${selectWidth};direction:${direction}`"
            @change="selectChange($event)">
      <option value="" disabled selected style="color: #989898">{{placeholder}}</option>
      <slot></slot>
    </select>
    <icon v-if="value !== '' && clearable" type="clear" class="selectClearIcon"
          @click.native="clearClick"></icon>
    <i v-if="downArrow" class="yiyifont yiyi-more3"></i>
  </div>
</template>

<script>
  export default {
    name: 'selectCom',
    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      clearable: {
        type: Boolean,
        default: false
      },
      downArrow: {
        type: Boolean,
        default: false
      },
      direction:{
        type: String,
        default: 'rtl'
      },
    },
    computed: {
      // select下拉框的宽度 根据变量 变化
      selectWidth () {
        if (this.value) {
          if (this.clearable && this.downArrow) {
            return "calc(100% - 0.7rem)"
          } else if (this.clearable) {
            return "calc(100% - 0.4rem)"
          } else if (this.downArrow) {
            return "calc(100% - 0.3rem)"
          } else {
            return '100%'
          }
        } else {
          return '100%'
        }
      }
    },
    methods: {
      // 下拉select change 回调
      selectChange(ev) {
        this.$emit('input', ev.target.value);
        this.$emit('change', ev.target.value);
      },
      // 点击close图标
      clearClick() {
        this.$emit('input', '');
        this.$emit('change', '');
      },
    }
  }
</script>

<style rel="stylesheet" lang="scss">
  @import '../../assets/scss/main.scss';

  .selectCom {
    @extend %flex-between-center;
    width: 100%;
    select {
      flex: 1;
      @extend %ellipsis;
      font-size: 0.3rem;
      line-height: 1.5em;
      padding-right: 0.1rem;
      color: #989898;
    }
    .selectClearIcon {
      font-size: 0.3rem;
      width: 0.4rem;
      @extend %flex-center-center;
    }
    .yiyi-more3 {
      font-size: 0.3rem;
    }

  }
  .selectCom.placeholderClass {
    select{
      color: #3d3d3d !important;
    }
  }
</style>
