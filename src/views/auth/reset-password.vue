<!--
 * @Description: 重置密码
 * @Author: tangguowei
 * @Date: 2021-05-19 19:44:29
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-07 15:45:55
-->
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { emailPattern } from '@/config';
import { resetPassword } from '@/views/service';

const router = useRouter();
// 是否提交中
const loading = ref(false);
// 表单数据
const formData = reactive({
  email: '',
  oldPassword: '',
  newPassword: '',
});
const validEmail = (rule: any, value: string, callback: (arg0?: Error) => void) => {
  if (!emailPattern.test(value)) {
    callback(new Error('请输入正确的邮箱'));
  } else {
    callback();
  }
};
const validNewPassword = (rule: any, value: string, callback: (arg0?: Error) => void) => {
  if (value === formData.oldPassword) {
    callback(new Error('新密码不能与旧密码相同'));
  } else {
    callback();
  }
};
const rules = reactive({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { validator: validEmail, trigger: 'blur' },
  ],
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 3, message: '原密码至少为3个字符', trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 3, message: '新密码至少为3个字符', trigger: 'blur' },
    { validator: validNewPassword, trigger: 'blur' },
  ],
});
// 表单标识
const ruleForm = ref();
// 表单提交
const submitForm = async () => {
  ruleForm.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      resetPassword({ router, data: formData })
        .then(() => {
          loading.value = false;
          ElMessage.success({
            duration: 1000,
            message: '密码重置成功，请重新登录',
            onClose: () => {
              router.push({
                name: 'login',
              });
            },
          });
        })
        .catch((e: any) => {
          loading.value = false;
          console.error(e);
        });
    } else {
      console.log('error submit!!');
    }
  });
};
</script>
<template>
  <div class="auth">
    <div class="modal-box">
      <div class="modal-header">
        <dl class="auth-logo">
          <dt>
            <img
              src="../../assets/logo.png"
              alt="logo"
              width="34"
              height="34"
            >
          </dt>
          <dd>VUE RACK</dd>
        </dl>
        <h2>重置密码</h2>
      </div>
      <el-form
        ref="ruleForm"
        label-position="top"
        :model="formData"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        @keyup.enter="submitForm"
      >
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input
            v-model.trim="formData.email"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="旧密码"
          prop="oldPassword"
        >
          <el-input
            v-model="formData.oldPassword"
            show-password
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="newPassword"
        >
          <el-input
            v-model="formData.newPassword"
            show-password
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            @click="submitForm"
          >
            保存
          </el-button>
        </el-form-item>
        <div class="no-acoout">
          已有账户？<router-link :to="{ name: 'login' }">
            <el-link
              type="primary"
              :underline="false"
            >
              去登录
            </el-link>
          </router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>
