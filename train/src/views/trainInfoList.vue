<template>
  <div class='train'>
    <v-info-header
      v-on:backFn="back"
      :titleData="title"
    ></v-info-header>
    <div class="content">
      <v-list-title>训练准备信息</v-list-title>
      <v-list-item-info :infoList="infoList"></v-list-item-info>
      <v-list-title>人员签到</v-list-title>
      <v-tag-info
        :tags="infoList.joinAstronautNames"
        :title="tagTitle"
        :chargeTeacherName="infoList.chargeTeacherName"
        :auxiliaryLecturerName="infoList.auxiliaryLecturerName"
      ></v-tag-info>
      <v-train-info-content
        :content="content"
        :show="show"
      ></v-train-info-content>
      <div class="buttons">
        <button
          class="normal-btn-border-lg mr"
          @click="suggestion"
        >意见建议</button>
        <button
          class="normal-btn-border-lg mr"
          @click="recordFn"
        >数据项记录</button>
      </div>
    </div>

  </div>
</template>

<script>
  import { getLoc } from '../utils/common.js';
  import { mapState } from 'vuex';
  export default {
    data() {
      //这里存放数据
      return {
        title: "训练信息查看",
        tagTitle: "实到人员",
        infoList: [],
        content: [],
        show: 1//区别是已实施还是未实施的详情
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['userInfo', 'nowIndex'])
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      back() {
        this.$router.go(-1);
      },
      suggestion() {
        console.log('意见建议');
      },
      recordFn() {
        console.log('数据项');
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.infoList = getLoc(this.userInfo.personID).trainListData[this.nowIndex];
      let tagsInit = getLoc(this.userInfo.personID).trainListData[this.nowIndex].joinAstronautNames;
      this.tags = tagsInit.filter(item => {
        return item.isSignIn == true
      });
      this.content = getLoc(this.userInfo.personID).trainListData[this.nowIndex].trainImpleData.trainList;
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
  .train {
    .content {
      position: fixed;
      top: 0.92rem;
      bottom: 0rem;
      left: 1.9rem;
      right: 0.74rem;
      overflow-y: auto;
    }
    .buttons {
      text-align: right;
      line-height: 1rem;
    }
  }
</style>