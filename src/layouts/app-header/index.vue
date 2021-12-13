<!--
 * @Description: 页头
 * @Author: tangguowei
 * @Date: 2021-05-19 15:42:49
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-13 17:02:49
-->
<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore, mapState } from 'vuex';
import { clearToken } from '@/utils/token';
import {
  Fold,
  Expand,
  SwitchButton,
  UserFilled,
} from '@element-plus/icons-vue';

/**
 * 继承至父组件的属性和方法
 */
defineProps<{
  collapse: boolean
}>();
defineEmits(['handleToggleCollapse']);

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
    <el-icon><component :is="collapse ? Expand : Fold" style="cursor: pointer" @click="$emit('handleToggleCollapse')" /></el-icon>
    <div class="logo-bar">
      <img src="../../assets/logo.png" alt="logo" />
      <span>VUE RACK</span>
    </div>
    <div class="avatar">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-avatar
            :icon="UserFilled"
            :class="userInfo.gender === '女' ? 'user-woman' : 'user-man'"
            :size="30"
            :src="userInfo.avatarUrl"
            @error="() => true"
          >
          </el-avatar>
          <span>{{ userInfo.name }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-show="userInfo.role === '普通用户'"
              :icon="UserFilled"
              @click="handleMyself"
              >我的账户</el-dropdown-item
            >
            <el-dropdown-item :icon="SwitchButton" @click="logout"
              >登出</el-dropdown-item
            >
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
