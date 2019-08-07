<template>
  <div class='train'>
    <v-info-header
      v-on:backFn="back"
      :titleData="title"
    ></v-info-header>
    <v-list-title :listTilte="title1"></v-list-title>
    <v-list-info-item :infoList="infoList"></v-list-info-item>
    <v-list-title :listTilte="title2"></v-list-title>
  </div>
</template>

<script>
  import { getLoc } from '../utils/common.js';
  import { mapState } from 'vuex';
  export default {
    data() {
      //这里存放数据
      return {
        title: "训练信息查看",
        title1: "训练准备信息",
        title2: "人员签到",
        infoList: []
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['userInfo', 'nowIndex'])
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      back() {
        this.$router.go(-1);
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.infoList = getLoc(this.userInfo.personID).trainListData[this.nowIndex];
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
</style>