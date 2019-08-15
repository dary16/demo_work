<template>
  <div class="xl-list clearfix">
    <v-info-header :titleData="title"></v-info-header>
    <div class="xl-header">
      <div class="xl-right">
        <button
          class="normal-btn-border-lg fr btn-dowmload"
          @click="downloadData"
        >
          <i class="el-icon-download"></i>
          数据下载</button>
        <span class="fr">{{nowTime}}</span>

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
  import { mapMutations, mapState, mapActions } from 'vuex';
  export default {
    data() {
      //这里存放数据
      return {
        nowTime: '',
        infoList: [],
        title: "待实施训练"
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['allData', 'nowIndex', 'userInfo'])
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
      ...mapMutations(['_nowIndex', '_userInfo']),
      ...mapActions(['_getInfo']),
      doAction(index) {
        this._nowIndex(index);
        // this.$router.push({ name: 'info', params: { trainList: this.infoList[index].trainList, index: index } });
        this.$router.push('./info');
      },
      //数据下载
      downloadData() {
        //后期要改，直接取未实施数据
        this.nowTime = this.util.formatDate(new Date().getTime(), 3);
        this._getInfo({
          method: 'get',
          api: 'getLogin',
          callback: res => {
            console.log(res, res);
            //保存下载时间到localstorage
            setLoc(getLoc('userInfo').userID, { "notActionData": res.notActionList, "loadTime": this.nowTime });
            this.infoList = res.notActionList;
          }
        })
      },
      showInfo(index) {
        this._nowIndex(index);
        this.$router.push({ name: 'trainInfo', params: { infoList: this.infoList[index] } });
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.infoList = getLoc(this.userInfo.userID).notActionData || [];
      this.nowTime = getLoc(this.userInfo.userID).loadTime || '';
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    updated() {
      console.log('update', this.infoList);
    }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
  @import "../style/global.less";
  .xl-list {
    .xl-header {
      width: 100%;
      padding: 0.05rem 0.74rem;
      display: flex;
      height: 1rem;
      line-height: 1rem;
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
        .btn-dowmload {
          margin: 0.24rem 0rem;
        }
        span {
          height: 1rem;
          line-height: 1rem;
          font-size: 0.2rem;
          margin-left: 0.2rem;
          margin-right: 0.3rem;
          display: inline-block;
          color: #808383;
        }
      }
    }
  }
</style>