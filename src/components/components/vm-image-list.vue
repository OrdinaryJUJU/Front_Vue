<template>
  <div class="vm-image-list">
    <Row class="image-list-heading vm-panel">
      <div class="panel-heading">
        {{ title }}
      </div>
		  <Row >
		    <span>每页显示</span>
		    <Input :max="40" :min="1" :number="true" v-model="showNum" class="input-number" @on-change=" updateDataShow "></Input>
		    <span class="total">图片总数{{ data.length }}</span>
		    <Page :total="data.length" :current="currentPage" :page-size="showNum" @on-change="pageChange"></Page>
		  </Row>
	 
      <Row type="flex" align="middle" justify="space-between" class="panel-body">
        
      </Row>
    </Row>
    <Row class="image-list" :gutter="16" >
      <Col :lg="6" :sm="12" class="vm-margin" v-for="item in dataShow" :key="item.id" style="margin:10px;">
        <VmCard :editable="true"  :img="item.img" @delete-ok=" deleteOk(item) "></VmCard>
      </Col>
    </Row>
  </div>
</template>

<script>
  import VmCard from '../components/vm-card'
  export default {
    name: 'VmImageList',
    components: {
      VmCard
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      // origin data
      data: {
        type: Array,
        default: function () {
          return [
            {
              id: '19920805',
              title: 'Title',
              img: require('../assets/img/img-1.jpg'),
            }
          ]
        }
      }
    },
    data: function () {
      return {
        keyword: '', // keyword for search
        dataShow: [], // data for showing
        showNum: 8, // number of item per page
        currentPage: 1
      }
    },
    methods: {
      updateDataShow: function () {
        let startPage = (this.currentPage - 1) * this.showNum
        let endPage = startPage + this.showNum
        this.dataShow = this.data.slice(startPage, endPage)
      },
      pageChange: function (page) {
        this.currentPage = page
        this.updateDataShow()
      },
      search: function () {
        let that = this
        let tempData = that.data
        that.dataShow = []
        tempData.forEach(function (elem) {
          for (let i in elem) {
            if (elem[i].toString().indexOf(that.keyword) > -1) {
              that.dataShow.push(elem)
              return
            }
          }
        })
      },
      deleteOk: function (data) {
        this.$emit('delete-ok', data)
      }
    },
    watch: {
      data: function () {
        this.dataShow = this.data.slice(0, this.showNum) // update dataShow once data changed
      }
    },
    mounted: function () {
      this.dataShow = this.data.slice(0, this.showNum)
    }
  }
</script>
<style>
.page{
		float:left;
		margin-left: 50px;
	}
</style>
