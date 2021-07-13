<!--
 * @Description: 页面侧边导航栏
 * @Author: tangguowei
 * @Date: 2021-05-19 15:31:07
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-07-08 17:48:59
-->
<template>
  <el-aside style="width: unset" class="aside">
    <div
      class="logo-bar"
      :style="{ width: collapse ? '64px' : '100%', transition: 'width .15s' }"
    >
      <img src="../../assets/logo.png" alt="logo" />
      <span>VUE RACK</span>
    </div>
    <div class="menu-content">
      <el-menu
        class="aside-menu"
        :collapse="collapse"
        router
        uniqueOpened
        :default-active="activeRoute.name"
        text-color="#7b8190"
        active-text-color="#5b73e8"
      >
        <AsideItem
          v-for="(route, index) of routes"
          :key="index"
          :item="route"
        />
      </el-menu>
    </div>
  </el-aside>
</template>

<script>
import { routes } from '@/router';
import AsideItem from './item.vue';
import { mapState } from 'vuex';

export default {
  name: 'APPAside',
  components: {
    AsideItem,
  },
  props: ['collapse'],
  data() {
    return {
      routes,
    };
  },
  computed: {
    ...mapState(['activeRoute']),
  },
};
</script>
<style scoped lang="scss">
.menu-content {
  height: calc(100vh - 76px);
  margin-top: 1px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.12);
    border-radius: 3px;
    box-shadow: inset 0 0 5px rgba(0, 21, 41, 0.05);
    // background: hsla(0, 0%, 100%, 0.2);
    // border-radius: 3px;
    // box-shadow: inset 0 0 5px hsla(0, 0%, 100%, 0.05);
  }
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.06);
    border-radius: 3px;
    box-shadow: inset 0 0 5px rgba(0, 21, 41, 0.05);
    // background: hsla(0, 0%, 100%, 0.15);
    // border-radius: 3px;
    // box-shadow: inset 0 0 5px rgba(37, 37, 37, 0.05);
  }
}
</style>
<style>
/* 覆盖组件默认样式 */
.aside-menu:not(.el-menu--collapse) {
  width: 240px;
}
.aside {
  position: relative;
}
.aside::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  background: #dcdfe6;
  top: 75px;
  left: 0;
  z-index: 1;
}
.el-aside {
  background-color: #fff;
}
.logo-bar {
  overflow: hidden;
  padding: 15px 0;
  font-size: 20px;
  line-height: 44px;
  text-align: center;
  font-weight: bold;
  color: #1d3042;
  white-space: nowrap;
}
.logo-bar > * {
  margin: 0 12px;
}
.logo-bar img {
  width: 44px;
}
.el-menu {
  border-right: none !important;
}
.el-aside {
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.el-submenu__title:hover,
.el-menu-item:hover {
  color: #383c40 !important;
}
.el-submenu__title:hover,
.no-drop-down:hover,
.el-menu-item.is-active {
  background-color: transparent !important;
}
.el-submenu .el-menu-item {
  background-color: #f5f5f5 !important;
}
.el-submenu .el-menu-item:hover,
.el-submenu .el-menu-item.is-active {
  background-color: #f0f0f0 !important;
}
.el-menu-item.is-active:hover {
  color: #5b73e8 !important;
}
</style>
