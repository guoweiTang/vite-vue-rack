<!--
 * @Description: 注册
 * @Author: tangguowei
 * @Date: 2021-05-19 19:44:29
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-05-19 20:09:47
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
          <h2>注册</h2>
          <p>创建你的免费账户</p>
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
          <el-form-item label="密码" prop="password">
            <el-input
              show-password
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input
              show-password
              type="password"
              v-model="ruleForm.checkPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
              :loading="loading"
              >注册</el-button
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
import { emailPattern } from '../../config';
import { register } from '../service';

export default {
  name: 'Register',
  data() {
    const validEmail = (rule, value, callback) => {
      if (!value) {
        return new Error('请输入邮箱');
      } else if (!emailPattern.test(value)) {
        callback(new Error('请输入正确的邮箱'));
      } else {
        callback();
      }
    };
    const validCheckEmail = (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      }
      {
        callback();
      }
    };
    return {
      // 是否表单提交中
      loading: false,
      // 表单值
      ruleForm: {
        email: '',
        password: '',
        checkPassword: '',
      },
      rules: {
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
          { validator: validCheckEmail, trigger: 'blur' },
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
          register(this.ruleForm)
            .then(() => {
              this.loading = false;
              this.$message.success({
                duration: 1000,
                message: '注册成功，请继续登录',
                onClose: () => {
                  this.$router.push({
                    name: 'Login',
                  });
                },
              });
            })
            .catch(() => {
              this.loading = false;
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
