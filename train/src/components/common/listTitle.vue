<template>
  <div class='item'>
    <i class="el-icon-s-flag"></i>
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
    font-size: 0.3rem;
    background: #006699;
    color: #fff;
    padding: 0.15rem 0.4rem;
    span {
      font-size: 0.25rem;
      margin-left: 0.1rem;
    }
  }
</style>