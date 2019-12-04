<template>
  <div class="xl-list clearfix">
    <v-header :titleData="title"></v-header>
    <div class="xl-header">
      <div
        class="xl-right"
        v-show="notNum !== 0"
      >
        <div>
          <el-badge
            :value="notNum"
            :max="99"
            class="badgeNum"
          >
            <button
              class="normal-btn-border-lg fr"
              @click="confirmUpload"
            >
              数据上传
            </button>
          </el-badge>
        </div>
      </div>
    </div>
    <div class="xl-content">
      <v-list-item
        :infoList="infoList"
        :chooseLoad="chooseLoad"
        v-on:showInfo="showInfo"
        v-on:doEdit="doEdit"
      ></v-list-item>
    </div>
  </div>
</template>

<script>
  import {
    getLoc, setLoc, formatDate
  } from '../utils/common.js';
  import { mapMutations, mapState } from 'vuex';
  import { setTimeout } from 'timers';
  export default {
    data() {
      //这里存放数据
      return {
        numLength: 0,
        chooseLoad: false,
        infoList: [],
        title: "已实施训练",
        nowTime: '',
        uploadList: {
          uploadActionList: [],
        },
        checkAll: false,
        newInfoList: [],//暂存复选框改变时数据
        uploadBox: true,//用于监控上传弹框的监控，对弹框的显示无影响
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['userInfo', 'userName', 'nowIndex']),
      //未上传数量
      notNum() {
        return this.infoList.filter(item => !item.upload).length;
      }
    },
    //监控data中的数据变化
    watch: {
      uploadBox: {
        handler(newValue, oldValue) {
          if(!newValue) {
            plus.key.removeEventListener("backbutton", onPlusReady);
            this.onQuit();
          }
        }
      }
    },
    //方法集合
    methods: {
      ...mapMutations(['_nowIndex', '_userInfo']),
      //确认是否上传数据
      confirmUpload() {
        this.$confirm('此操作将上传数据,上传后训练任务不可修改, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false,
          showClose: false,
        }).then(() => {
          this.uploadDataFn();
        }).catch(() => {
          this.message.info("已取消上传！");
        });
      },
      //数据上传
      uploadDataFn() {
        let uploadArr = [];
        //循环找出未上传的数据，并保存下来
        this.infoList.forEach(item => {
          if(!item.upload) {
            uploadArr.push(item);
          }
        });
        setLoc(this.userName + '_y', { "trainListData": this.infoList });
        this.uploadList.uploadActionList = uploadArr;
        //向文件写入数据
        document.addEventListener("plusready", onPlusReady, false);
        this.onPlusReady(this.userName, this.uploadList);
      },
      //上传数据保存到json文件中
      onPlusReady(username, uploadlist) {
        // let that = this;
        plus.io.requestFileSystem(plus.io.PRIVATE_WWW, fs => {
          //打开根目录下的指定文件夹
          fs.root.getDirectory("/storage/emulated/0/train", { create: false, exclusive: false }, entry => {
            //获取时间组成的编码（年+月+日+时+分）
            let actionTime = formatDate(false, 9);
            //打开指定json文件(若没有此文件则创建)
            entry.getFile(actionTime + "_" + username + "_output.json", { create: true }, fileEntry => {
              //向指定文件写入内容
              fileEntry.createWriter(writer => {
                //从文件的开头写
                writer.seek(0);
                //写入得内容
                writer.write(JSON.stringify(uploadlist));
                //写入成功
                writer.onwrite = e => {
                  this.infoList = getLoc(this.userName + '_y').trainListData;
                  plus.zip.compress("/storage/emulated/0/train/" + actionTime + "_" + username + "_output.json", "/storage/emulated/0/train/" + actionTime + "_" + username + "_output.zip",
                    success => {
                      fileEntry.remove();
                      let uploadArr = [];
                      //循环找出未上传的数据，并保存下来
                      this.infoList.forEach(item => {
                        if(!item.upload) {
                          uploadArr.push(item);
                          item.upload = true;
                          //给已完成实施的数据毫秒数
                          item.uploadTime = Date.now();
                        }
                      });
                      setLoc(this.userName + '_y', { "trainListData": this.infoList });
                      this.uploadList.uploadActionList = uploadArr;
                      this.message.success("数据上传成功！");
                    }, error => {
                      this.message.warning("压缩 失败！");
                    });
                };
                //写入失败
                writer.onerror = e => {
                  this.message.warning("数据上传失败！");
                };
              }, e => {
                this.message.warning("写入文件失败！");
              });
            });
          });
        });
      },
      //详情
      showInfo(v) {
        this._nowIndex(v);
        // this.$router.push('/trainInfoList');
        this.$router.push({ name: 'trainInfo', params: { infoList: this.infoList[v] } });
      },

      doEdit(index) {
        this._nowIndex(index);
        this.$router.push('./info');
      },
      //物理返还按键退出
      onQuit() {
        let quitTime = null;
        //添加新的物理返回按键监听事件
        plus.key.addEventListener("backbutton", onBack => {
          if(!quitTime) {
            quitTime = Date.now();
            this.toast({
              message: '再按一次返回键退出并注销登录',
              position: 'bottom',
              duration: 2000
            });
            setTimeout(_ => {
              quitTime = null;
            }, 2000);
          } else {
            if((Date.now() - quitTime) <= 2000) {
              quitTime = null;
              plus.runtime.quit();
            }
          }
        });
      }
      // notNum() {
      //   this.numLength = this.infoList.filter(item => !item.upload).length;
      //   alert('notNum-'+this.numLength);
      // }

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      //移除原有物理按键监听的绑定事件
      //   plus.key.removeEventListener("backbutton", onPlusReady);
      //   //执行新的物理返回按键方法
      //   this.onQuit();
      //获取数据
      if(getLoc(this.userName + '_y')) {
        this.infoList = getLoc(this.userName + '_y').trainListData;
        //循环已完成实施的数据
        this.infoList.forEach((item, index) => {
          //用当前时间和上传时当时的毫秒数相减判断是否大于2个月（60天）
          if(Date.now() - item.uploadTime > 5184000000) {
            //大于2个月的数据删除
            this.infoList.splice(index, 1);
            //更新已完成实施的localstorage的数据
            setLoc(this.userName + '_y', { "trainListData": JSON.parse(JSON.stringify(this.infoList)) });
          }
        });
      } else {
        this.infoList = [];
      }
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
  .xl-list {
    .xl-header {
      width: 100%;
      padding: 0.05rem 0.1rem;
      display: flex;
      h2 {
        font-size: 0.36rem;
        color: #006699;
        height: 0.5rem;
        line-height: 0.5rem;
        margin-left: 0.2rem;
      }
      span {
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.3rem;
      }
      .xl-right {
        flex: 1;
        margin-top: 0.18rem;
        margin-right: 0.74rem;
        .normal-btn,
        span {
          float: right;
          margin-right: 0.1rem;
        }

        span {
          height: 0.5rem;
          line-height: 0.5rem;
          font-size: 0.25rem;
          margin-left: 0.2rem;
          margin-right: 0.3rem;
          display: inline-block;
        }
      }
    }
    .xl-content {
      position: fixed;
      top: 1.6rem;
      .xl-item {
        .badgeNum {
          margin-top: 10px;
          margin-right: 40px;
        }
        .content-header {
          width: 99.6%;
          padding: 0.05rem 0.1rem;
          background: #f2f2f2;
          border-bottom: 1px solid #949494;
          .time {
            height: 0.5rem;
            line-height: 0.5rem;
            font-size: 0.25rem;
            float: left;
            margin-left: 0.2rem;
          }

          button {
            margin-right: 0.3rem;
          }
        }
        .content-info {
          padding: 0.2rem;
          display: flex;
          border-bottom: 1px solid #949494;
          .info-list {
            margin-left: 0.1rem;
            flex: 1;
            li {
              width: 33%;
              text-align: left;
              float: left;
              height: 0.5rem;
              line-height: 0.5rem;
              font-size: 0.25rem;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              .name {
                width: 1.6rem;
                display: inline-block;
              }
              .value {
                display: inline-block;
                // width: 100%;
                // overflow: hidden;
                // text-emphasis: none;
                // white-space: nowrap;
              }
            }
          }
          .more {
            width: 3rem;
            font-size: 1rem;
            img {
              width: 1rem;
            }
          }
        }
      }
      .uploadBottom {
        text-align: center;
        position: absolute;
        bottom: 1rem;
        left: 0;
        right: 0;
      }
    }
    .el-badge {
      float: right;
      .normal-btn-border-lg {
        background-color: #3288fe;
        color: #fff;
        padding: 0.09rem 0.4rem;
      }
    }
  }
</style>