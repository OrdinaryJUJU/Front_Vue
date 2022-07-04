<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
	name: "app",
	 mounted: function () {
	         //此方法刷新页面时也会执行
	         window.addEventListener('beforeunload',()=>{
	            localStorage.removeItem('token');
				localStorage.removeItem('ms_username');
				localStorage.removeItem('imgList');
	        });
	    },
}
 
</script>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>