<template>
    <div class="login-wrap">
        <div class="ms-login">
			<div >
				<h1 align="center">用户注册</h1>
				<span>&nbsp</span>
			</div>
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px" label-position="top"  >
                    <el-form-item label="邮     箱 :" prop="username" placeholder="请输入邮箱" :rules="[ { required: true, message: '请输入邮箱地址', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] } ]" >
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
					<el-form-item label="密 码:" prop="password" placeholder="请输入密码" :rules="[ { required: true, message: '请输入密码', trigger: 'blur' }]">
					    <el-input v-model="form.password"></el-input>
					</el-form-item>
                    <el-form-item >
                        <el-button position="right" type="primary" @click="onSubmit">注册</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { register } from '../../api/index';
export default {
    name: 'register',
	// computed:{
	// 	dataRule(){
	// 		const notnull = /\s*\S+?/
	// 		return {
	// 			name:[
	// 				{required:true, message:'必填项不能为空',trigger:'blur'},
	// 				{pattern: notnull,message:'请输入非空字符',trigger:'blur'}
	// 			]
	// 		}
	// 	}
		
	// },
    data() {
        return {
			// email:[
			// 	{required:true, message:'必填项不能为空',trigger:'blur'},
			// 	{pattern: notnull,message:'请输入非空字符',trigger:'blur'}
			// ],
            form: {
                username: '',
                //username: '',
                //gender: '',
                password: '',
            }
        };
    },
    methods: {
        onSubmit() {
			// 提交成功则msg进行成功提示，跳转login页面
			//提交失败，页面不免，显示失败原因
			register(this.form).then((res)=>{
				if(res.code==200){
					console.log(this.form);
					this.$message.success('提交成功！请登录');
					this.$router.push('/login');
				}else{
					this.$message.success('提交失败！请重新提交'+res.msg);
					return false;
				}
			});
        }
    },
	
};
</script>
<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
	padding: 30px 30px;
    position: absolute;
    left: 30%;
    top: 30%;
    width: 700px;
	height:400px;
    margin: -50px 0 0 -50px;
    border-radius: 5px;
    background: rgba(255, 255, 255);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
.el-form-item_label-wrap{
	magin-left:0px;
}
</style>