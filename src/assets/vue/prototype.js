/*
*   created by Linzy in 2018.2.25
* */
import Vue from 'vue'
import jquery from 'jquery';
import qs from 'querystring';
import underscore from 'underscore';

Vue.prototype.qs = qs;
Vue.prototype._ = underscore;
Vue.prototype.$ = jquery;
// 引入vux自带的工具函数
import {
  base64,
  md5,
  dateFormat,
  numberComma, numberPad, numberRandom,
  // stringTrim,
  // querystring
} from 'vux';

// 全局引入
Vue.prototype.$ = jquery;
Vue.prototype.qs = qs;
Vue.prototype._ = underscore;
Vue.prototype.base64 = base64;
Vue.prototype.md5 = md5;
Vue.prototype.dateFormat = dateFormat;
Vue.prototype.numberComma = numberComma;
Vue.prototype.numberPad = numberPad;
Vue.prototype.numberRandom = numberRandom;
// Vue.prototype.stringTrim = stringTrim;
// Vue.prototype.querystring = querystring;

// 全局引入 改变title 适用于一个模块承当多个页面的情况
Vue.prototype.changeTitle = (title) => {
  let eleTitle = document.getElementsByTagName('title')[0];
  eleTitle.innerHTML = title
};

// 生成json的方法 makeJson
Vue.prototype.makeJson = (arr1, arr2, key1, key2) => {
  let arr = [];
  for (let i = 0; i < arr1.length; i++) {
    let obj = {};
    obj[key1] = arr1[i];
    obj[key2] = arr2[i];
    arr.push(obj)
  }
  return arr;
};

// 对象加前缀 + 清除属性为空的值 不传pre前缀 则为筛选非空对象属性
Vue.prototype.preData = function (obj, pre) {
  var tempObj = {};
  if (pre) {
    for (var k in obj) {
      if (obj[k] || obj[k] === 0) {
        tempObj[pre + k] = obj[k]
      }
    }
  } else {
    for (var k in obj) {
      if (obj[k] || obj[k] === 0) {
        tempObj[k] = obj[k]
      }
    }
  }
  return tempObj
};

//对象加前缀
Vue.prototype.addPre = function (obj, pre) {
  var tempObj = {};
  for (var k in obj) {
    tempObj[pre + k] = obj[k]
  }
  return tempObj
};

// 重新登录
Vue.prototype.reLogin = function() {
  localStorage.removeItem("userData");
  localStorage.removeItem("loginName");
  this.$router.replace({ name: "login" });
};

