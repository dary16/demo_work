<template>
  <div class="xl-list clearfix">
    <v-header :titleData="title"></v-header>
    <div class="xl-header">
      <div class="xl-right">
        <div v-if="notUpload">
          <span v-show="notNum !== 0">(未上传：{{notNum}})</span>
          <button
            class="normal-btn-border-lg fr"
            @click="uploadData"
            v-show="notNum !== 0"
          >数据上传</button>
        </div>
        <div
          class="fr"
          v-else
        >
          <input
            type="button"
            class="normal-btn"
            id="checkAll"
            @click="chooseAllFn()"
            value="全选"
          >
          <input
            type="button"
            class="normal-btn"
            @click="cancelFn()"
            value="取消"
          >
        </div>
      </div>
    </div>
    <div class="xl-content">
      <v-list-item
        :infoList="infoList"
        :chooseLoad="chooseLoad"
        v-on:showInfo="showInfo"
        v-on:changeFn="changeFn"
        v-on:doEdit="doEdit"
      ></v-list-item>
      <div class="uploadBottom">
        <button
          class="normal-btn"
          @click="uploadDataFn"
          v-show="notNum !== 0"
        >上传数据</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getLoc, setLoc
  } from '../utils/common.js';
  import { mapMutations, mapState } from 'vuex';
  import { setTimeout } from 'timers';
  export default {
    data() {
      //这里存放数据
      return {
        numLength: 0,
        chooseLoad: false,
        notUpload: true,
        infoList: [],
        title: "已实施训练",
        nowTime: '',
        checkAll: false,
        newInfoList: [],//暂存复选框改变时数据
        uploadList: [],
        show: 1
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
    watch: {},
    //方法集合
    methods: {
      ...mapMutations(['_nowIndex', '_userInfo']),
      //数据上传
      uploadData() {
        // this.infoList = this.infoList.filter(item => {
        //   return item.upload != true
        // });
        // this.chooseLoad = true;
        // this.notUpload = false;
      },
      //上传选中的数据
      uploadDataFn() {
        //过滤isChecked属性值为true的数据
        // this.notUpload = true;
        // this.chooseLoad = false;
        let notUploadData = this.infoList.filter(item => !item.upload);
        // notUploadData.forEach(item => {
        //   item.isChecked = true && item.upload !== true;
        // });
        this.infoList.splice(0, notUploadData.length, ...notUploadData);
        this.newInfoList = JSON.parse(JSON.stringify(this.infoList));
        this.uploadList = this.newInfoList.filter(item => {
          return item.upload == false
        });
        console.log(this.uploadList);

        //定时器模拟数据上传成功
        setTimeout(() => {
          //上传为上传数据
          let data = getLoc(this.userInfo.personID).trainListData || [];
          data.forEach(item => {
            this.uploadList.forEach(item2 => {
              //判断在已上传数组中的数据
              //上传成功后需要将已上传的项的upload值改为true
              if(item.auxiliaryLecturerID === item2.auxiliaryLecturerID) {
                console.log(item.auxiliaryLecturerID);
                item.upload = true;
              }
            })
          });
          setLoc(getLoc('userInfo').personID, { "trainListData": data });
          this.infoList = JSON.parse(JSON.stringify(data));
          this.message.success("上传成功！");
        }, 1000)
      },
      //详情
      showInfo(v) {
        this._nowIndex(v);
        // this.$router.push('/trainInfoList');
        this.$router.push({ name: 'trainInfo', params: { infoList: this.infoList[v] } });
      },
      //全选
      chooseAllFn() {
        //改变所有数据中isChecked值为true
        let notUploadData = this.infoList.filter(item => !item.upload);
        notUploadData.forEach(item => {
          item.isChecked = true && item.upload !== true;
        });
        this.infoList.splice(0, notUploadData.length, ...notUploadData);
        this.newInfoList = JSON.parse(JSON.stringify(this.infoList));
      },
      //复选框状态改变时infoList值需要更新
      changeFn(v) {
        this.newInfoList = JSON.parse(JSON.stringify(v));
      },
      //取消
      cancelFn() {
        //取消所选数据
        this.infoList = getLoc(this.userInfo.personID).trainListData || [];
        this.chooseLoad = false;
        this.notUpload = true;
      },
      doEdit(index) {
        this._nowIndex(index);
        this.$router.push('./info');
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      //获取数据
      if(getLoc(this.userName + '_y')) {
        this.infoList = getLoc(this.userName + '_y').trainListData;
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
        font-size: 0.3rem;
        color: #006699;
        height: 0.5rem;
        line-height: 0.5rem;
        margin-left: 0.2rem;
      }
      span {
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.24rem;
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
      .xl-item {
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
  }
</style>