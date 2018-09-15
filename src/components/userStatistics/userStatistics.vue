<template>
    <div id='userStatistics'>
        <tab :line-width=2  v-model="index">
            <tab-item class="vux-center"  v-for="(item, index) in swiperList" :key="index">{{item}}</tab-item>
        </tab>
        <swiper v-model="index"  :show-dots="false" height="600px" class="XSwiper">
            <swiper-item v-for="(item, index) in swiperList" :key="index">
                <div v-if="index !== 2">
                    <group>
                        <datetime v-model="startValue" :title="startTitle"></datetime>
                        <datetime v-model="endValue" :title="endTitle"></datetime>
                        <x-button type="primary" @click.native="btnSearch" action-type="submit" plain class="XButton">搜索</x-button>
                    </group>
                    <x-table  full-bordered  style="background-color:#fff;">
                        <thead>
                        <tr>
                            <th class="width50">日期</th>
                            <th v-if="index === 0" class="width50">活跃用户数（个）</th>
                            <th v-else class="width50">新增用户数（个）</th>
                        </tr>
                        </thead>
                        <tbody v-if="index === 0">
                            <tr v-for="(item, index) in hotActive">
                                <td>{{item.date}}</td>
                                <td>{{item.numberActive}}</td>
                            </tr>
                        </tbody>                        
                        <tbody v-else>
                            <tr v-for="(item, index) in newAdd">
                                <td>{{item.date}}</td>
                                <td>{{item.numberActive}}</td>
                            </tr>
                        </tbody>
                    </x-table>  
                </div> 
                <div v-else>
                    <button-tab class="XBTab">
                        <button-tab-item selected @on-item-click="Toggle">
                            一局以上
                        </button-tab-item>                        
                        <button-tab-item @on-item-click="Toggle">
                            30分钟以上
                        </button-tab-item>
                    </button-tab>
                    <group>
                        <datetime v-model="startValue" :title="startTitle"></datetime>
                        <datetime v-model="endValue" :title="endTitle"></datetime>
                        <x-button type="primary" action-type="submit"  plain class="XButton">搜索</x-button>
                    </group>
                    <x-table full-bordered style="background-color:#fff;">   
                        <thead>
                            <tr>
                                <th v-for="(item, index) in gameHead" :key="index" style="width: 25%">{{item}}</th>
                            </tr>
                        </thead>
                        <tbody v-show="oneGame">
                            <tr v-for="(item, index) in gameAddOne" :key="index">
                                <td>{{item.date}}</td>
                                <td>{{item.numberActive}}</td>
                                <td>{{item.all}}</td>
                                <td>{{item.ratio}}%</td>
                            </tr>
                        </tbody>                        
                        <tbody v-show="ThreeMin">
                            <tr v-for="(item, index) in gameAddThree" :key="index">
                                <td>{{item.date}}</td>
                                <td>{{item.numberActive}}</td>
                                <td>{{item.all}}</td>
                                <td>{{item.ratio}}%</td>
                            </tr>
                        </tbody>
                    </x-table>
                </div>
            </swiper-item>            
        </swiper>

    </div>
</template>
<script>
import moment from "moment"
const Mock = require('mockjs')
import { Tab, TabItem, Swiper, SwiperItem, XTable,  ButtonTab, ButtonTabItem, DatetimeRange, Group } from "vux";
const swiperList = () => ["活跃用户", "新增用户", "游戏数据"];
const gameHeadList = () => ["日期", "每天玩1局以上用户数（个）","总用户数", "占总用户数比例"]
const Random = Mock.Random;


export default {
    components: {
        Tab,
        TabItem,
        Swiper,
        SwiperItem,
        XTable,
        ButtonTab,
        ButtonTabItem,
        DatetimeRange ,
        Group
    },
    created() {
        this.produceNewsData()
        this.produceGameData()
    },
    data() {
        return {
            index: 0,
            startTitle:"选择开始日期",
            endTitle:"选择结束日期",
            startValue: "2015-11-12",
            endValue: "2015-11-13",
            swiperList: swiperList(),
            gameHead: gameHeadList(),
            hotActive: [],
            newAdd: [],
            gameAddOne:[],
            gameAddThree:[],
            oneGame: false,
            ThreeMin: true
        }
    },
    methods: {
        btnSearch() {
            let [startValue, endValue] = [moment(this.startValue).unix(),  moment(this.endValue).unix()]
            let params = {startValue, endValue}
            this.ajax(params)
        },
        Toggle() {
            this.oneGame = !this.oneGame
            this.ThreeMin = !this.ThreeMin
        },
        //mock 新增 活跃数据
        produceNewsData() {
            for (let i = 0; i < 5; i++) {
                let newArticleObject = {
                numberActive: parseInt(Math.random()*5), //  Random.csentence( min, max )
                date: Random.date()  // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
                }
            this.hotActive.push(newArticleObject)
            this.newAdd.push(newArticleObject)
            }
            this.hotActive  = this._.sortBy(this.hotActive, function(item) {
                return item.date;
            });                
            this.newAdd  = this._.sortBy(this.newAdd, function(item) {
                return item.date;
            });    
        },
        // mock游戏数据
        produceGameData() {
            for(let i = 0; i < 10; i++) {
                let newObj = {
                    date: Random.date(),
                    numberActive: parseInt(Math.random()*10),
                    all: parseInt(Math.random()*10),
                    ratio: parseInt(Math.random()*(10+1),10)
                }                
                let newObjThree = {
                    date: Random.date(),
                    numberActive: parseInt(Math.random()*10),
                    all: parseInt(Math.random()*10),
                    ratio: parseInt(Math.random()*(10+1),10)
                }
                this.gameAddOne.push(newObj)
                this.gameAddThree.push(newObjThree)
            }
            this.gameAddOne  = this._.sortBy(this.gameAddOne, function(item) {
                return item.date;
            });                
            this.gameAddThree  = this._.sortBy(this.gameAddThree, function(item) {
                return item.date;
            });  
        },

        ajax(params) {
            //TODO： axios对接后端，401未授权
            let userData = JSON.parse(localStorage.getItem('userData'))
            let ajaxConfig = {
                methods: 'POST',
                url: `relation/subdetail`,
                // headers: {'Authorization': 'Bearer ' + userData.bearer},
                data:{
                    start_time: params.startValue, 
                    end_time: params.endValue,
                    id: userData.relation_id
                }
            }
            console.log(ajaxConfig.data)
            this.axios(ajaxConfig)
                .then((result) => {
                    console.log(result)
                }).catch((err) => {
                    console.log(err)
                });
        }
    },
};
</script>

<style lang='less' scoped>
#userStatistics {
    a {
        text-decoration: none;
    }
    padding-top: 46px;
    .width50 {
        width: 50%;
    }
    .XSwiper {
        margin:-13px 10px 10px;
    }
    .XButton {
        margin-bottom: 10px 
    }
    .XBTab {
        margin: 20px 0 -13px
    }
}
</style>


