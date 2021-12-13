/*
 * @Description: 路由配置文件
 * @Author: tangguowei
 * @Date: 2021-09-27 17:52:49
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-13 14:36:07
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { ElLoading } from 'element-plus';
import store from '@/store';
import commonRoutes from './modules/common';
import authRoutes from './modules/auth';
import mainRoutes from './modules/index';
import { clearToken } from '@/utils/token';

export const routes: Array<RouteRecordRaw> = [
  ...mainRoutes,
  ...authRoutes,
  ...commonRoutes,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

function setIsScreen(val: boolean) {
  store.commit('admin/common/setIsScreen', val);
}

let loadingInstance: any;
router.beforeEach(async (to, from, next) => {
  loadingInstance = ElLoading.service({
    fullscreen: true,
    text: '精彩内容即将呈现……',
  });
  // 判断是否全屏显示该路由（通常都是登录，注册，404等页面）
  const isScreen = to.matched.some((item) => item.meta.isScreen);
  setIsScreen(!!isScreen);
  // 路由是否需要校验登录
  const isNeedAuth = to.matched.some((_) => _.meta.auth);
  const { token, userInfo } = store.state.admin.user;
  if (isNeedAuth) {
    if (token.accessToken) {
      // 当前用户角色
      let currentRole = userInfo.role;
      // 未获取用户信息，获取用户信息
      if (!currentRole) {
        try {
          setIsScreen(!!from.meta.isScreen);
          const data = await store.dispatch('admin/user/getUserInfo');
          currentRole = data.role;
          setIsScreen(!!isScreen);
        } catch (e: any) {
          if (e.response.status === 500) {
            // next方法重置路由不会走路由监听，所以需要手动设置isScreen值
            setIsScreen(true);
            next({
              name: '500',
            });
          }
        }
      }
      // 距离当前路由链最近的一个对角色权限的限定条件
      const nearAuth = to.matched.reverse().find((_) => Array.isArray(_.meta.auth));
      if (nearAuth) {
        // 需要身份校验（需要指定登录用户角色才可以访问）
        if ((nearAuth as any).meta.auth.includes(currentRole)) {
          // 校验成功
          next();
        } else {
          // 校验失败
          setIsScreen(true);
          next({
            name: '403',
          });
        }
      } else {
        // 不需要身份校验 直接通过（任何登录用户都能访问）
        next();
      }
    } else {
      // 携带上需校验登录的页面URL跳转至登录界面
      clearToken();
      setIsScreen(true);
      next({
        name: 'login',
        query: {
          redirect: to.fullPath,
        },
      });
    }
  } else if (token.accessToken && to.name === 'login') {
    // 如果登录状态 禁止进入登录页
    setIsScreen(false);
    next({
      name: 'home',
    });
  } else {
    // 不需要身份校验 直接通过
    next();
  }
  // 更新当前活跃路由
  store.commit('admin/common/setActiveRoute', to);
});

router.afterEach((to) => {
  loadingInstance.close();
  // 更改标题
  document.title = (to.meta.title as string) || import.meta.env.VITE_APP_TITLE as string;
  (document.querySelector('.el-main') as HTMLDivElement).scrollTo(0, 0);
});

export default router;
