<template>
  <div class="xl-list clearfix">
    <div class="xl-header">
      <h2>未实施训练</h2>
      <div class="xl-right">
        <span>2019.07.17 11:01</span>
        <button
          class="normal-btn"
          @click="uploadData"
        >数据上传</button>
        <button
          class="normal-btn"
          @click="downloadData"
        >数据下载</button>
      </div>
    </div>
    <div class="xl-content">
      <div
        class="xl-item"
        v-for="(item,index) in infoList"
        :key="item.subjectID"
      >
        <div class="content-header clearfix">
          <span class="time">{{item.classDate}}</span>
          <button
            class="normal-btn fr"
            @click="doAction(index)"
          >训练实施</button>
        </div>
        <div class="content-info">
          <ul class="info-list">
            <li>
              <span class="name">科目名称：</span>
              <span class="value">{{item.subjectUnitName}}</span>
            </li>
            <li>
              <span class="name">授课时间：</span>
              <span class="value">{{item.classDate}}</span>
            </li>
            <li>
              <span class="name">授课学时：</span>
              <span class="value">{{item.classSection}}</span>
            </li>
            <li>
              <span class="name">着装要求：</span>
              <span class="value">{{item.dressCode}}</span>
            </li>
            <li>
              <span class="name">授课人员：</span>
              <span class="value">{{item.chargeTeacherName}}</span>
            </li>
            <li>
              <span class="name">训练器材名称：</span>
              <span class="value">{{item.trainMaterialName}}</span>
            </li>
            <li class="w66">
              <span class="name">授课对象：</span>
              <span class="value">{{item.joinAstronautNames}}</span>
            </li>
            <li>
              <span class="name">训练方式：</span>
              <span class="value">{{item.trainWay}}</span>
            </li>
          </ul>
          <div
            class="more"
            @click="showInfo(index)"
          >
            <i class="el-icon-d-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getLoc
  } from '../utils/common.js';
  export default {
    data() {
      //这里存放数据
      return {
        a: {},
        b: {},
        c: {},
        d: {}
      };
    },
    props: ['infoList'],
    //监听属性 类似于data概念
    computed: {
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      doAction(index) {
        this.$router.push({ name: 'info', params: { trainList: this.infoList[index].trainList } });
      },
      //测试数据上传
      uploadData() {
        this.a = { trainListData: getLoc('trainListData') };
        this.b = { actionListData: getLoc('actionListData') };
        this.c = { notActionListData: getLoc('notActionListData') };
        this.d = Object.assign({}, this.a, this.b, this.c);
      },
      //数据下载
      downloadData() {
        console.log('数据下载...');
      },
      showInfo(index) {
        this.$router.push({ name: 'trainInfo', params: { infoList: this.infoList[index] } })
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
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
        width: 3rem;
        height: 0.5rem;
        line-height: 0.5rem;
        margin-left: 0.2rem;
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
      width: 98%;
      position: absolute;
      top: 2.1rem;
      bottom: 1rem;
      overflow-y: auto;
      .xl-item {
        .content-header {
          width: 99.5%;
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
    }
  }
</style>