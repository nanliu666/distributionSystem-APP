<!-- Created by wlh on 2018/05/16 -->
<template>
  <!--chooseArea组件用途
  props:
  events:
  slots:
-->
  <div id="chooseArea" class="comBox">
    <div class="vux-cell-box">
      <div class="weui-cell vux-tap-active weui-cell_access required" @click="chooseAreaShow">
        <div class="weui-cell__hd">
          <label class="weui-label">{{ label }}</label>
        </div>
        <div class="vux-cell-primary vux-popup-picker-select-box">
          <div class="vux-popup-picker-select">
            <span class="vux-popup-picker-value vux-cell-value" v-text="areaNameShow == '' ? '请选择' : areaNameShow"></span>
          </div>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
    </div>
    <div class="chooseMask" @click="chooseAreaHide"></div>
    <div class="chooseBox">
      <div class="chooseBoxHead">
        <div v-for="(item,index) in chooseAreaList" :class="item.choosed == true ? 'chooseInfo choosed' : 'chooseInfo'" @click="chooseHeadChange(index)">{{ item.name }}</div>
        <!--<i class="yiyifont yiyi-cancel deleteImgIcon"></i>-->
      </div>
      <div class="chooseBoxBody">
        <div v-if="chooseAreaList[0].choosed == true">
          <div v-for="(item,index) in cityList" v-text="item.area_name" :key="item.area_code"
               :class="['listInfo',(item.infoChoosed == true) ? 'weui-icon-checked' : '']" @click="chooseArea(0,index)"></div>
        </div>
        <div v-if="chooseAreaList[1].choosed == true">
          <div v-for="(item,index) in eraeList" v-text="item.area_name" :key="item.area_code"
               :class="['listInfo',(item.infoChoosed == true) ? 'weui-icon-checked' : '']" @click="chooseArea(1,index)"></div>
        </div>
        <div v-if="chooseAreaList[2].choosed == true">
          <div v-for="(item,index) in mineraeList" v-text="item.area_name" :key="item.area_code"
               :class="['listInfo',(item.infoChoosed == true) ? 'weui-icon-checked' : '']" @click="chooseArea(2,index)"></div>
        </div>
        <!--<div v-if="chooseAreaList[3].choosed == true">
          <div v-for="(item,index) in streetList" v-text="item.area_name" :key="item.area_code"
               :class="['listInfo',(item.infoChoosed == true) ? 'weui-icon-checked' : '']" @click="chooseArea(3,index)"></div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'chooseArea',
    props: {
      label:'',
      areaName:{
        type: String,
        default: function () {
          return ''
        }
      },
      areaCode:{
        type: Array,
        default: function () {
          return []
        }
      },
    },
    components: {},
    data() {
      return {
        chooseAreaList:[
          {
            name:'请选择',
            choosed:true
          },
          {
            name:'',
            choosed:false
          },
          {
            name:'',
            choosed:false
          },
          /*{
            name:'',
            choosed:false
          }*/
        ],
        cityList:[],
        eraeList:[],
        mineraeList:[],
        streetList:[],
        areaNameShow:'',
        areaCodeShow:[]
      }
    },
    computed: {},
    watch: {
      areaName:{
        handler: function (newVal, oldVal) {
          this.areaNameShow = newVal;
          let areaNameList = newVal.split('-');
          this.chooseAreaList.forEach((item,index) => {
            if(index != 2){
              item.name = areaNameList[index];
              item.choosed = false;
            }else{
              item.name = '请选择';
              item.choosed = true;
            }
          });
        },
        deep: true
      },
      areaCode:{
        handler: function (newVal, oldVal) {
//          this.areaCodeShow = newVal;
          if(newVal != ''){
            this.areaCodeShow = [];
            this.getChooseData(0,true);
            this.areaCodeShow = newVal.slice(0,1);
            this.getChooseData(1,true);
            this.areaCodeShow = newVal.slice(0,2);
            this.getChooseData(2,true);
           /* this.areaCodeShow = newVal.slice(0,3);
            this.getChooseData(3,true);*/
          }
        },
        deep: true
      }
    },
    created() {
      this.getChooseData(0,false);
    },
    mounted() {
    },
    activated() {
//      this.areaNameShow = this.areaName;
      this.getChooseData(0,false);
    },
    deactivated() {
      this.$emit('getChooseInfo', {chooseAreaName:'',chooseAreaCode:[]});
    },
    methods: {
      getChooseData(type,flag){
        let param = {
          'rec.area_code':this.areaCodeShow.join(',')
        };
        switch (type){
          case 0:
            param['rec.area_level'] = 0;
            break;
          case 1:
            param['rec.area_level'] = 1;
            break;
          case 2:
            param['rec.area_level'] = 2;
            break;
          /*case 3:
            param['rec.area_level'] = 3;
            break;*/
        }
        this.axios.get('/customer/customerArea',{params:param}).then((res) => {
          if(res.data.code == 200){
            res.data.body.forEach((item) => {
              item.infoChoosed = false;
            });
            switch (type){
              case 0:
                this.cityList = res.data.body;
                if(flag == true){
                  this.cityList.forEach((item) => {
                    if(item.area_code == this.areaCode[0]){
                      item.infoChoosed = true;
                    }
                  });
                }
                break;
              case 1:
                this.eraeList = res.data.body;
                if(flag == true){
                  this.eraeList.forEach((item) => {
                    if(item.area_code == this.areaCode[1]){
                      item.infoChoosed = true;
                    }
                  });
                }
                break;
              case 2:
                this.mineraeList = res.data.body;
                if(flag == true){
                  this.mineraeList.forEach((item) => {
                    if(item.area_code == this.areaCode[2]){
                      item.infoChoosed = true;
                    }
                  });
                }
                break;
             /* case 3:
                this.streetList = res.data.body;
                if(flag == true){
                  this.streetList.forEach((item) => {
                    if(item.area_code == this.areaCode[3]){
                      item.infoChoosed = true;
                    }
                  });
                }
                break;*/
            }
          }
        });
      },
      chooseArea(type,i){
        switch (type){
          case 0:
            this.cityList.forEach((item) => {
              item.infoChoosed = false;
            });
            this.chooseAreaList[0].name = this.cityList[i].area_name;
            this.cityList[i].infoChoosed = true;
            this.areaCodeShow = [];
            this.areaCodeShow.push(this.cityList[i].area_code);
            break;
          case 1:
            this.eraeList.forEach((item) => {
              item.infoChoosed = false;
            });
            this.chooseAreaList[1].name = this.eraeList[i].area_name;
            this.eraeList[i].infoChoosed = true;
            this.areaCodeShow = this.areaCodeShow.slice(0,1);
            this.areaCodeShow.push(this.eraeList[i].area_code);
            break;
          case 2:
            this.mineraeList.forEach((item) => {
              item.infoChoosed = false;
            });
//            this.chooseAreaList[2].name = this.mineraeList[i].area_name;
            this.mineraeList[i].infoChoosed = true;
            this.areaCodeShow = this.areaCodeShow.slice(0,2);
            this.areaCodeShow.push(this.mineraeList[i].area_code);
            this.areaNameShow = this.chooseAreaList[0].name + '-' + this.chooseAreaList[1].name + '-' + this.mineraeList[i].area_name;
            $('.chooseMask,.chooseBox').fadeOut();
            this.$emit('getChooseInfo', {chooseAreaName:this.areaNameShow,chooseAreaCode:this.areaCodeShow});
            break;
          /*case 3:
            this.streetList.forEach((item) => {
              item.infoChoosed = false;
            });
//            this.chooseAreaList[3].name = this.streetList[index].area_name;
            this.streetList[i].infoChoosed = true;
            this.areaCodeShow = this.areaCodeShow.slice(0,3);
            this.areaCodeShow.push(this.streetList[i].area_code);
            this.areaNameShow = this.chooseAreaList[0].name + '-' + this.chooseAreaList[1].name + '-' + this.chooseAreaList[2].name + '-' + this.streetList[i].area_name;
            $('.chooseMask,.chooseBox').fadeOut();
            this.$emit('getChooseInfo', {chooseAreaName:this.areaNameShow,chooseAreaCode:this.areaCodeShow});
            break;*/
        }
        if(type < 2){
          this.chooseAreaList.forEach((item,index) => {
            if(index > type){
              if(index == type+1){
                item.name = '请选择';
              }else{
                item.name = '';
              }
            }
            item.choosed = false;
          });
          this.chooseAreaList[type].choosed = false;
          this.chooseAreaList[type+1].choosed = true;
          this.getChooseData(type+1,false);
        }
      },
      chooseAreaShow(){
        $('.chooseMask,.chooseBox').fadeIn();
      },
      chooseAreaHide(){
        $('.chooseMask,.chooseBox').fadeOut();
      },
      chooseHeadChange(index){
        this.chooseAreaList.forEach((item) => {
          item.choosed = false;
        });
        this.chooseAreaList[index].choosed = true;
      }
    }
  }
