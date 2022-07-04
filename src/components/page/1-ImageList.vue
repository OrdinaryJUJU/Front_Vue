<template>
  <div class="vm-image-list" v-loading="loading"
			 element-loading-text="上传中！请耐心等待！"
		    element-loading-spinner="el-icon-loading"
			  element-loading-background="rgba(0, 0, 0, 0.8)">
	<!-- 分页 -->
    <Row class="image-list-heading vm-panel" >
	   <div class="row-left" >
		   <Upload
		     action="image/upload"
		     :accept="acceptFile"
		     :before-upload="upload"
			 >
		     <el-button icon='el-icon-upload' round='true' size="medium"> 上传图片 </el-button>
		   </Upload>
	   </div>
      <div class="heading">
		<Row >
		  <span>每页显示</span>
		  <Input :max="40" :min="1" :number="true" v-model="showNum" class="input-number" @on-change=" updateDataShow "></Input>
		  <span class="total">图片总数{{ dataImageList.length }}</span>
		  <Page :total="dataImageList.length" :current="currentPage" :page-size="showNum" @on-change="pageChange"></Page>
		</Row>
	  </div>
    </Row>
	<!-- 图片 -->
    <Row class="image-list" width="1200px">
      <Col :lg="6" :sm="12" v-for="item in dataShow"  style="margin-top:15px;">
		<div class="card-img">
		    <img  height="200" width="250" :src="item.imgUrl" alt="">
			<el-button  style="position: absolute;left:10px;top:80%; "type="info" icon="el-icon-delete" circle @click="modalDelete=true;deleteUrl=item.imgUrl;deleteId=item.id"></el-button>
		</div>
      </Col>
    </Row>
	<Modal
	    v-model="modalDelete"
	    title="确认删除"
		width="300px"
	    >
		<img :src="this.deleteUrl" height="200px"width="280px" style="box-align: center;"></img>
	    <p>你确定要删除这个图片吗?</p>
		<div slot="footer">
			<Button type="default" @click="modalDelete=false;">取消</Button>
			<Button type="primary" @click="deleteOk" >确认删除</Button>
		</div>
	</Modal>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'imagelist',
	data: function () {
	  return {
		deleteUrl:'',
		deleteId:'',
		modalDelete: false,
		keyword: '', // keyword for search
		dataShow: [], // data for showing
		showNum: 8, // number of item per page
		currentPage: 1,
	    dataImageList: [],
		imgList:[],
		newImage:{
				"id":"",
				"imgName":"",
				"imgUrl":"",
				"uploadTime":"",
			    },
		acceptFile: 'image/png,image/jpeg',
		 loading: false,
	  }
	},
    methods: {
		deleteOk: function () { 
		  axios.post('http://localhost:8081/gallery/deleteimg',
		  			{
		  				'id':this.deleteId
		  			},
		  			{
		  				headers:{
		  					'token':localStorage.token,
							'Content-Type' : 'multipart/form-data',
		  						}
		  			}
		  			).then(res => {
		  				if(res.data.code==200)
		  				{
							this.$message.success(res.data.msg);
							this.modalDelete=false;
							for (let i = 0; i < this.dataImageList.length; i++) {
							  if (this.dataImageList[i].id === this.deleteId) {
							    this.dataImageList.splice(i, 1)
							  }
							}
		  				}else{
		  					this.$message.success(res.data.msg);
		  				}
		  				
		  			})
		  
		},
		upload: function (file){
			if (!this.acceptFile.split(',').includes(file.type)) {
			  this.$Message.warning('未选中图片格式的文件')
			  return false
			}
			if (file.size / 1024 > this.maxSize) {
			  this.$Message.warning(`文件大小超过了${this.maxSize}KB`)
			  return false
			}
			let formData = new FormData();
			formData.append('image', file);
			this.loading=true;
			axios.post('http://localhost:8081/gallery/uploadimg/' ,formData,
				{
					headers:{
						'token':localStorage.token,
						'Content-Type' : 'multipart/form-data'
							}
						}).then(res => {
							if(res.data.code==200)
							{
								this.$message.success(res.data.msg);
								axios.get('http://localhost:8081/gallery/getimage/' ,{
									//this.param,
									    params:{
											username: localStorage.ms_username
										},
										headers:{
											token:localStorage.token
												}
											}).then(res => {
												if(res.data.code==200)
												{
													this.dataImageList=res.data.data.reverse();
													this.dataShow = this.dataImageList.slice(0, this.showNum);
													// localStorage.setItem("imgList",JSON.stringify(this.dataImageList));
													// console.log(localStorage.imgList);
													console.log(res.data.data)
													this.loading=false;
												}else{
													this.$message.success('获取失败！');
												}
												
											})
							}else{
								this.$message.success(res.data.msg);
							}
							
						})
			
			  // 若返回 false 则停止上传,此时中断则判断大小无法使用max-size属性判断
			return false
		},
		// 分页
		updateDataShow: function () {
	      let startPage = (this.currentPage - 1) * this.showNum
	      let endPage = startPage + this.showNum
	      this.dataShow = this.dataImageList.slice(startPage, endPage)
	    },
	    pageChange: function (page) {
	      this.currentPage = page
	      this.updateDataShow()
	    },
	  },
	  watch: {
		dataImageList: {
						handler(newName, oldName) {
							this.dataShow = this.dataImageList.slice(0, this.showNum);
						},
						immediate: true,
					},
	    data: function () {
	      this.dataShow = this.dataImageList.slice(0, this.showNum) // update dataShow once data changed
	    }
	  },
	  mounted: function () {
	    this.dataShow = this.dataImageList.slice(0, this.showNum)
	  },
	// 获取请求
	created() {
		//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhdXRoMCIsImV4cCI6MTY1NjcwODE4MCwiZW1haWwiOiJ5dWFuMzQ3MzQ4MzU4QDE2My5jb20ifQ.UUFVjSWLUTDqltbzjZvK4uWfIdcogBy-VkY_0g_pbN8
		//param: { username: localStorage.ms_username};
		axios.get('http://localhost:8081/gallery/getimage/' ,{
			//this.param,
			    params:{
					username: localStorage.ms_username
				},
				headers:{
					token:localStorage.token
						}
					}).then(res => {
						if(res.data.code==200)
						{
							this.dataImageList=res.data.data.reverse();
							this.dataShow = this.dataImageList.slice(0, this.showNum);
							// localStorage.setItem("imgList",JSON.stringify(this.dataImageList));
							// console.log(localStorage.imgList);
							console.log(res.data.data)
						}else{
							// console.log(res.data);
							console.log(headers)
							
							this.$message.success('获取失败！');
						}
						
					})
	},
  }
</script>

<style >
.row-left{
	float:left;
	margin-left: 50px;
	margin-top: 30px;
}
.heading{
	float:right;
	margin-left: 50px;
}
.page{
		float:left;
		margin-left: 50px;
	}	
span.delete{
        background-color: @primary-color;
      }
	
</style> 
