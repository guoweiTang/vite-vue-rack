<!--
 * @Description: 路由未匹配
 * @Author: tangguowei
 * @Date: 2021-05-19 15:55:09
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-05-19 20:12:00
-->
<template>
  <teleport to="#app">
    <div class="error-page">
      <el-row type="flex" justify="center" align="center" class="lsl">
        <el-col :span="6"><img :src="icon404" alt="404 icon" /></el-col>
        <el-col :span="4" :offset="2">
          <h2>404</h2>
          <div class="sub-title">抱歉，你访问的页面不存在</div>
          <div>
            <el-button type="primary" @click="$router.replace({ name: 'Home' })"
              >返回首页</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
  </teleport>
</template>
<script>
import { defineComponent } from 'vue';
import icon404 from '@/assets/icon-404-color.svg';

export default defineComponent({
  name: '404',
  setup() {
    return {
      icon404,
    };
  },
});
</script>
