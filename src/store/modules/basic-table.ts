/*
 * @Description: 基础列表
 * @Author: tangguowei
 * @Date: 2021-09-16 16:50:00
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-08 13:58:42
 */
import { BasicTableData } from '@/store/data.d';

export default {
  namespaced: true,
  state: {
    // 总计
    totalCount: 0,
  },
  mutations: {
    setTotalCount(state: BasicTableData, payload: number):void {
      state.totalCount = payload;
    },
  },
};
