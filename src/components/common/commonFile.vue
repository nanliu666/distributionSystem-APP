<!-- Created by wlh on 2018/4/18 -->
<template>
  <!--commonFile组件用途
  props:
  events:
  slots:
-->
  <div id="commonFile" class="comBox">
    <div class="filesDiv">
      <div class="fileBox" v-for="(item,index) in localIds">
        <img class="fileImg" :src="(item.key.indexOf('.doc') > -1 || item.key.indexOf('.docx') > -1) ? '/static/lib/images/doc.png' :
           (item.key.indexOf('.pdf') > -1) ? '/static/lib/images/pdf.png' :
            (item.key.indexOf('.xls') > -1 || item.key.indexOf('.xlsx') > -1) ? '/static/lib/images/xls.png' :
            (item.key.indexOf('.txt') > -1 || item.key.indexOf('.md') > -1) ? '/static/lib/images/txt.png' : item.key"
             @click="previewImg(item)">
        <i class="yiyifont yiyi-cancel deleteImgIcon" @click="deleteImg(index)" v-if="!onlyView"></i>
      </div>
      <div class="fileBox" v-show="!onlyView && localIds.length != num">
        <img class="addFile fileImg" src="./images/addFile.png" @click="chooseImg">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'commonFile',
    props: {
      onlyView: {
        type: Boolean,
        default: false
      },
      num: {
        type: Number,
        default: 3
      },
      localIds: {
        type: Array,
        default: function () {
          return []
        }
      },
      fileIds: {
        type: Array,
        default: function () {
          return []
        }
      },
    },
    components: {},
    data() {
      return {
        serverIds: [],
        delFiles: [],
      }
    },
    computed: {},
    watch: {
      $props: {
        handler(newVal, oldVal) {
          if (newVal.localIds.length === 0) {
            this.serverIds = [];
          }
        },
        deep: true
      }
    },
    created() {
    },
    mounted() {
    },
    activated() {
    },
    deactivated() {
    },
    methods: {
      //选择图片
      chooseImg() {
        let _this = this;
        wx.ready(function () {
          /*拍照或从手机相册中选图接口*/
          wx.chooseImage({
            count: _this.num - _this.localIds.length, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {

              /*预览用ID*/
              let localIds = res.localIds;
              for (let i = 0; i < localIds.length; i++) {
                let localId = localIds[i];
                if (window.__wxjs_is_wkwebview) {
                  wx.getLocalImgData({
                    localId: localId, // 图片的localID
                    success: function (res) {
                      let localId = res.localData; // localData是图片的base64数据，可以用img标签显示
                      localId = localId.replace('jgp', 'jpeg');//iOS 系统里面得到的数据，类型为 image/jgp,因此需要替换一下
                    },
                    fail: function (res) {
                      _this.$message("显示失败");
                    }
                  });
                }
                _this.localIds.push({
                  key: localId,
                  name: '',
                  file_id: ''
                });
              }

              /*图片开始上传*/
              _this.$vux.loading.show({
                text: '上传中'
              });
              _this.uploadTwo(localIds);
            }
          });
        });
        wx.error(function (res) {
          this.$message(res.errMsg);
        });
      },
      //上传图片
      uploadTwo(localIds) {
        let _this = this;
        if (!localIds.length) {
          _this.$vux.loading.hide();
//          _this.$message('上传成功');
          this.$emit('getServerId', {serverIds: _this.serverIds, delFiles: _this.delFiles});
        } else {
          let localId = localIds.pop();
          wx.uploadImage({
            localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 0, // 默认为1，显示进度提示
            fail: function () {
              _this.$vux.loading.hide();
              _this.$message('上传失败，请稍后重试');
            },
            success: function (res) {
              _this.serverIds.push(res.serverId);
              _this.uploadTwo(localIds);
            }
          });
        }
//        wx.uploadImage({
//          localId: localIds[j], // 需要上传的图片的本地ID，由chooseImage接口获得
//          isShowProgressTips: 0, // 默认为1，显示进度提示
//          fail: function () {
//            _this.$vux.loading.hide();
//            _this.$message('上传失败，请稍后重试');
//          },
//          success: function (res) {
//            _this.$vux.loading.hide();
//            var server_id = [];
//            server_id.push(res.serverId);
//            return
//          }
//        });
      },
      //预览图片
      previewImg(file) {
        if (file.file_id == '') {
          let urls = [];
          this.localIds.forEach((item) => {
            urls.push(item.key);
          });
          wx.previewImage({
            current: file.key, // 当前显示图片的http链接
            urls: urls // 需要预览的图片http链接列表
          });
        } else {
          let name = file.name;
          switch (name.substring(name.lastIndexOf(".") + 1, name.length)) {
            case 'png':
            case 'jpg':
            case 'pdf':
              this.axios.get('/file/getOssFileUrl?file_id=' + file.file_id).then((res) => {
                if (res.data.code === 200) {
                  var url = this.aliyun_img_url + res.data.body[0];
                  var urls = [];
                  for (var i = 0, length = res.data.body.length; i < length; i++) {
                    urls.push(this.aliyun_img_url + res.data.body[i]);
                  }
                  wx.previewImage({
                    current: url, // 当前显示图片的http链接
                    urls: urls // 需要预览的图片http链接列表
                  });
                }
              });
              break;
            default:
              this.$message('暂不支持预览!');
              break;
          }
        }
//        wx.previewImage({
//          current: url, // 当前显示图片的http链接
//          urls: this.localIds // 需要预览的图片http链接列表
//        });
      },
      //删除图片
      deleteImg(index) {
        if (this.localIds[index].key.indexOf('viewFile') > -1) {
          this.delFiles.push(this.fileIds.splice(index, 1).join(','));
        } else {
          this.serverIds.splice((index - this.fileIds.length), 1);
        }
        this.localIds.splice(index, 1);
        this.$emit('getServerId', {serverIds: this.serverIds, delFiles: this.delFiles});
      },
    }
  }
</script>

<style rel="stylesheet" lang="scss">
  @import '../../assets/scss/main.scss';

  #commonFile {

    .filesDiv {
      width: 100%;
      height: auto;
      background-color: #fff;
      padding: 0 0 0.2rem 0.2rem;
      font-size: 0;
    }

    .fileBox {
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 0.08rem;
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.2rem;
      position: relative;
      margin-top: 0.2rem;
    }

    .fileImg {
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 0.08rem;
    }

    .deleteImgIcon {
      position: absolute;
      font-size: 0.4rem;
      right: -0.1rem;
      top: -0.2rem;
    }
  }
</style>
