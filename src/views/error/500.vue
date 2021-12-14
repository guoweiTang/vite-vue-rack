<!--
 * @Description: 服务错误
 * @Author: tangguowei
 * @Date: 2021-05-19 15:55:19
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-13 12:00:57
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
          src="../../assets/icon-500-color.svg"
          alt="500 icon"
        >
      </el-col>
      <el-col
        :span="4"
        :offset="2"
      >
        <h2>500</h2>
        <div class="sub-title">
          抱歉，服务器报错
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
