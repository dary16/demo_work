<template>
  <div class="header">
    <h3>{{titleData}}</h3>
    <ul>
      <li>
        <span>{{realName}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import {
    getLoc
  } from '../../utils/common.js';
  export default {
    data() {
      //这里存放数据
      return {
        realName: '',//用户真实名称
        show: true
      };
    },
    props: ['titleData'],
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.realName = getLoc('userInfo').realName;
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang="less" scoped>
  @import "../../style/global.less";
  .header {
    text-align: center;
    position: relative;
    height: 0.7rem;
    line-height: 0.7rem;
    font-size: 0.28rem;
    border-bottom: 1px solid #e9ecf4;
    background: #fff;
    margin-left: 0.05rem;
    .el-icon-arrow-left {
      position: absolute;
      left: 0.3rem;
      top: 0.2rem;
    }
    h3 {
      font-size: 0.28rem;
      color: #17233b;
    }
    ul {
      position: absolute;
      right: 0.3rem;
      top: 0rem;
      li {
        float: left;
        width: 1.77rem;
        border-left: 1px solid @c-border;
        span {
          font-size: 0.18rem;
          font-weight: bold;
        }
        .message {
          width: 0.88rem;
          position: relative;
          img {
            width: 0.23rem;
          }
          i {
            position: absolute;
            top: -0.08rem;
            img {
              width: 0.09rem;
            }
          }
        }
        &:nth-of-type(2) {
          width: 2.5rem;
          span {
            font-size: 0.18rem;
            font-weight: bold;
          }
        }
        &:nth-of-type(3) {
          padding-left: 0.18rem;
          img {
            width: 0.24rem;
          }
        }
      }
    }
  }
</style>