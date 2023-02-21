// // 引入 封装的api 
import api from './api.js';
 
export const getStore = () => api({
  url:`/admin/store`,
  method:"get"
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