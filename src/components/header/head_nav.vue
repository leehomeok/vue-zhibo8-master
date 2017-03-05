<template>
  <div class="header-nav">
      <mt-navbar  class="container" >
        <mt-tab-item id="head-nav1" @click.native="goRouter(1)">直播</mt-tab-item>
        <mt-tab-item id="head-nav2" @click.native="goRouter(2)">完赛</mt-tab-item>
        <mt-tab-item id="head-nav3" @click.native="goRouter(3)">积分榜</mt-tab-item>
        <mt-tab-item id="head-nav4" @click.native="goRouter(4)">NBA</mt-tab-item>
        <mt-tab-item id="head-nav5" @click.native="goRouter(5)">图集</mt-tab-item>
      </mt-navbar>
  </div>
</template>

<script type="es6">
  import { Navbar, TabItem } from 'mint-ui';
  import{ mapState } from 'vuex'
  export default {    
    data(){
      return {
        //selected:'head-nav1'
      }
    },
    components:{Navbar, TabItem},   
    methods:{
      goRouter(index){
        switch(index){
          case 1:this.$router.push({path:'/'});break;
          case 2:this.$router.push({path:'endgame'});break;
          case 3:this.$router.push({path:'score/2'});break;
          case 4:this.$router.push({path:'nba'});break;
          case 5:this.$router.push({path:'pic'});break;
          default:this.$router.push({path:'/'});break;
        }
      }
    }
  }
</script>

<style>
  .mint-tab-item{padding: 12px 0 !important;}
  .mint-tab-item-label{font-size: 16px !important;}
</style>
