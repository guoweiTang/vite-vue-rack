/*
 * @Description: 公共状态
 * @Author: tangguowei
 * @Date: 2021-09-16 15:13:33
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-08 13:50:12
 */
import { CommonData } from '@/store/data.d';

export default {
  namespaced: true,
  state: {
    // 页面是否不想显示其他多余内容（页尾/页头/侧边栏等），只显示当前路由所渲染内容（利用teleport显示期待的内容）
    isScreen: false,
    // 当前激活路由
    activeRoute: {
      name: '',
    },
  },
  mutations: {
    setIsScreen(state: CommonData, payload: boolean) {
      state.isScreen = payload;
    },
    setActiveRoute(state: CommonData, { name }: {name: string}) {
      state.activeRoute.name = name;
    },
  },
};
