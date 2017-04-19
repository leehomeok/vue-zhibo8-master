<template>
  <div class="nba_score">
   <rank-head></rank-head>
    <table  v-for="(area,index) in NBA_score">
         <tr>
           <th v-for="item in area.items">{{item}}</th>
         </tr>
         <tr v-for="(team,index) in area.list">
           <td>{{ team.西部||team.东部 }}</td>
           <td class="t_name"><img :src="team.球队图标">{{team.球队}}</td>       
           <td>{{team.胜}}</td>         
           <td>{{team.负}}</td>
           <td>{{team.胜率}}</td>
           <td><span>{{team.胜差}}</span></td>
           <td>{{team.近况}}</td>
         </tr>
      </table>
  </div>
</template>

<script type="es6">
  import { Cell,Indicator } from 'mint-ui'
  import { mapState, mapActions, mapGetters } from 'vuex'
  import rankHead from './header/rank-head'; 
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
   },
   computed:{
    ...mapState(['NBA_score','title']),
    ...mapGetters(['teams']),
  },
    methods:{
      getList(){
           this.$store.dispatch('GET_NBASCORE_LIST',{id:'nba'});     
       },
     goTeamDetail(item) {
      this.$router.push({name: 'tuji', params: {id: item.id}})
      this.$store.dispatch('SET_TITLE', {
        title: item.title
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
  .nba_score table{margin:93px 0 20px;width:100%;}
    .nba_score table:last-child{margin:20px 0;}
</style>
