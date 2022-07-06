import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/imagelist'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                // {
                //     path: '/dashboard',
                //     component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                //     meta: { title: '系统首页' }
                // },
				{
				    path: '/classification',
				    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/1-classification'),
				    meta: { title: '地物分类' }
				},
				{
				    path: '/detectiontarget',
				    component: () => import(/* webpackChunkName: "icon" */ '../components/page/1-DetectionTarget.vue'),
				    meta: { title: '目标检测' }
				},
				{
				    path: '/detectionchange',
				    component: () => import(/* webpackChunkName: "table" */ '../components/page/1-DetectionChange.vue'),
				    meta: { title: '变化检测' }
				},
				{
				    path: '/extractiontarget',
				    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/1-ExtractionTarget.vue'),
				    meta: { title: '目标提取' }
				},
				{
				    path: '/imagelist',
				    component: () => import(/* webpackChunkName: "table" */ '../components/page/1-ImageList.vue'),
				    meta: { title: '历史上传' }
				},
				{
				    path: '/userinfo',
				    component: () => import(/* webpackChunkName: "editor" */ '../components/page/1-UserInfo.vue'),
				    meta: { title: '个人信息' }
				},
				{
				    path: '/imgenhancement',
				    component: () => import(/* webpackChunkName: "editor" */ '../components/page/imgEnhancement.vue'),
				    meta: { title: '图像增强' }
				}
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
		{
		    path: '/register',
		    component: () => import(/* webpackChunkName: "login" */ '../components/page/register.vue'),
		    meta: { title: '注册' }
		}
    ]
});
