<template>
  <div class='train-info'>
    <v-info-header
      v-on:backFn="back"
      :titleData="title"
    ></v-info-header>
    <v-list-info :infoList="infoList"></v-list-info>
  </div>
</template>

<script>

  export default {
    data() {
      //这里存放数据
      return {
        title: "训练详情",
        infoList: []
      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      back() {
        this.$router.back();
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.infoList = this.$route.params.infoList;
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