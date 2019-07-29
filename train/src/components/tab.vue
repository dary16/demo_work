<template>
  <div class='tab'>
    <div class="tab-header">
      <img src="../assets/logo.png"/>
    </div>
      <div
        class="tabItem"
        @click="tabFn(1)"
      >
        <span :class="indexed == 1 ? 'active' :''">
          <img v-if="indexed == 1" src="../assets/menu/bar1-b.png"/>
          <img v-else src="../assets/menu/bar1-a.png"/>
          未实施
        </span>
      </div>
      <div
        class="tabItem"
        @click="tabFn(2)"
      >
        <span :class="indexed == 2 ? 'active' :''">
          <img v-if="indexed == 2" src="../assets/menu/bar2-b.png"/>
          <img v-else src="../assets/menu/bar2-a.png"/>
          已实施
        </span>
      </div>
      <div
        class="tabItem"
        @click="tabFn(3)"
      >
        <span :class="indexed == 3 ? 'active' :''">
          <img v-if="indexed == 3" src="../assets/menu/bar3-b.png"/>
          <img v-else src="../assets/menu/bar3-a.png"/>
          周计划
        </span>
      </div>
      <div
        class="tabItem"
        @click="tabFn(4)"
      >
        <span :class="indexed == 4 ? 'active' :''">
          <img v-if="indexed == 4" src="../assets/menu/bar4-b.png"/>
          <img v-else src="../assets/menu/bar4-a.png"/>
          退出
        </span>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      //这里存放数据
      return {
        indexed: 1,
      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      tabFn(index) {
        this.indexed = index;
        this.$emit("tabIndex", this.indexed);
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    updated() { }, //生命周期 - 更新之后
    activated() { }//如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang="less" scoped>
  .tab {
    width: 2.7rem;
    flex-direction: column;
    flex: 0 0 auto;
    box-shadow: 0px 3px 38px 0px rgba(39, 55, 84, 0.19);
    .tab-header {
      height: 0.7rem;
      line-height: 0.7rem;
      margin: 0 0.38rem;
      img {
        width: 1.54rem;
      }
    }
    .tabItem {
      flex: 1;
      height: 1.4rem;
      line-height: 1.4rem;
      span {
        text-align: center;
        display: inline-block;
        width: 1.96rem;
        font-size: 0.24rem;
        height: 0.76rem;
        // background: #f0f1f4;
        margin: 0.32rem auto;
        line-height: 0.76rem;
        padding: 0 0.3rem;
        text-align: left;
        img {
          margin-right: 0.2rem;
          vertical-align: text-top;
          width: 0.35rem;
          height: 0.35rem;
        }
      }
      span.active {
        background: #f0f1f4;
        font-weight: bold;
        border-right: 6px solid #4c84ff;
      }
    }
  }
</style>