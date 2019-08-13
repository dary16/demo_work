<template>
  <div class='item'>
    <span class="line"></span>
    <span class="title">
      <slot></slot>
    </span>
  </div>
</template>

<script>

  export default {
    // props: ['listTilte'],
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
  @import "../../style/global.less";
  .item {
    font-size: 0.2rem;
    color: #17233b;
    height: 0.6rem;
    line-height: 0.6rem;
    border-bottom: 1px solid #e9ecf4;
    padding-left: 0.2rem;
    .line {
      width: 0.07rem;
      height: 0.25rem;
      float: left;
      background: url("../../assets/line.png");
      background-size: 100% 100%;
      margin: 0.15rem 0.16rem 0.15rem 0;
    }
    .title {
      font-size: 0.2rem;
      display: inline-block;
    }
  }
</style>