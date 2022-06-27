<template>
  <div>
    <div class="imageWrap">
      <img :src="insideSrc1" alt="">
    </div>
    <Upload
      action="image/upload"
      :accept="acceptFile"
      :before-upload="beforeUpload1">
      <Button style="width: 150px;" type="primary">上传图片1</Button>
    </Upload>
	<div class="imageWrap">
	  <img :src="insideSrc2" alt="">
	</div>
	<Upload
	  action="image/upload"
	  :accept="acceptFile"
	  :before-upload="beforeUpload2">
	  <Button style="width: 150px;" type="primary">上传图片2</Button>
	</Upload>
	 <Button style="width: 150px;" type="primary" @click="onSubmit" >点击进行识别</Button>
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
		param: {
			uploadFile:['',''],
			token:localStorage.token
		},
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
		  this.param.uploadFile[0]=reader.result
          this.insideSrc1= event.srcElement.result
		  console.log(this.param.token)
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
	      // this.title = reader.result
		  this.param.uploadFile[1]=reader.result
	      this.insideSrc2= event.srcElement.result
	    }
	      // 若返回 false 则停止上传,此时中断则判断大小无法使用max-size属性判断
	    return false
	  },
	  onSubmit (){
	  	changedetection(this.param).then(res=>{
	  		//formRef.value.code=res.data;
	  		// if(formRef.value.code==0){
	  		// 	console.log(form);
	  			ElMessage.success("提交成功！");
				console.log(res);
	  		// }else{
	  		// 	return false;
	  		// }
	  	});
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
    }
    img {
      width: 300px;
      height: 400px;
      border: 1px solid #000;
    }
</style>
