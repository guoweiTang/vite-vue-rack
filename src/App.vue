<!--
 * @Description: 应用入口模板
 * @Author: tangguowei
 * @Date: 2021-09-27 17:52:49
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-07 16:07:30
-->
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { mapState, useStore } from 'vuex';
import AppAside from '@/layouts/app-aside/index.vue';
import AppHeader from '@/layouts/app-header/index.vue';
import AppFooter from '@/layouts/app-footer/index.vue';

const store = useStore();
// 同步store数据
const isScreen = computed(mapState('admin/common', ['isScreen']).isScreen.bind({ $store: store }));

// 是否收起菜单
const collapse = ref(false);
// 菜单收起展开回调
const handleToggleCollapse = () => {
  collapse.value = !collapse.value;
};
// 根据窗口大小切换菜单显示
const handleResize = () => {
  const widthOfWindow = document.documentElement.clientWidth;
  if (widthOfWindow < 1281) {
    collapse.value = true;
  } else {
    collapse.value = false;
  }
};
window.addEventListener('resize', handleResize);
// 初始化浏览视口以正确显示
onMounted(() => {
  handleResize();
});
</script>

<template>
  <el-container>
    <el-main v-if="isScreen">
      <router-view />
    </el-main>
    <template v-else>
      <AppAside :collapse="collapse" />
      <el-container>
        <el-main>
          <AppHeader
            :collapse="collapse"
            @handleToggleCollapse="handleToggleCollapse"
          />
          <div class="app-container">
            <router-view />
          </div>
          <AppFooter />
        </el-main>
      </el-container>
    </template>
  </el-container>
</template>

<style scoped>
.app-container {
  box-sizing: border-box;
  padding: var(--el-main-padding);
  min-height: calc(100vh - 75px - 60px);
  min-width: 1000px;
}
</style>
<style lang="scss">
body {
  margin: 0;
}
dd,
dl,
p {
  margin: 0;
}
img {
  display: inline-block;
  vertical-align: top;
}
a {
  text-decoration: none;
}
i {
  font-style: normal;
}
#app {
  font-family: -apple-system, BlinkMacSystemFont, segoe ui, Roboto,
    helvetica neue, Arial, noto sans, sans-serif, apple color emoji,
    segoe ui emoji, segoe ui symbol, noto color emoji;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #303133;
  background-color: #f5f6f8;
}
.el-main:only-child {
  padding: 0;
  max-height: 100vh;
}
.error-page {
  min-width: 400px;
  height: 100vh;
  min-height: 500px;
  img {
    width: 100%;
  }
  h2 {
    color: #515a6e;
    font-size: 72px;
    line-height: 72px;
    font-weight: 600;
    margin-bottom: 24px;
  }
  .sub-title {
    margin-bottom: 16px;
    color: #808695;
    font-size: 20px;
    line-height: 28px;
  }
  .el-row {
    height: 100%;
  }
  .el-col {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
