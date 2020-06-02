import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth/auth'
import request from './request/request'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: auth,
    request: request
  }
})
