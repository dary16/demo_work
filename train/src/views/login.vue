<!-- 登录 -->
<template>
  <div class="g-login">
    <div class="g-login-view login">
      <h2 class="title"></h2>
      <dl
        class="content"
        @keyup.enter="loginBtn"
      >
        <dd>
          <!-- <label>账号：</label> -->
          <input
            type="text"
            placeholder="用户名"
            v-model.trim="login.userName"
          />
        </dd>
        <dd>
          <!-- <label>密码：</label> -->
          <input
            type="password"
            placeholder="密码"
            v-model="login.password"
          />
        </dd>
      </dl>
      <button
        class="btn"
        type="button"
        @click="loginBtn"
      >登录</button>
    </div>
    <div
      class="g-login-wrap"
      v-show="showWelcome"
    ></div>
  </div>
</template>

<script>
  import {
    getLoc, setLoc
  } from '../utils/common.js';
  import { mapState, mapMutations, mapActions } from 'vuex';
  import { setTimeout } from 'timers';
  export default {
    data() {
      //这里存放数据
      return {
        login: {
          userName: "",
          password: ""
        },
        initData: {},//初始化数据
        showWelcome: true
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['allData', 'userInfo', 'userData']),
    },
    //监控data中的数据变化
    watch: {
    },
    //方法集合
    methods: {
      ...mapMutations(['_userInfo', '_allData', '_weekPlanData', '_userData']),
      ...mapActions(['_getInfo']),
      //登录确定
      loginBtn() {
        if(!this.login.userName) {
          this.message.warning("请输入账号！");
          return false;
        } else {
          var val = /^[A-Za-z0-9]{0,16}$/;
          var vaid = val.exec(this.login.userName);
          if(vaid == null) {
            this.message.warning("用户名格式不正确！");
            return false;
          }
        }
        if(!this.login.password) {
          this.message.warning("请输入密码！");
          return false;
        } else {
          var val = /^[A-Za-z0-9]{0,16}$/;
          var vaid = val.exec(this.login.password);
          if(vaid == null) {
            this.message.warning("密码格式不正确！");
            return false;
          }
        }
        // 获取用户信息，与登录信息进行匹配
        const userArr = this.userData;
        let loading;
        let result = userArr.filter((item, index) => {
          if(item.userName == this.login.userName && item.password == this.login.password) {
            //loading加载
            loading = this.$loading({
              lock: true,
              text: '正在拼命加载中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            //保存当前登录人信息
            this._userInfo(item);
            return true;
          }
        });

        if(result.length > 0) {
          loading.close();
          this.$router.push('/layout');
        } else {
          this.$message({
            message: '登陆失败,用户名或密码错误！',
            type: 'error',
            offset: '100',
            center: true
          });
          return false;
        }
      },
      //获取初始化数据并保存到本地
      getInitData() {
        this._getInfo({
          method: 'get',
          api: 'getLogin',
          callback: res => {
            let resData = { 'allData': res };
            this.initData = res;
            this._allData(resData);
            console.log(this.allData.allData.user, 'allData');
            this._userData(this.allData.allData.user);
            this.initLocal();
          }
        })
      },
      initLocal() {
        //周计划数据
        if(getLoc('weekPlanData')) {
          this._weekPlanData(getLoc('weekPlanData'));
        } else {
          this.getWeekPlanData();
        }

      },
      //初始化未实施数据
      //   getNotActionData() {
      //     this._notActionListData(this.initData.notActionList);
      //   },
      getWeekPlanData() {
        this._weekPlanData(this.initData.weekPlan);
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      //模拟下载用户数据，后期改
      setTimeout(() => {
        this.showWelcome = false;
        this.getInitData();
        //登录数据
        if(getLoc('userInfo')) {
          this.login = getLoc('userInfo');
        }
      }, 1000)
      //   this.getInitData();
      //   //登录数据
      //   if(getLoc('userInfo')) {
      //     this.login = getLoc('userInfo');
      //   }

      //   this.$http.get('../../all.json')
      //     .then(function(res) {
      //       let resData = { 'allData': res };
      //       this._allData(resData);
      //     }
      //     )
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
    background: url("../assets/login_bg.png");
    background-size: 100% 100%;

    &-view {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 20%;
      margin: auto;
      //   box-shadow: 0px 0px 10px #999;
    }
    &-wrap {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      z-index: 99;
      background: url("../assets/wrap_login.jpg");
      background-size: 100% 100%;
    }
  }
  .login {
    width: 5rem;
    height: 3.6rem;
    border-radius: 0.06rem;
    // background-color: rgba(50, 50, 50, 0.7);
    padding: 0.35rem 0.48rem;
    .title {
      background: url("../assets/login_logo.png");
      width: 2.7rem;
      height: 0.7rem;
      background-size: 100% 100%;
      padding-bottom: 0.2rem;
      margin: 0 0.7rem 0.6rem 0.5rem;
    }
    .content {
      margin-bottom: 0.4rem;
      dd {
        margin-bottom: 0.2rem;
        margin-inline-start: 0;
        display: flex;
        label {
          font-size: 0.14rem;
          color: #fff;
          display: inline-block;
          width: 0.46rem;
          line-height: 0.54rem;
        }
        .select {
          width: 100%;
        }
      }
      input {
        width: 100%;
        border: none;
        height: 0.42rem;
        background-color: f8f9fb;
        padding: 0 0.2rem;
        box-sizing: border-box;
        border-radius: 0.04rem;
        border: 1px solid #ddd;
        font-size: 0.2rem;
        flex: 1;
      }
    }
    button.btn {
      width: 100%;
      border: none;
      font-size: 0.24rem;
      height: 0.54rem;
      color: #fff;
      background-color: #6baffc;
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