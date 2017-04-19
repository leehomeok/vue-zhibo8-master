<template>
   
   <div class="team">
   <rankHead></rankHead>
   <div class="content">
      <div class="c_top clear">
        <div class="t_logo">
           <img v-bind:src="football_team.team_logo">
        </div>
        <div class="t_info">
          <h1>{{football_team.saicheng.team_info.team_name||football_team.saicheng.team_info.all_name}}</h1>
          <p>{{football_team.saicheng.team_info.match}}</p>
        </div>  

      </div>
    <div class="tab_nav">
       <ul class="clear tab_li" >
          <li v-bind:class="{'active':item==active}" v-for="(item,index) in tabs" @click="active=item">{{item}}</li>
       </ul>
  </div>

    <section v-show="active=='球队'">
       <div class="team_info">
         <div class="clear">
           <p><label>全称：</label><span>{{football_team.saicheng.team_info.team_name||football_team.saicheng.team_info.all_name}}</span></p> 
           <p><label>所在城市：</label><span>{{football_team.saicheng.team_info.city}}</span></p> 
         </div>
         <div class="clear">
           <p><label>球队主场：</label><span>{{football_team.saicheng.team_info.team_host}}</span></p> 
           <p><label>主教练：</label><span>{{football_team.saicheng.team_info.coach}}</span></p> 
         </div>
       </div>
       <p class="title">{{football_team.saicheng.jfb.title}}：</p>
       <div class="outer_wrap clear">
         <div class="table_left">
           <div class="data_title data_val ">&nbsp;</div>
           <div class="data_title">
                       <span>总成绩</span>
              </div>
              <div class="data_val odd">
                            <span>主场</span>
                 </div>
                 <div class="data_val">
                        <span>客场</span>
                   </div>
         </div>
         <div class="table_content">
             <table class="player_table_500">
                <thead>
                  <tr>
                    <th>排名</th>
                    <th>赛</th>
                    <th>积分</th>
                    <th>胜</th>
                    <th>平</th>
                    <th>负</th>
                    <th>得</th>
                    <th>失</th>
                    <th>净</th>
                    <th>胜率</th>
                    <th>平率</th>
                    <th>负率</th>
                    <th>均得</th>
                    <th>均失</th>
                    <th>近6轮走势</th>
                  </tr>
                </thead>
               <tbody>
                  <tr v-for="(item,index) in football_team.saicheng.jfb.list">
                    <td>{{item.rank}}</td>
                    <td>{{item.sai}}</td>
                    <td>{{item.win}}</td>
                    <td>{{item.equal}}</td>
                    <td>{{item.lose}}</td>
                    <td>{{item.well}}</td>
                    <td>{{item.lost}}</td>
                    <td>{{item.jing}}</td>
                    <td>{{item.win_rate}}</td>
                    <td>{{item.equal_rate}}</td>
                    <td>{{item.lose_rate}}</td>
                    <td>{{item.e_well}}</td>
                    <td>{{item.e_lost}}</td>
                    <td>{{item.score}}</td>
                    <td>{{item.trend_6}}</td>
                  </tr>
               </tbody>
             </table>          
         </div>
         
       </div>
       
         <p class="title">荣誉室</p> 
         <div class="rys">
            <table>
              <colgroup  align="center" valign="middle"></colgroup>
              <colgroup align="right" ></colgroup>
              <tbody>
              <tr class="" v-for="(item,index) in football_team.honor">
                <td class="honor">{{item.name}}</td>
                <td class="years">{{item.date}}</td>
              </tr>
              </tbody>
            </table>

         </div>

    </section>

   <section class="team_player" v-show="active=='球员'">
     <p class="title">球队阵容：</p>
     <table>
       <tbody v-for="item in football_team.players">        
         <tr>
           <td colspan="2" class="p_title">{{item.title}}</td>           
         </tr>
          <tr>
           <td>号码</td>
           <td>球员姓名</td>
          </tr>
       <tr v-for="player in item.list">
        <td>
           {{player.player_num}}
        </td>
         <td>
           <a @click="goPlayerDetail(player)">{{player.player_name}}</a>
        </td>  
      </tr>
      </tbody>
      
      
      </table>
    </section>

    <section v-show="active=='赛程'">
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



   </div>


   </div>
