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
           <th>进球</th>
           <th>失球</th>
           <th>净胜球</th>
           <th>积分</th>
         </tr>
         <tr v-for="(team,index) in league.teamList">
           <td>{{team.rank_index}}</td>
           <td>{{team.name_zh}}</td>
           <td>{{team.played}}</td>
           <td>{{team.win}}</td>
           <td>{{team.draw}}</td>
           <td>{{team.lost}}</td>
           <td>{{team.hits}}</td>
           <td>{{team.miss}}</td>
           <td>{{team.difference}}</td>
           <td>{{team.score}}</td>
         </tr>
      </table>
  </div>
</template>

<script type="es6">
  import { Cell,Indicator } from 'mint-ui'
  import { mapState, mapActions, mapGetters } from 'vuex'
  import rankHead from './header/rank-head'; 
  import fTable from './football_table';
import $ from 'webpack-zepto';
  export default {
    
    data(){
      return {
        rankList:[]
      
      }
    },   
    created(){
      this.getList()
    },
    mounted(){

    },
 components:{
   rankHead,
     fTable,
   },
   computed:{
    ...mapState(['league','title']),
    ...mapGetters(['teams']),
  },
    methods:{
      getList(){
           this.$store.dispatch('GET_LEAGUE_LIST',{
                 id:this.$route.params.id});     
       },
    }
  }
</script>
<style scoped>
  .mint-cell{padding: 10px 0 !important;}
  .mint-cell-title img{margin-right: 5px !important;}
  .rankList li{padding: 5px 3%;}
  .rankList li>span{width:11.5%!important;}
</style>
