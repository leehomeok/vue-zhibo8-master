<template>
  <div class="team">
    <rankHead></rankHead>
    <div class="content">
      <div class="c_top clear">
        <div class="t_logo">
           <img :src="football_team.team_logo">
        </div>
        <div class="t_info">
          <h1></h1>
          <p></p>
        </div>
      </div>
    <div class="tab_nav">
      <ul class="clear tab_li" >
        <li :class="{'active':item==active}" 
          v-for="(item,index) in tabList" 
          :key="index"
          @click="active=item.label">
          {{item.label}}
        </li>
      </ul>
    </div>

  
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
    let tabList = ['资料', '阵容', '伤病','赛程','新闻'].map((item,index) => {
      return {
        label:item,
        id: index + 1
      }
    })
    return {
      tabList,
      active:'阵容'
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
        team_id: this.$route.query.id,
        league_id:this.$route.query.league
      });     
    },
    goPlayerDetail(item) {
      this.$store.dispatch('GET_PLAYER_INFO', {
        player_id: item.player_id
      })  
      this.$router.push({
        name: 'player', 
        params: {id: item.player_id}
      })
    }
  }
}
    
</script>
<style>
.content{margin-top:94px;}
.tab_nav{height:30px;line-height:30px;border-bottom:1px solid #e4e4e4;position:relative;}
.tab_li{position:absolute;left:0;top:0;width:100%;}
.tab_li li {float:left;width:20%}
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