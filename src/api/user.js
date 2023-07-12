/*
 * @Author: luckyNwa
 * @Date: 2023-07-04 10:38:45
 */
import request from '@/util/request'

/**
 * 
 * @param {修改密码} params 
 * @returns 
 */
export const modifyPwd = (params) => {
  return request({
    url: '/home/modifyPwd',
    method: 'put',
    params
  })
}


/**
 * 
 * @param {获取日志表} params 
 * @returns 
 */
export const getLogList = (params) => {
  return request({
    url: '/home/getLogList',
    method: 'get',
    params
  })
}
/**
 * 
 * @param {获取我的周报} params 
 * @returns 
 */

export const getMyWeekList = (params) => {
  return request({
    url: '/home/getMyWeekList',
    method: 'get',
    params
  })
}
/**
 * 
 * @param {获取编辑里的我的周报} params 
 * @returns 
 */

export const getMyWeek = (params) => {
  return request({
    url: '/home/getMyWeek',
    method: 'get',
    params
  })
}
/**
 * 
 * @param {保存数据} datas 
 * @returns 
 */

export const keepMyWeekly = (datas) => {
  return request({
    url: '/home/keepMyWeekly',
    method: 'post',
    data: datas
  })
}
/**
 * 
 * @param {单删除} params 
 * @returns 
 */

export const delMyWeekOne = (params) => {
  return request({
    url: '/home/delMyWeekOne',
    method: 'delete',
    params
  })
}
/**
 * 
 * @param {批量删除} list1 
 * @returns 
 */

export const delMyWeekMore = (list1) => {
  return request({
    url: '/home/delMyWeekMore',
    method: 'delete',
    params: {
      list: list1
    }
  })
}
/**
 * 
 * @param {添加1} params 
 * @returns 
 */

export const addOneMon = (params) => {
  return request({
    url: '/home/addOneMon',
    method: 'get',
    params
  })
}
/**
 * 
 * @param {添加2} datas 
 * @returns 
 */

export const addOneWeek = (datas) => {
  return request({
    url: '/home/addOneWeek',
    method: 'post',
    data: datas
  })
}
/**
 * 
 * @param {下载} params 
 * @returns 
 */

export const loadOne = (params) => {
  return request({
    url: '/home/export',
    method: 'get',
    params
  })
}
