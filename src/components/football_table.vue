<template>
  <div>
      <table>
        <thead>
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
         </thead>
         <tbody>
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
         </tbody>
      </table>
  </div>
</template>
<script>

import { mapState, mapActions, mapGetters } from 'vuex'
export default{
    components:{

    },
   data(){
    return {
     
    }
  },
  created () {
      
  },
computed:{
    ...mapState(['league','title']),
    ...mapGetters(['teams']),
  },
  methods:{
        getData(){
            this.$store.dispatch('GET_LEAGUE_LIST',{
                 id:this.$route.params.id});
        }
  }
}
</script>
<style>
table th {text-align:center;}
table tr{line-height:24px;}
table tr:nth-child(2n){background:#f2f2f2;}
</style>