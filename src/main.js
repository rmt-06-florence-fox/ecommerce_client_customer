import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as mdbvue from 'mdbvue'
import Gravatar from 'vue-gravatar'
import VueToastify from 'vue-toastify'

Vue.config.productionTip = false
Vue.component('v-gravatar', Gravatar)
Vue.use(VueToastify, {
  errorDuration: 4000,
  successDuration: 2000,
  canPause: false
})

for (const component in mdbvue) {
  Vue.component(component, mdbvue[component])
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