</template>


<script>
 import { Cell,Indicator, TabContainer, TabContainerItem  } from 'mint-ui'
  import { mapState, mapActions, mapGetters } from 'vuex'
  import rankHead from './header/rank-head'; 
  import $ from 'webpack-zepto';
  import  {teams} from '../json/football_teams.js'
  export default {
      data(){
        return {
          active:'球队',
          tabs:['球队','球员','赛程']
      
        }
      },
   created(){
      this.getTeam()
    },
    mounted(){

    },
 components:{
   rankHead, Cell,Indicator,TabContainer, TabContainerItem 
   },
   computed:{
    ...mapState(['football_team','title']),
    ...mapGetters(['teams']),
  },
    methods:{
      getTeam(){
           this.$store.dispatch('GET_FOOTBALL_TEAMINFO',{
                team_id: this.$store.state.football_team.team_id,
                league_id:this.$store.state.football_team.league_id
                });     
       },
     goPlayerDetail(item) {
      this.$router.push({name: 'player', params: {id: item.player_id}})
      this.$store.dispatch('GET_PLAYER_INFO', {
        player_id: item.player_id
        })   
      },
    }
  }
    
</script>
<style>
.content{margin-top:94px;}
.tab_nav{height:30px;line-height:30px;border-bottom:1px solid #e4e4e4;position:relative;}
.tab_li{position:absolute;left:0;top:0;width:100%;}
.tab_li li {float:left;width:33.3333333333%}
.tab_li li.active{color:#439cf8;border-bottom:1px solid #439cf8;}
.player_table_500{width:500px;}
.c_top { padding:20px;border-bottom:1px solid #e4e4e4;}
.c_top>div{float:left;}
.t_logo{margin-right:20px;}
.t_info h1,.t_info p{font-size:20px;text-align:left;}
.t_info h1{margin-bottom:10px;}
.team_info{width:100%;}
.team_info>div{border-bottom:1px solid #e4e4e4;}
.team_info p{float:left;width:50%;line-height:24px;text-align:left;padding-left:20px;}
section .title{background:#ddd;line-height:30px;text-align:left;padding-left:20px;}
.table_left {float:left;width:28%;overflow:hidden;border-right:1px solid #ccc;}
.table_content{float:left;width:72%;overflow:scroll;}
.table_content tr{line-height:26px;}
.table_left>div,.table_left>div>span{line-height:26px;height:28px;}
.player_table_500 tr th,.player_table_500 tr td{border-right:1px solid #ccc;}
.table_left>div ,.player_table_500 tr{border-bottom :1px solid #ccc;}
.outer_wrap{margin-bottom:10px;}
.rys{width:100%;overflow:hidden;}
.rys table{width:100%;}
.rys li{border-bottom:1px solid #ccc;}
.rys .honor{width:28%;}
.rys .years{width:72%;}
.rys table td{line-height:30px;text-overflow:ellipsis;text-align:center; border-right:1px solid #ccc;  word-break:break-all;word-wrap:break-word;white-space:normal;}
.rys table tbody{display:table-row-group;vertical-align:middle;}
.rys table tr{display:table-row;vertical-align:middle;}
.rys table td{display:table-cell;vertical-align:inherit;}
.team_player .title{margin-bottom:10px;}
.team_player table{padding:0 8px;width:100%;}
.team_player table tr{border-bottom:1px solid #ccc;}
.team_player table tr td{border-right:1px solid #ccc;}
table.match tr td{border-right:1px solid #ccc;border-bottom:1px solid #ccc;font-size:12px;}
.p_title{text-align:center;}
</style>