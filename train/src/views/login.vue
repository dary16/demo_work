<!-- 登录 -->
<template>
  <div class="g-login">
    <div class="g-login-view login">
      <h2 class="title">系统登录</h2>
      <dl
        class="content"
        @keyup.enter="loginBtn"
      >
        <dd>
          <label>账号：</label>
          <input
            type="text"
            placeholder="请输入账号"
            v-model.trim="login.userLoginName"
          />
        </dd>
        <dd>
          <label>密码：</label>
          <input
            type="password"
            placeholder="请输入密码"
            v-model="login.userPwd"
          />
        </dd>
      </dl>
      <button
        class="btn"
        type="button"
        @click="loginBtn"
      >登录</button>
      <button
        class="grey"
        type="button"
        @click="cancelBtn"
      >取消</button>
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
        login: {
          userLoginName: "",
          userPwd: ""
        }
      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      loginBtn() {
        //console.log('submit!');
      },
      cancelBtn() { }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    updated() { }, //生命周期 - 更新之后
    activated() { } //如果页面有keep-alive缓存功能，这个函数会触发
  };
</script>
<style lang="less" scoped>
  .g-login {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #e6e6e6;

    &-view {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      box-shadow: 0px 0px 10px #999;
    }
  }
  .login {
    width: 5rem;
    height: 3.6rem;
    border-radius: 0.06rem;
    background-color: rgba(50, 50, 50, 0.7);
    padding: 0.35rem 0.48rem;
    .title {
      color: #fee;
      font-size: 0.16rem;
      font-weight: normal;
      margin: 0 0 0.3rem;
      border-bottom: 1px solid #eee;
      padding-bottom: 0.2rem;
    }
    .content {
      dd {
        margin-bottom: 0.2rem;
        margin-inline-start: 0;
        display: flex;
        label {
          font-size: 0.14rem;
          color: #fff;
          display: inline-block;
          width: 0.46rem;
          line-height: 0.42rem;
        }
        .select {
          width: 100%;
        }
      }
      input {
        width: 100%;
        border: none;
        height: 0.42rem;
        color: #888;
        /*background-color: #f4f4f4;*/
        background-color: rgba(255, 255, 255, 0.8);
        padding: 0 0.2rem;
        box-sizing: border-box;
        border-radius: 0.04rem;
        border: 1px solid #ddd;
        font-size: 0.14rem;
        flex: 1;
      }
    }
    button.btn {
      width: 100%;
      border: none;
      font-size: 0.16rem;
      height: 0.42rem;
      color: #000;
      background-color: #006699;
      letter-spacing: 0.05rem;
      /*border: 1px solid #eee;*/
      border-radius: 0.04rem;
      text-align: center;
      cursor: pointer;
      margin-bottom: 0.1rem;
    }
    button.grey {
      width: 100%;
      border: none;
      font-size: 0.16rem;
      height: 0.42rem;
      color: #000;
      background-color: #d7d7d7;
      letter-spacing: 0.05rem;
      /*border: 1px solid #eee;*/
      border-radius: 0.04rem;
      text-align: center;
      cursor: pointer;
    }
  }
</style>