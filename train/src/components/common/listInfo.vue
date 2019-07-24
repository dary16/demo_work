<template>
  <div class='info'>
    <ul>
      <li>
        <span class="title">科目名称：</span>
        <span class="text">{{infoList.studyName}}</span>
      </li>
      <li>
        <span class="title">课程单元：</span>
        <span class="text">{{infoList.studyName}}</span>
      </li>
      <li>
        <span class="title">授课学时：</span>
        <span class="text">{{infoList.studyTime}}</span>
      </li>
      <li>
        <span class="title">组训学时：</span>
        <span class="text">{{infoList.zxTime}}</span>
      </li>
      <li>
        <span class="title">授课人员：</span>
        <span class="text">{{infoList.teachName}}</span>
      </li>
      <li>
        <span class="title">授课时间：</span>
        <span class="text">{{infoList.teachTime}}</span>
      </li>
      <li>
        <span class="title">授课对象：</span>
        <span class="text">{{infoList.learnPeoples}}</span>
      </li>
      <li>
        <span class="title">训练方式：</span>
        <span class="text">{{infoList.teachStyle}}</span>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {
    data() {
      //这里存放数据
      return {

      };
    },
    props: ['infoList'],
    //监听属性 类似于data概念
    computed: {},
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
  .info {
    padding: 0.2rem 0.3rem;
    ul {
      padding: 0.1rem 0.2rem;
      li {
        font-size: 0.24rem;
        display: flex;
        height: 0.5rem;
        line-height: 0.5rem;
        .title {
          width: 4rem;
          text-align: center;
        }
        .text {
          flex: 1;
        }
      }
    }
  }
</style>