<!--
 * @Description: 页头
 * @Author: tangguowei
 * @Date: 2021-05-19 15:42:49
 * @LastEditors: tangguowei
 * @LastEditTime: 2022-02-08 16:19:47
-->
<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore, mapState } from 'vuex';
import {
  Expand,
  Fold,
  UserFilled,
  ArrowDown,
} from '@element-plus/icons-vue';
import { clearToken } from '@/utils/token';

/**
 * 继承至父组件的属性和方法
 */
defineProps<{
  collapse: boolean
}>();
defineEmits(['handle-toggle-collapse']);

const router = useRouter();
const store = useStore();
// 同步store数据
const userInfo: any = computed(mapState('admin/user', ['userInfo']).userInfo.bind({ $store: store }));

// 退出
const logout = () => clearToken(router);
// 跳转个人主页
const handleMyself = () => {
  router.push({
    name: 'userInfo',
  });
};
</script>

<template>
  <el-header height="75px">
    <el-icon
      style="cursor: pointer"
      @click="$emit('handle-toggle-collapse')"
    >
      <component :is="collapse ? Expand : Fold" />
    </el-icon>
    <div class="logo-bar">
      <img
        src="../../assets/logo.png"
        alt="logo"
      >
      <span>VUE RACK</span>
    </div>
    <div class="avatar">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-avatar
            :class="userInfo.gender === '女' ? 'user-woman' : 'user-man'"
            :size="30"
            :src="userInfo.avatarUrl"
            @error="() => true"
          >
            <el-icon><UserFilled /></el-icon>
          </el-avatar>
          <span>{{ userInfo.name }}</span>
          <el-icon class="el-icon--right"><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-if="userInfo.role === '普通用户'"
              @click="handleMyself"
            >
              我的账户
            </el-dropdown-item>
            <el-dropdown-item @click="logout">
              登出
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<style>
/* 覆盖组件默认样式 */
.el-header {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  font-size: 18px;
}
.el-header .el-dropdown-link {
  cursor: default;
  display: flex;
  align-items: center;
}
</style>
<style lang="scss" scoped>
.avatar {
  flex: 1;
  text-align: right;
}
.logo-bar {
  font-size: 22px;
  line-height: 44px;
  font-weight: bold;
  color: #304456;
  margin-left: 40px;
  img {
    width: 44px;
    margin-right: 10px;
  }
}
.user-man,
.user-woman {
  margin-right: 12px;
}
.user-man {
  background-color: cornflowerblue;
}
.user-woman {
  background-color: rgb(255, 112, 179);
}
</style>
