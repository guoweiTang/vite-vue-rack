<!--
 * @Description: 入口模板
 * @Author: tangguowei
 * @Date: 2021-05-19 14:54:00
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-07-08 17:48:22
-->
<template>
  <el-container v-show="!isScreen">
    <AppAside :collapse="collapse" />
    <el-container direction="vertical">
      <AppHeader
        :collapse="collapse"
        @handleToggleCollapse="handleToggleCollapse"
      />
      <el-main>
        <router-view />
      </el-main>
      <AppFooter />
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { mapState } from 'vuex';
import AppAside from '@/layout/app-aside/index.vue';
import AppHeader from '@/layout/app-header/index.vue';
import AppFooter from '@/layout/app-footer/index.vue';

export default defineComponent({
  components: {
    AppAside,
    AppHeader,
    AppFooter,
  },
  computed: {
    ...mapState(['isScreen']),
  },
  setup() {
    const collapse = ref(false);
    const handleToggleCollapse = () => {
      collapse.value = !collapse.value;
    };
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
    return {
      collapse,
      handleToggleCollapse,
    };
  },
});
</script>

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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #303133;
  background-color: #f5f6f8;
}
.el-main {
  height: calc(100vh - 75px - 60px);
}
.el-main:only-child {
  padding: 0;
  height: auto;
  min-height: 100vh;
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
