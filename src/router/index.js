import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const HomePage = () =>import('components/HomePage.vue')
const router= new Router({
  mode:'hash',
  routes: [
    {
      path: '/home',
      component: HomePage,
      meta:{
        title:'微信OCR'
      },
      children:[
        {
          path:'',
          redirect:'news'
        }
      ]
    },
  ]
})
/*VueRouter.beforeEach((to,from,next)=>{
  document.title=to.meta.title
  next()
})*/
export default router
