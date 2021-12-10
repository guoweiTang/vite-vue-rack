/*
 * @Description: 账户信息
 * @Author: tangguowei
 * @Date: 2021-09-16 15:13:33
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-10 16:17:37
 */
import { ActionContext } from 'vuex';
import {
  updateMyInfo,
  getMyInfo,
} from '@/views/service';
import router from '@/router/index';
import { UserData, UserInfo } from '@/store/data.d';

export default {
  namespaced: true,
  state: {
    token: {
      accessToken: '',
      refreshToken: '',
    },
    // 登录用户信息
    userInfo: {
      avatarUrl: '',
      name: '',
      gender: '',
      summary: '',
      description: '',
      role: '',
    },
  },
  actions: {
    async getUserInfo(context: ActionContext<string, unknown>, payload = {}) {
      return new Promise((resolve, reject) => {
        getMyInfo({ params: payload })
          .then(({ data }) => {
            context.commit('setUserInfo', data);
            resolve(data);
          })
          .catch((e: any) => {
            reject(e);
          });
      });
    },
    async setUserInfo(context: ActionContext<string, unknown>, payload: UserInfo) {
      updateMyInfo({ data: payload }).then(() => {
        context.commit('setUserInfo', payload);

        if (payload.role) {
          router.push({ name: 'refresh' });
        }
      });
    },
  },
  mutations: {
    setToken(state: UserData, payload = {}) {
      state.token = {
        ...state.token,
        ...payload,
      };
    },
    clearToken(state: UserData) {
      state.token = {};
    },
    setUserInfo(state: UserData, payload = {}) {
      state.userInfo = {
        ...state.userInfo,
        ...payload,
      };
    },
    clearUserInfo(state: UserData) {
      state.userInfo = {};
    },
  },
};
