<!--
 * @Description: 侧边栏菜单项
 * @Author: tangguowei
 * @Date: 2021-05-19 10:57:36
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-13 18:38:19
-->
<script setup lang="ts">
import { computed } from 'vue';
import { useStore, mapState } from 'vuex';
import { RouteRecordRaw, RouteMeta } from 'vue-router';

/**
 * 父组件传入的数据及事件
 */
const props = defineProps<{
  item: RouteRecordRaw,
}>();

const store = useStore();
// 同步store数据
const userInfo: any = computed(mapState('admin/user', ['userInfo']).userInfo.bind({ $store: store }));

const isShowing = computed(() => {
  const meta = props.item.meta as RouteMeta;
  const { auth, hidden } = meta;
  const isArray = Array.isArray(auth);
  return (
    !hidden
    && (!auth
      || (userInfo.value.role
        && ((isArray && (auth as Array<string>).includes(userInfo.value.role)) || auth === true)))
  );
});
</script>

<template>
  <template v-if="isShowing">
    <el-menu-item
      v-if="!item.children || !item.children.length"
      :index="item.name as string"
      :route="{ name: item.name }"
    >
      <el-icon v-if="item.meta?.icon">
        <component :is="item.meta.icon" />
      </el-icon>
      <template #title>
        <span>{{ item.meta?.title }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu v-else :index="item.name as string">
      <template #title>
        <el-icon v-if="item.meta?.icon">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <Item
        v-for="(child, index) of item.children"
        :key="index"
        :item="child"
      />
    </el-sub-menu>
  </template>
</template>
