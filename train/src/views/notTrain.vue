<template>
  <div class="xl-list clearfix">
    <v-info-header :titleData="title"></v-info-header>
    <div class="xl-header">
      <h2>未实施训练</h2>
      <div class="xl-right">
        <span>{{nowTime}}</span>
        <button
          class="normal-btn"
          @click="downloadData"
        >数据下载</button>
      </div>
    </div>
    <v-list-item
      :infoList="infoList"
      v-on:doAction="doAction"
      v-on:showInfo="showInfo"
    ></v-list-item>
  </div>
</template>

<script>
  import {
    getLoc, setLoc
  } from '../utils/common.js';
  import { mapMutations, mapState } from 'vuex';
  export default {
    data() {
      //这里存放数据
      return {
        nowTime: '',
        a: {},
        b: {},
        c: {},
        infoList: [],
        title: "未实施训练"
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['userId', 'allData', 'userIndex', 'nowIndex', 'isLogin'])
    },
    //监控data中的数据变化
    watch: {
      trainList: {
        handler(newValue, oldValue) {
          console.log(newValue, oldValue, 'watch');
        }
      }
    },
    //方法集合
    methods: {
      ...mapMutations(['_nowIndex', '_userId']),
      doAction(index) {
        this._nowIndex(index);
        this.$router.push({ name: 'info', params: { trainList: this.infoList[index].trainList, index: index } });
      },
      //数据下载
      downloadData() {
        //以用户id存储用户信息
        let idsData = getLoc('allData').allData.notActionList;
        setLoc(this.userId, { "notActionData": getLoc('allData').allData.notActionList });
        this.nowTime = this.util.formatDate(new Date().getTime(), 3);
        this.infoList = idsData;
      },
      showInfo(index) {
        this.$router.push({ name: 'trainInfo', params: { infoList: this.infoList[index] } });
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      if(this.$route.params.infoList) {
        this.infoList = this.$route.params.infoList;
      } else {
        //判断是否联网，如果联网，则可下载新数据，没有联网，则用本地的数据
        if(this.isLogin) {
          this.infoList = getLoc(this.userId).notActionData;
        }
      }
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    updated() {
      console.log('update');
    }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
  .xl-list {
    .xl-header {
      width: 100%;
      padding: 0.05rem 0.1rem;
      border-bottom: 1px solid #949494;
      display: flex;
      background: #f2f2f2;
      height: 0.7rem;
      line-height: 0.7rem;
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
  }
</style>