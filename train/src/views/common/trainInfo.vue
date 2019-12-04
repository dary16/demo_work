<template>
  <div class='train-info'>
    <v-info-header
      v-on:backFn="back"
      :titleData="title"
    ></v-info-header>
    <div class="button-finish">
      <el-badge
        :value="recordNum"
        type="primary"
        :max="99"
        class="badgeNum"
        v-if="recordNum !== 0"
      >
        <button
          class="sugg-rec-btu"
          @click="watchRecord"
        >数据项记录</button>
      </el-badge>
      <button
        v-else
        @click="noData"
      >数据项记录</button>
      <el-badge
        :value="suggNum"
        type="primary"
        :max="99"
        class="badgeNum"
        v-if="suggNum !== 0"
      >
        <button
          class="sugg-rec-btu"
          @click="watchSugg"
        >意见建议</button>
      </el-badge>
      <button
        v-else
        @click="noData"
      >意见建议</button>
    </div>
    <div class="content">

      <v-list-title>训练基本信息</v-list-title>
      <v-list-item-info
        :infoList="infoList"
        v-on:doAction="doAction"
        v-on:showInfo="showInfo"
      ></v-list-item-info>
      <v-list-title>应到人员</v-list-title>
      <v-tag-info
        :tags="infoList.joinAstronautNames"
        :title="tagTitle"
        :chargeTeacherName="infoList.chargeTeacherName"
        :auxiliaryLecturerName="infoList.auxiliaryLecturerName"
      ></v-tag-info>
      <v-list-title>训练内容详情</v-list-title>
      <v-item-block
        :trainList="infoList.trainImpleData.trainList"
        :trainWay="trainWay"
      ></v-item-block>
    </div>
  </div>
</template>

<script>
  import {
    getLoc
  } from '@/utils/common.js';
  import { mapState, mapMutations } from 'vuex';
  export default {
    data() {
      //这里存放数据
      return {
        title: "训练准备详情",
        infoList: [],
        tagTitle: '航天员',
        trainWay: '',
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['userInfo', 'nowIndex', 'tabIndex', 'userName'])
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      back() {
        if(this.tabIndex === 1) {
          this.$router.push('notTrain');
        } else if(this.tabIndex === 2) {
          this.$router.push('train');
        }
      },
      showInfo() {
        console.log('show');
      },
      doAction() {
        console.log('showdsfsd');
      },
      //查看意见建议
      watchSugg() {
        this.$router.push('/suggestionView');
      },
      //查看数据项记录
      watchRecord() {
        this.$router.push('/recordView');
      },
      noData() {
        this.message.warning("暂无数据！");
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      //移除原有物理返回按键事件
      plus.key.removeEventListener("backbutton", onPlusReady);
      //添加新监听，绑定物理返回按键事件
      plus.key.addEventListener("backbutton", onBack => {
        if(this.tabIndex === 1) {
          this.$router.push('notTrain');
        } else if(this.tabIndex === 2) {
          this.$router.push('train');
        }
      })
      if(this.tabIndex === 1) {
        this.suggNum = getLoc(this.userName + "_n").notActionList[this.nowIndex].commentData.length;
        this.recordNum = getLoc(this.userName + "_n").notActionList[this.nowIndex].trainData.length;
      } else if(this.tabIndex === 2) {
        this.suggNum = getLoc(this.userName + "_y").trainListData[this.nowIndex].commentData.length;
        this.recordNum = getLoc(this.userName + "_y").trainListData[this.nowIndex].trainData.length;
      }

      this.infoList = this.$route.params.infoList;
      this.trainWay = this.infoList.trainWay;
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
  .train-info {
    .content {
      position: fixed;
      top: 1.5rem;
      bottom: 0rem;
      left: 1.9rem;
      right: 0.74rem;
      overflow-y: auto;
    }
    .button-finish {
      height: 1rem;
      line-height: 1rem;
      float: right;
      margin-right: 0.73rem;
      button {
        float: right;
        height: 0.52rem;
        padding: 0.15rem 0.72rem;
        background: #fff;
        font-size: 0.24rem;
        line-height: 0.2rem;
        color: #3288fe;
        border: 1px solid #3288fe;
        margin: 0.24rem 0.1rem;
        width: 3.17rem;
      }
    }
  }
</style>