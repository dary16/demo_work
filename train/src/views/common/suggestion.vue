<template>
  <div class='suggestion'>
    <v-info-header
      v-on:backFn="back"
      :titleData="title"
    ></v-info-header>
    <div class="content">
      <div class="s-title clearfix">
        <button
          class="normal-btn fr"
          @click="addSuggestion"
        >+意见建议</button>
      </div>
      <div class="list">
        <ul>
          <li
            v-for="item in listData"
            :key="item.trainImplementCommentID"
          >
            <dd>
              <label>标题:</label>
              <span>{{item.commentTitle}}</span>
            </dd>
            <dd>
              <label>时间:</label>
              <span>{{item.commentDate}}</span>
            </dd>
            <dd>
              <label>说明:</label>
              <span>{{item.commentExplain}}</span>
            </dd>
            <dd>
              <label>建议人:</label>
              <span>{{item.commentPersonName}}</span>
            </dd>
            <dd>
              <label>关键字:</label>
              <span>{{item.keyword}}</span>
            </dd>
            <!-- <p>时间:{{item.commentDate}}</p>
            <p>说明:{{item.commentExplain}}</p>
            <p>建议人:{{item.commentPersonName}}</p>
            <p>关键字:{{item.keyword}}</p> -->
          </li>
        </ul>
      </div>
    </div>
    <v-pop-box
      v-if="isShowBox"
      :popData="popData"
      :commentDate="commentDate"
      :dateTime='dateTime'
      v-on:save="saveFn"
      v-on:cancle="cancleFn"
      v-on:chooseTime="chooseTime"
    ></v-pop-box>
    <mt-datetime-picker
      ref="picker"
      type="datetime"
      v-model="dateVal"
      @confirm="handleConfirm"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      hour-format="{value} 时"
      minute-format="{value} 分"
      :endDate="new Date()"
    >
    </mt-datetime-picker>
  </div>
</template>

<script>
  import {
    getLoc, setLoc, formatDateMin
  } from '@/utils/common.js';
  import { mapState } from 'vuex';
  export default {
    data() {
      //这里存放数据
      return {
        title: "意见建议",
        dateval: '',
        listData: [],
        isShowBox: false,
        dateVal: '',
        commentDate: '',
        dateTime: '',
        popData: {
          'titleTotal': '新增',
          'options': [{
            'status': 1,
            'title': '标题',
            'placeholder': '请输入标题',
            'val': 'commentTitle'
          }, {
            'status': 3,
            'title': '时间',
            'placeholder': '请选择时间',
            'val': 'commentDate'
          }, {
            'status': 1,
            'title': '说明',
            'placeholder': '请输入说明',
            'val': 'commentExplain'
          }, {
            'status': 1,
            'title': '建议人',
            'placeholder': '请输入建议人',
            'val': 'commentPersonName'
          }, {
            'status': 1,
            'title': '关键字',
            'placeholder': '请输入关键字',
            'val': 'keyword'
          }]
        }
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['nowIndex', 'userInfo', 'tabIndex', 'userName']),
    },
    //方法集合
    methods: {
      back() {
        this.$router.go(-1);
      },
      addSuggestion() {
        this.isShowBox = true;
      },
      //保存
      saveFn(val) {
        if(!val.commentTitle) {
          this.message.warning("请输入标题！");
          return false;
        }
        if(!val.commentDate) {
          this.message.warning("请选择时间！");
          return false;
        }
        if(!val.commentExplain) {
          this.message.warning("请输入说明！");
          return false;
        }
        if(!val.commentPersonName) {
          this.message.warning("请输入建议人！");
          return false;
        }
        if(!val.keyword) {
          this.message.warning("请输入关键字！");
          return false;
        }
        this.isShowBox = false;
        this.listData.push(val);
        if(this.tabIndex === 1) {
          let oldActionData = getLoc(this.userName + "_n").notActionList;
          let arrLen = oldActionData[this.nowIndex].commentData.length;
          //数组的替换
          oldActionData[this.nowIndex].commentData.push(val);
          //更新本地数据存储
          setLoc(this.userName + "_n", { "notActionList": JSON.parse(JSON.stringify(oldActionData)) });
        } else if(this.tabIndex === 2) {
          let oldTrainData = getLoc(this.userName + "_y").trainListData;
          let arrLen = oldTrainData[this.nowIndex].commentData.length;
          //数组的替换
          oldTrainData[this.nowIndex].commentData.push(val);
          //更新本地数据存储
          setLoc(this.userName + "_y", { "trainListData": JSON.parse(JSON.stringify(oldTrainData)) });
        }
      },
      //取消
      cancleFn(val) {
        this.isShowBox = val;
      },
      //打开时间插件
      chooseTime() {
        this.$refs.picker.open();
        this.dateVal = new Date();
      },
      //时间插件确认
      handleConfirm(value) {
        this.commentDate = formatDateMin(value);
      },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      if(this.tabIndex === 1) {
        // console.log(getLoc(this.userName+"_n").notActionList[this.nowIndex].commentData);
        // let oldActionData = getLoc(this.userInfo.userID).notActionData;
        let oldActionData = getLoc(this.userName + "_n").notActionList;
        if(this.$route.params.addData) {
          this.listData = getLoc(this.userName + "_n").notActionList[this.nowIndex].commentData;
          this.listData.push(this.$route.params.addData);
          oldActionData[this.nowIndex].commentData.push(this.$route.params.addData);
          //更新本地缓存
          setLoc(this.userName + "_n", { "notActionList": JSON.parse(JSON.stringify(oldActionData)), });
        } else {
          // this.listData = getLoc(this.userInfo.userID).notActionData[this.nowIndex].commentData;
          this.listData = getLoc(this.userName + "_n").notActionList[this.nowIndex].commentData;
        }
      } else if(this.tabIndex === 2) {
        let oldTrainData = getLoc(this.userName + "_y").trainListData;
        if(this.$route.params.addData) {
          this.listData = getLoc(this.userName + "_y").trainListData[this.nowIndex].commentData;
          this.listData.push(this.$route.params.addData);
          oldTrainData[this.nowIndex].commentData.push(this.$route.params.addData);
          //更新本地缓存
          setLoc(this.userName + "_y", { "trainListData": JSON.parse(JSON.stringify(oldTrainData)) });
        } else {
          this.listData = getLoc(this.userName + "_y").trainListData[this.nowIndex].commentData;
        }
      }

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang="less" scoped>
  .content {
    margin: 0.1rem 0.2rem;
    overflow-y: auto;
    position: fixed;
    bottom: 0;
    right: 0.52rem;
    top: 0.7rem;
    left: 1.5rem;
    .s-title {
      margin-right: 0.2rem;
      margin-top: 0.1rem;
      height: 0.6rem;
      line-height: 0.6rem;
    }
    .list {
      font-size: 0.23rem;
      ul {
        li {
          border: 1px solid #e6e4e4;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
          padding: 0.1rem 0.2rem;
          line-height: 0.5rem;
          label {
            width: 3rem;
            display: inline-block;
          }
          .name {
            margin-right: 0.3rem;
          }
          // p {
          //   font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
          // }
          // &:last-child {
          //   border-bottom: 1px solid #006699;
          // }
        }
      }
    }
  }
</style>