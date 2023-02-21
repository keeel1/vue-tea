import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// 引入axios
import axios from 'axios'
Vue.prototype.$axios = axios
//公共css文件
import '@/assets/css/common.css'
// 字体图标css文件
import '@/assets/css/iconfont.css'
//淘宝无线适配
import '@/assets/js/flexible'

//ly-tab插件
import LyTab from 'ly-tab'
Vue.use(LyTab)


// vant
import "vant/lib/index.css";
import { Swipe, SwipeItem, Lazyload, GoodsAction, GoodsActionIcon, GoodsActionButton, Icon, Toast, Button, NavBar, Checkbox, CheckboxGroup, Card, Stepper, SwipeCell, Dialog, AddressList,AddressEdit,Area   } from 'vant'; // 按需引入,优化加载速度
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Lazyload);
Vue.use(Icon)
Vue.use(Toast)
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Card);
Vue.use(Stepper)
Vue.use(SwipeCell)
Vue.use(Dialog)
Vue.use(AddressList)
Vue.use(AddressEdit)
Vue.use(Area )

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
