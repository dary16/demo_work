<template>
  <div class="search">
    <div class="searchWidth">
      <div>
        <el-input
          type="text"
          v-model="searchData"
          placeholder="搜索训练实施的关键词"
        />
      </div>
      <span><img src="../assets/search_icon.png"/></span>
    </div>
  </div>
</template>

<script>
  //例如：import 《组件名称》 from '《组件路径》';

  export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
      //这里存放数据
      return {
        searchData: ''
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
<style lang="less" scoped>
  .search {
    // background: #f2f2f2;
    margin: 0 0.2rem;
    overflow: hidden;
    .searchWidth {
      width: 18rem;
      margin: 0px auto;
      margin-top: 0.28rem;
      margin-bottom: 0.28rem;
      overflow: hidden;
      background: #333;
      div,
      span {
        float: left;
        height: 0.68rem;
        line-height: 0.68rem;
      }
      div {
        width: 94%;
        border-radius: 1.2rem;
        position: relative;
        padding-left: 0.2rem;
        a {
          position: absolute;
          width: 0.69rem;
          height: 0.69rem;
          right: 0;
          top: -0.01rem;
          z-index: 1;
          img {
            width: 100%;
            height: 100%;
            vertical-align: top;
          }
        }
      }
      span {
        width: 5.7%;
        text-align: center;
        cursor: pointer;
        border-radius: 4px;
        img {
          width: 0.35rem;
          vertical-align: middle;
        }
      }
    }
  }
</style>
<style>
  .search .el-input__inner {
    height: auto !important;
    line-height: 16px !important;
    font-size: 0.23rem;
  }
</style>