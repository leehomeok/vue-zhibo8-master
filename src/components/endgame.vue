<template>
  <div style="padding-top:34px;">
    <ul class="all" 
      v-for="day in endGame"
      :key="day.date"
      :id="day.date">
      <li>{{day.date_str}}</li>
      <li  class="clear"
        v-for="item in day.list" 
        :key="item.id">
        <div class="team">
          <img :src=" '//duihui.qiumibao.com/nba/' + item.home_logo + '.png'">
          <p>{{item.home_team}}</p>
        </div>
        <div class="point">
          <span>{{item.news_title}}</span>
        </div>
        <div class="team">
          <img :src="'//duihui.qiumibao.com/nba/' + item.visit_logo+ '.png'">
          <p>{{item.visit_team}}</p>
        </div>         
      </li>
   </ul>
  </div>
</template>

<script>
import { Indicator,Cell } from 'mint-ui';
import {parseLogo,compare} from '../common/parseLogo'
import { mapGetters } from 'vuex';
import {getScrollHeight, getScrollTop, getWindowHeight} from '../utils/index'
export default{
  components:{},
  data(){
    return {
      date: new Date(),
      gameList:[]
    }
  },
  computed: {
    ...mapGetters({
      endGame: 'end_game'
    })
  },
  mounted(){
    this.date = new Date().format('yyyy-MM-dd')
    if (!this.endGame.length) {
      this.getEndGames(this.date)
    }
    if (this.$route.name === 'endgame') {
      window.onscroll = () => {
        if(getScrollTop() + getWindowHeight() == getScrollHeight()){
      　  this.loadMore()
        }
      }
    } 
  },
  destroyed (){
    window.onscroll = null
  },
  watch: {
    endGame (val, oldval) {
    },
    '$route'(val, oldval) {
      console.log(val,oldval)
    }
  },  
  methods:{
    loadMore () {
      let yesteday = +new Date(this.date) - 3600*24*1000
      this.date = new Date(yesteday).format('yyyy-MM-dd')
      let found = false
      this.endGame.forEach(item => {
        if (item.date === this.date) {
          found = true
        } 
      })
      if (!found) {
        this.getEndGames(this.date)
      }
    },
    getEndGames(date){
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      });
      this.$store.dispatch('GET_END_GAME', date);
    }
  }
}
</script>
<style scoped>
  .rank-banner-wrap{height: 250px;background-size: 100%}
    ul li{padding: 5px 3%;font-size: 12px;margin-bottom: 5px;height:100px;border-bottom: 1px solid #fafafa;}
    ul li:first-child{
      height: auto;
      line-height:20px;
    }
    ul li>span:first-child{width: 25%;float: left;}
    ul li>div{width: 25%;display: inline-block;float:left}
    ul li>span:nth-child(3){width: 10%;}
  .point{
    font-size: 16px;
    width: 40%;
    float:left;
    font-size:12px;
    height: 100%;
  }
  .clear:after {content: " "; display: block; clear: both; height: 0;}.clear {zoom: 1;}
  .game-time,.point{

  }
  .all{
    margin:20px 0 20px;
  }
  .team{
    width:30%;
    float:left;
  }
  .team img{
    width:40px; 
    height:40px;
    margin-bottom:3px;
  
  }
</style>
