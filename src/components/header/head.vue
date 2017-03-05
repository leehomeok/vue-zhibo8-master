<template>
  <div class="header">
    <headLogo></headLogo>
    
    <head-nav ></head-nav>

  </div>
</template>

<script type="es6">
  import headLogo from './head_logo';
  import headNav from './head_nav'
  import { mapGetters } from 'vuex'
  export default {
    data(){
      return {

      }
    },
    computed:{
      ...mapGetters(['head'])
    },
    name:'k-head',
    components:{headLogo,headNav}
  }
</script>
