/*
 * @Description: file content
 * @Author: tangguowei
 * @Date: 2021-06-10 08:42:53
 * @LastEditors: tangguowei
 * @LastEditTime: 2021-06-10 09:15:14
 */
import request from '../utils/request';

/**
 * auth相关接口
 */
const baseDir = '/api';
export function getToken(data) {
  return request()(`${baseDir}/auth/login`, {
    skipAuthRefresh: true,
    method: 'POST',
    data: {
      ...data,
    },
  });
}
export function register(data) {
  return request()(`${baseDir}/auth/register`, {
    skipAuthRefresh: true,
    method: 'POST',
    data,
  });
}
export function resetPassword(data) {
  return request()(`${baseDir}/auth/reset-password`, {
    skipAuthRefresh: true,
    method: 'POST',
    data: {
      ...data,
    },
  });
}

/**
 * service相关接口
 */
export function getAllServices(params = {}) {
  return request()(`${baseDir}/services`, {
    params,
  });
}
export function addService(params = {}) {
  return request()(`${baseDir}/services`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export function updateService(pathParams, params = {}) {
  const { serviceId } = pathParams;
  return request()(`${baseDir}/services/${serviceId}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export function deleteService(pathParams, params = {}) {
  const { serviceId } = pathParams;
  return request()(`${baseDir}/services/${serviceId}`, {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export function getMyInfo(params = {}) {
  return request()(`${baseDir}/account/userinfo`, {
    data: {
      ...params,
    },
  });
}

export function updateMyInfo(params = {}) {
  return request()(`${baseDir}/account/userinfo`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export function getGoods(pathParams, params = {}) {
  const { storeId } = pathParams;
  return request()(`${baseDir}/stores/${storeId}/goods`, {
    params,
  });
}
export function getStores(params = {}) {
  return request()(`${baseDir}/stores`, {
    params,
  });
}
