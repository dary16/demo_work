<template>
  <div class="xl-list clearfix">
    <v-header :titleData="title"></v-header>
    <v-list-item
      :infoList="infoList"
      :unfinishedTime="unfinishedTime"
      :unfinishedTimeIndex="unfinishedTimeIndex"
      v-on:doAction="doAction"
      v-on:showInfo="showInfo"
    ></v-list-item>
  </div>
</template>

<script>
  import {
    getLoc, setLoc, onQuit
  } from '@/utils/common.js';
  import { mapMutations, mapState } from 'vuex';
  import { setTimeout } from 'timers';
  //均为测试数据，后期要改
  // import userData from '@/utils/user.js';
  // import notActionData from '@/utils/notActionData.js';
  export default {
    data() {
      //这里存放数据
      return {
        infoList: [],
        title: "待实施训练"
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['userName', 'nowIndex', 'userInfo', 'unfinishedTime' ,'unfinishedTimeIndex'])
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      ...mapMutations(['_nowIndex', '_userInfo', '_tabIndex', '_isTimingNow', '_unfinishedTime', '_unfinishedTimeIndex']),
      doAction(index) {
        //记录训练实施的索引号
        this._nowIndex(index);
        this.$router.push('./info');
      },
      showInfo(index) {
        this._nowIndex(index);
        this.$router.push({ name: 'trainInfo', params: { infoList: this.infoList[index] } });
      },
      //物理返还按键退出
      onQuit() {
        let quitTime = null;
        //添加新的物理返回按键监听事件
        plus.key.addEventListener("backbutton", onBack => {
          if(!quitTime) {
            quitTime = Date.now();
            this.toast({
              message: '再按一次返回键退出并注销登录',
              position: 'bottom',
              duration: 2000
            });
            setTimeout(_ => {
              quitTime = null;
            }, 2000);
          } else {
            if((Date.now() - quitTime) <= 2000) {
              quitTime = null;
              plus.runtime.quit();
            }
          }
        });
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      //移除原有物理按键监听的绑定事件
      plus.key.removeEventListener("backbutton", onPlusReady);
      //执行新的物理返回按键方法
      this.onQuit();
      // 从缓存中获取数据
      let notList = getLoc(this.userName + '_n');
      this.infoList = notList.notActionList;
      this._tabIndex(1);
      // if(!getLoc(this.userName + '_n')) {
      //   setTimeout(_ => {
      //     let notList = getLoc(this.userName + '_n');
      //     this.infoList = notList.notActionList;
      //     setLoc(this.userName + '_f',getLoc(this.userName + '_n').id);
      //   }, 1000);
      // } else {
      //   if(getLoc(this.userName+"_t") && getLoc(this.userName + '_f')){
      //     if(getLoc(this.userName + '_f') === getLoc(this.userName+"_t")){
      //       alert(1111);
      //       let notList = getLoc(this.userName + '_n');
      //       this.infoList = notList.notActionList;
      //     }else{
      //       alert(222);
      //       setTimeout(_ => {
      //         let notList = getLoc(this.userName + '_n');
      //         this.infoList = notList.notActionList;
      //       }, 1000);
      //       setLoc(this.userName + '_f',getLoc(this.userName + '_n').id);
      //     }
      //   }else{
      //     setTimeout(_ => {
      //       let notList = getLoc(this.userName + '_n');
      //       this.infoList = notList.notActionList;
      //     }, 1000);
      //   }
      // }
      //判断是否有计时任务未结束
      if (getLoc('timerFlag') !== null) {
        //再判断当前登录用户是否是之前未完成计时的用户
        let oldTime = getLoc('timerFlag');
        if (getLoc('userName') === oldTime.username) {
          this._isTimingNow(true);
          this._unfinishedTime(oldTime.status);
          this._unfinishedTimeIndex(oldTime.trainIndex);
        } else {
          this._isTimingNow(false);
          this._unfinishedTime(-1);
          this._unfinishedTimeIndex(-1);
          localStorage.removeItem('timerFlag');
        }
      }
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
</style>