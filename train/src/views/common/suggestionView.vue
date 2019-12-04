<template>
  <div class='suggestionView'>
    <v-info-header
      v-on:backFn="back"
      :titleData="title"
    ></v-info-header>
    <div class="content">
      <div
        class="noData"
        v-if="listData.length==0"
      >暂无数据</div>
      <div
        class="list"
        v-else
        v-for="(item,index) in listData"
        :key="item.trainImplementCommentID"
      >
        <ul>
          <li>
            <img src="../../assets/info_title.png"/>
            <span class="header">{{item.commentTitle}}</span>
          </li>
          <li><label>关键字</label>
            <span>{{item.keyword}}</span></li>
          <li>
            <label>建议人</label>
            <span>
              <div class="commentPer">
                {{newArr[index]}}
              </div>
            </span>
          </li>
          <li>
            <label>意见建议时间</label>
            <span>{{item.commentDate}}</span>
          </li>
          <li>
            <label>意见建议说明</label>
            <span>{{item.commentExplain}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    getLoc, setLoc, formatDateMin
  } from '../../utils/common.js';
  import { mapState } from 'vuex';
  export default {
    data() {
      //这里存放数据
      return {
        title: "查看意见建议",
        listData: [],
        newArr: []
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['nowIndex', 'userInfo', 'tabIndex', 'userName']),
    },
    //方法集合
    methods: {
      back() {
        let listDate;
        if(this.tabIndex === 1) {
          listDate = getLoc(this.userName + "_n").notActionList[this.nowIndex];
        } else if(this.tabIndex === 2) {
          listDate = getLoc(this.userName + "_y").trainListData[this.nowIndex];
        }
        this.$router.push({ name: 'trainInfo', params: { infoList: listDate } });
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      if(this.tabIndex === 1) {
        //获取建议人数据
        this.astronautNames = getLoc(this.userName + "_n").notActionList[this.nowIndex].joinAstronautNames;
        let oldActionData = getLoc(this.userName + "_n").notActionList;
        this.listData = getLoc(this.userName + "_n").notActionList[this.nowIndex].commentData;
        this.listData.forEach(item => {
          let sy = [];
          item.commentPersonName.forEach(i => {
            sy.push(i.trainImplementAstronautName);
          })
          this.newArr.push(sy.toString());
        })
        console.log(this.newArr);
      } else if(this.tabIndex === 2) {
        this.astronautNames = getLoc(this.userName + "_y").trainListData[this.nowIndex].joinAstronautNames
        let oldTrainData = getLoc(this.userName + "_y").trainListData;
        this.listData = getLoc(this.userName + "_y").trainListData[this.nowIndex].commentData;
        this.listData.forEach(item => {
          let sy = [];
          item.commentPersonName.forEach(i => {
            sy.push(i.trainImplementAstronautName);
          })
          this.newArr.push(sy.toString());
        })
      }
      //移除原有物理返回按键事件
      plus.key.removeEventListener("backbutton", onPlusReady);
      //添加新监听，绑定物理返回按键事件
      plus.key.addEventListener("backbutton", onBack => {
        this.back();
      })
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
    width: 90%;
    position: fixed;
    bottom: 0.2rem;
    top: 0.7rem;
    .s-title {
      position: relative;
      right: 45%;
      margin-right: 0.2rem;
      margin-top: 0.1rem;
      height: 0.6rem;
      line-height: 0.6rem;
      button {
        padding: 0.1rem 0.2rem;
        border-radius: 3px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      }
    }
    .list {
      font-size: 0.23rem;
      ul {
        background: #fff;
        margin: 0.2rem;
        padding: 0.2rem;
        li {
          border-bottom: 1px solid #f0f0f0;
          margin: 0 0.2rem;
          line-height: 0.6rem;
          height: 0.6rem;
          img {
            width: 0.4rem;
            margin-right: 0.2rem;
          }
          label {
            width: 2rem;
            display: inline-block;
            font-size: 0.25rem;
            color: #4b4c4c;
          }
          span {
            //   width: 6rem;
            display: inline-block;
            vertical-align: top;
            word-wrap: break-word;
            font-size: 0.24rem;
            color: #9a9a9a;
            &.header {
              font-size: 0.26rem;
              color: #161616;
            }
            .astronautPer {
              display: inline;
            }
            .iconSize {
              float: right;
              font-size: 0.4rem;
              position: absolute;
              right: 0.3rem;
              color: #4c84ff;
            }
          }
        }
      }
    }
  }
</style>