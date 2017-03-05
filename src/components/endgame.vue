<template>
  <div class="">
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
        </li>
   </ul>
  </div>
</template>

<script>
import { Indicator,Cell } from 'mint-ui';
import {parseLogo,compare} from '../common/parseLogo'
import $ from 'webpack-zepto';
let list_index=[]

const leagueList=["法甲",'意甲','德甲','西甲',"英超"];//"中超"
var football_league_api = 'http://localhost:3000/football/' ;
export default{
data(){
return {
  gameList:[]
}
},
created(){
 
},
mounted(){
 this.getEndGames()
},
components:{},
methods:{
getEndGames(){
   var self=this;
  /*Indicator.open({
    text: '加载中...',
    spinnerType: 'snake'
  });*/   
     if(leagueList.length==0){
          Indicator.close();   
          list_index=list_index.filter((item)=>(item.c4R!=='VS')) ;        
          list_index=parseLogo(list_index);
          self.gameList=list_index.sort(compare);
          console.log(self.gameList.length);
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
            self.getEndGames();
        }
      }) 
   }   
},
}
}

</script>

<style scoped>
  .rank-banner-wrap{height: 250px;background-size: 100%}
    ul li{padding: 5px 3%;font-size: 12px;margin-bottom: 5px;height:100px;border-bottom: 1px solid #fafafa;}
    ul li>span:first-child{width: 25%;float: left;}
    ul li>div{width: 25%;display: inline-block;float:left}
    ul li>span:nth-child(3){width: 10%;}
  .point{font-size: 16px;line-height:40px;}
  .clear:after {content: " "; display: block; clear: both; height: 0;}.clear {zoom: 1;}
  .game-time,.point{line-height:100px;}
  .all{margin-top:90px;}
</style>
