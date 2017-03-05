<template>
  <div class="nba">
   <ul class="all">
      <li v-for="game in gameList" class="clear" >
       <div class="date">{{game.title}}</div>

       <div v-for="item in game.tr" class="clear">
        <a v-bind:href="item.m_link1url">    
          <div class="col game-time score">
             <span>{{item.time}}</span> 
          </div>
          <div class="col team">
             <img :src="item.player1logo">
            <span>{{item.player1}}</span>
          </div>
          <div class=" col point">
            <span class="score">{{item.score}}</span>
          </div>
          <div class="col team">
             <img :src="item.player2logo">
             <span>{{item.player2}}</span>
          </div> 
          </a>
         </div>         
      </li>
   </ul>
  </div>
</template>

<script type="es6">
  import { Indicator } from 'mint-ui';
  import {parseLogo,compare} from '../common/parseLogo'
import $ from 'webpack-zepto';
  export default {
    data(){
      return {
        gameList:[]
      }
    },
    created(){
       this.getNBAdata();
    },
    //通过路由的before钩子解除router-view缓存限制
    /*beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showHead')
        vm.get();
        window.onscroll=()=>{
          vm.opacity=window.pageYOffset/250;
          vm.$store.commit('setHeadStyle',{background:'rgba(43,162,251,'+vm.opacity+')'})
        }
      })
    },
    beforeRouteLeave(to,from,next){
      this.$store.commit('hideHead');
      window.onscroll=null;
      next()
    },*/
    mounted(){
     
    },
    methods:{
      getNBAdata(){
        var self=this;
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
      $.ajax({
       type:"GET",
       url:'http://localhost:3000/NBA' ,
       data:{},
       success:function(res){
            self.gameList=res.list;
             Indicator.close();   
        }
      })      
    }
  }
  }
</script>

<style scoped>
.clear:after{content:".";display:block;height:0;clear:both;visibility:hidden}
.clear{*+height:1%;}
.nba{margin-top:90px;}
.date{text-align:left;padding-left:5%;font-size:16px;}
.game-time{text-align:left; }
.col{width:25%;float:left;}
.vetical_center{display:flex;-webkit-align-items: center; justify-content: center;align-items: center; }
.score{line-height:90px;}
.clear a{color:#333;}
    ul li{padding: 5px 3%;font-size: 12px;margin-bottom: 5px;border-bottom: 1px solid #fafafa;border-bottom:1px solid #efefef;}
    ul li>span:first-child{width: 25%;float: left;}
    ul li>span{width: 25%;display: inline-block}
    ul li>span:nth-child(3){width: 10%;}
</style>

