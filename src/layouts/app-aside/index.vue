<!--
 * @Description: 页面侧边导航栏
 * @Author: tangguowei
 * @Date: 2021-05-19 15:31:07
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-13 17:42:47
-->
<script setup lang="ts">
import { computed } from 'vue';
import { useStore, mapState } from 'vuex';
import { routes } from '@/router/index';
import AsideItem from './item.vue';

/**
 * 父组件传入的数据及事件
 */
defineProps<{
  collapse: boolean
}>();

const store = useStore();
// 同步store数据
const activeRoute = computed(mapState('admin/common', ['activeRoute']).activeRoute.bind({ $store: store }));
</script>

<template>
  <el-aside width="auto" class="aside">
    <div class="menu-content">
      <el-menu
        class="aside-menu"
        :collapse="collapse"
        background-color="#001529"
        text-color="#7b8190"
        active-text-color="#fff"
        router
        uniqueOpened
        :default-active="activeRoute.name"
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

<style scoped lang="scss">
.menu-content {
  height: 100vh;
  overflow: hidden auto;
  scrollbar-color: hsla(0, 0%, 100%, 0.2) hsla(0, 0%, 100%, 0.15);
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    // background: rgba(0, 0, 0, 0.12);
    // border-radius: 3px;
    // box-shadow: inset 0 0 5px rgba(0, 21, 41, 0.05);
    background: hsla(0, 0%, 100%, 0.2);
    border-radius: 3px;
    box-shadow: inset 0 0 5px hsla(0, 0%, 100%, 0.05);
  }
  &::-webkit-scrollbar-track {
    // background: rgba(0, 0, 0, 0.06);
    // border-radius: 3px;
    // box-shadow: inset 0 0 5px rgba(0, 21, 41, 0.05);
    background: hsla(0, 0%, 100%, 0.15);
    border-radius: 3px;
    box-shadow: inset 0 0 5px rgba(37, 37, 37, 0.05);
  }
}
.aside {
  background-color: #001529;
}
.aside-menu:not(.el-menu--collapse) {
  width: 240px;
}
</style>
<style>
/* 覆盖组件默认样式 */
.el-menu {
  border-right: none !important;
}
.el-submenu.is-active > .el-submenu__title,
.el-submenu.is-active > .el-submenu__title i,
.el-submenu__title:hover,
.el-submenu__title:hover i,
.el-menu-item:hover,
.el-menu-item:hover i {
  color: #fff !important;
}
.el-submenu .el-menu-item {
  background-color: #000c17 !important;
}
.el-submenu .el-menu-item.is-active,
.el-menu-item.is-active {
  background-color: #1890ff !important;
}
/* 修复左侧菜单收起图标跳动 */
.el-menu-item > div {
  display: flex !important;
  align-items: center !important;
}
.el-sub-menu .el-icon,
.el-menu-item [class^=el-icon],
.el-menu--collapse>.el-menu-item [class^=el-icon],
.el-menu--collapse>.el-sub-menu>.el-sub-menu__title [class^=el-icon] {
  width: unset;
}
</style>
