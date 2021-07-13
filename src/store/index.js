/*
 * @Description: file content
 * @Author: tangguowei
 * @Date: 2021-05-19 18:24:20
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-06-10 15:35:03
 */
import { createStore } from 'vuex';
import { updateMyInfo, getMyInfo } from '../views/service';
import router from '@/router';

export default createStore({
  state() {
    return {
      // 是否全屏显示，隐藏标准文档（利用teleport显示期待的内容）
      isScreen: false,
      // 当前激活路由
      activeRoute: {},
      // 登录用户信息
      userInfo: {
        name: '',
        gender: '',
        summary: '',
        description: '',
        role: '',
      },
    };
  },
  actions: {
    async getUserInfo({ commit }, payload = {}) {
      return new Promise((resolve, reject) => {
        getMyInfo(payload)
          .then(({ data }) => {
            commit('setUserInfo', data);
            resolve(data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    async setUserInfo({ commit }, payload = {}) {
      updateMyInfo(payload).then(() => {
        commit('setUserInfo', payload);

        if (payload.role) {
          router.push({ name: 'Refresh' });
        }
      });
    },
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = {
        ...state.userInfo,
        ...payload,
      };
    },
    setIsScreen(state, payload) {
      state.isScreen = payload;
    },
    setActiveRoute(state, payload) {
      state.activeRoute = payload;
    },
  },
  modules: {},
});
