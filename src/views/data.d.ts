/*
 * @Description: 声明文件
 * @Author: tangguowei
 * @Date: 2021-12-07 16:59:30
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-08 13:43:00
 */
export interface PageData {
  page: number;
  size: number;
  total: number;
}
export interface Goods {
  id?: string;
  imgUrl?: string;
  name?: string;
  category?: string;
  spec?: string;
  saleDate?: string;
  description?: string;
}
