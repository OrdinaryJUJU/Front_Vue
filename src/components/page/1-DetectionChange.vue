<template>
  <div>
	<div class="rowdiv">
		<div class="imageWrap" id="img1" >
		  <img :src="insideSrc1" alt="">
		</div>
		<Upload
		  action="image/upload"
		  :accept="acceptFile"
		  :before-upload="beforeUpload1">
		  <Button style="width: 150px;" type="primary">上传图片1</Button>
		</Upload>
	</div>
    <div class="rowdiv">
		<div class="imageWrap" id="img2">
		  <img :src="insideSrc2" alt=""  >
		</div>
		<Upload
		  action="image/upload"
		  :accept="acceptFile"
		  :before-upload="beforeUpload2">
		  <Button style="width: 150px;" type="primary">上传图片2</Button>
		</Upload>
	</div>
	<div class="rowdiv">
		<div class="imageWrap" id="img3">
		  <img :src="out" alt=""  >
		</div>
		<div>
			<Button style="width: 150px;" type="primary" @click="onSubmit" >识别</Button>
		</div>
	</div>
	 
  </div>
  
</template>
<script>
import { changedetection } from '../../api/index';
import axios from 'axios';
  export default {
    name: 'detectionchange',
    props: {
      title: {
        type: String,
        default: '个人信息'
      },
      type: String,
      columns: Array,
      data: Array
    },
    data () {
      return {
          // 展示选中的的imageSrc
        insideSrc1: '',
		insideSrc2: '',
		out:'123',
		file1: '',
		file2: '',
          // 接受上传的文件类型
        acceptFile: 'image/png,image/jpeg'
      }
    },
    methods: {
      beforeUpload1 (file) {
        if (!this.acceptFile.split(',').includes(file.type)) {
          this.$Message.warning('未选中图片格式的文件')
          return false
        }
        if (file.size / 1024 > this.maxSize) {
          this.$Message.warning(`文件大小超过了${this.maxSize}KB`)
          return false
        }
          // 照片转换为base64
        const reader = new FileReader()
          // 将读取到的文件编码成Data URL
        reader.readAsDataURL(file)
        reader.onload = (event) => {
          // this.title = reader.result
		  //this.param.uploadFile[0]=reader.result
          this.insideSrc1= event.srcElement.result
		  document.getElementById("img1").style.display="inline" 
		  this.file1 = file;
        }
          // 若返回 false 则停止上传,此时中断则判断大小无法使用max-size属性判断
        return false
      },
	  beforeUpload2 (file) {
	    if (!this.acceptFile.split(',').includes(file.type)) {
	      this.$Message.warning('未选中图片格式的文件')
	      return false
	    }
	    if (file.size / 1024 > this.maxSize) {
	      this.$Message.warning(`文件大小超过了${this.maxSize}KB`)
	      return false
	    }
	      // 照片转换为base64
	    const reader = new FileReader()
	      // 将读取到的文件编码成Data URL
	    reader.readAsDataURL(file)
	    reader.onload = (event) => {
	    this.insideSrc2= event.srcElement.result
		document.getElementById("img2").style.display="inline" 
		this.file2 = file;
	    }
	      // 若返回 false 则停止上传,此时中断则判断大小无法使用max-size属性判断
	    return false
	  },
	  onSubmit (){
		 let formData = new FormData();
		formData.append('uploadFile', this.file1);
		formData.append('uploadFile',this.file2)
		this.$message.success('识别中！请耐心等待！');
		axios.post('http://localhost:8081/changedetection/' ,formData,
			{
				headers:{
					'token':localStorage.token,
					'Content-Type' : 'multipart/form-data'
						}
					}).then(res => {
						if(res.data.code==200)
						{
							this.out=res.data.data;
							document.getElementById("img3").style.display="inline" 
							
						}else{
							this.$message.success('上传失败，请检查后重新上传！');
						}
						
					})
	  },
    }
  }
  </script>
  <style scoped>
    .imageWrap {
      /* width: 100%;
      height: 200px;
      border: 1px solid red; */
      object-fit: cover;
	  display: none;
    }
    img {
      width: 300px;
      height: 400px;
      border: 1px solid #000;
	  /* float:left; */
    }
	.rowdiv{
		float:left;
		margin-left: 50px;
	}
</style>
