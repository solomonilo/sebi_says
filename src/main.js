import './startup'

import Vue from 'vue'
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
Raven.config('https://3c7453af624c4e1eb89c0fbabd6ba9bb@sentry.io/271363')
  .addPlugin(RavenVue, Vue)
  .install();
import App from './App'
import router from './router'
import * as resources from './resources'
import resource from './plugins/resource'
import deviceQueries from './plugins/device-queries'

Vue.config.productionTip = false

Vue.use(resource, {
  resources,
  endpoint: '/static/api'
})

Vue.use(deviceQueries, {
  phone: 'max-width: 567px',
  tablet: 'min-width: 568px',
  mobile: 'max-width: 1024px',
  laptop: 'min-width: 1025px',
  desktop: 'min-width: 1280px',
  monitor: 'min-width: 1448px'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
