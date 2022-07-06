<template>
    <div class="sidebar">
			<el-menu
				mode="horizontal"
			    :default-active="onRoutes"
			    background-color="#b3b3b3"
			    text-color="#101010"
			    active-text-color="#2f2f2f"
			    router
				
			>
				<template v-for="item in items" class="c1">
					<el-menu-item :index="item.index" :key="item.index" >{{item.title }}</el-menu-item>
				</template>
			</el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: '/imgenhancement',
                    title: '图像增强'
                },
				{
				    icon: "el-icon-lx-cascades",
				    index: "/imagelist",
				    title: "我的图库",
				},
				{
				    icon: "el-icon-lx-cascades",
				    index: "/extractiontarget",
				    title: "目标提取",
				},
				{
				    icon: "el-icon-lx-cascades",
				    index: "/detectionchange",
				    title: "变化检测",
				},
				{
				    icon: "el-icon-lx-cascades",
				    index: "/detectiontarget",
				    title: "目标检测",
				},
				{
				    icon: "el-icon-lx-cascades",
				    index: "/classification",
				    title: "地物分类",
				},
				{
				    icon: "el-icon-lx-cascades",
				    index: "/userinfo",
				    title: "个人信息",
				}
            ]
        };
    },
    computed: {
        // onRoutes() {
        //     return this.$route.path.replace('/', '');
        // }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.el-menu-item.is-active{
	font-weight: bold;
	border-bottom: 2px solid ;
}

</style>
