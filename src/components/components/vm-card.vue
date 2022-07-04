<template>
  <div :class="[type === 'horizantal' ? 'vm-card-horizantal' : 'vm-card-vertical' , 'vm-panel']">
    <div class="card-img">
      <img :src="imgUrl" alt="">
      <div v-if="editable && type == 'vertical'" class="control">
        <span class="edit">
          <a :href="editUrl">
            <i class="fa fa-pencil"></i>
          </a>     
        </span>
        <span class="delete">
          <i class="fa fa-trash" @click="modalDelete=true"></i>
        </span>
      </div>
    </div>
    <div class="card-desc panel-body">
      <h2>{{ uploadTime }}</h2>
    </div>
    <Modal
        v-model="modalDelete"
        title="Delete"
        ok-text="OK"
        cancel-text="Cancel"
        v-on:on-ok="deleteOk">
        Are you sure to delete this data?
    </Modal>
  </div>
</template>
<script>
  export default {
    name: 'VmCard',
    props: {
      type: {
        type: String,
        default: 'vertical'
      },
      uploadTime: {
        type: String,
        default: "2022-07-01T10:10:16.000+00:00"
      },
      imgUrl: {
        type: String,
		default:'http://cup.lijx.cloud/img/gallery/2022/7/1/1cf91f1e-9b4d-4a15-84c6-b6dac167bb43',
      },
      imgName: {
        type: String,
        default: 'Lorem '
      }
    },
    data: function () {
      return {
        modalDelete: false
      }
    },
    methods: {
      deleteOk: function () {
        this.$emit('delete-ok')
      }
    }
  }
</script>
<style>
	
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