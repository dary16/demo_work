<template>
  <div class='tab'>
    <div
      class="tabItem"
      v-for="(item,index) in list"
      :key="item.id"
      @click="tabFn(index)"
      :class="{'active':index == tabNow}"
    >
      <!-- <div class="tab-icon">
        <i class=""></i>
      </div> -->
      <span>{{item.name}}</span>
    </div>
  </div>
</template>

<script>
  //例如：import 《组件名称》 from '《组件路径》';

  export default {
    props: ['list'],
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
      //这里存放数据
      return {
        tabNow: 0
      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      tabFn(index) {
        this.tabNow = index;
        this.$emit("tabIndex", this.tabNow);
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
  .tab {
    position: fixed;
    bottom: 0;
    width: 98%;
    display: flex;
    .tabItem {
      flex: 1;
      height: 1rem;
      line-height: 1rem;
      background: #ccc;

      span {
        text-align: center;
        display: inline-block;
        width: 100%;
        font-size: 0.3rem;
      }
    }
    .tabItem.active {
      background: #f2f2f2;
      font-weight: bold;
    }
  }
</style>