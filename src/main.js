// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import VueRouter from 'vue-router';
import Resouce from 'vue-resource';
import FastClick from 'fastclick';
import mint from 'mint-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import vueLazyImg from 'vue-lazyloadimg';

// 如果你要定制一些swiper插件的话，这段代码是个示例，否则不用care
VueAwesomeSwiper.swiperPlugins.debugger = (swiper, params) => {
    if (!params) return;
    // Need to return object with properties that names are the same as callbacks
    return {
        onInit(swiper) {
            console.log('onInit');
        },
        onClick(swiper, e) {
            console.log('onClick');
        },
        onTap(swiper, e) {
            console.log('onTap');
        },
    }
}

import 'mint-ui/lib/style.css'
import '../static/css/neat-min.css'
import './assets/css/style.css'

Vue.use(mint)
Vue.use(VueRouter);
Vue.use(Resouce);
Vue.use(VueAwesomeSwiper);
//Vue.use(vueLazyImg)
Vue.filter('time', function(val) {
    var result;
    if (val) {
        var d = new Date(val),
            Y = d.getFullYear() + '-',
            M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-',
            D = (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + ' ',
            h = (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':',
            m = (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ':',
            s = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
        result = Y + M + D + h + m + s;
        return result;
    } else {
        return "";
    }
})

Vue.filter('day', function(val) {
    var result;
    if (val) {
        result = val.toString().substr(0, 5);
        return result;
    } else {
        return "";
    }
})

FastClick.attach(document.body);

/* eslint-disable no-new */
var vm = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    data: {}
})

Date.prototype.format = function(fmt){ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}