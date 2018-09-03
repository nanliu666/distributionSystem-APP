<template>
  <!--Pagination组件用途
  props:
    pageSize: 每页的个数 默认 10
    totalRow： 总条数
  use:
    <g-pagination v-model="tableForm.pageNumber"
                  :pageSize="tableForm.pageSize" :totalPage="totalPage"></g-pagination>
-->
  <div id="pagination">
    <x-button :disabled="leftDisabled" plain class="left"
              @click.native="btnClick('prev')">上一页
    </x-button>
    <x-button :disabled="centerDisabled" plain class="center"
              @click.native="actionsheetShow = true">第{{value}}页/共{{totalPage}}页
    </x-button>
    <x-button :disabled="rightDisabled" plain class="right"
              @click.native="btnClick('next')">下一页
    </x-button>
    <actionsheet v-model="actionsheetShow" :menus="menus"
                 @on-click-menu="menuClick"></actionsheet>
  </div>
</template>

<script>
  export default {
    name: 'pagination',
    props: {
      value: {
        type: Number,
        default: 1,
      },
      pageSize: {
        type: Number,
        default: 10,
      },
      totalPage: {
        type: Number,
        default: 1,
      },
    },
    data() {
      return {
        actionsheetShow: false
      }
    },
    computed: {
      leftDisabled() {
        if (this.totalPage > 1 && this.value > 1) {
          return false
        } else {
          return true
        }
      },
      rightDisabled() {
        if (this.totalPage > 1 && this.value < this.totalPage) {

          return false
        } else {
          return true
        }
      },
      centerDisabled() {
        if (this.totalPage > 1) {
          return false
        } else {
          return true
        }
      },
      menus() {
        return this._.range(1, this.totalPage + 1);
      }
    },
    methods: {
      btnClick(from) {
        switch (from) {
          case 'prev':
            this.$emit('input', this.value - 1)
            break;
          case 'next':
            this.$emit('input', this.value + 1)
            break;
        }
      },
      menuClick(item, index) {
        this.$emit('input', index)
      },
    }
  }
</script>

<style rel="stylesheet" lang="scss">
  @import '../../assets/scss/main.scss';

  #pagination {
    @extend %flex-between-center;
    height: 1rem;
    padding: 0 0.12rem;
    .weui-btn {
      font-size: 0.28rem;
      flex: 1;
      margin-top: 0;
      color: inherit;
      background: #fff;
      &:disabled {
        color: rgba(0, 0, 0, 0.3);
      }
    }
    .center {
      flex: 2;
      margin: 0 0.1rem;
    }
    .weui-actionsheet__menu {
      max-height: 8rem;
      overflow-y: auto;
    }
  }
</style>
