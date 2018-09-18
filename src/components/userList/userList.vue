<template>
    <div id="userList">
      <div class="ul-search">
        <div class="search">
          <div>
            <group>
              <selector placeholder="请选择" v-model="optionVal" :options="selectList"></selector>
            </group>
          </div>
          <x-input v-model='inputVal' placeholder="请输入"></x-input>
          <x-button mini type="primary" action-type="button" @click.native='sendSearch' >查询</x-button>
        </div>
        <!--表头 -->        
        <div class="title">
          <x-table :cell-bordered="true" :content-bordered="true" style="background-color:#fff;">
            <thead>
            <tr style="background-color: #F7F7F7">
              <th  @click='sortUD(0)' :style="{color:sortUDindex==0?'#1296db':'#000'}" >
                <span>用户ID
                  <!--<icon  :name="sortUDindex==0?imgSrc:'ud'" class="svg-ud"></icon>-->
                </span>
              </th>
              <th  @click='sortUD(1)' :style="{color:sortUDindex==1?'#1296db':'#000'}">
                <span>微信名
                    <!-- <icon  :name="sortUDindex==1?imgSrc:'ud'" class="svg-ud"></icon> -->
                </span>
              </th>
              <th @click='sortUD(2)' :style="{color:sortUDindex==2?'#1296db':'#000'}">
                <span>相对等级
                    <!--<icon  :name="sortUDindex==2?imgSrc:'ud'" class="svg-ud"></icon>-->
                </span>
              </th>
              <th @click='sortUD(3)' :style="{color:sortUDindex==3?'#1296db':'#000'}">
                <span>绑定时间
                    <!--<icon  :name="sortUDindex==3?imgSrc:'ud'" class="svg-ud"></icon>-->
                </span>
              </th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in listData" @click="openDetail(item.id)" :key='item.id'>
                  <td>{{item.id?item.id:'暂无'}}</td>
                  <td>{{item.wechat_name?item.wechat_name:'暂无'}}</td>
                  <td>{{item.level?item.level:'暂无'}}</td>
                  <td>{{item.joined_at*1000|dateFormat('YYYY-MM-DD HH:mm:ss')}}</td>
                </tr>
            </tbody>
          </x-table>
        </div>
      </div>

      <!-- 点击查看详细弹出框 -->
      <div>
        <x-dialog v-model="isDetail" hide-on-blur :dialog-style="{'max-width': '980px', width: '100%', height: '100%', 'background-color': 'transparent'}">
          <div class="ul-xdialog">
            <x-table class="table-detail">
              <thead>
                <tr>
                  <th colspan="2">用户详情</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>代理id</td>
                  <td>{{detailedData.agency_id?detailedData.agency_id:'不是代理'}}</td>
                </tr>
                <tr>
                  <td>相对等级</td>
                  <td>{{detailedData.level?detailedData.level:'暂无'}}</td>
                </tr>
                <tr>
                  <td>上级名称</td>
                  <td>{{detailedData.parent_nickname?detailedData.parent_nickname:'暂无'}}</td>
                </tr>
                <tr>
                  <td>微信名</td>
                  <td>{{detailedData.wechat_name?detailedData.wechat_name:'暂无'}}</td>
                </tr>
              </tbody>
            </x-table>
            <!-- 日期查询 -->
            <div class="search-income">
              <group>
                <datetime   :min-year=2018 format="YYYY-MM-DD" year-row="{value}年" month-row="{value}月" day-row="{value}日" v-model='starttime'  @on-change="changestarttime()"></datetime>
                <span>~</span>
                <datetime   :min-year=2018 format="YYYY-MM-DD" year-row="{value}年" month-row="{value}月" day-row="{value}日"  v-model='endtime'  @on-change="changeendtime()"></datetime>
                <x-button mini type="primary" action-type="button" @click.native='incomeSearch' >查询</x-button>
              </group>
              <div class="table-income-scroll">
                <x-table class="table-income" full-bordered>
                  <thead>
                    <tr>
                      <td>游戏ID</td>
                      <td>返利（单位：分）</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in rebate_info" :key="index" v-if="rebate_info != ''">
                      <td>{{item.game_id}}</td>
                      <td>{{item.total_rebate}}</td>
                    </tr>
                    <tr v-else>
                      <td>暂无数据</td>
                    </tr>
                  </tbody>
                </x-table>
              </div>
            </div>
            <x-button class="up" type="primary" v-if="detailedData.agency_id == null ">升级为代理商</x-button>
            <!-- <x-button class="up" type="primary" v-if="detailedData.agency_id == null ">升级为代理商</x-button> -->
            <x-icon type="ios-close-outline" style="fill:#999;"  @click="closeDialog()"></x-icon>
          </div>
        </x-dialog>
      </div>
    </div>
