import Vue from 'vue'
import App from './app.vue'
import ElementUI from 'element-ui';

Vue.use(ElementUI);


new Vue({
  render: h => h(App)
}).$mount('#app')