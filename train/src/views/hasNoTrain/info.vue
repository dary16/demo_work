<template>
  <div class='info'>
    <div class="header">
      <i class="el-icon-arrow-left"></i>
      <h3>训练实施信息</h3>
    </div>
    <div class="content">
      <div class="item">
        <i class="el-icon-s-flag"></i>
        <span>人员签到</span>
      </div>
      <div class="item-info">
        <span class="arrived">实到人员</span>
        <div class="tags">
          <el-tag
            :class="{'active':item.showTag}"
            class="peopleTag"
            size="mini"
            v-for="(item,index) in tags"
            :key="item.id"
            @click="tagFn(index)"
          >{{item.name}}</el-tag>
        </div>
        <button class="normal-btn fr">设置岗位</button>
      </div>
      <div class="item">
        <i class="el-icon-s-flag"></i>
        <span>训练详细内容</span>
      </div>
      <div class="item-info">
        <span class="text">详细内容详细内容啦啦啦啦</span>
        <button class="normal-btn">完成时间</button>
        <div class="fr nicon">
          <i class="el-icon-menu"></i>
        </div>
      </div>
      <div class="item">
        <i class="el-icon-s-flag"></i>
        <span>异常说明</span>
      </div>
      <div class="item-info">
        <span class="text">操作方式错误，操作方式错误，操作方式错误，操作方式错误，操作方式错误，关键字11212啦啦啦啦</span>
        <span class="time">2019-04-28 08:52</span>
        <div class="fr">
          <span>张淼</span>
        </div>
      </div>
      <div class="item">
        <i class="el-icon-s-flag"></i>
        <span>训练实施</span>
      </div>
    </div>
    <div class="buttons">
      <button class="normal-btn-lg mr">意见建议</button>
      <button class="normal-btn-lg mr">数据项记录</button>
    </div>
  </div>
</template>

<script>
  //例如：import 《组件名称》 from '《组件路径》';

  export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
      //这里存放数据
      return {
        showTag: false,
        tags: [{ name: "张三", id: "001", showTag: false }, { name: "李四", id: "002", showTag: false }, { name: "王五", id: "003", showTag: false }, { name: "张三", id: "004", showTag: false }, { name: "李四", id: "005", showTag: false }, { name: "王五", id: "006", showTag: false }]
      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      tagFn(i) {
        this.tags[i].showTag = !this.tags[i].showTag;
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang="less" scoped>
  .info {
    .header {
      text-align: center;
      position: relative;
      height: 2rem;
      line-height: 2rem;
      font-size: 1rem;
      .el-icon-arrow-left {
        position: absolute;
        left: 0.3rem;
        top: 0.6rem;
      }
      h3 {
        font-size: 0.5rem;
        color: #006699;
      }
    }
    .content {
      padding: 0.1rem 0.2rem;
      .item {
        font-size: 0.4rem;
        background: #006699;
        color: #fff;
        padding: 0.2rem 0.6rem;
        span {
          font-size: 0.35rem;
          margin-left: 0.1rem;
        }
      }
      .item-info {
        padding: 0.2rem 0.3rem;
        border: 1px solid #006699;
        min-height: 1rem;
        span {
          display: inline-block;
          font-size: 0.25rem;
        }
        span.text {
          height: 0.5rem;
          line-height: 0.5rem;
          width: 12rem;
        }
        .arrived {
          font-size: 0.3rem;
          font-weight: bold;
          margin-right: 0.1rem;
        }
        .nicon {
          font-size: 0.5rem;
        }
        .tags {
          display: inline-block;
          .peopleTag {
            margin-right: 0.05rem;
          }
          .peopleTag.active {
            background: #006699;
          }
        }
      }
    }
    .buttons {
      text-align: center;
    }
  }
</style>