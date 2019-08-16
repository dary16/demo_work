<template>
  <div>
    <div
      class='item-info'
      v-for="item in trainList"
    >
      <div class="i-title">
        <i class="header-icon el-icon-caret-right"></i>
        {{item.trainContentName}}
      </div>
      <div class="i-content">{{item.trainContentDesc}}</div>
    </div>
  </div>

</template>

<script>

  export default {
    data() {
      //这里存放数据
      return {

      };
    },
    props: ['trainList'],
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    //方法集合
    methods: {

    },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
  @import "../../style/global.less";
  .item-info {
    border: 1px solid @c-border;
    background: #fff;
    margin-bottom: 0.3rem;

    .i-title {
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.22rem;
      color: #2b2d2d;
      border-bottom: 1px solid @c-border;
      padding-left: 0.27rem;
      padding-right: 0.27rem;
    }
    .i-content {
      line-height: 0.5rem;
      font-size: 0.2rem;
      color: #808383;
      padding-bottom: 0.2rem;
      padding-left: 0.27rem;
      padding-right: 0.27rem;
    }
  }
</style>