<template>
  <div class="nba">
   <ul class="all">
      <li v-for="game in NBA" class="clear" :key="game">
       <div class="date">{{game.title}}</div>

       <div v-for="item in game.tr" class="clear" :key="item">
        <a v-bind:href="item.m_link1url">    
          <div class="col game-time score">
             <span>{{item.time}}</span> 
          </div>
          <div class="col team">
             <img :src="item.player1logo">
            <p>{{item.player1}}</p>
          </div>
          <div class=" col point">
            <span class="score">{{item.score}}</span>
          </div>
          <div class="col team">
             <img :src="item.player2logo">
             <p>{{item.player2}}</p>
          </div> 
          </a>
         </div>         
      </li>
   </ul>
  </div>
</template>

<script type="es6">
  import {Indicator} from 'mint-ui';
  import {mapGetters} from 'vuex';
  export default {
    data(){
      return {
        gameList:[]
      }
    },
    created(){
       this.getNBAdata();
    },
    computed: {
      ...mapGetters({
        NBA: 'NBA'
      })
    },
    methods:{
      getNBAdata(){
        this.$store.dispatch('GET_NBA')
      }
    }
  }
</script>

<style scoped>
.clear:after{content:".";display:block;height:0;clear:both;visibility:hidden}
.nba{margin-top:90px;}
.date{text-align:left;padding-left:5%;font-size:16px;}
.game-time{text-align:left; }
.col{width:25%;float:left;}
.vetical_center{display:flex;-webkit-align-items: center; justify-content: center;align-items: center; }
.score{line-height:90px;}
.clear a{color:#333;}
ul li{padding: 5px 3%;font-size: 12px;margin-bottom: 5px;border-bottom: 1px solid #fafafa;border-bottom:1px solid #efefef;}
ul li>span:first-child{width: 25%;float: left;}
ul li>span{width: 25%;display: inline-block}
ul li>span:nth-child(3){width: 10%;}
</style>

