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
            <p>{{item.commentExplain}}</p>
            <span class="name">{{item.commentPersonName}}</span>
            <span class="time">{{item.commentDate}}</span>
          </li>
        </ul>
      </div>
    </div>
    <v-pop-box
      v-if="isShowBox"
      :popData="popData"
      v-on:save="saveFn"
      v-on:cancle="cancleFn"
    ></v-pop-box>
  </div>
</template>

<script>
  import {
    getLoc, setLoc
  } from '../../utils/common.js';
  import { mapState } from 'vuex';
  export default {
    data() {
      //这里存放数据
      return {
        title: "意见建议",
        listData: [],
        isShowBox: false,
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
            'placeholder': '请输入时间',
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
      ...mapState(['nowIndex', 'userInfo', 'tabIndex'])
    },
    //监控data中的数据变化
    watch: {
      listData: {
        handler(newValue, oldValue) {
          if(this.tabIndex === 1) {
            let oldActionData = getLoc(this.userInfo.userID).notActionData;
            let arrLen = getLoc(this.userInfo.userID).notActionData[this.nowIndex].commentData.length;
            //数组的替换
            oldActionData[this.nowIndex].commentData.splice(0, arrLen, ...newValue);
            //更新本地数据存储
            setLoc(getLoc('userInfo').userID, { "notActionData": JSON.parse(JSON.stringify(oldActionData)), "loadTime": getLoc(this.userInfo.userID).loadTime });
          } else if(this.tabIndex === 2) {
            let oldTrainData = getLoc(this.userInfo.personID).trainListData;
            let arrLen = getLoc(this.userInfo.personID).trainListData[this.nowIndex].commentData.length;
            //数组的替换
            oldTrainData[this.nowIndex].commentData.splice(0, arrLen, ...newValue);
            //更新本地数据存储
            setLoc(getLoc('userInfo').personID, { "trainListData": JSON.parse(JSON.stringify(oldTrainData)) });
          }

        },
        deep: true
      }
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
        this.isShowBox = false;
        this.listData.push(val);
      },
      //取消
      cancleFn(val) {
        this.isShowBox = val;
      },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      if(this.tabIndex === 1) {
        let oldActionData = getLoc(this.userInfo.userID).notActionData;
        if(this.$route.params.addData) {
          this.listData = getLoc(this.userInfo.userID).notActionData[this.nowIndex].commentData;
          this.listData.push(this.$route.params.addData);
          oldActionData[this.nowIndex].commentData.push(this.$route.params.addData);
          //更新本地缓存
          setLoc(getLoc('userInfo').userID, { "notActionData": JSON.parse(JSON.stringify(oldActionData)), "loadTime": getLoc(this.userInfo.userID).loadTime });
        } else {
          this.listData = getLoc(this.userInfo.userID).notActionData[this.nowIndex].commentData;
        }
      } else if(this.tabIndex === 2) {
        let oldTrainData = getLoc(this.userInfo.personID).trainListData;
        if(this.$route.params.addData) {
          this.listData = getLoc(this.userInfo.personID).trainListData[this.nowIndex].commentData;
          this.listData.push(this.$route.params.addData);
          oldTrainData[this.nowIndex].commentData.push(this.$route.params.addData);
          //更新本地缓存
          setLoc(getLoc('userInfo').personID, { "trainListData": JSON.parse(JSON.stringify(oldTrainData)) });
        } else {
          this.listData = getLoc(this.userInfo.personID).trainListData[this.nowIndex].commentData;
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
    left: 3.5rem;
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
          border: 1px solid #006699;
          border-bottom: none;
          padding: 0.1rem 0.2rem;
          line-height: 0.5rem;
          .name {
            margin-right: 0.3rem;
          }
          &:last-child {
            border-bottom: 1px solid #006699;
          }
        }
      }
    }
  }
</style>