<!-- Created by linzy on 2018/04/19 -->
<template>
  <!--searchCom组件用途 搜索
  v-model:
  props:
    placeholder
  events:
    @change
  use:
  <g-search v-model="searchValue" placeholder="请搜索xxx"></g-search>
-->
  <div id="gSearchCom">
    <div class="center">
      <div class="selectBox" >
        <select class="inpSelect" v-model="selectValue"
                v-show="selectList.length" @change="selectChange"
                :style="`width: ${selectWidth}`">
          <option v-for="(item,index) in selectList" :key="index"
                  :value="item.value">{{item.label}}</option>
        </select>
        <i class="yiyifont yiyi-more3" v-show="selectList.length"></i>
      </div>
      <input class="inp" :value="value"
             type="text" :placeholder="placeholder"
             @change="inpInput($event)">
      <icon v-show="value !== ''" type="clear" class="selectClearIcon"
            @click.native="close"></icon>
      <!--<button class="btn" v-show="inpValue !==''"-->
      <!--@click="btnClick">搜索-->
      <!--</button>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'gSearchCom',
    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      placeholder: {
        type: String,
        default: '请输入'
      },
      selectList: {
        type: Array,
        default () {
          return []
        }
      },
      selectWidth: {
        type: String,
        default: 'auto'
      }
    },
    data () {
      return {
        selectValue: ''
      }
    },
    activated () {
      if (this.selectList.length) {
        this.selectValue = this.selectList[0].value
      }
    },
    methods: {
//      btnClick() {
//        this.$emit('input', this.inpValue);
//        this.$emit('change', this.inpValue);
//      },
      selectChange () {
        this.$emit('input', '');
        this.$emit('change', {selectValue: this.selectValue,searchValue: ''});
      },
      inpInput(ev) {
        this.$emit('input', ev.target.value);
        if (this.selectList.length) {
          this.$emit('change', {selectValue: this.selectValue,searchValue: ev.target.value});
        } else {
          this.$emit('change', ev.target.value);
        }
      },
      close() {
        this.$emit('input', '');
        this.$emit('change', '');
      }
    }
  }
</script>

<style rel="stylesheet" lang="scss">
  @import '../../assets/scss/main.scss';

  #gSearchCom {
    height: 1rem;
    padding: 0.15rem 0.2rem;
    background: #fff;
    border-bottom: 0.01rem solid $borColor;
    .center {
      height: 0.7rem;
      @extend %flex-between-center;
      border-radius: 0.1rem;
      overflow: hidden;
      background: #f2f2f2;
      padding: 0 0.2rem;
    }
    .inp {
      line-height: 0.7rem;
      flex: 1;
      background: #f2f2f2;
      /*padding-left: 0.3rem;*/
      /*margin-left: 0.3rem;*/
      text-indent: 0.3rem;
      font-size: 0.3rem;
      color: #333;
    }
    .selectClearIcon{
      font-size: 0.3rem;
      width: 0.6rem;
      @extend %flex-center-center;
    }
    .btn {
      width: 1.2rem;
      height: 100%;
      background: $theme;
      font-size: 0.3rem;
      color: #fff;
      &:disabled {
        background: #ddd;
      }
      &:active {
        background: rgba(78, 152, 232, 0.6);
      }
    }
    .selectBox{
      /*display: flex;*/
      @extend %flex-between-center;
      .inpSelect{
        font-size: 0.3rem;
        color: #3d3d3d;
      }
      .yiyifont{
        font-size: 0.3rem;
        color: #3d3d3d;
      }
    }

  }
</style>
