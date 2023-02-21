import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name: 'Main',
    component: () =>import('../views/Main.vue'),
    redirect:'/home',
      children:[
        {
          path:'/home',
          name:'home',
          component:() => import('../views/home/Home.vue')
        },
        {
          path:'/user',
          name:'User',
          component:() => import('../views/user/User.vue')
        },
        {
          path:'/store',
          name:'Store',
          component:() => import('../views/store/Store.vue')
        },
        {
          path:'/store',
          name:'Store',
          component:() => import('../views/store/Store.vue')
        },
        {
          path:'/statistic',
          name:'Statistic',
          component:() => import('../views/statistic/Statistic.vue')
        }
      ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
