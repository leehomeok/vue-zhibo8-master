<template>
  <div id="app">
    <kHead></kHead>
    <router-view></router-view>
  </div>
</template>

<script>
import kHead from './components/header/head';
import { mapGetters } from 'vuex'
export default {
  components: {
    kHead
  },
  name: 'app',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.clear{*zoom:1;}
.clear:after{display:block;clear:both;content:"\0020";visibility:hidden;height:0;}
</style>
