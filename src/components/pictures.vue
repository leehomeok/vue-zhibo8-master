<template>
  <div class="container plist">
    <div class="title">
         图集   
    </div>
    <div v-for="(item,index) in plist"  >
      <a  class="item clear" @click="goDetail(item)">
         <img slot="icon" :src="item.src" width="88" height="60">
         <div class="item-right">
            <p>{{item.title}}</p>
            <p>{{item.date}}</p>
         </div>
      </a>
    </div>
  </div>
</template>

<script type="es6">
  import { Cell,Indicator } from 'mint-ui';

  import $ from 'webpack-zepto';
  export default {
    data(){
      return {
        plist:[]
      }
    },
    created(){
      this.getList()
    },
    methods:{
      getList(){
        var self=this;
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        }); 
        $.ajax({
       type:"GET",
       url:'http://localhost:3000/pictures' ,
       data:{},
       success:function(res){
            self.plist=res.data;
             Indicator.close();   
        }
      })      
   },
      parseList(data){
        setTimeout(()=>{
          Indicator.close()
          this.plist=data;
        },1000)     
      },
     goDetail(item) {
      this.$router.push({name: 'tuji', params: {id: item.id}})
      this.$store.dispatch('SET_TITLE', {
        title: item.title
        })     
      
    }
    }
  }
</script>

<style scoped>
.title{border-bottom:1px solid #efefef;text-align:left;padding-left:5%;background:#e4f0fc;font-size:16px;height:20px;line-height:20px}
.container{margin-top:92px;padding:0!important;}
  .item img{margin-right: 15px !important;float:left;}
  .item{height:auto;border-bottom:1px solid #ededed;  padding:10px 4%;display:block;}
  .item p{color:#333}
  .item p:first-child{margin-bottom:10px;}
  .item-right{float:left;text-align:left;padding:10px 0;}
  .item-right>p:last-child{color:#888;font-size:12px;}
</style>
