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
            v-model="login.password"
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
    getLoc, setLoc
  } from '../utils/common.js';
  import { mapState, mapMutations, mapActions } from 'vuex';
  export default {
    data() {
      //这里存放数据
      return {
        login: {
          userName: "",
          password: ""
        },
        initData: {}
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['userInfo', 'allData', 'userIndex']),
    },
    //监控data中的数据变化
    watch: {
    },
    //方法集合
    methods: {
      ...mapMutations(['_userInfo', '_allData', '_weekPlanData', '_userIndex', '_userId']),
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
        const userArr = this.allData.allData.user;
        let result = userArr.filter((item, index) => {
          if(item.userName == this.login.userName && item.password == this.login.password) {
            this._userInfo(item);
            this._userIndex(index);
            this._userId(item.userID);
            // setLoc(item.userID, { "notActionData": {} });
            return true;
          }
        });
        if(result) {
          this.message.success('登陆成功！');
          this.$router.push('/layout');
        } else {
          this.message.warning('登陆失败！');
          return false;
        }
      },
      cancelBtn() { },
      //获取初始化数据并保存到本地
      getInitData() {
        this._getInfo({
          method: 'get',
          api: 'getLogin',
          callback: res => {
            console.log(res, 'res');
            let resData = { 'allData': res };
            this.initData = res;
            this._allData(resData);
            console.log(this.allData, 'allData');
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

        //未参训数据
        // if(getLoc('notActionListData')) {
        //   this._notActionListData(getLoc('notActionListData'));
        // } else {
        // this.getNotActionData();
        // }

        //参训数据
        // if(getLoc('actionListData')) {
        //   this._actionListData(getLoc('actionListData'));
        // } else {
        //   this.getActionData();
        // }
      },
      //初始化未实施数据
      //   getNotActionData() {
      //     this._notActionListData(this.initData.notActionList);
      //   },
      //初始化已实施数据
      //   getActionData() {
      //     this._actionListData(this.initData.actionList);
      //   },
      getWeekPlanData() {
        // console.log('init3', this.initData.weekPlan);
        this._weekPlanData(this.initData.weekPlan);
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.getInitData();
      //登录数据
      if(getLoc('userInfo')) {
        this.login = getLoc('userInfo');
      }

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