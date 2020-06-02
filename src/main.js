import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import './registerServiceWorker'
import router from './router/index'
import store from './store/index'
import AppModal from './plugins/appModal'

Vue.config.productionTip = false

Vue.use(AppModal)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
