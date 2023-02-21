import { INIT_ADDRESS } from './mutations-type'
export default {
  state: {
    list: [],
    defaultAddress: []
  },
  getters: {
    defaultControl(state) {
      let arr = state.list.filter(e => e.isDefault)
      return arr.length
    },

  },
  mutations: {
    [INIT_ADDRESS](state, arrAddress) {
      state.list = arrAddress;
      state.defaultAddress = state.list.filter(e => e.isDefault)
    },
  }
}