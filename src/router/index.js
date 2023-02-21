import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 重写vue-router的push
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  // 重定向  
  {
    path: "/",
    redirect: '/home'
  },

  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/List.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    meta: {
      headerTitle: '购物车'
    },
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/my',
    name: 'My',
    meta: {
      headerTitle: '我的'
    },
    component: () => import('../views/my/My.vue'),
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      headerTitle: '登录'
    },
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      headerTitle: '注册'
    },
    component: () => import('../views/login/Register.vue')
  },
  {
    path: '/checkOut',
    name: 'CheckOut',
    meta: {
      headerTitle: '提交订单'
    },
    component: () => import('../views/CheckOut.vue')
  },
  {
    path: '/address',
    name: 'Address',
    meta: {
      headerTitle: '地址管理'
    },
    component: () => import('../views/my/Address.vue')
  },
  {
    path: '/editAddress',
    name: 'EditAddress',
    meta: {
      headerTitle: '编辑地址'
    },
    component: () => import('../views/my/EditAddress.vue')
  },
  {
    path: '/addAddress',
    name: 'AddAddress',
    meta: {
      headerTitle: '新增地址'
    },
    component: () => import('../views/my/AddAddress.vue')
  },
  {
    path: '/orderList',
    name: 'OrderList',
    meta: {
      headerTitle: '我的订单'
    },
    component: () => import('../views/my/OrderList.vue')
  },
  {
    path: '/search',
    name: 'Search',
    children: [
      {
        path: "/",
        name: 'index',
        component: () => import('../views/search/SearchIndex.vue')
      },
      {
        path: "/search/list",
        name: 'list',
        component: () => import('../views/search/SearchList.vue')
      }
    ],
    component: () => import('../views/Search.vue')
  },

]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
