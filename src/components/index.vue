<template>
  <div>
    <swiper :options="swiperOption"  ref="mySwiperA" class="swipe">      
    <swiper-slide  v-for="item in ImgList">
     <img :src="item.src" alt="">
     <p>{{item.title}}</p>
    </swiper-slide>
        <div class="swiper-pagination"></div>
    </swiper>
 


    <div>
      <ul class="all">
        <li v-for="item in gameList" class="clear" >
          <div class="game-time">
             <span>{{item.c2 |day}} {{item.c3}}</span> 
          </div>
          <div class="team">
             <img :src="item.tm1_img">
            <span>{{item.c4T1}}</span>
          </div>
          <div class="point">
            <span>{{item.c4R}}</span>
          </div>
          <div class="team">
             <img :src="item.tm2_img">
             <span>{{item.c4T2}}</span>
          </div>
          <div class=clock>
             <img src="../assets/clock1.png">   
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
import $ from 'webpack-zepto';
var  list_index=[];

var NBAList=[];
const leagueList=["法甲",'意甲','德甲','西甲',"英超"];//'中超'
var football_league_api = 'http://localhost:3000/football/' ;

export default{
  components: {
     swiper,
    swiperSlide,   
    Indicator,
    Cell
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
 mounted() {
    // you can use current swiper object to do something(swiper methods)
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    //console.log('this is current swiper object', this.swiper)
    //this.swiper.slideTo(3, 1000, false)
  },
methods:{  
   getData(){
     var self=this;
     if(leagueList.length==0){
          Indicator.close();     
          list_index=list_index.filter((item)=>(item.c4R==='VS')) ;             
          list_index=parseLogo(list_index);
          this.gameList=list_index.sort(compare);
          //console.log(JSON.stringify(list_index));
      }else{
       Indicator.open({
         text: '加载中...',
         spinnerType: 'snake'
       }); 
      $.ajax({
       type:"GET",
       url:football_league_api + leagueList[0],
       data:{},
       success:function(res){
            leagueList.shift();
            list_index=list_index.concat(res.result.views.saicheng1);  
            list_index=list_index.concat(res.result.views.saicheng2);         
            self.getData();
        }
      }) 
   }     
 },
  
    getSwipeImg(){
      var that=this;
      $.ajax({
       type:"GET",
       url:"http://localhost:3000/getImg" ,
       data:{},
       success:function(res){
         if(res.code==200){
            that.ImgList=res.data;             
         }
        }
      }) 
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
