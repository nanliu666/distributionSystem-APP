<template>
  <!--roll 用于文本溢出滚动
  slots: slot
-->
  <div class="rollCom">
      <span>
        <slot></slot>
      </span>
  </div>
</template>

<script>
  export default {
    name: 'rollCom',
    mounted() {
      this.roll()
    },
    methods: {
      roll() {
        var pArr = this.$('.rollCom');
        var cArr = this.$('.rollCom').find('span');
        for (let i = 0; i < pArr.length; i++) {
          if (cArr.eq(i).width() > pArr.eq(i).width()) {
            var time = (cArr.eq(i).width() / pArr.eq(i).width()) * 2000;
            this.move(cArr.eq(i), pArr.eq(i), time)
          }
        }
      },
      move(child, parent, time) {
        child.animate({'left': -child.width()}, time, 'linear', () => {
          child.css('left', parent.width());
          this.move(child, parent, time)
        })
      }
    },
  }
</script>

<style rel="stylesheet" lang="scss">
  @import '../../assets/scss/main.scss';
  .rollCom {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    span {
      position: relative;
    }
  }
</style>
