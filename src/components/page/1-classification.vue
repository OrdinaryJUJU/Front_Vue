<template>
  <div>
    <div class="imageWrap">
      <img :src="insideSrc" alt="">
    </div>
    <Upload
      action="image/upload"
      :accept="acceptFile"
      :before-upload="beforeUpload">
      <Button style="width: 150px;" type="primary">上传图片</Button>
    </Upload>
	 <Button style="width: 150px;" type="primary">点击进行识别</Button>
  </div>
</template>
<script>
  export default {
    name: '1-classification',
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
        insideSrc: '',
          // 接受上传的文件类型
        acceptFile: 'image/png,image/jpeg'
      }
    },
    methods: {
      beforeUpload (file) {
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
          this.insideSrc = event.srcElement.result
        }
          // 若返回 false 则停止上传,此时中断则判断大小无法使用max-size属性判断
        return false
      }
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
