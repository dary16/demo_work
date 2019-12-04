<template>
  <div class="xl-list clearfix">
    <v-header :titleData="title"></v-header>
    <v-list-item
      :infoList="infoList"
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
  //均为测试数据，后期要改
  // import userData from '@/utils/user.js';
  import notActionData from '@/utils/notActionData.js';
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
      ...mapState(['userName', 'nowIndex', 'userInfo'])
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      ...mapMutations(['_nowIndex', '_userInfo', '_tabIndex']),
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
      //   setLoc(this.userName + '_n', notActionData);
      //移除原有物理按键监听的绑定事件
      //   plus.key.removeEventListener("backbutton", onPlusReady);
      //   //执行新的物理返回按键方法
      //   this.onQuit();
      // 从缓存中获取数据
      // let notList = getLoc(this.userName + '_n');
      // this.infoList = notList.notActionList;
      this._tabIndex(1);
      if(!getLoc(this.userName + '_n')) {
        setTimeout(_ => {
          let notList = getLoc(this.userName + '_n');
          this.infoList = notList.notActionList;
        }, 1000);
      } else {
        let notList = getLoc(this.userName + '_n');
        this.infoList = notList.notActionList;
      }
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
</style>