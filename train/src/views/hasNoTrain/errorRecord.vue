<template>
  <div class='errorRecord'>
    <v-info-header
      v-on:backFn="back"
      :titleData="title"
    ></v-info-header>
    <div class="content">
      <div class="errorList">
        <div class="errorItem">
          <v-list-title :listTilte="listTitle1"></v-list-title>
          <label>时间：</label>
          <input
            type="text"
            v-model="errorData.time"
          >
          <!-- <el-date-picker
            v-model="errorData.time"
            size="mini"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker> -->
        </div>
        <div class="errorItem">
          <v-list-title :listTilte="listTitle2"></v-list-title>
          <label>异常说明：</label>
          <input
            type="text"
            v-model="errorData.info"
          >
        </div>
        <div class="errorItem">
          <v-list-title :listTilte="listTitle3"></v-list-title>
          <label>异常产生对象：</label>
          <input
            type="text"
            v-model="errorData.object"
          >
        </div>
        <div class="errorItem bb">
          <v-list-title :listTilte="listTitle4"></v-list-title>
          <label>关键字：</label>
          <input
            type="text"
            v-model="errorData.key"
          >
        </div>
      </div>
      <div class="bottom">
        <button
          class="normal-btn-lg"
          @click="saveFn"
        >保存</button>
      </div>
    </div>
  </div>

</template>

<script>

  export default {
    data() {
      //这里存放数据
      return {
        title: "训练异常点记录",
        listTitle1: "异常产生时间",
        listTitle2: "异常说明",
        listTitle3: "异常产生对象",
        listTitle4: "关键字",
        errorData: {
          time: '',
          info: '',
          object: '',
          key: ''
        }
      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      //返回
      back() {
        window.history.back();
      },
      saveFn() {
        // console.log(this.errorData);
        this.$router.push('/info');
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
<style lang='less' scoped>
  .errorRecord {
    .content {
      margin: 0.1rem 0.2rem;
      .errorList {
        margin-bottom: 0.5rem;
        .errorItem {
          border-left: 1px solid #006699;
          border-right: 1px solid #006699;
          label {
            display: inline-block;
            width: 3rem;
            font-size: 0.24rem;
            padding-left: 0.5rem;
          }
          input {
            font-size: 0.24rem;
            height: 0.5rem;
            line-height: 0.5rem;
            width: 12rem;
            border: 1px solid #a09d9d;
            margin: 0.1rem auto;
          }
        }
      }
      .bottom {
        text-align: center;
      }
    }
  }
</style>