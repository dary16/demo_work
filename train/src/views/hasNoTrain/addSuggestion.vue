<template>
  <transition name="pop">
    <div class='addSuggestion'>
      <v-info-header
        v-on:backFn="back"
        :titleData="title"
      ></v-info-header>
      <div class="content">
        <div class="errorList">
          <div class="errorItem">
            <v-list-title>标题</v-list-title>
            <label>标题：</label>
            <input
              type="text"
              v-model="errorData.commentTitle"
            >
          </div>
          <div class="errorItem">
            <v-list-title>时间</v-list-title>
            <label>时间：</label>
            <input
              type="text"
              v-model="errorData.commentDate"
            >
          </div>
          <div class="errorItem">
            <v-list-title>说明</v-list-title>
            <label>说明：</label>
            <input
              type="text"
              v-model="errorData.commentExplain"
            >
          </div>
          <div class="errorItem">
            <v-list-title>建议人</v-list-title>
            <label>建议人：</label>
            <input
              type="text"
              v-model="errorData.commentPersonName"
            >
          </div>
          <div class="errorItem">
            <v-list-title>关键字</v-list-title>
            <label>关键字：</label>
            <input
              type="text"
              v-model="errorData.keyword"
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
  </transition>
</template>

<script>

  export default {
    data() {
      //这里存放数据
      return {
        title: "添加意见建议",
        errorData: {
          commentExplain: '',
          commentTitle: '',
          commentDate: '',
          keyword: '',
          commentPersonName: ''
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
        // this.$router.push('/suggestion');
        this.$router.go(-1);
      },
      saveFn() {
        this.$router.push({ name: 'suggestion', params: { addData: this.errorData } });
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
  .addSuggestion {
    .content {
      margin: 0.1rem 0.2rem;
      .errorList {
        margin-bottom: 0.5rem;
        .errorItem {
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
            padding-left: 0.2rem;
          }
        }
      }
      .bottom {
        text-align: center;
      }
    }
  }
</style>