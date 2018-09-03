<!-- Created by linzy on 2018/04/18 -->
<template>
  <!--cellCom组件用途 cell公共组件
  props:
    icon:         // 图标
    color         // 图标颜色
    title         // 左侧标题 可slot
    value         // 右侧内容 可slot
    isLink        // 是否带有右标箭头
    link          // 路由的name值 或者可以通过@cellClick跳转
    cellStyle     // cell 样式带入
  events:
    @cellClick    //点击item
  slots:
    icon          // 图标
    title         // 标题
    value         // 右侧内容区域
  use:
      <g-cellBox title="帮助服务">
        <g-cell v-for="(item,index) in groupList" :key="index"
              :icon="item.icon" :color="item.color" :title="item.title"
              isLink :link="item.link"></g-cell>
      </g-cellBox>
-->
  <div class="cellCom" :style="cellStyle"
       @click="cellClick">
    <!--:style="`${value?'max-width:30%':``}`"-->
    <div class="left">
      <slot name="title">
        <slot name="icon">
          <i :style="`color:${color}`"
             :class="['yiyifont',`yiyi-${icon}`]"></i>
        </slot>
        <span class="title">{{title}}</span>
      </slot>
    </div>
    <!--:style="`${value?'max-width:70%':``}`"-->
    <div class="right">
      <span class="value">
        <slot name="value">
          <span class="text" v-show="value">{{value}}</span>
          <span class="text" style="color: #989898"
                v-show="!value && placeholder">{{placeholder}}</span>
          <icon v-show="value !== ''" type="clear" class="selectClearIcon"
                @click.native.stop="clearClick"></icon>
        </slot>
      </span>
      <span class="icon" v-show="isLink"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cellCom',
    props: {
      icon: {
        type: String,
        default: 'personnel'
      },
      color: {
        type: String,
        default: '#4e98e8'
      },
      title: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
      },
      cellStyle: Object,
      isLink: {
        type: Boolean,
        default: false
      },
      link: String,
      closeShow: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ''
      },
    },
    methods: {
      cellClick() {
        if (this.link) {
          this.$router.push({name: this.link})
        } else {
          this.$emit('cellClick')
        }
      },
      // 点击close图标
      clearClick() {
        this.$emit('input','')
        this.$emit('change','')
      },
    }
  }
</script>

<style rel="stylesheet" lang="scss">
  @import '../../assets/scss/main.scss';

  .cellCom {
    @extend %flex-between-center;
    min-height: 1rem;
    padding: 0.2rem 0;
    background: #fff;
    border-top: 0.01rem solid $borColor;
    &:active {
      background: #ddd;
    }
    .left {
      font-size: 0.3rem;
      line-height: 1.5em;
      .title {
        color: #3f6499;
        margin-left: 0.1rem;
      }
      max-width: 40%;
      @extend %ellipsis;
    }
    .right {
      max-width: 60%;
      flex: 1;
      @extend %flex-center;
      justify-content: flex-end;
      .value{
        display: flex;
        justify-content: flex-end;
        width: calc(100% - 0.2rem);
        @extend %ellipsis;
        .selectClearIcon{
          font-size: 0.3rem;
          width: 0.6rem;
          @extend %flex-center-center;
        }
      }
      .text {
        font-size: 0.3rem;
        line-height: 1.5em;
        color: #333;
        margin-right: 0.1rem;
      }
      .icon {
        transform: rotate(45deg);
        width: 0.2rem;
        height: 0.2rem;
        border: 0.03rem solid;
        border-color: #bfbfbf #bfbfbf transparent transparent;
      }
    }
  }
</style>
