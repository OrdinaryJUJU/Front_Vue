<template>
        <div class="ms-login">
			<div >
				<h1 align="center">用户信息更新</h1>
				<span>&nbsp</span>
			</div>
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px" label-position="top"  >
                    <el-form-item label="邮     箱 :" prop="email" placeholder="请输入邮箱" :rules="[  { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] } ]" >
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
					<el-form-item label="用户名:" prop=" username" placeholder="请输入用户名" >
					    <el-input v-model="form.username"></el-input>
					</el-form-item>
                    <el-form-item label="性 别:">
                        <el-select v-model="form.gender" placeholder="请选择">
                            <el-option key="male" label="男" value="0"></el-option>
                            <el-option key="female" label="女" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item >
                        <el-button position="right" type="primary" @click="onSubmit">提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
</template>

<script>
import axios from 'axios'
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
                email: '',
                username: '',
                gender: '',
            }
        };
    },
    methods: {
        onSubmit() {
			// 提交成功则msg进行成功提示，跳转login页面
			//提交失败，页面不免，显示失败原因
			axios.post('http://192.168.31.18:8081/user/updateuser' ,
						this.form,
						{
							headers:{
								'token':localStorage.token,
								'Content-Type' : 'multipart/form-data',
									}
						}
						).then(res => {
							this.loading=false;
							if(res.data.code==200)
							{
								this.$message.success(res.data.msg);
							}else{
								this.$message.success(res.data.msg);
							}
							
						})
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
	height:700px;
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