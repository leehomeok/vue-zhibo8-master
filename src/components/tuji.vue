<template>
  <div class="container"> 
     <h2>{{picture.title}}</h2>
     <div class="wraper" v-for="(item,index) in picture.picList">
         <img :src="item.src"  >
         <p><span class="red">{{index+1}}</span>/<span>{{picture.picList.length}}</span></p>
     </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { Indicator,Cell } from 'mint-ui';
import $ from 'webpack-zepto';
import vImg from './Lazyimg'
export default{
data(){
  return {
     
  }
},
created(){
 this.getPictures()
},
mounted(){
 
},
components:{
vImg ,

},
computed:{
    ...mapState(['picture','title']),
    ...mapGetters(['teams', 'skills']),
},
methods:{
   getPictures(){
      // console.log(this.$route.params.id);
      this.$store.dispatch('GET_PICTURE_LIST', {
        id: this.$route.params.id
        })      
    },

  }
}

</script>
<style scoped>
.red{color:red;}
.container{margin-top:92px;padding:0!important;background:#ccc;}
.container h2{margin-bottom:15px;padding-top:10px;}
.wraper {padding:0 10px;}
.wraper img{width:100%;}
.wraper p{text-align:right}
</style>