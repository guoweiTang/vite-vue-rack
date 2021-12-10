/*
 * @Description: 接口文件
 * @Author: tangguowei
 * @Date: 2021-06-10 08:42:53
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-12-08 11:35:11
 */
import axiosInstance from '@/utils/request';

/**
 * auth相关接口
 */
const baseDir = '/api';
export function getToken(config = {}) {
  return axiosInstance(`${baseDir}/auth/login`, {
    method: 'POST',
    skipAuthRefresh: true,
    ...config,
  });
}
export function register(config = {}) {
  return axiosInstance(`${baseDir}/auth/register`, {
    method: 'POST',
    skipAuthRefresh: true,
    ...config,
  });
}
export function resetPassword(config = {}) {
  return axiosInstance(`${baseDir}/auth/reset-password`, {
    method: 'POST',
    skipAuthRefresh: true,
    ...config,
  });
}

/**
 * 账户
 */
export function uploadFile(config = {}) {
  return axiosInstance(`${baseDir}/account/uploadAvatar`, {
    method: 'POST',
    postType: 'file',
    ...config,
  });
}

export function getMyInfo(config = {}) {
  return axiosInstance(`${baseDir}/account/userinfo`, config);
}

export function updateMyInfo(config = {}) {
  return axiosInstance(`${baseDir}/account/userinfo`, {
    method: 'PUT',
    ...config,
  });
}
export function getGoods(config = {}) {
  return axiosInstance(`${baseDir}/goods`, config);
}

export function deleteGoods(goodsId: string, config = {}) {
  return axiosInstance(`${baseDir}/goods/${goodsId}`, {
    method: 'DELETE',
    ...config,
  });
}

export function updateGoods(goodsId: string, config = {}) {
  return axiosInstance(`${baseDir}/goods/${goodsId}`, {
    method: 'PUT',
    ...config,
  });
}

export function getGoodDetail(goodsId: string, config = {}) {
  return axiosInstance(`${baseDir}/goods/${goodsId}`, config);
}
