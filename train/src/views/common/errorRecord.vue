<template>
  <div class='errorRecord'>
    <v-info-header
      v-on:backFn="back"
      :titleData="title"
    ></v-info-header>
    <div class="content">
      <div class="errorList">
        <div class="errorItem">
          <v-list-title>异常产生时间</v-list-title>
          <label>时间：</label>
          <input
            type="text"
            v-model="errorData.abnormalDate"
            placeholder="点击选择时间"
            readonly
            @click="chooseTime"
          >
          <mt-datetime-picker
            ref="picker"
            type="time"
            @confirm="handleConfirm"
            v-model="errorData.abnormalDate"
            hour-format="{value} 时"
            minute-format="{value} 分"
            :endDate="new Date()"
          >
          </mt-datetime-picker>
        </div>
        <div class="errorItem">
          <v-list-title>异常说明</v-list-title>
          <label>异常说明：</label>
          <input
            type="text"
            v-model="errorData.abnormalExplain"
          >
        </div>
        <div class="errorItem">
          <v-list-title>异常产生对象</v-list-title>
          <label>异常产生对象：</label>
          <input
            type="text"
            v-model="errorData.abnormalObject"
          >
        </div>
        <div class="errorItem bb">
          <v-list-title>关键字</v-list-title>
          <label>关键字：</label>
          <input
            type="text"
            v-model="errorData.keyword"
          >
        </div>
      </div>
      <div class="bottom">
        <button
          class="normal-btn-lg"
          @click="saveFn"
        >保存</button>
      </div>
    </div>

  </div>

</template>

<script>
  import { mapState } from 'vuex';
  import { getLoc, setLoc } from '../../utils/common.js';
  export default {
    data() {
      //这里存放数据
      return {
        title: "训练异常点记录",
        errorData: {
          abnormalDate: '',
          abnormalExplain: '',
          abnormalObject: '',
          keyword: ''
        },
        year: '',
        isClicked: false,
        usebor: false
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['tabIndex', 'nowIndex', 'userInfo', 'userName'])
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      //返回
      back() {
        this.$router.go(-1);
      },
      saveFn() {
        if(!this.errorData.abnormalDate) {
          this.message.warning("请选择异常时间");
          return false;
        }
        if(!this.errorData.abnormalExplain) {
          this.message.warning("请输入异常说明");
          return false;
        }
        if(!this.errorData.abnormalObject) {
          this.message.warning("请输入异常产生对象");
          return false;
        }

        if(this.tabIndex === 1) {
          let oldActionData = getLoc(this.userName + '_n').notActionList;
          //获取未实施对应异常列表数据
          let errorList = oldActionData[this.nowIndex].trainImpleData.trainList[this.$route.params.index].faultInfo;
          errorList.push(this.errorData);
          console.log(errorList, oldActionData);
          console.log(getLoc(this.userInfo.username + '_n'));
          setLoc(this.userName + '_n', { "notActionList": JSON.parse(JSON.stringify(oldActionData)) });

          this.$router.go(-1);
        } else if(this.tabIndex === 2) {
          let trainData = getLoc(this.userName + '_y').trainListData;
          //获取已实施对应异常列表数据
          let trainList = trainData[this.nowIndex].trainImpleData.trainList[this.$route.params.index].faultInfo;
          trainList.push(this.errorData);
          setLoc(this.userName + '_y', { "trainListData": JSON.parse(JSON.stringify(trainData)) });
          this.$router.go(-1);
        }
      },
      chooseTime() {
        this.$refs.picker.open();
      },
      handleConfirm(value) {
        this.errorData.abnormalDate = value;
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
  .errorRecord {
    .content {
      margin: 0.1rem 0.2rem;
      .errorList {
        margin-bottom: 0.5rem;
        .errorItem {
          border: 1px solid #e6e4e4;
          label {
            display: inline-block;
            width: 3rem;
            font-size: 0.24rem;
            padding-left: 0.5rem;
          }
          input {
            font-size: 0.24rem;
            height: 0.5rem;
            line-height: 0.5rem;
            width: 12rem;
            border: 1px solid #a09d9d;
            border-radius: 2.8px;
            margin: 0.1rem auto;
          }
        }
      }
      .bottom {
        text-align: center;
      }
    }
  }
</style>
<style>
  .el-input--small .el-input__inner {
    height: 26px !important;
    line-height: 26px !important;
  }
  .el-date-picker__header {
    margin: 5px 12px !important;
  }
  .el-picker-panel__content {
    margin: 5px !important;
  }
  .el-date-table td,
  .el-date-table td div {
    height: 16px !important;
  }
  .el-picker-panel {
    line-height: 20px !important;
  }
</style>