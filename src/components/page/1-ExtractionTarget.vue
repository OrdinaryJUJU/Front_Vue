<template>
  <div >
	<div class="rowdiv" >
		<div class="imageWrap" id="img1" >
		  <img class="select" :src="this.selectImg" alt="" height="500" >
		</div>
		<el-button @click="playVideo" id="select1" icon='el-icon-thumb' round='true' size="medium"> 选择图片 </el-button>
		<div class="imageWrap" id="img2" >
		  <div v-loading="loading"  
			element-loading-text="处理中"
			element-loading-spinner="el-icon-loading"
			element-loading-background="rgba(0, 0, 0, 0.8)"  
			class="rowdiv2">
				<img class="select" :src="this.out" alt="" height="500" >
			</div>
		  
		  <el-button @click="playVideo" id="select1" icon='el-icon-thumb' round='true' size="medium"> 重新选择 </el-button>
		</div>
	</div>	
    <el-dialog
      :visible.sync="videoVisible"
      width="80%"
      title="选择图像"
      @close="closeDialog"
	  
    >
		<div class="circle">
		  <ul class="circle-ul">
		    <li v-for="(item) of dataImageList" :key="item.index" class="circle-li">
		      <div v-on:click="changeList(item.index)" v-bind:class="{changeBorder:item.index==a}" value="change!">
		        <img :src="item.imgUrl" style="width: 100px;height: 100px;padding-top: 5px;" alt />
		        <div class="topic-shade">
		          <div class="shade"><img src="../../assets/img/对号.png" style="width: 14px;height: 14px;" alt /></div>
		        </div>
		      </div>
		    </li> 
		  </ul>
		  <el-button @click="select"  v-loading.fullscreen.lock="fullscreenLoading"> 确认选择 </el-button>
		</div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'targetextraction',
  created() {
  	axios.get('http://localhost:8081/gallery/getimage/' ,{
  		    params:{
  				username: localStorage.ms_username
  			},
  			headers:{
  				token:localStorage.token
  					}
  				}).then(res => {
  					if(res.data.code==200)
  					{
  						this.dataImageList=res.data.data;
  						for (var i = 0; i < this.dataImageList.length; i++) {
  							this.dataImageList[i].coverImg=this.dataImageList[i].imgUrl;
  							this.dataImageList[i].index=i;
  						}
						console.log(this.dataImageList);
  					}else{
  						// console.log(res.data);
  						console.log(headers)
  						
  						this.$message.success('获取失败！');
  					}
  					
  				})
  },
  data() {
      return {
		 a:0,
		 dataImageList: [],
		 selectImg:'',
		 out:'',
        //默认false 弹框隐藏状态    
         videoVisible: false,
		 selectedImages: [],
		 initialSelected: [],
		 loading: false,
      }
  },
  methods: {
    //点击按钮时,触发弹出效果
		select(){
			this.selectImg=this.dataImageList[this.a].coverImg;
			console.log(this.dataImageList[this.a].coverImg);
			this.videoVisible = false;
			this.loading=true;
			document.getElementById("img1").style.display="inline";
			document.getElementById("img2").style.display="inline";
			document.getElementById("select1").style.display="none";
			axios.post('http://192.168.31.18:8081/targetextraction/' ,
						{
							'image': this.selectImg
						},
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
								this.out=res.data.data;
			
							}else{
								this.$message.success(res.data.msg);
							}
							
						})
		},
		changeList(index){
		      if(this.a == index){
		          //this.a =! this.a;
		      }else{
		          this.a =index;
		      } 
		    },
        playVideo() {
            //触发点击时,让其显示
            this.videoVisible = true
        },
        //事件操作 (表格、表单 同理 需要执行的事件 在此处)
        closeDialog() {
          //点击播放视频
          //this.$refs.video.pause()
        },
  }
}
</script>

<style lang="stylus" scoped>
// .select{
// 	width:150px;
// 	height:150px;
// }
.imageWrap {
      /* width: 100%;
      height: 200px;
      border: 1px solid red; */
      object-fit: cover;
	  display: none;
	  margin-left: 50px;
    }
body {
    margin: 0;
  }
.tag{
	margin-right: 20px;
}
#select1{
	margin-left: 5px;
}
.rowdiv{
		float:left;
		margin-left: 50px;
	}
.rowdiv2{
		float:right;
		margin-left: 50px;
	}
.circle{
  position: relative;
  width: 632px;
  left: 15px;
}
.circle-ul {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 532px;
  padding: 0;
  margin: 14px 0 0 50px;
}
.circle-li {
  margin-right: 20px;
  list-style: none;
  margin-bottom: 20px;
   
}
.topic-shade
  display: none;
.changeBorder 
  width: 114px;
  height: 114px;
  position: relative;
  cursor: pointer;
  border: 1px dashed #969696; 
  margin: -1px -8px 0 -8px;
  .topic-shade
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: absolute;
    top: 123.5px;
    right: 0;
    bottom: 0;
    left: 86px;
    .shade
      margin-bottom: 4px;     
</style>