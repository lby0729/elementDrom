import Vue from 'vue'
import Router from 'vue-router'
import index from './views/Index.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import classcontrol from './views/CLassControl.vue'
import dormitorymanage from './views/DormitoryManage.vue'
import usercontrol from './views/UserControl.vue'
import studentmanage from './views/StudentManage.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/home',
			name: 'home1',
			component: Home
		},
		{
			path: '/about',
			name: 'about',
			component: About,
			redirect: '/index',
			meta: { title: '首页' },
			children: [
			{
				path: '/',
				component: index,
				meta: { title: '首页' }
			},
			{
				path: '/classcontrol',
				component: classcontrol,
				meta: { title: '班级管理' }
			},
			{
				path: '/dormitorymanage',
				component: dormitorymanage,
				meta: { title: '宿舍管理' }
			},
			{
				path:'/usercontrol',
				name:'usercontrol',
				component:usercontrol
			},
			{
				path:'/studentmanage',
				name:'studentmanage',
				component:studentmanage
			}
			]
		},
		{
			path: '/breadcrumb',
			name: 'breadcrumb',
			component: () => import( /* webpackChunkName: "about" */ './views/Breadcrumb.vue'),
		},
	]
})
