<!--
 * @Description: 首页
 * @Author: tangguowei
 * @Date: 2021-05-19 14:40:07
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-05-19 14:40:14
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>
<style scoped>
.home {
  text-align: center;
}
</style>
