<template>
  <div>
    <swiper :options="swiperOption"  ref="mySwiperA" class="swipe">      
    <swiper-slide  v-for="item in banners"
      :key="item.src">
     <img :src="item.src" alt="">
     <p>{{item.title}}</p>
    </swiper-slide>
        <div class="swiper-pagination"></div>
    </swiper>
 
    <div>
      <ul class="all clear" v-if="news.length">
        <li v-for="item in news" 
          :key="item.hostTeam">
          <div class="game-time">
             <span>{{item.sTime}}</span> 
          </div>
          <div class="team">
            <img v-if="item.hostLogo" class="team-logo" :src="item.hostLogo.replace('//duihui.qiumibao.com', '../static/assets/images')" alt="">
            <span>{{item.hostTeam}}</span>
          </div>
          <div class="point">
            <span>{{item.score}}</span>
          </div>
          <div class="team">
             <img v-if="item.guestLogo" class="team-logo" :src="item.guestLogo" alt="">
             <span>{{item.guestTeam}}</span>
          </div>
          <div class=clock>
            <p v-if="item.situation">{{item.situation}}</p>
             <img v-else width="24" height="24" src="../assets/clock1.png">   
          </div>
        </li>
    </ul>
    </div>
  </div>
</template>

<script>
import { Indicator,Cell } from 'mint-ui';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {parseLogo,compare} from '../common/parseLogo'
import {mapGetters} from 'vuex'
import $ from 'webpack-zepto';

let list_index=[];
export default{
  components: {
    swiper, swiperSlide, Indicator, Cell
  },
  computed: {
    ...mapGetters({
      news: 'news',
      banners: 'banners'
    })
  },
  watch: {
    news (val) {
      if (val.length) {
        Indicator.close();
      }
    }
  },
  data(){
    return {
      gameList:[],
      ImgList:[],
      swiperOption: {
        autoplay: 3500,
        setWrapperSize :true,
        pagination : '.swiper-pagination',
        paginationClickable :true,
        mousewheelControl : true,
        observeParents:true,
      },
    }
  },
  created(){
    this.getData();
    this.getSwipeImg();
  },
  methods:{  
    getData(){
      if (!this.news.length) {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        })
        this.$store.dispatch('GET_NEWS')
      }
    },
    getSwipeImg () {
      if (!this.banners.length) {
        this.$store.dispatch('GET_BANNER')
      }
    }, 
  }
}
</script>
<style scoped>
.swipe{margin-top: 94px;}
.mint-indicator-wrapper,.mint-indicator{z-index:100;top:60%;}
.mint-swipe {   height: 39vw !important;  }
.mint-swipe-indicator { width: 12px !important;  height: 12px !important;  }
.mint-swipe-indicators { bottom: 5px !important;  }
.team-logo{
  width:60px; 
  height:60px;
  display:inline-block;
}
ul li{padding: 5px 3%;font-size: 12px;margin-bottom: 5px;height:100px;border-bottom: 1px solid #fafafa;}
ul li>span:first-child{width: 25%;float: left;}
ul li>span{width: 25%;display: inline-block}
ul li>span:nth-child(3){width: 10%;}
.audio-view{display: none;}
.clock{   display:flex;    -webkit-align-items: center;    justify-content: center;   align-items: center;  }
.all li>div{float: left;width:20%;height: 100%;}
.game-time>span,.point span{line-height: 100px;}
.team img{margin-bottom: 5px;}
.swiper-wrapper>div{position: relative;}
.swiper-wrapper>div>p{position: absolute;bottom: 0;left: 0;color: #fff;background: rgba(0,0,0,.5);width:100%;text-align: center;height: 20px;line-height: 20px;}    
</style>
