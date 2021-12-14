<!--
 * @Description: 权限限制
 * @Author: tangguowei
 * @Date: 2021-05-19 15:54:56
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-13 11:54:44
-->
<template>
  <div class="error-page">
    <el-row
      type="flex"
      justify="center"
      align="middle"
    >
      <el-col :span="6">
        <img
          src="../../assets/icon-403-color.svg"
          alt="403 icon"
        >
      </el-col>
      <el-col
        :span="4"
        :offset="2"
      >
        <h2>403</h2>
        <div class="sub-title">
          抱歉，你没有权限访问该页面
        </div>
        <div>
          <el-button
            type="primary"
            @click="$router.replace({ name: 'home' })"
          >
            返回首页
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
