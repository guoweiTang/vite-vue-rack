/*
 * @Description: 统一状态管理
 * @Author: tangguowei
 * @Date: 2021-05-19 18:24:20
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-16 11:23:56
 */
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { RootState } from './data.d';
import common from './admin/common';
import user from './admin/user';

const modules = import.meta.globEager('./modules/*.ts');

const storeModules: Record<string, unknown> = {};
for (const path in modules) {
  storeModules[(path.match(/([^\/]+)\.ts$/) as string[])[1]] = modules[path].default;
}
const store = createStore<RootState>({
  modules: {
    admin: {
      namespaced: true,
      modules: {
        common,
        user,
      },
    },
    ...storeModules,
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
