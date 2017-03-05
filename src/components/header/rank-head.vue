<template>
  <div class="rank-head container head-nav"  id="transparent-header">
    <mt-navbar  class="container" >
      <mt-tab-item v-for="(item,index) in leagueList"  @click.native="goRouter(item)">{{item.name}}</mt-tab-item>      
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
      leagueList:[
        {id:1,name:"NBA"},
        {id:2,name:"英超",top:4,bottom:3},
        {id:3,name:"西甲",top:4,bottom:3},
        {id:4,name:"意甲",top:3,bottom:3},
        {id:5,name:"德甲",top:4,bottom:3},
        {id:6,name:"法甲",top:3,bottom:3},
        {id:128,name:"中超",top:3,bottom:2},
      ]

    }
  },
  components:{Navbar, TabItem},
  computed:{
    ...mapState(['league'])
  },
  methods:{
    goRouter(item){
      this.$store.dispatch('GET_LEAGUE_LIST',{ id:item.id});
      this.$store.dispatch('SET_LEAGUE_NAME',{name: item.name});
    }
  }
}
</script>

<style scoped>
  .mint-tab-item-label{color: #333!important;}
  .rank-head{color:#333;padding:0;margin-top:0px;}
  .container{padding:0;}
</style>
