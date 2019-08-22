<template>
  <div class="item-info">
    <div class="tags-wrap">
      <div class="arrived">{{title}}</div>
      <div class="tags">
        <el-tag
          :class="{'active':item.isSignIn}"
          class="peopleTag"
          size="mini"
          v-for="(item,index) in tags"
          :key="item.trainImplementAstronautID"
        >{{item.trainImplementAstronautName}}
          <span v-if="item.post !== ''">({{item.post}})</span>
        </el-tag>
      </div>
    </div>
    <div class="peoples">
      <div class="p-left">
        <h3>主教员</h3>
        <div class="select-wrap">
          <button class="btn-set-time">{{chargeTeacherName}}</button>
        </div>
      </div>
      <div class="p-right">
        <h3>辅助教员</h3>
        <div class="select-wrap">
          <button class="btn-set-time">{{auxiliaryLecturerName}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      //这里存放数据
      return {

      };
    },
    props: ['tags', 'title', 'chargeTeacherName', 'auxiliaryLecturerName'],
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
  @import "../../style/global.less";
  .item-info {
    //   padding: 0.05rem 0.35rem 0rem 0.35rem;
    border: 1px solid @c-border;
    display: flex;
    background: #fff;
    margin-bottom: 0.3rem;
    .tags-wrap {
      flex: 1;
      border-right: 1px solid @c-border;
      padding: 0.26rem 0 0.24rem 0.2rem;
      .arrived {
        font-size: 0.2rem;
        font-weight: bold;
        height: 0.4rem;
        line-height: 0.4rem;
        padding-left: 0.26rem;
      }
      .tag-btn {
        margin: 0.06rem 0.36rem 0.06rem 0;
      }
      .tags {
        height: 0.62rem;
        line-height: 0.62rem;
        padding-left: 0.2rem;
        float: left;
        span {
          display: inline-block;
          font-size: 0.25rem;
        }
        .nicon {
          margin-top: 0.03rem;
        }
        .peopleTag {
          margin-right: 0.1rem;
          background: none;
          border: 1px solid #eaedf4;
          color: #4c4f56;
          height: 0.36rem;
          line-height: 0.36rem;
        }
        .peopleTag.active {
          border-color: #b6eddc;
          background: #eefbf7;
        }
      }
    }
    .peoples {
      width: 4.9rem;
      display: flex;
      padding: 0.26rem 0 0.24rem 0;
      .select-wrap {
        margin: 0.1rem 0.2rem 0 0.2rem;
        text-align: center;
      }
      .p-left {
        flex: 1;
        h3 {
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.2rem;
          text-align: center;
        }
      }
      .p-right {
        flex: 1;
        h3 {
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.2rem;
          text-align: center;
        }
      }
    }
  }
</style>