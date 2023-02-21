import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user.js'
import cart from './modules/cart'
import address from './modules/address'

export default new Vuex.Store({ 
  modules: {
    user,
    cart,
    address
  }
})
