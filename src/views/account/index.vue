<!--
 * @Description: 个人详细信息
 * @Author: tangguowei
 * @Date: 2021-05-19 19:44:29
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-07-08 17:50:53
-->
<template>
  <el-alert
    :closable="false"
    title="该页面只有普通用户能看到"
    style="margin-bottom: 20px"
    type="warning"
  >
  </el-alert>
  <el-card class="userinfo" body-style="{minHeight: '100%'}">
    <editable-text
      label="用户名"
      :value="userInfo.name"
      :rules="rulesOfCommon"
      @confirm="handleConfirmName"
    />
    <editable-text
      type="radio"
      :options="[
        { label: '管理员', value: '管理员' },
        { label: '普通用户', value: '普通用户' },
      ]"
      label="你的权限"
      :value="userInfo.role"
      @confirm="handleConfirmRole"
    />
    <editable-text
      type="radio"
      :options="[
        { label: '男', value: '男' },
        { label: '女', value: '女' },
      ]"
      label="性别"
      :value="userInfo.gender"
      @confirm="handleConfirmGender"
    />
    <editable-text
      label="一句话介绍"
      :value="userInfo.summary"
      :rules="rulesOfCommon"
      @confirm="handleConfirmSummary"
    />
    <editable-text
      type="textarea"
      label="个人简介"
      :value="userInfo.description"
      :rules="rulesOfCommon"
      @confirm="handleConfirmDescription"
    />
  </el-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import EditableText from '@/components/editable-text/index.vue';

export default {
  components: {
    EditableText,
  },
  data() {
    return {
      rulesOfCommon: [
        { required: true, message: '内容不能为空', trigger: 'blur' },
      ],
    };
  },
  computed: mapState(['userInfo']),
  methods: {
    ...mapActions(['setUserInfo']),
    handleConfirmName(value) {
      this.$store.dispatch('setUserInfo', {
        name: value,
      });
    },
    handleConfirmRole(value) {
      this.$store.dispatch('setUserInfo', {
        role: value,
      });
    },
    handleConfirmSummary(value) {
      this.$store.dispatch('setUserInfo', {
        summary: value,
      });
    },
    handleConfirmGender(value) {
      this.$store.dispatch('setUserInfo', {
        gender: value,
      });
    },
    handleConfirmDescription(value) {
      this.$store.dispatch('setUserInfo', {
        description: value,
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
