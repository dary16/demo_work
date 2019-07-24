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
            :key="item.id"
          >
            <p>{{item.content}}</p>
            <span class="name">{{item.name}}</span>
            <span class="time">{{item.time}}</span>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      //这里存放数据
      return {
        title: "意见建议",
        listData: [
          {
            content: "不忘初心、牢记使命”主题教育启动一个多月后，习近平总书记前往内蒙古自治区考察并指导开展主题教育",
            name: "张三",
            time: "2018-06-21 12:22",
            id: "001"
          },
          {
            content: "就在主题教育启动前的5月20日，总书记前往江西于都重温初心，就开展好主题教育提出要求。",
            name: "李四",
            time: "2019-06-21 12:22",
            id: "002"
          },
          {
            content: "接连两次地方考察，都强调这一主题，可见主题教育在总书记心目中的分量有多重。",
            name: "李五",
            time: "2019-06-21 12:22",
            id: "003"
          }
        ]
      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      back() {
        this.$router.push('/info');
      },
      addSuggestion() {
        this.$router.push('/addSuggestion');
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      if(this.$route.params.addData) {
        this.listData.push(this.$route.params.addData);
      }
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
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