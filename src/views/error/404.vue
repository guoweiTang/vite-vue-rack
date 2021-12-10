<!--
 * @Description: 路由未匹配
 * @Author: tangguowei
 * @Date: 2021-05-19 15:55:09
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-07 16:02:40
-->
<template>
  <div class="error-page">
    <el-row type="flex" justify="center" align="center">
      <el-col :span="6"><img src="../../assets/icon-404-color.svg" alt="404 icon" /></el-col>
      <el-col :span="4" :offset="2">
        <h2>404</h2>
        <div class="sub-title">抱歉，你访问的页面不存在</div>
        <div>
          <el-button type="primary" @click="$router.replace({ name: 'home' })"
            >返回首页</el-button
          >
        </div>
      </el-col>
    </el-row>
  </div>
</template>
