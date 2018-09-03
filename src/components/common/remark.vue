<!-- Created by xxxxx on xxxx/xx/xx -->
<template>
  <!--selectCom组件用途
  props:
  events:
  slots:
  use:
-->
  <div class="remarkCom">
    <timeline>
      <timeline-item v-for="(item, index) in remarkList" :key="index">
        <p :class="[index === 0 ? 'recent' : '', 'itemTop']">{{item.create_time}}</p>
        <h4 :class="[index === 0 ? 'recent' : '','itemContent']">{{item.remark_content}}</h4>
        <!--<img :src="`/api/file/viewFile?key=${item.file_key}`" @click="previewFile(item)" success-class="ximg-demo" error-class="ximg-error" :offset="-100" container="#vux_view_box_body"></img>-->
        <img :src="`/api/file/viewFile?key=${item.file_key}`" alt=""  @click.stop="previewFile(item)" v-if="item.file_key">
        <h4 :class="[index === 0 ? 'recent' : '','itemTitle']">{{item.file_name}}</h4>
      </timeline-item>
    </timeline>
  </div>
</template>

<script>
  export default {
    name: 'remarkCom',
    data() {
      return {
        urlList:[],
      }
    },
    props: {
      remark_type:{
        type: Number,
        default: 0
      },
      foreign_key_id:{
        type: String,
        default: ''
      },
    },
    components: {},
    data() {
      return {
        remarkList:[],
        imgSrc:'',
      }
    },
    activated() {
      this.findRemark();//获取信息动态
    },
    methods: {
      //获取动态列表
      findRemark(){
        this.axios.post('/common/findRemark_wx',{
          'foreign_key_id':this.foreign_key_id,
          'remark_type':this.remark_type
        }).then((response) => {
          if(response.data.code === 200){
            this.remarkList = response.data.body
//            this.imgSrc = "/api/file/viewFile?key"+this.remarkList
            let fileArray = this.remarkList.filter((item, index) => {
              return item.file_id;
            });
            let imgFileUrlList = this._.pluck(fileArray,'file_key');
            this.urlList = this._.map(imgFileUrlList, (num)=>{ return this.aliyun_img_url + num; })
          }
        });
      },
      //预览图片或者附件
      previewFile(file){
        let name = file.file_name;
        switch(name.substring(name.lastIndexOf(".")+1,name.length)){
          case 'mp4':
            break;
          default:
            this.$vux.loading.show({
              text: '加载中'
            })
            this.axios.get('/file/getOssFileUrl?file_id='+file.file_id).then((res) => {
              if(res.data.code === 200) {
                var url=this.aliyun_img_url + res.data.body[0];
                var urls=[];
                for(var i = 0,length = res.data.body.length;i<length;i++){
                  urls.push(this.aliyun_img_url + res.data.body[i]);
                }
                this.$vux.loading.hide()
                wx.previewImage({
                  current: url, // 当前显示图片的http链接
                  urls: urls // 需要预览的图片http链接列表
                });
              }
            })
            break;
        }
      },
    }
  }
</script>

<style rel="stylesheet" lang="scss">
  @import '../../assets/scss/main.scss';

  .remarkCom {
    .recent {
      /*color: rgb(4, 190, 2)*/
    }
    .itemTop {
      margin-bottom: 0.1rem;
      color: #a5a5a5;
    }
    .itemContent {
      padding: 0.1rem 0 0.1rem 0.1rem;
      background: #fff;
      border-radius: 0.05rem;
    }
    .itemTitle{
      color: #4e98e8;
    }
    img {
      width: 1.8rem;
      height: 1.8rem;
    }
  }
</style>
