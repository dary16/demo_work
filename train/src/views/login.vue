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
            v-model.trim="login.username"
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
  </div>
</template>

<script>
  import {
    getLoc, setLoc
  } from '@/utils/common.js';
  import { mapState, mapMutations, mapActions } from 'vuex';
  import { setTimeout } from 'timers';
  // import userData from '@/utils/user.js';
  // import notActionData from '@/utils/notActionData.js';
  export default {
    data() {
      //这里存放数据
      return {
        login: {
          username: "",
          password: ""
        },
        initData: {},//初始化数据
        // showWelcome: true
        isLoding: false,
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['allData', 'userInfo', 'userData', 'userName']),
    },
    //监控data中的数据变化
    watch: {
      isLoding:{
        handler(newVal,oldVal){
          if(newVal){
            this.$router.push('/layout');
          }
        }
      }
    },
    //方法集合
    methods: {
      ...mapMutations(['_userInfo', '_allData', '_weekPlanData', '_userData', '_userName']),
      ...mapActions(['_getInfo']),
      //登录确定
      loginBtn() {
        if(!this.login.username) {
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
        // const userArr = this.userData.user;
        
        //通过读取本地的用户数据文件获取用户信息
        const userArr = getLoc("user").user;

        let loading;
        let result = userArr.filter((item, index) => {
          if(item.username == this.login.username && item.password == require("js-sha256").sha256(this.login.password)) {
            //loading加载
            loading = this.$loading({
              lock: true,
              text: '正在拼命加载中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            //保存当前登录人信息
            this._userInfo(item);
            //保存登录人用户名，便于存储
            this._userName(item.username);
            // if(!getLoc(this.userName + '_n')) {
            //   setLoc(item.username + '_n', notActionData);
            // } else {
            //   console.log(getLoc(this.userName + '_n'));
            // };
            // 通过当前登录人获取本地文件的信息
            document.addEventListener( "plusready", onPlusReady, false );
            //执行方法
            this.onPlusReady(this.userName);

            return true;
          }
        });

        if(result.length > 0) {
          loading.close();
          // if(this.isLoding){
          //   this.$router.push('/layout');
          // }
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
      //读取当前用户的数据保存在localstorage
      //未实施规范：key: username+_n
      onPlusReady(username){
        plus.io.requestFileSystem( plus.io.PRIVATE_WWW, fs => {
          //定位到指定用户的目录下
          // /storage/emulated/0/Android/data/gds.xlgl.xlss/data/
          fs.root.getDirectory( "/storage/emulated/0/train/data/", {create:false,exclusive:false},  dirs => {
            //打开用户数据文件夹（若无文件夹则创建文件夹）
            dirs.getDirectory(username,{create:true,exclusive:false},dir => {
              var directoryReader = dir.createReader();
              //获取指定目录文件夹下所有文件和文件夹
              directoryReader.readEntries( entries => {
                if(entries.length<1){
                  alert(username+" 文件夹下没有找到基础数据，请下载数据并拷贝至指定目录后重启APP！");
                  plus.runtime.quit();
                  return false;
                }
                var i;
                for( i=0; i < entries.length; i++ ) {
                  //判断为未实施的json的文件
                  if(entries[i].name.substring(entries[i].name) == "notActionList.json"){
                    //定位到指定文件下
                    dir.getFile(entries[i].name,{create:false}, fileEntry => {
                      //读取文件
                      fileEntry.file( file => {
                        var fileReader = new plus.io.FileReader();
                        fileReader.readAsText(file, 'utf-8');
                        fileReader.onloadend = evt => {
                          if(getLoc(username+"_t")){
                            //不是首次登陆，比较id是否一样，一样则说明数据未更新，不一样则说明数据更新了，从json里取数据
                            if(JSON.parse(evt.target.result).id !== getLoc(username+"_t")){
                              setLoc(username+"_n",evt.target.result);
                              setLoc(username+"_t",getLoc(username+"_n").id);
                              this.message.success("数据已更新！");
                              this.isLoding = true;
                            }
                          }else{
                            // this.message.success("第一次登陆！");
                            setLoc(username+"_n",evt.target.result);
                            setLoc(username+"_t",getLoc(username+"_n").id);
                            this.message.success("数据已更新！");
                            this.isLoding = true;
                          }
                          // alert("id1:"+getLoc(username+"_t"));
                          // alert("json-id:"+JSON.parse(evt.target.result).id);
                          // alert(getLoc(username+"_t") == JSON.parse(evt.target.result).id);
                          // if(JSON.parse(evt.target.result).id != getLoc(username+"_t")){
                          //   setLoc(username+"_n",evt.target.result);
                          //   setLoc(username+"_t",getLoc(username+"_n").id);
                          //   this.message.success("数据已更新！");
                          // }
                          this.isLoding = true;
                        }
                      });
                    });
                  }else{
                    alert(username+' 文件夹下包含非指定文件，请下载数据并拷贝至指定目录后重启APP！');
                    plus.runtime.quit();
                    return false;
                  }
                }
              });
            })
          });
        });
      },
      //获取初始化数据并保存到本地
      getInitData() {

        // let resData = { 'allData': allDataArr };
        // this.initData = allDataArr;
        // this._allData(resData);
        // this._userData(userData);
        this._userData(getLoc("user"));
      },
      //   getWeekPlanData() {
      //     this._weekPlanData(this.initData.weekPlan);
      //   }
      //获取更新版本apk文件对比更新
      updateTrain(){
        document.addEventListener( "plusready", update => {
          plus.io.requestFileSystem( plus.io.PRIVATE_WWW, fs => {
            fs.root.getFile("/storage/emulated/0/train/data/base/version.json",{create:false,exclusive:false},version =>{
              //通过更新文件获取版本信息
              version.file( file => {
                var versionReader = new plus.io.FileReader();
                versionReader.readAsText(file, 'utf-8');
                versionReader.onloadend = evt => {
                  //获取到的版本信息和应用的版本信息对比，版本不一致则进入
                  // alert(JSON.parse(evt.target.result).version);
                  if(JSON.parse(evt.target.result).version !=  plus.runtime.version){
                    fs.root.getDirectory("/storage/emulated/0/train/update/",{create:false,exclusive:false},updateTrain =>{
                      var directoryReader = updateTrain.createReader();
                      //用户选择更新或退出，强制更新
                      directoryReader.readEntries(  entries => {
                        this.$confirm('获取到新的版本，是否安装新的版本?', '提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '退出',
                          type: 'warning'
                        }).then(() => {
                          if(entries.length<1){
                            alert("upadte 文件夹未获取到apk安装文件！");
                            plus.runtime.quit();
                            return false;
                          }
                          if(entries.length>1){
                            alert("update 文件夹包含多个安装文件！");
                            plus.runtime.quit();
                            return false;
                          }
                          if(entries[i].name.substring(entries[i].name.length-4) != ".apk"){
                            alert("update 文件夹包含非安装文件！");
                            plus.runtime.quit();
                            return false;
                          }
                          var i;
                          for( i=0; i < entries.length; i++ ) {
                            //从指定目录下获取文件
                            updateTrain.getFile(entries[i].name,{create:false}, fileEntry => {
                              fileEntry.file( file => {
                                plus.runtime.install('/storage/emulated/0/train/update/'+file.name);
                              });
                            });
                          }
                        }).catch(() => {
                          plus.runtime.quit();
                        });
                      });
                    });
                  }
                }
              });
            });
          });
        }, false );
      },
      //物理返还按键退出
      onQuit(){
        let quitTime = null;
        //添加新的物理返回按键监听事件
        plus.key.addEventListener("backbutton",onBack => {
          plus.runtime.quit();
          // if (!quitTime) {
          //   quitTime = Date.now();
          //   this.toast({
          //     message: '再按一次返回键退出并注销登录',
          //     position: 'bottom',
          //     duration: 2000
          //   });
          //   setTimeout(_=>{
          //     quitTime = null;
          //   },2000);
          // }else{
          //   if((Date.now() - quitTime)<=2000){
          //     quitTime = null;
          //     plus.runtime.quit();
          //   }
          // }
        });
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      //模拟下载用户数据，后期改
      setTimeout(() => {
        plus.key.removeEventListener("backbutton",onPlusReady);
        //执行新的物理返回按键方法
        this.onQuit();
        this._userData(getLoc("user"));
        //移除原有物理按键监听的绑定事件
        // 版本校验勿删
        // this.updateTrain();
        // this.getInitData();
        //登录数据
        // if(getLoc('userInfo')) {
        //   this.login = getLoc('userInfo');
        // }
      }, 500);
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