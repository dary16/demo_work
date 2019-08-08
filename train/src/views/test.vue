<template>
  <div class='test'>
    <ol>
      <li>
        <span><input
            type="checkbox"
            v-model="selectAll"
          ></th></span>
        <span align="left">全选</span>
      </li>
      <li v-for="answer in answers">
        <span>
          <input
            type="checkbox"
            v-model="selected"
            :value="answer.id"
          >
        </span>
        <span>{{ answer.name }}</span>
      </li>
    </ol>
  </div>
</template>

<script>

  export default {
    data() {
      //这里存放数据
      return {
        answers: [
          { "id": 1, "name": "A" },
          { "id": 2, "name": "B" },
          { "id": 3, "name": "C" },
          { "id": 4, "name": "D" }
        ],
        selected: []
      };
    },
    //监听属性 类似于data概念
    computed: {
      selectAll: {
        get: function() {
          return this.answers ? this.selected.length == this.answers.length : false;
        },
        set: function(value) {
          var selected = [];

          if(value) {
            this.answers.forEach(function(user) {
              selected.push(user.id);
            });
          }

          this.selected = selected;
        }
      }
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {

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
  .test {
    margin: 1rem auto;
    font-size: 0.5rem;
  }
</style>