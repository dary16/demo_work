<template>
  <div class="header">
    <i
      class="el-icon-arrow-left"
      @click="back"
    ></i>
    <h3>{{titleData}}</h3>
    <ul>
      <li>
        <div class="message">
          <img src="../../assets/header/message.png"/>
          <i>
            <img src="../../assets/header/dot.png"/>
          </i>
        </div>
      </li>
      <li>
        <span>{{realName}}</span>
      </li>
      <li @click="logout">
        <img src="../../assets/header/exit.png" alt="退出">
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
    props: ['titleData'],
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
      //这里存放数据
      return {
        realName: ''//用户真实名称
      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      back() {
        this.$emit("backFn");
      },
      logout() {
        this.oMsgBox('是否确认退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('./login');
        }).catch(() => {
          return false;
        });
      }
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