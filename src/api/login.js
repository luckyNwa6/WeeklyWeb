/*
 * @Author: luckyNwa
 * @Date: 2023-07-04 10:38:45
 */
import request from '@/util/request'

/**
 * 
 * @param {登录} datas 
 * @returns 
 */

export const loginM = (datas) => {
  return request({
    url: '/index/login',
    method: 'post',
    data: datas
  })
}
