<template>
  <div class="rank-head container head-nav"  id="transparent-header">
    <mt-navbar  class="container" >
      <mt-tab-item @click.native="goNBA()">{{nba.cname}}</mt-tab-item>
      <mt-tab-item 
        v-for="(item,index) in leagueList"  :key="index"
        @click.native="goRouter(item)">
        {{item.cname}}
      </mt-tab-item>      
    </mt-navbar>
  </div>
</template>

<script type="es6">
import { Navbar, TabItem } from 'mint-ui';
import{ mapState, mapActions, mapGetters  } from 'vuex'
export default {
  
  data(){
    return {
      name:'rank-head',
      nba:{
        id:1,
        cname:"NBA"
      },
      leagueList:[      
        {id:8,cname:"英超",name:"yingchao",top:4,bottom:3},
        {id:7,cname:"西甲",name:"xijia",top:4,bottom:3},
        {id:13,cname:"意甲",name:"yijia",top:3,bottom:3},
        {id:9,cname:"德甲",name:"dejia",top:4,bottom:3},
        {id:16,cname:"法甲",name:"fajia",top:3,bottom:3},
        {id:51,cname:"中超",name:"zhongchao",top:3,bottom:2},
      ]
    }
  },
  components:{Navbar, TabItem},
  computed:{
    ...mapState(['league'])
  },
  methods:{
    goRouter(item){
      this.$router.push({
        name: 'score',
        query: {
          league: item.cname
        }         
      })
      this.$store.dispatch('GET_LEAGUE_LIST', item.cname);
      this.$store.dispatch('SET_LEAGUE_NAME',{name: item.name});
    },
    goNBA(){
      this.$router.push({name: 'NBAscore'})
    }
  }
}
</script>

<style scoped>
  .mint-tab-item-label{color: #333!important;}
  .rank-head{color:#333;padding:0;margin-top:0px;}
  .container{padding:0;}
</style>
