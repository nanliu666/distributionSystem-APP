<!-- Created by linzy on 2018/04/09 -->
<template>
  <!--tabsCom tab切换组件
  props:
       tabsList:  数组格式 ['切换1','切换2']
  events:
      @change  tabIndex
  use:
    <g-tabs v-model="tabIndex" :tabsList="['切换1','切换2']"></g-tabs>
  -->
  <tab v-model="tabIndex" id="tabsCom"
       active-color="#4e98e8" default-color="#999">
    <tab-item v-for="(item,index) in tabsList" :key="index">{{item}}</tab-item>
  </tab>
</template>

<script>
  export default {
    name: 'tabs',
    props: {
      value: {
        type: Number,
        default: 0
      },
      tabsList: Array
    },
    data () {
      return {
        tabIndex: this.value
      }
    },
    watch: {
      tabIndex (newVal,oldVal) {
        this.$emit('input', newVal);
        this.$emit('change', newVal);
      }
    }
  }
</script>

<style rel="stylesheet" lang="scss">
  @import '../../assets/scss/main.scss';

  #tabsCom {
    height: 1rem;
    .vux-tab-item {
      font-size: 0.34rem;
      line-height: 1rem;
    }
    .vux-tab-ink-bar {
      height: 0.06rem !important;
    }
  }
</style>
