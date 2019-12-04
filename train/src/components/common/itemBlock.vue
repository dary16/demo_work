<template>
  <div>
    <div
      class="item-info"
      v-for="item in trainList"
    >
      <div class="i-title">
        <i class="header-icon iconfont iconuntitled3"></i>
        <span>{{ item.trainContentName }}({{ item.trainClassHour }})</span>
        <div
          v-if="trainWay == '理论授课'"
          class="status"
        >状态：<span v-if="item.trainContentEndDate === ''">未完成</span><span v-else>已完成</span></div>
        <div
          v-if="trainWay == '操作训练'"
          class="status"
        ><span v-if="item.trainContentStartDate !== ''">{{item.trainContentStartDate}}-{{item.trainContentEndDate}} {{item.trainContentTiming}}</span><span v-else-if="item.trainContentEndDate !== ''">{{item.trainContentEndDate}}</span></div>
      </div>
      <div class="i-content">{{ item.trainContentDesc }}</div>
      <div
        class="errorInfo"
        v-for="item2 in item.faultInfo"
      >
        <span class="fault-title">
          <img src="../../assets/warn.png" class="error-icon" />
            {{ item2.abnormalObject }}在{{ item2.abnormalDate }}发生了异常</span>
          <div class="fault-info">说明：{{ item2.abnormalExplain }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      //这里存放数据
      return {};
    },
    props: ['trainList', 'trainWay'],
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      // console.log(this.trainList);
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    //方法集合
    methods: {},
    updated() { }, //生命周期 - 更新之后
    activated() { } //如果页面有keep-alive缓存功能，这个函数会触发
  };
</script>
<style lang="less" scoped>
  @import "../../style/global.less";
  .item-info {
    border: 1px solid @c-border;
    background: #fff;
    margin-bottom: 0.3rem;

    .i-title {
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.24rem;
      color: #2b2d2d;
      border-bottom: 1px solid @c-border;
      padding-left: 0.27rem;
      padding-right: 0.27rem;
      .status {
        width: 3rem;
        float: right;
      }
    }
    .i-content {
      line-height: 0.5rem;
      font-size: 0.22rem;
      color: #808383;
      padding-bottom: 0.1rem;
      padding-left: 0.27rem;
      padding-right: 0.27rem;
      border: 1px solid #e9ecf4;
    }
    .errorInfo {
      padding: 0.1rem 0.27rem;
      border-bottom: 1px solid #e9ecf4;
      .fault-title {
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.23rem;
        img {
          vertical-align: baseline;
          width: 0.2rem;
        }
      }
      .fault-info {
        // height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.22rem;
      }
    }
  }
</style>
