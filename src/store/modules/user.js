import { USER_LOGIN, INIT_USER, LOGIN_OUT } from './mutations-type.js'
import { Toast } from 'vant';
export default {
  state: {
    loginStatus: false, //登录状态
    token: null, //token
    userInfo: {} //用户信息
  },
  mutations: {
    // 设置
    [USER_LOGIN](state, user) {
      state.loginStatus = true;
      state.token = user.token;
      state.userInfo = user;
      // 持久化存储
      localStorage.setItem('userInfo', JSON.stringify(user))
    },
    // 读取
    [INIT_USER](state) {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (userInfo) {
        state.loginStatus = true;
        state.token = userInfo.token;
        state.userInfo = userInfo;
      }
    },
    // 退出登录
    [LOGIN_OUT](state) {
      state.loginStatus = false;
      state.token = null;
      state.userInfo = {};
      localStorage.removeItem('userInfo')
      Toast.success({message:'退出成功！'})
    }
  },
}
