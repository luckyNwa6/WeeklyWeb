/*
 * 
 *    ┏┓　　　┏┓
 *  ┏┛┻━━━┛┻┓
 *  ┃　　　　　　　┃
 *  ┃　　　━　　　┃
 *  ┃　＞　　　＜　┃
 *  ┃　　　　　　　┃
 *  ┃...　⌒　...　┃
 *  ┃　　　　　　　┃
 *  ┗━┓　　　┏━┛
 *      ┃　　　┃　
 *      ┃　　　┃
 *      ┃　　　┃
 *      ┃　　　┃  神兽保佑
 *      ┃　　　┃  代码无bug　　
 *      ┃　　　┃
 *      ┃　　　┗━━━┓
 *      ┃　　　　　　　┣┓
 *      ┃　　　　　　　┏┛
 *      ┗┓┓┏━┳┓┏┛
 *        ┃┫┫　┃┫┫
 *        ┗┻┛　┗┻┛
 * 
 * @Author: luckyNwa
 * @Date: 2023-07-11 00:12:19
 * @LastEditTime: 2023-07-11 17:57:45
 */


import axios from 'axios'
/**
 * axios的封装
 * 可以对拦截器各种处理
 */
let request = axios.create({
  baseURL: '/api',

  timeout: 5000
})

request.interceptors.request.use(
	(config) => {
		// 在发送请求之前做些什么
		// 比如判断是否有token
		config.headers.token = window.sessionStorage.getItem('token')
	
		return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

//添加响应拦截器,下面改了会报错
axios.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default request
