<!--
 * @Description: 注册
 * @Author: tangguowei
 * @Date: 2021-05-19 19:44:29
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-07 15:45:12
-->
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { emailPattern } from '@/config';
import { register } from '@/views/service';

const router = useRouter();
// 是否提交中
const loading = ref(false);
// 表单数据
const formData = reactive({
  email: '',
  password: '',
  checkPassword: '',
});
const validEmail = (rule: any, value: string, callback: (arg0?: Error) => void) => {
  if (!emailPattern.test(value)) {
    callback(new Error('请输入正确的邮箱'));
  } else {
    callback();
  }
};
const validCheckPass = (rule: any, value: string, callback: (arg0?: Error) => void) => {
  if (value !== formData.password) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
};
const rules = reactive({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { validator: validEmail, trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, message: '密码至少为3个字符', trigger: 'blur' },
  ],
  checkPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { min: 3, message: '再次输入密码至少为3个字符', trigger: 'blur' },
    { validator: validCheckPass, trigger: 'blur' },
  ],
});
// 表单标识
const ruleForm = ref();
// 表单提交
const submitForm = async () => {
  ruleForm.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      register({ router, data: formData })
        .then(() => {
          loading.value = false;
          ElMessage.success({
            duration: 1000,
            message: '注册成功，请继续登录',
            onClose: () => {
              router.push({
                name: 'login',
              });
            },
          });
        })
        .catch(() => {
          loading.value = false;
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
        <h2>注册</h2>
        <p>创建你的免费账户</p>
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
          label="密码"
          prop="password"
        >
          <el-input
            v-model="formData.password"
            show-password
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="checkPassword"
        >
          <el-input
            v-model="formData.checkPassword"
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
            注册
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
