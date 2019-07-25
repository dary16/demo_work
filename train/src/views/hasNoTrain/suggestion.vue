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

  </div>
</template>

<script>
  import {
    getLoc
  } from '../../utils/common.js';
  import { mapState } from 'vuex';
  export default {
    data() {
      //这里存放数据
      return {
        title: "意见建议",
        listData: []
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['nowIndex'])
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      back() {
        this.$router.go(-1);
      },
      addSuggestion() {
        this.$router.push('/addSuggestion');
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      if(this.$route.params.addData) {
        this.listData = getLoc('notActionListData')[this.nowIndex].commentData;
        this.listData.push(this.$route.params.addData);
      } else {
        this.listData = getLoc('notActionListData')[this.nowIndex].commentData;
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