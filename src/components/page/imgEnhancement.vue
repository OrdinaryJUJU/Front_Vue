<template>
	<div>
		<el-button @click="playVideo"  icon='el-icon-thumb' round='true' size="medium"> 选择图片 </el-button>
	<div class="enhance">
    <div calss="dv1"id='img1'>
      <el-image   style="width: 300px; height: 300px;margin-right:50px" :src="url" fit="fill" />
	  				<el-image  style="width: 300px; height: 300px" :src="valueReturn" fit="fill" v-loading="loading"
	  			element-loading-text="处理中"
	  			element-loading-spinner="el-icon-loading"
	  			element-loading-background="rgba(0, 0, 0, 0.8)" />
				 <el-button id='img2' type="primary" @click="save()">保存到图库</el-button>
    </div>
	 
	<div style="width: 80%; border-radius: 25px;">
		<div style="margin-left: 30px;">
			高斯滤波：<el-slider v-model="changeParams.blur" show-input/>
			饱和度：<el-slider v-model="changeParams.hue"  :max="255" show-input />
			对比度：<el-slider v-model="changeParams.saturation" :min="0" :max="10" :step="0.1" show-input />
			亮度：<el-slider v-model="changeParams.brightness" :min="0" :max="10" :step="0.1" show-input />
			阈值化：<el-slider v-model="changeParams.thresh_slider" :max="255" show-input/>
			边缘检测:<el-slider v-model="changeParams.canny_slider_a" :max="255" show-input/>
			<el-slider v-model="changeParams.canny_slider_b" :max="255" show-input/>
			轮廓检测：
			<el-slider v-model="changeParams.contour_slider" :max="255" show-input/>
			<el-slider v-model="changeParams.base_slider" :max="255" show-input/>
		</div>
	</div>
    <el-button type="primary" @click="submitChange()" >进行处理</el-button>
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
import axios from "axios";

export default {
	// 1.上传图片的功能 2.怎么传成url64 3.怎么村图
  name: "imgEnhancement",
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
	videoVisible:false,
	dataImageList: [],
	loading:false,
      url:'',
      valueReturn:'',
	  urlbase:'',
      changeParams: {
        blur: 0,
        hue:0,
        saturation:0,
        brightness: 0,
        thresh_slider:0,
        canny_slider_a:0,
        canny_slider_b:0,
        contour_slider:0,
        base_slider:0
      }
    };
  },
  methods: {
	  changeList(index){
	        if(this.a == index){
	            //this.a =! this.a;
	        }else{
	            this.a =index;
	        } 
	      },
	  select(){
	  	this.url=this.dataImageList[this.a].coverImg;
		this.valueReturn=this.dataImageList[this.a].coverImg;
	  	this.videoVisible = false;
	  	// this.loading=true;
	  	document.getElementById("img1").style.display="inline";
	  	// document.getElementById("img2").style.display="inline";
	  	// document.getElementById("select1").style.display="none";
	  },
	  playVideo() {
	      //触发点击时,让其显示
	      this.videoVisible = true
	  },
    submitChange(){
       let _self = this;
	   this.loading=true;
	   //给后端发送请求，返回图像增强的处理效果
      axios({
        method: "post",
        url: "http://localhost:5000/enhancement",
        data: {
          value:this.url,
          params:this.changeParams
        }
      }).then(response => {
		this.loading=false;
        this.valueReturn = "data:image/png;base64," + response.data.data.value;
		this.urlbase= response.data.data.value;
		// console.log(response.data.value)
      });
    },
	save(){
		//console.log(this.urlbase)
		axios.post('http://localhost:8081/gallery/save2gallery/' ,
					{
						'base64Data': this.urlbase,
						'params':this.changeParams,
						
					},
					{
						headers:{
							'token':localStorage.token,
								}
					}
					).then(res => {
						console.log(this.urlbase)
						if(res.data.code==200)
						{
							this.$message.success(res.data.msg);
		
						}else{
							this.$message.success(res.data.msg);
						}
					})
	}
  }
};
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
#img1{
 display: none;	
}
#img2{
	
}
.enhance {
 margin-top: 20px;
 padding: 25px 50px 75px 100px;
  height: 3500px;
  width: 80%;
  background-color:#ffffff;
  opacity: 0.8;
}
.slider-demo-block {
  margin-left: 20px;

  width: 300px;
}
.rowdiv{
		float:left;
		margin-left: 50px;
	}
.rowdiv2{
		float:left;
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