</script>

<style rel="stylesheet" lang="scss">
  @import '../../assets/scss/main.scss';

  #chooseArea {

    .vux-cell-box{
      position: relative;
    }

    .vux-cell-box::before{
      content: " ";
      position: absolute;
      top: 0;
      right: 0;
      border-top: 1px solid #D9D9D9;
      color: #D9D9D9;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      left: 15px;
    }

    .vux-popup-picker-select{
      text-align: right;
    }

    .chooseMask{
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      opacity: 1;
      tap-highlight-color: rgba(0, 0, 0, 0);
      z-index: 500;
      -webkit-transition: opacity 400ms;
      transition: opacity 400ms;
    }

    .chooseBox{
      display: none;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height:50%;
      background: #fff;
      z-index: 501;
      max-height: 50%;
      overflow-y: auto;
    }

    .chooseBoxHead{
      width:100%;
      height:0.8rem;
      font-size: 0;
      border-bottom: 1px solid #d5d5d5;
      max-width: 100%;
      overflow-x: auto;
      white-space: nowrap;
    }

    .chooseInfo{
      height: 100%;
      padding: 0 0.2rem;
      font-size: 0.14rem;
      display: inline-block;
      vertical-align: middle;
      line-height: 0.8rem;
    }

    .choosed{
      color: #4492eb;
      border-bottom: 2px solid #4492eb;
    }

    .chooseBoxBody{
      width:100%;
      height:calc(100% - 0.8rem);;
      max-height: calc(100% - 0.8rem);
      overflow-y: auto;
    }

    .deleteImgIcon{
      float: right;
      margin-right: 0.2rem;
      margin-top: 0.16rem;
      color: #8d8d8d;
    }

    .listInfo{
      display: block;
      height:0.8rem;
      line-height: 0.78rem;
      border-bottom: 1px solid #d5d5d5;
      padding-left: 0.2rem;
      font-size: 0.14rem;
      position: relative;
    }

    .weui-icon-checked{
      color: #4492eb;
    }

    .weui-icon-checked::before{
      display: inline-block;
      vertical-align: middle;
      content: '\EA08';
      color: #4492eb;
      font-size: 16px;
      position: absolute;
      right: 0.2rem;
    }
  }
</style>
