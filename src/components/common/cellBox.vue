<!-- Created by linzy on 2018/04/18 -->
<template>
    <!--cellBoxCom组件用途 cell组件包裹div
    props:
      title         // 左侧标题 可slot
      cellBoxStyle  // cellBox 样式带入
    slots:
      slot          // 默认slot
    use:
      <g-cellBox title="帮助服务">
        <g-cell v-for="(item,index) in groupList" :key="index"
              :icon="item.icon" :color="item.color" :title="item.title"
              isLink :link="item.link"></g-cell>
      </g-cellBox>
  -->
    <div class="cellBoxCom" :style="cellBoxStyle">
      <div class="cellBoxCom-title" v-show="title">
        {{title}}
      </div>
      <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'cellBoxCom',
        props: {
          title: String,
          cellBoxStyle:Object
        },
    }
</script>

<style rel="stylesheet" lang="scss">
    @import '../../assets/scss/main.scss';

    .cellBoxCom {
      padding: 0.3rem 0.3rem 0;
      background: #fff;
      box-shadow: 0 0 0.05rem rgba(0,0,0,0.2);
      .cellBoxCom-title{
        font-size: 0.3rem;
        line-height: 0.6rem;
        color: #333;
        font-weight: 700;
      }
      .cellBoxCom-title+.cellCom{
        border: 0;
      }
    }
</style>
