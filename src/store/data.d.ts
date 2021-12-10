/*
 * @Description: 声明文件
 * @Author: tangguowei
 * @Date: 2021-09-24 15:09:43
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-08 14:06:10
 */
export interface CommonData {
  isScreen: boolean;
  activeRoute: {
    name: string;
  }
}
export interface UserInfo {
  avatarUrl?: string;
  name?: string;
  gender?: string;
  summary?: string;
  description?: string;
  role?: string;
}
export interface Token {
  accessToken?: string;
  refreshToken?: string;
}
export interface UserData {
  token: Token;
  userInfo: UserInfo;
}
export interface RootState {
  admin: {
    user: UserData;
    common: CommonData;
  }
}
export interface BasicTableData {
  totalCount: number;
}
