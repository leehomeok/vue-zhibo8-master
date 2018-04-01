<template>
  <div>
   <rank-head></rank-head>
    <table style="margin-top:93px;width:100%;">
        <tr>
          <th>排名</th>
          <th>球队</th>
          <th>场次</th>
          <th>胜</th>
          <th>平</th>
          <th>负</th>
          <th>进/失球</th>
          <th>净胜球</th>
          <th>积分</th>
        </tr>
        <tr v-for="(team,index) in league.teamList">
          <td>{{team.排名}}</td>
          <td class="t_name"><a @click="goTeamDetail(team)">
            <img :src="team.球队图标">{{team.球队}}</a>
          </td>
          <td>{{team.场次}}</td>
          <td>{{team.胜}}</td>
          <td>{{team.平}}</td>
          <td>{{team.负}}</td>
          <td><span>{{team.进失球}}</span></td>
          <td>{{team.净胜球}}</td>
          <td>{{team.积分}}</td>
        </tr>
      </table>
  </div>
</template>

<script type="es6">
import { Cell,Indicator } from 'mint-ui'
import { mapState, mapActions, mapGetters } from 'vuex'
import rankHead from './header/rank-head'; 
import fTable from './football_table';
import  {teams} from '../json/football_teams.js'
import $ from 'webpack-zepto';
export default {
  data(){
    return {
      rankList:[],
      leagueList: [
        {id:8,cname:"英超",name:"yingchao",top:4,bottom:3},
        {id:7,cname:"西甲",name:"xijia",top:4,bottom:3},
        {id:13,cname:"意甲",name:"yijia",top:3,bottom:3},
        {id:9,cname:"德甲",name:"dejia",top:4,bottom:3},
        {id:16,cname:"法甲",name:"fajia",top:3,bottom:3},
        {id:51,cname:"中超",name:"zhongchao",top:3,bottom:2}
      ],
    }
  },
  mounted(){
    this.getList()
  },
  components:{
    rankHead,fTable,
  },
  computed:{
    ...mapState(['league','title','football_team']),
    ...mapGetters(['teams']),
    currentLeagueId () {
      let currentLeague = this.leagueList.find(l => {
        return l.cname = this.$route.query.league
      })
      return currentLeague.id
    }
  },
  methods:{
    getList(){
      this.$store.dispatch('GET_LEAGUE_LIST', this.$route.query.league);     
    },
    goTeamDetail(item) {
      // debugger
      let leagueName = this.$route.query.league
      let currentLeague = this.leagueList.find(l => {
        return l.cname = leagueName
      })   
      this.$store.dispatch('SET_FOOTBALL_TEAM',{
        team_name:item.球队,
        team_logo:item.球队图标,
        team_id: item.teamId,
        league_id:this.currentLeagueId
      });
      this.$router.push({
        path: '/team',
        query: {
          league: this.currentLeagueId,
          teamName: item.球队,
          id: item.teamId
        }
      })
    }
  }
}
</script>
<style scoped>
  .mint-cell{padding: 10px 0 !important;}
  .mint-cell-title img{margin-right: 5px !important;}
  .rankList li{padding: 5px 3%;}
  .rankList li>span{width:11.5%!important;}
  td img{width:24px;}
  .t_name{text-align:left;}
</style>
