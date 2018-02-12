import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Demand from '@/components/demand'
import hasDemand from '@/components/hasDemand'
import manage from '@/components/manage'
import manageDemand from '@/components/manageDemand'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [{
      	path: '/checkingList',
      	name: 'checkingList',
      	component: Demand
      },
      {
      	path: '/releasedList',
      	name: 'releasedList',
      	component: hasDemand
      },{
        path: '/manageList',
        name: 'manageList',
        component: manage
      },{
        path: '/manageDemand/:id',
        name: 'manageDemand',
        component: manageDemand
      }]
    }
  ]
})
