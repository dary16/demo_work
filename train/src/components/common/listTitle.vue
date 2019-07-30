<template>
  <div class='item'>
    <i class="circle"></i>
    <span>{{listTilte}}</span>
  </div>
</template>

<script>

  export default {
    props: ['listTilte'],
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
  .item {
    font-size: 0.2rem;
    color: #17233b;
    padding: 0.15rem 0.18rem;
    border-bottom: 1px solid #e9ecf4;
    .circle {
      width: 0.14rem;
      height: 0.14rem;
      border-radius: 0.1rem;
      border: 1px solid #4b7efe;
      display: inline-block;
    }
    span {
      font-size: 0.25rem;
      margin-left: 0.1rem;
    }
  }
</style>