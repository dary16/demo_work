<template>
  <div class="xl-list clearfix">
    <v-info-header :titleData="title"></v-info-header>
    <div class="xl-header">
      <h2>已实施训练</h2>
      <span v-if="showNum">(未上传：{{notNum}})</span>
      <div class="xl-right">
        <div v-if="notUpload">
          <span>{{nowTime}}</span>
          <button
            class="normal-btn"
            @click="uploadData"
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
        </div>
      </div>
    </div>
    <div class="xl-content">
      <v-list-item
        :infoList="infoList"
        :chooseLoad="chooseLoad"
        v-on:showInfo="showInfo"
        v-on:changeFn="changeFn"
      ></v-list-item>
      <div
        class="uploadBottom"
        v-if="!notUpload"
      >
        <button
          class="normal-btn"
          @click="uploadDataFn"
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
        showNum: true,
        numLength: 0,
        chooseLoad: false,
        notUpload: true,
        infoList: [],
        title: "已实施训练",
        nowTime: '',
        checkAll: false,
        newInfoList: [],//暂存复选框改变时数据
        uploadList: []
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['userInfo', 'allData', 'nowIndex']),
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
        this.infoList = this.infoList.filter(item => {
          return item.upload != true
        });
        this.chooseLoad = true;
        this.notUpload = false;
        // console.log(this.infoList);
      },
      //上传选中的数据
      uploadDataFn() {
        //过滤isChecked属性值为true的数据
        this.notUpload = true;
        this.chooseLoad = false;

        this.uploadList = this.newInfoList.filter(item => {
          return item.isChecked == true && item.upload == false
        });
        //定时器模拟数据上传成功
        setTimeout(() => {
          //待优化：取未上传的数据还是所有的数据，暂时取所有的数据，
          //可以把未上传的和已上传的分开，最后存时再合并
          let data = getLoc(this.userInfo.personID).trainListData;
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
          console.log(data);//状态改后的数据
          setLoc(getLoc('userInfo').personID, { "trainListData": data });
          this.infoList = JSON.parse(JSON.stringify(data));
        }, 3000)
        console.log(this.uploadList, this.infoList, '要上传的数据');
      },
      getTime() {
        setInterval(() => {
          this.nowTime = this.util.formatDate(new Date().getTime(), 3);
        }, 1000);
      },
      //详情
      showInfo(v) {
        console.log(v);
        this._nowIndex(v);
        this.$router.push('/trainInfoList');
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
        console.log(v);
        this.newInfoList = JSON.parse(JSON.stringify(v));
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      //获取数据
      this.infoList = getLoc(this.userInfo.personID).trainListData || [];
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
      border-top: 1px solid #949494;
      border-bottom: 1px solid #949494;
      display: flex;
      background: #f2f2f2;
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
        .normal-btn,
        span {
          float: right;
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