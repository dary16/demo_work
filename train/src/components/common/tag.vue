<template>
  <div class="tags">
    <div class="arrived">实到人员：</div>
    <div class="tag-wrap">
      <el-tag
        class="peopleTag active"
        size="mini"
        v-for="(item,index) in tags"
        :key="item.trainImplementAstronautID"
      >{{item.trainImplementAstronautName}}
        <span v-if="item.post !== ''">({{item.post}})</span>
      </el-tag>
    </div>
    <span>签到时间：{{signTime}}</span>
  </div>
</template>

<script>
  export default {
    data() {
      //这里存放数据
      return {
        signTime: "2019-08-12 08:00"
      };
    },
    props: ['tags'],
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
  .tags {
    height: 0.46rem;
    line-height: 0.46rem;
    margin: 0.2rem;
    display: flex;
    span {
      font-size: 0.25rem;
    }
    .arrived {
      font-size: 0.25rem;
      font-weight: bold;
      margin-right: 0.1rem;
    }
    .tag-wrap {
      width: 10rem;
      span {
        display: inline-block;
        font-size: 0.25rem;
      }
      .nicon {
        margin-top: 0.03rem;
      }
      .peopleTag {
        margin-right: 0.05rem;
        background: none;
        border: 1px solid #eaedf4;
        color: #4c4f56;
      }
      .peopleTag.active {
        border-color: #b6eddc;
        background: #eefbf7;
      }
    }
  }
</style>