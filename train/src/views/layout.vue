<template>
  <div class='layout'>
    <v-tab @tabIndex="getTabIndex"></v-tab>
    <div class="g-main">
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
        infoList: [],//未实施数据
        infoList2: []//已实施数据
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['userInfo'])
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      getTabIndex(value) {
        this.tabIndex = value;
        if(this.tabIndex == 1) {
          this.$router.push('/notTrain');
        } else if(this.tabIndex == 2) {
          this.$router.push('/train');
        } else if(this.tabIndex == 3) {
          this.$router.push('/weekPlan');
        } else if(this.tabIndex == 4) {
          this.$router.push('/exit');
        }
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      let trainListInit = getLoc(this.userInfo.personID).trainListData || [];
      setLoc(getLoc('userInfo').personID, { "trainListData": trainListInit })
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