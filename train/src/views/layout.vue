<template>
  <div class='layout'>
    <div class="main">
      <div v-show="tabIndex==0">
        <v-search-header></v-search-header>
        <v-not-action v-bind:infoList="infoList"></v-not-action>
      </div>
      <div v-show="tabIndex == 1">
        <v-search-header></v-search-header>
        <v-action :infoList="infoList2"></v-action>
      </div>
      <div v-show="tabIndex == 2">
        <v-week-plan></v-week-plan>
      </div>
      <div v-show="tabIndex == 3">
        <v-exit></v-exit>
      </div>
    </div>

    <v-tab
      :list="tabList"
      @tabIndex="getTabIndex"
    ></v-tab>
  </div>
</template>

<script>
  import {
    getLoc
  } from '../utils/common.js';
  import { mapState } from 'vuex';
  export default {
    data() {
      //这里存放数据
      return {
        tabIndex: 0,
        tabList: [
          {
            name: "未实施",
            id: '001',
            src: "../assets/logo.png"
          },
          {
            name: "已实施",
            id: '002',
            src: "../assets/logo.png"
          }, {
            name: "周计划",
            id: '003',
            src: "../assets/logo.png"
          }, {
            name: "退出",
            id: '004',
            src: "../assets/logo.png"
          }
        ],
        infoList: [],
        infoList2: []
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['userIndex'])
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      getTabIndex(value) {
        this.tabIndex = value;
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      //初始化未实施数据
      this.infoList = getLoc('allData').allData.user[this.userIndex].notActionList;
      //   this.infoList2 = getLoc('actionListData');
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang="less" scoped>
  .layout {
    margin: 0.2rem;
    width: 98%;
    height: 100%;
    border: 1px solid #949494;
  }
  .clearfix:after {
    content: "";
    display: block;
    clear: both;
  }
  .normal-btn {
    height: 0.4rem;
    padding: 0.05rem 0.2rem;
    background: #006699;
    color: #fff;
    font-size: 0.2rem;
    border-radius: 0.08rem;
    margin-top: 0.05rem;
  }
</style>