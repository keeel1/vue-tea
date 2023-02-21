// // 引入 封装的api 
import api from './api.js';
 
export const getHomeTabbar = () => api({
  url:`/api/home`,
  method:"get",
})
export const getHomeList = (query) => api({
  url:`/api/home/goods`,
  method:'get',
  params:query
})
export const getSearchList = (query) => api({
  url:`/api/search/goods`,
  method:'get',
  params:query
})
export const getGoodsDetail = (query) => api({
  url:`/api/Detail`,
  method:'get',
  params:query
})
export const postEmail = (query) => api({
  url:`/api/login`,
  method:'get',
  params:query
})
export const postLoginTest = (query) => api({
  url:`/api/loginCheck`,
  method:'post',
  data:query
})
export const RegisterData = (query) => api({
  url:`/api/register`,
  method:'post',
  data:query
})
export const addCart = (query) => api({
  url:`/api/addCart`,
  method:'post',
  data:query
})
export const getCartData = (query) => api({
  url:`/api/Cart`,
  method:'get',
  params:query
})
export const updateCartNum = (query) => api({
  url:`/api/updateCartNum`,
  method:'post',
  data:query
})
export const deleteCartGoods = (query) => api({
  url:`/api/deleteCartGoods`,
  method:'post',
  data:query
})
export const getAddressList = (query) => api({
  url:`/api/address`,
  method:'post',
  data:query
})
export const addAddress = (query) => api({
  url:`/api/addAddress`,
  method:'post',
  data:query
})
export const updateAddress = (query) => api({
  url:`/api/updateAddress`,
  method:'post',
  data:query
})
export const deleteAddress = (query) => api({
  url:`/api/deleteAddress`,
  method:'post',
  data:query
})
export const selectDefaultAddress = (query) => api({
  url:`/api/selectDefaultAddress`,
  method:'post',
  data:query
})
export const getDefaultAddress = (query) => api({
  url:`/api/getDefaultAddress`,
  method:'post',
  data:query
})
export const submitOrder = (query) => api({
  url:`/api/submitOrder`,
  method:'post',
  data:query
})
export const payment = (query) => api({
  url:`/api/payment`,
  method:'post',
  data:query
})
// export const postXXX = (params) => api.post(`/apigb/v1/component/update-info`, params)
 
 
// // 下面是详细的写法
// export const xxxx = (params) => api({
//     url: '', // 请求地址
//     method: 'post', // 请求方式
//     // data: params, // (一般post请求，我们习惯使用 data属性来传参)
//     params: params //(一般get请求，我们习惯使用params属性来传参）
//     // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
// })