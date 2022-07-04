<template>
  <div class="vm-image-list">
	<!-- 分页 -->
    <Row class="image-list-heading vm-panel">
      <div class="panel-heading">
      </div>
  		  <Row >
  		    <span>每页显示</span>
  		    <Input :max="40" :min="1" :number="true" v-model="showNum" class="input-number" @on-change=" updateDataShow "></Input>
  		    <span class="total">图片总数{{ dataImageList.length }}</span>
  		    <Page :total="dataImageList.length" :current="currentPage" :page-size="showNum" @on-change="pageChange"></Page>
  		  </Row>
    </Row>
	<!-- 图片 -->
    <Row class="image-list" :gutter="16" >
      <Col :lg="6" :sm="12" class="vm-margin" v-for="item in dataShow"  style="margin:10px;">
		<div class="card-img">
		    <img  height="300" width="400" :src="item.imgUrl" alt="">
		</div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'imagelist',
	data: function () {
	  return {
		modalDelete: false,
		keyword: '', // keyword for search
		dataShow: [], // data for showing
		showNum: 8, // number of item per page
		currentPage: 1,
	    dataImageList: [],
		imgList:[],
	  }
	},
    methods: {
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
	    deleteOk: function (data) {
	      this.$emit('delete-ok', data)
	    }
	  },
	  watch: {
	    data: function () {
	      this.dataShow = this.dataImageList.slice(0, this.showNum) // update dataShow once data changed
	    }
	  },
	  mounted: function () {
	    this.dataShow = this.dataImageList.slice(0, this.showNum)
	  },
      deletefn: function (data) {
        for (let i = 0; i < this.dataImageList.length; i++) {
          if (this.dataImageList[i].id === data.id) {
            this.dataImageList.splice(i, 1)
          }
        }
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
							this.dataImageList=res.data.data;
							this.dataShow = this.dataImageList.slice(0, this.showNum);
							this.imgList=res.data.data;
							for (var i = 0; i < this.dataImageList.length; i++) {
								this.dataImageList[i].src=this.dataImageList[i].imgUrl;
								this.dataImageList[i].id=i;
							}
							// localStorage.setItem("imgList",JSON.stringify(this.dataImageList));
							// console.log(localStorage.imgList);
							//console.log(res.data.data)
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
.page{
		float:left;
		margin-left: 50px;
	}	
.vm-card-vertical{
  .card-img{
    position: relative;
    img{
      display: block;
      width: 100%
    }
    .control{
      position: absolute;
      bottom: -20px;
      right: 15px;
      display: flex;
      span{
        display: flex;
        justify-content: center;
        margin-left: 10px;
        align-items: center;
        color: white;
        font-size: 18px;
        background-color: @primary-color;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
      }
      span.edit{
        background-color: @info-color;
        a{
          color: white;
        }
      }
      span.delete{
        background-color: @primary-color;
      }
    }
  }
  .card-desc{
    p{
      font-size: 14px;
      margin: 10px 0;
      text-align: justify;
      height: 84px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.vm-card-horizantal{
  overflow: hidden;
  position: relative;
  display: flex;
  padding: 0;
  .card-img{
    display: flex;
    align-items: center;
    width: 50%;
    img{
      display: block;
      margin: 0;
      width: 100%;
    }
  }
  .card-desc{
    width: 50%;
    p{
      font-size: 14px;
      margin: 10px 0;
      text-align: justify;
    }
  }
}
	
</style> 