</template>

<script>
  // 引入上下拉刷新
  import { loadMore } from "../../js/loadmore.js";
    export default {
        name: '',
        props: {},
        components: {},
        data() {
            return {
              optionVal: 0,
              inputVal:'',
              selectList: [
                {key: "0",value: "昵称"},
                {key: "1",value: "游戏ID"},
                {key: "2",value: "绑定代理"},
                {key: "3",value: "注册时间"},
                {key: "4",value: "绑定时间"},
              ],
              listData: "", //1.数据
              isDetail: false, //3.显示详情
              detailedData: "", //3.详情数据
              rebate_info:[],   //返利详情

              sort: "-cost_total", //4.排序规则
              pageIndex:1,
              sortUDindex: 2, //4.切换排序
              starttime: '开始时间',
              endtime: '结束时间',
            }
        },
        computed: {},
        watch: {},
        created() {
          this.getList();
        },
        mounted() {
        },
        activated() {
        },
        deactivated() {
        },
        methods: {
          /*
             该页面因后端接口不完整，只做了表格数据展示功能，其他功能等后端接口完善之后再补全
           */
          getList() {
//            接口不全，搜索条件暂未加上
//            let params = {
//              sort: _this.sort,
//              page: _this.pageIndex
//            };

            let _this = this;
            let userData = JSON.parse(localStorage.getItem('userData'));
            this.axios({
              method: "POST",
              url: '/relation/subordinate',
              headers: {
                'Authorization': 'Bearer ' + userData.bearer
              }
            }).then(function(res) {
                let list = "";
                list = res.data.data.items;
                let userData = JSON.parse(localStorage.getItem('userData'));
                for(let i=0;i<list.length;i++){
                  list[i].level = Number(list[i].level) - userData.level;
                }
                _this.listData = list;
            });
          },
          //  排序
          sortUD(index) {
            this.sortUDindex = index;
          },
          //  表格搜索
          sendSearch(){

          },

          //  详情
          openDetail(id){
              let _this = this;
              let userData = JSON.parse(localStorage.getItem('userData'));
              let parmas = {
                id:id,
              };
              this.axios({
                method: "POST",
                url: '/relation/subdetail',
                data:parmas,
                headers: {
                  'Authorization': 'Bearer ' + userData.bearer
                }
              }).then(function(res) {
                    let list = res.data.data;
                    let userData = JSON.parse(localStorage.getItem('userData'));
                    list.level = Number(list.level) - Number(userData.level);
                   _this.detailedData = list;
                   _this.rebate_info = list.rebate_info;
              });

              _this.isDetail = true;
          },
          //   详情搜索
          incomeSearch(){

          },
          changestarttime(time) {
            console.log(`${this.starttime} 00:00:00:000`);
          },
          changeendtime(time) {
            console.log(`${this.endtime} 00:00:00:000`);
          },
          closeDialog(){
            this.isDetail = false;
            this.starttime = '开始时间';
            this.endtime = '结束时间';
          }
        }
    }
</script>

