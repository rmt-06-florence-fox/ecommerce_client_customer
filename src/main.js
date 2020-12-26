import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import settings from './config/vue-tailwind'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  settings,
  render: h => h(App)
}).$mount('#app')
