<template>
  <div class='train-info'>
    <v-info-header
      v-on:backFn="back"
      :titleData="title"
    ></v-info-header>
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
      <v-item-block :trainList="infoList.trainImpleData.trainList"></v-item-block>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  export default {
    data() {
      //这里存放数据
      return {
        title: "训练准备详情",
        infoList: [],
        tagTitle: '学员'
      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      back() {
        this.$router.back();
      },
      showInfo() {
        console.log('show');
      },
      doAction() {
        console.log('showdsfsd');
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.infoList = this.$route.params.infoList;
      console.log(this.infoList);
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
      top: 0.92rem;
      bottom: 0rem;
      left: 1.9rem;
      right: 0.74rem;
      overflow-y: auto;
    }
  }
</style>