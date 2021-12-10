/*
 * @Description: 公共路由
 * @Author: tangguowei
 * @Date: 2021-10-13 16:41:05
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-10-13 17:05:42
 */
import { h } from 'vue';
import { RouteRecordRaw } from 'vue-router';

const commonRoutes: Array<RouteRecordRaw> = [
  {
    path: '/403',
    name: '403',
    meta: {
      hidden: true,
      isScreen: true,
      title: '403',
    },
    component: () => import('@/views/error/403.vue'),
  },
  {
    path: '/404',
    name: '404',
    meta: {
      hidden: true,
      isScreen: true,
      title: '404',
    },
    component: () => import('@/views/error/404.vue'),
  },
  {
    path: '/500',
    name: '500',
    meta: {
      hidden: true,
      isScreen: true,
      title: '500',
    },
    component: () => import('@/views/error/500.vue'),
  },
  // 刷新路由
  {
    path: '/refresh',
    name: 'refresh',
    meta: {
      hidden: true,
      title: '页面刷新',
    },
    component: {
      beforeRouteEnter(to, from, next) {
        next((instance) => instance.$router.replace({ name: from.name || undefined }));
      },
      render: () => h('div', ''),
    },
  },
  // 未匹配到路由的缺省设置必须放在最后
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    meta: {
      hidden: true,
      title: '未找到页面',
    },
    redirect: { name: '404' },
  },
];
export default commonRoutes;
