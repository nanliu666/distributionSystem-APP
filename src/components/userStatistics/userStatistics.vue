<template>
    <div id='userStatistics'>
        <tab :line-width=2  v-model="index">
            <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
        </tab>

        <swiper v-model="index"  :show-dots="false" class="XSwiper">
            <swiper-item v-for="(item, index) in list2" :key="index">
                <div v-if="index !== 2">
                    <datetime-range :title="选择" start-date="2017-01-01" end-date="2017-02-02"  v-model="value" ></datetime-range>
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
                    <tab v-model="index1" bar-active-color="#668599">
                        <tab-item class="vux-center" v-for="(item, index) in list1" :key="index">{{item}} </tab-item>
                    </tab>
                    <swiper v-model="index1"  :show-dots="false" class="XSwiper">
                        <swiper-item v-for="(item, index) in list1" :key="index">
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
                                        <td>1</td>
                                    </tr>
                                </tbody>
                            </x-table>
                        </swiper-item>
                    </swiper>
                </div>
            </swiper-item>            
        </swiper>

    </div>
</template>
<script>
import { loadMore } from "../../js/loadmore.js";
import { Tab, TabItem, Swiper, SwiperItem, XTable,  ButtonTab, ButtonTabItem, DatetimeRange } from "vux";
const list = () => ["活跃用户", "新增用户", "游戏数据"];
const list1 = () => ["一局以上", "30分钟以上"];

export default {
    components: {
        Tab,
        TabItem,
        Swiper,
        SwiperItem,
        XTable,
        ButtonTab,
        ButtonTabItem,
        DatetimeRange 
    },
    data() {
        return {
        index: 0,
        index1: 0,
        demo2: "活跃用户",
        list2: list(),
        list1: list1(),
        value: ['2017-01-15']
        }
    },
};
</script>

<style lang='less' scoped>
#userStatistics {
    padding-top: 46px;
    .width50 {
        width: 50%;
    }
    .XSwiper {
        margin: 10px
    }
}
</style>


