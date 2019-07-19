<template>
  <div class='exit'>
    <ul>
      <li>
        <span class="e-left">
          <i class="el-icon-question"></i>
          <em>帮助</em>
        </span>
        <span
          class="e-right fr"
          @click="help"
        >
          <i class="el-icon-arrow-right"></i>
        </span>
      </li>
      <li>
        <span class="e-left">
          <i class="el-icon-info"></i>
          <em>关于</em>
        </span>
        <span
          class="e-right fr"
          @click="about"
        >
          <i class="el-icon-arrow-right"></i>
        </span>
      </li>
    </ul>
    <div class="exitBottom">
      <button
        class="exitBtn"
        @click="exitFn"
      >退出登录</button>
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
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      //帮助
      help() {
        this.oMsgBox({
          type: 'info',
          message: "我是帮助文档，我是帮助文档，我是帮助文档，我是帮助文档，我是帮助文档，我是帮助文档"
        });
      },
      //关于
      about() {
        this.oMsgBox({
          type: 'info',
          message: "<li>版本号：<strong>1.12.3633</strong></li>",
          dangerouslyUseHTMLString: true
        });
      },
      exitFn() {
        this.$router.push('/login');
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
<style lang='less' scoped>
  .exit {
    ul {
      li {
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.3rem;
        border-bottom: 1px solid #949494;
        .e-left {
          font-size: 0.4rem;
          padding-left: 0.1rem;
          em {
            font-style: normal;
            font-size: 0.28rem;
            padding-left: 0.05rem;
          }
        }
        .e-right {
          font-size: 0.6rem;
          padding-right: 0.1rem;
        }
      }
    }
    .exitBottom {
      text-align: center;
      position: absolute;
      bottom: 2rem;
      left: 0.2rem;
      right: 0.2rem;
      .exitBtn {
        height: 0.6rem;
        padding: 0.1rem 0.2rem;
        background: #006699;
        color: #fff;
        font-size: 0.3rem;
        width: 100%;
      }
    }
  }
</style>