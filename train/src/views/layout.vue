<template>
  <div class='layout'>
    <v-tab @tabIndex="getTabIndex"></v-tab>
    <div class="g-main">
      <!-- <div v-show="tabIndex==1">
        <v-search-header></v-search-header> -->
      <!-- <v-not-action v-bind:infoList="infoList"></v-not-action>
      </div>
      <div v-show="tabIndex == 2">
        <v-search-header></v-search-header>
        <v-action :infoList="infoList2"></v-action>
      </div>
      <div v-show="tabIndex == 3">
        <v-week-plan></v-week-plan>
      </div>
      <div v-show="tabIndex == 4">
        <v-exit></v-exit>
      </div> -->
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import {
    getLoc, setLoc
  } from '../utils/common.js';
  import { mapState } from 'vuex';
  export default {
    data() {
      //这里存放数据
      return {
        tabIndex: 1,
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
        console.log(this.tabIndex);
        if(this.tabIndex == 1) {
          console.log(this.infoList);
          this.$router.push('/notAction');
        } else if(this.tabIndex == 2) {
          this.$router.push('/action');
        } else if(this.tabIndex == 3) {
          this.$router.push('/weekPlan');
        } else if(this.tabIndex == 4) {
          this.$router.push('/exit');
        }
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      //初始化未实施数据
      //   this.infoList = getLoc('allData').allData.user[this.userIndex].notActionList;
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
    height: 100%;
    display: flex;
    .g-main {
      flex: 1 1 auto;
    }
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