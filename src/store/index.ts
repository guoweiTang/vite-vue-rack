/*
 * @Description: 统一状态管理
 * @Author: tangguowei
 * @Date: 2021-05-19 18:24:20
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-09-28 11:38:22
 */
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { RootState } from './data.d';
import common from './admin/common';
import user from './admin/user';
import basicTable from './modules/basic-table';

const store = createStore<RootState>({
  modules: {
    admin: {
      namespaced: true,
      modules: {
        common,
        user,
      },
    },
    'basic-table': basicTable,
  },
  plugins: [
    createPersistedState({
      reducer(val) {
        return {
          // 只有该模块数据持久化（浏览器localstorage）
          admin: val.admin,
        };
      },
    }),
  ],
});

export default store;
