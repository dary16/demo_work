<template>
  <div class="tab">
    <div class="tab-header">
      <img src="../assets/logo.png" />
    </div>
    <div class="tab-content">
      <div
        class="tabItem"
        @click="tabFn(1)"
        :class="indexed == 1 ? 'active' : ''"
      >
        <img v-if="indexed == 1" src="../assets/menu/bar1-b.png" />
        <img v-else src="../assets/menu/bar1-a.png" />
      </div>
      <div
        class="tabItem"
        @click="tabFn(2)"
        :class="indexed == 2 ? 'active' : ''"
      >
        <img v-if="indexed == 2" src="../assets/menu/bar2-b.png" />
        <img v-else src="../assets/menu/bar2-a.png" />
      </div>
      <div
        class="tabItem"
        @click="tabFn(3)"
        :class="indexed == 3 ? 'active' : ''"
      >
        <img v-if="indexed == 3" src="../assets/menu/bar3-b.png" />
        <img v-else src="../assets/menu/bar3-a.png" />
      </div>
      <div class="tabItem" @click="logout">
        <img v-if="indexed == 4" src="../assets/menu/exit-b.png" />
        <img v-else src="../assets/menu/exit-a.png" />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';
  export default {
    data() {
      //这里存放数据
      return {
        indexed: 1,
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['nowIndex', 'userName', 'tabIndex'])
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      ...mapMutations(['_tabIndex']),

      tabFn(index) {
        if (index === 1) {
          this._tabIndex(1);
        } else if (index === 2) {
          this._tabIndex(2);
        } else if (index === 3) {
          this._tabIndex(3);
        }
        this.indexed = index;
        this.$emit("tabIndex", this.indexed);
      },
      logout() {
        this.oMsgBox('是否确认退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('./login');
        }).catch(() => {
          return false;
        });
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
    width: 1.2rem;
    flex-direction: column;
    flex: 0 0 auto;
    box-shadow: 0px 3px 38px 0px rgba(39, 55, 84, 0.19);
    position: relative;
    z-index: 9;
    background-color: #2f77dd;
    .tab-header {
      height: 0.7rem;
      line-height: 0.7rem;
      margin: 0.2rem 0.28rem;
      img {
        width: 0.58rem;
      }
    }
    .tab-content {
      margin-top: 1rem;
      position: relative;
      height: 85%;
      .tabItem {
        flex: 1;
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
        position: relative;
        img {
          vertical-align: middle;
          width: 0.4rem;
          height: 0.4rem;
        }
        span.active {
          background: #f0f1f4;
          font-weight: bold;
          border-right: 5px solid #4c84ff;
        }
        &:last-child {
          position: absolute;
          bottom: 0.28rem;
          left: 0.42rem;
        }
      }
      .tabItem.active {
        border-right: 6px solid #93bffb;
        background: #296bc9;
      }
      .tabItem.active:after {
        position: absolute;
        content: "";
        width: 8px;
        height: 8px;
        background-color: #93bffb;
        right: -4px;
        top: 0.55rem;
        transform: rotate(45deg);
      }
    }
  }
</style>