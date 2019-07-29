<template>
  <div class="header">
    <i
      class="el-icon-arrow-left"
      @click="back"
    ></i>
    <h3>{{titleData}}</h3>
  </div>
</template>

<script>

  export default {
    props: ['titleData'],
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
      //这里存放数据
      return {

      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      back() {
        this.$emit("backFn");
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
<style lang="less" scoped>
  .header {
    text-align: center;
    position: relative;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.6rem;
    .el-icon-arrow-left {
      position: absolute;
      left: 0.3rem;
      top: 0.3rem;
    }
    h3 {
      font-size: 0.28rem;
      color: #17233b;
    }
  }
</style>