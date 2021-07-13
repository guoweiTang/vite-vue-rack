<!--
 * @Description: 权限设置
 * @Author: tangguowei
 * @Date: 2021-05-19 19:44:29
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-07-08 17:51:02
-->
<template>
  <el-card class="userinfo" body-style="{minHeight: '100%'}">
    <el-alert
      :closable="false"
      title="默认仅“普通用户”可访问「我的账户」页面，“管理员”可访问「卡片列表」页面，"
      :style="{ marginBottom: '20px' }"
      type="warning"
    >
    </el-alert>
    <editable-text
      type="radio"
      :options="[
        { label: '管理员', value: '管理员' },
        { label: '普通用户', value: '普通用户' },
      ]"
      label="你的权限"
      prop="role"
      :value="userInfo.role"
      @confirm="handleConfirmRole"
    />
  </el-card>
</template>

<script>
import { mapState } from 'vuex';
import EditableText from '@/components/editable-text/index.vue';

export default {
  components: {
    EditableText,
  },
  computed: mapState(['userInfo']),
  methods: {
    handleConfirmRole(value) {
      this.$store.dispatch('setUserInfo', {
        role: value,
      });
    },
  },
};
</script>

<style scoped>
.userinfo {
  width: 60%;
  margin: 0 auto;
}
.userinfo .el-card {
  min-height: calc(100vh - 75px - 60px - 40px);
  padding: 30px 100px;
  box-sizing: border-box;
}
</style>
