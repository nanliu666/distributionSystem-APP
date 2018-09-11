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
                        <tbody>
                        <tr>
                            <td>Apple</td>
                            <td>$1.25</td>
                        </tr>
                        <tr>
                            <td>Banana</td>
                            <td>$1.20</td>
                        </tr>
                        </tbody>
                    </x-table>  
                </div> 
                <div v-else>
                    <button-tab class="XBTab">
                        <button-tab-item selected>
                            一局以上
                        </button-tab-item>                        
                        <button-tab-item>
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
                                <th style="width: 25%">日期</th>
                                <th style="width: 25%">每天玩1局以上用户数（个）</th>
                                <th style="width: 25%">总用户数</th>
                                <th style="width: 25%">占总用户数比例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Apple</td>
                                <td>Apple</td>
                                <td>Apple</td>
                                <td>Apple</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
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
import { Tab, TabItem, Swiper, SwiperItem, XTable,  ButtonTab, ButtonTabItem, DatetimeRange, Group } from "vux";
const swiperList = () => ["活跃用户", "新增用户", "游戏数据"];

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
    data() {
        return {
            index: 0,
            startTitle:"选择开始日期",
            endTitle:"选择结束日期",
            startValue: "2015-11-12",
            endValue: "2015-11-13",
            swiperList: swiperList(),
        }
    },
    methods: {
        btnSearch() {
            let searchUnix = moment(this.dayValue).unix()
            this.ajax(searchUnix)
        },
        ajax(params) {
            let userData = JSON.parse(localStorage.getItem('userData'))
            console.log(userData)
            this.axios({

            })
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