<style rel="stylesheet" lang="scss" scoped>
  @import '../../assets/scss/main.scss';
  #userList {
    padding-top: 46px;
    /* 搜索框 */
    .ul-search {
      position: fixed;
      width: 100%;
      font-size: 13px;
      background-color: #fbf9fe;
      z-index: 2;
      .search {
        padding: 5px 0;
        >div:nth-of-type(1) {
          float: left;
          margin: 0 2%;
          width: 28%;
          text-align: center;
          .weui-cells {
            border: 1px solid #D9D9D9;
            &:before {
              border-top: none;
            }
            &:after {
              border-bottom: none;
            }
            .weui-select {
              padding-right: 20px;
              padding-left: 2px;
              width: auto;
              height: 28px;
              line-height: 28px;
              font-size: 13px;
            }
            .weui-cell__bd:after {
              right: 10px;
              border-width: 0 2px 2px 0;
            }
          }
        }
        .vux-x-input {
          box-sizing: border-box;
          padding: 14px 8px;
          float: left;
          width: 42%;
          height: .7rem;
          border-radius: 5px;
          border: 1px solid #e9e9e9;
          background-color: #fff;
        }
        .weui-btn {
          margin: 0 2%;
          width: 22%;
          height: .68rem;
        }
      }
      /* 表头 */
      .title {
        th {
          .weui-cells {
            background-color: #f7f7f7;
            &:before {
              border-top: none;
            }
            &:after {
              border-bottom: none;
            }
          }
          .weui-select {
            padding-right: 20px;
            padding-left: 4px;
            width: auto;
            height: 38px;
            line-height: 38px;
            font-size: 13px;
          }
          .weui-cell__bd:after {
            right: 10px;
            border-width: 0 2px 2px 0;
          }
        }
        .vux-table {
          th {
            font-size: 13px;
          }
        }
      }
    }

    /* 弹出详细框  */
    .ul-xdialog {
      position: relative;
      box-sizing: border-box;
      width: 90%;
      padding-bottom: 30px;
      border: 1px solid #c7c7c7;
      border-radius: 10px;
      margin-top: 17%;
      height: 80%;
      left:5%;
      background-color: #fff;
      .vux-x-icon {
        position: absolute;
        bottom: 3px;
        left: 50%;
        transform: translateX(-50%);
      }
      .search-income {
        margin: 0 2%;
        width: 96%;
        .vux-datetime {
          padding: 5px 5px;
          display: inline-block;
          width: 29%;
          font-size: 14px;
        }
        .weui-cell:before {
          display: none;
        }
        .weui-cell_access .weui-cell__ft {
          padding-right: 0;
          text-align: center;
          &:after {
            display: none;
          }
        }
      }
      .table-income-title {
        font-size: 14px;
        line-height: 40px
      }
      .table-detail {
        font-size: 14px;
        tr {
          td:nth-of-type(1) {
            padding-right: 20px;
            width: 40%;
            text-align: right;
          }
        }
      }
      .table-income-scroll {
        margin-top: 8px;
        height: 151px;
        max-height: 151px;
        overflow-y: auto;
      }
      .table-income {
        font-size: 12px;
        line-height: 30px;
        tr {
          td:nth-of-type(1) {
            width: 50%;
            text-align: center;
          }
        }
      }
      .up{
        width: 51%;
        font-size: .3rem;
      }
    }
  }
</style>
<style>
  .search .weui-cells{
    margin-top: 0!important;
    border-radius: 5px;
    height: .7rem!important;
    line-height: .7rem!important;
    border-left: 1px solid #efefef;
    border-right: 1px solid #efefef;
  }
  .weui-select{
    height: .7rem!important;
    line-height: .7rem!important;
    font-size: 13px!important;
    overflow: hidden;
  }
  .weui-cell:before{
    border-top:none!important;
  }
  .weui-cell_access .weui-cell__ft{
    padding-right: 0!important;
  }
  .weui-cell__ft{
    text-align: left!important;
  }
  .ul-xdialog .vux-no-group-title{
    padding: .1rem 0;
  }
</style>
