<template>
  <div id="noDataCom">
    {{title}}
  </div>
</template>

<script>
  export default {
    name: 'noDataCom',
    props: {
      title: {
        type: String,
        default: '暂无数据'
      }
    }
  }
</script>

<style rel="stylesheet" lang="scss">
  @import '../../assets/scss/main.scss';

  #noDataCom {
    font-size: 0.3rem;
    line-height: 3em;
    text-align: center;
  }
</style>
