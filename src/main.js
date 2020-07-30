import Vue from 'vue'
import App from './App.vue'
import router from './router'
import iView from 'iview';

import locale from 'iview/dist/locale/en-US';
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false
Vue.use(iView, {locale: locale});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
