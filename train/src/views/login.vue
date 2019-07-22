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
            v-model.trim="login.userName"
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
  import {
    getLoc
  } from '../utils/common.js';
  import { mapState, mapMutations, mapActions } from 'vuex';
  export default {
    data() {
      //这里存放数据
      return {
        login: {
          userName: "",
          userPwd: ""
        }
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['userInfo', 'allData'])
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      ...mapMutations(['_userInfo', '_allData']),
      ...mapActions(['_getInfo']),
      loginBtn() {
        //console.log('submit!');
        if(!this.login.userName) {
          this.message.warning("请输入账号！");
          return false;
        }
        if(!this.login.userPwd) {
          this.message.warning("请输入密码！");
          return false;
        }
        const userArr = this.allData.allData.user;
        let result = userArr.some((item, value) => {
          return item.userName == this.login.userName && item.userPwd == this.login.userPwd
        });
        if(result) {
          this.message.success('登陆成功！');
          let userInfo = { 'userName': this.login.userName, 'userPwd': this.login.userPwd }
          this._userInfo(userInfo);
          this.$router.push('/layout');
        } else {
          this.message.warning('登陆失败！');
          return false;
        }
      },
      cancelBtn() { },
      //   testBtn() {
      //     this.$http.get('http://localhost:8080/all.json')
      //       .then(function(res) {
      //         console.log(res)
      //       }
      //       )
      //   }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      if(getLoc('userInfo')) {
        this.login = getLoc('userInfo');
        console.log(this.login);
      }
      this._getInfo({
        method: 'get',
        api: 'getLogin',
        callback: res => {
          console.log(res, 'res');
          let resData = { 'allData': res };
          this._allData(resData);
        }
      })
    },
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