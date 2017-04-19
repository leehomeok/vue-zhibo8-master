<template>
  <div class="player">
   <rankHead></rankHead>
   <div class="content">
      <div class="c_top clear">
        <div class="t_logo">
           <img v-bind:src="player.player_img">
        </div>
        <div class="t_info">
          <h1>{{player.player_name}}</h1>
          <p>{{player.team_name}}</p>
        </div>  
      </div>
    <div class="tab_nav">
       <ul class="clear tab_li" >
          <li class="half" v-bind:class="{'active':item==active}" v-for="(item,index) in tabs" @click="active=item">{{item}}</li>
       </ul>
  </div>

    <section v-show="active=='基本信息'">
       <div class="team_info">
         <div class="clear">
           <p><label>国籍：</label><span>{{player.country}}</span></p> 
           <p><label>位置：</label><span>{{player.position}}</span></p> 
         </div>
         <div class="clear">
           <p><label>出生日期：</label><span>{{player.birth}}</span></p> 
           <p><label>年龄：</label><span>{{player.age}}</span></p> 
         </div>
         <div class="clear">
           <p><label>身高：</label><span>{{player.high}}</span></p> 
           <p><label>体重：</label><span>{{player.weight}}</span></p> 
         </div>
         <div class="clear">
           <p><label>出生地：</label><span>{{player.b_country}}</span></p> 
           <p><label>惯用脚：</label><span>{{player.foot}}</span></p> 
         </div>
       </div>
       <p class="title">荣誉室（俱乐部）：</p>
       <div class="outer_wrap clear">        
         <div class=" honor">
             <table class="full_width">                
               <tbody>
                  <tr v-for="(honor,index) in player.hour.club" v-if="honor.row">
                       <td  :rowspan="honor.row" >{{honor[0]}} </td>
                       <td>{{honor[1]}}</td>
                       <td>{{honor[2]}}</td>
                  </tr>

                   <tr v-else>
                      <td>
                           {{honor[0]}}
                       </td>
                       <td >
                           {{honor[1]}}
                       </td>
                        <td v-if="honor[2]">
                         {{honor[2]}}
                       </td>
                   </tr>
               </tbody>
             </table>          
         </div>         
       </div>
       
         <p class="title">荣誉室（国家）</p> 
        <div class="outer_wrap clear">        
         <div class=" honor">
             <table class="full_width">                
               <tbody>
                  <tr v-for="(honor,index) in player.hour.country" v-if="honor.row">
                       <td  :rowspan="honor.row" >{{honor[0]}} </td>
                       <td>{{honor[1]}}</td>
                       <td>{{honor[2]}}</td>
                  </tr>

                   <tr v-else>
                      <td>
                           {{honor[0]}}
                       </td>
                       <td >
                           {{honor[1]}}
                       </td>
                       <td v-if="honor[2]">
                         {{honor[2]}}
                       </td>
                       </tr>
               </tbody>
             </table>          
         </div>         
       </div>

        <p class="title">转会历史</p> 
        <div class="outer_wrap clear">        
         <div class=" trans">
             <table class="full_width">   
               <thead>
                  <tr>
                   <th>时间</th>
                   <th>从</th>
                   <th>到</th>
                   <th>值</th>
                  </tr>
               </thead>             
               <tbody>
                  <tr v-for="(trans,index) in player.transfer">
                       <td v-for="t in trans"> {{t}}</td>
                  </tr>            
               </tbody>
             </table>          
         </div>         
       </div>

    </section>

 
    <!--<section v-show="active=='技术统计'">
      <p class="title">近期比赛：</p>
      <div class="outer_wrap clear" style="margin-bottom:10px;">
        <div class="table_left">
          <div>赛事</div>
          <div v-for="item in football_team.saicheng.zb.list">
             {{item.game}}
          </div>
        </div>       
        <div class="table_content">
          <table class="match" style="width:300px;" >
             <thead>
              <tr>              
               <td>比赛时间</td>
               <td>主队</td>
               <td>比分</td>
               <td>客队</td>
               <td>胜负</td>               
              </tr>
             </thead>
             <tbody>
               <tr v-for="item in football_team.saicheng.zb.list">
                 <td>{{item.game_date}}</td>
                 <td>{{item.host}}</td>
                 <td>{{item.score}}</td>
                 <td>{{item.guest}}</td>
                 <td>{{item.win_lose}}</td>
               </tr>
             </tbody>
          </table>
        </div>
      </div>
      <p class="title">未来5场比赛</p>

      <div class="outer_wrap clear" style="margin-bottom:10px;">
        <div class="table_left">
          <div>赛事</div>
          <div v-for="item in football_team.saicheng.future.list">
             {{item.game}}
          </div>
        </div>       
        <div class="table_content">
          <table class="match" style="width:300px;" >
             <thead>
              <tr>              
               <td>比赛时间</td>
               <td>主队</td>
               <td>比分</td>
               <td>客队</td>
               <td>胜负</td>               
              </tr>
             </thead>
             <tbody>
               <tr v-for="item in football_team.saicheng.future.list">
                 <td>{{item.game_date}}</td>
                 <td>{{item.host}}</td>
                 <td>{{item.score}}</td>
                 <td>{{item.guest}}</td>
                 <td>{{item.win_lose}}</td>
               </tr>
             </tbody>
          </table>
        </div>
      </div>
    </section>
      -->


   </div>


   </div>

</template>

<script>
    
  import { Cell,Indicator, TabContainer, TabContainerItem  } from 'mint-ui'
  import { mapState, mapActions, mapGetters } from 'vuex'
  import rankHead from './header/rank-head'; 
  import $ from 'webpack-zepto';
  import  {teams} from '../json/football_teams.js';
  import _ from 'lodash';
  export default {
      data(){
        return {
          active:'基本信息',
          tabs:['基本信息','技术统计']
      
        }
      },
   created(){
      this.getPlayer()
    },
    mounted(){

    },
    beforeUpdate(){
    },
    computed(){

    },
 components:{
   rankHead, Cell,Indicator
   },
   computed:{
    ...mapState(['player','title']),
    ...mapGetters(['teams']),
  },
    methods:{
      getPlayer(){
          var _this=this;
       
          console.log(_this.$store.state.player);
       },   
    }
  }
</script>

<style scoped>
.tab_nav li.half{width:50%!important;}
.t_logo{width:40%;margin-right:5px;}
.t_info{width:55%;}
.full_width{width:100%;}
.full_width tr td,.full_width tr th{border-right:1px solid #ccc;border-bottom:1px solid #ccc;}
.honor tr td{width:33.33333333%; }
.trans tr td{width:25%; }
.trans{}
</style>