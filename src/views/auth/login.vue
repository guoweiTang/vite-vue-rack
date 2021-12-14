<!--
 * @Description: 登录
 * @Author: tangguowei
 * @Date: 2021-05-19 19:44:29
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-07 15:43:54
-->
<script setup lang="ts">
import { ref, reactive } from 'vue';
import {
  useStore,
  mapMutations,
} from 'vuex';
import { useRouter, useRoute, LocationQueryValue } from 'vue-router';
import { ElMessage } from 'element-plus';
import { emailPattern } from '@/config';
import { getToken } from '@/views/service';

const store = useStore();
const router = useRouter();
const route = useRoute();

// 同步store数据
const setToken = mapMutations('admin/user', ['setToken']).setToken.bind({ $store: store });

// 是否加载中
const loading = ref(false);
// 邮箱校验
const validEmail = (rule: any, value: string, callback: (arg0?: Error) => void) => {
  if (!emailPattern.test(value)) {
    callback(new Error('请输入正确的邮箱'));
  } else {
    callback();
  }
};
// 表单数据
const formData = reactive({
  email: 'admin@vuerack.com',
  password: 'vuerack',
});
// 表单校验规则
const rules = reactive({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { validator: validEmail, trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, message: '密码至少为3个字符', trigger: 'blur' },
  ],
});
// 表单标识
const ruleForm = ref();
// 登录提交
const submitForm = () => {
  ruleForm.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      getToken({
        router,
        data: formData,
      })
        .then(({ data } : { data: any}) => {
          loading.value = false;
          const { accessToken, refreshToken } = data;
          setToken({ accessToken, refreshToken });
          ElMessage.success({
            duration: 800,
            message: '登录成功，正在跳转……',
            onClose: () => {
              // 重定向对象不存在则返回顶层路径
              router.replace(
                (route.query.redirect as LocationQueryValue) || {
                  name: 'home',
                },
              );
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
        <h2>登录</h2>
        <p>登录以继续使用</p>
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
            placeholder="admin@vuerack.com"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="formData.password"
            placeholder="vuerack"
            show-password
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <div :style="{ marginBottom: '10px', textAlign: 'right' }">
          <router-link :to="{ name: 'resetPassword' }">
            <el-link
              type="primary"
              :underline="false"
            >
              忘记密码？
            </el-link>
          </router-link>
        </div>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            @click="submitForm"
          >
            登录
          </el-button>
        </el-form-item>
        <div class="no-acoout">
          还没有账户？<router-link :to="{ name: 'register' }">
            <el-link
              type="primary"
              :underline="false"
            >
              去注册
            </el-link>
          </router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style>
.auth {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url('./assets/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.auth h2 {
  color: #409eff;
  font-weight: 500;
  font-size: 28px;
  margin: 10px 0;
}
.auth .el-button--primary {
  width: 100%;
}
.auth .modal-box {
  position: relative;
  width: 404px;
  padding: 40px 52px 52px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 10px;
}
.auth .modal-header {
  text-align: center;
  margin-bottom: 20px;
}
.auth .modal-header p {
  font-size: 14px;
  color: #74788d;
}
.auth-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}
.auth-logo dd {
  margin-left: 5px;
}
.auth .no-acoout {
  text-align: center;
  font-size: 12px;
  line-height: 12px;
}
.auth .no-acoout a {
  font-size: 12px;
}
</style>
