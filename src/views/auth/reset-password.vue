<!--
 * @Description: 重置密码
 * @Author: tangguowei
 * @Date: 2021-05-19 19:44:29
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-05-19 20:10:56
-->
<template>
  <teleport to="#app">
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
              />
            </dt>
            <dd>VUE RACK</dd>
          </dl>
          <h2>重置密码</h2>
        </div>
        <el-form
          label-position="top"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          @keyup.enter="submitForm('ruleForm')"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input
              show-password
              type="password"
              v-model="ruleForm.oldPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              show-password
              type="password"
              v-model="ruleForm.newPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="loading"
              @click="submitForm('ruleForm')"
              >保存</el-button
            >
          </el-form-item>
          <div class="no-acoout">
            已有账户？<router-link :to="{ name: 'Login' }"
              ><el-link type="primary" :underline="false"
                >去登录</el-link
              ></router-link
            >
          </div>
        </el-form>
      </div>
    </div>
  </teleport>
</template>

<script>
import { emailPattern } from '@/config';
import { resetPassword } from '../service';

export default {
  name: 'ResetPassword',
  data() {
    const validEmail = (rule, value, callback) => {
      if (!emailPattern.test(value)) {
        callback(new Error('请输入正确的邮箱'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      ruleForm: {
        email: '',
        oldPassword: '',
        newPassword: '',
      },
      rules: {
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
        ],
      },
    };
  },
  methods: {
    // 表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          resetPassword(this.ruleForm)
            .then(() => {
              this.loading = false;
              this.$message.success({
                duration: 1000,
                message: '密码重置成功，请重新登录',
                onClose: () => {
                  this.$router.push({
                    name: 'Login',
                  });
                },
              });
            })
            .catch((e) => {
              this.loading = false;
              console.error(e);
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>
