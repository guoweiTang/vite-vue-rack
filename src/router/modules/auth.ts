/*
 * @Description: 认证路由
 * @Author: tangguowei
 * @Date: 2021-10-13 16:46:48
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-10-13 17:05:27
 */
import { RouteRecordRaw } from 'vue-router';
import Login from '@/views/auth/login.vue';
import Register from '@/views/auth/register.vue';
import ResetPassword from '@/views/auth/reset-password.vue';
import Layout from '@/layouts/basic-layout.vue';

const AuthRoutes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    name: 'auth',
    meta: {
      hidden: true,
      isScreen: true,
      title: '账户认证',
    },
    component: Layout,
    redirect: {
      name: 'login',
    },
    children: [
      {
        path: 'login',
        name: 'login',
        meta: {
          title: '登录',
        },
        component: Login,
      },
      {
        path: 'register',
        name: 'register',
        meta: {
          title: '注册',
        },
        component: Register,
      },
      {
        path: 'reset-password',
        name: 'resetPassword',
        meta: {
          title: '重置密码',
        },
        component: ResetPassword,
      },
    ],
  },
];
export default AuthRoutes;
