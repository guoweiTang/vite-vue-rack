<!--
 * @Description: 页头
 * @Author: tangguowei
 * @Date: 2021-05-19 15:42:49
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-05-26 01:00:29
-->
<template>
  <el-header height="75px">
    <i
      :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="$emit('handleToggleCollapse')"
      style="cursor: pointer"
    ></i>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <el-avatar
          :class="userInfo.gender === '女' ? 'user-woman' : 'user-man'"
          :size="30"
          icon="el-icon-user-solid"
        ></el-avatar>
        <span>{{ userInfo.name }}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-show="userInfo.role === '普通用户'"
            icon="el-icon-user"
            @click="handleMyself"
            >我的账户</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-switch-button" @click="clearToken"
            >登出</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<script>
import { mapState } from 'vuex';
import { clearToken } from '@/utils/token';
export default {
  name: 'APPHeader',
  props: ['collapse'],
  emits: ['handleToggleCollapse'],
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    handleMyself() {
      this.$router.push({
        name: 'UserInfo',
      });
    },
    clearToken,
  },
};
</script>

<style>
/* 覆盖组件默认样式 */
.el-header {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.el-header .el-avatar {
  margin-right: 12px;
}
.el-header .el-dropdown-link {
  cursor: default;
  display: flex;
  align-items: center;
}
</style>
<style scoped>
.user-man {
  background-color: cornflowerblue;
}
.user-woman {
  background-color: rgb(255, 112, 179);
}
</style>
