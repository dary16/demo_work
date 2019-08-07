<template>
  <div class='info'>
    <ul>
      <li>
        <span class="title">科目单元名称：</span>
        <span class="text">{{infoList.subjectUnitName}}</span>
      </li>
      <li>
        <span class="title">课程单元学时：</span>
        <span class="text">{{infoList.subjectUnitClassHour}}</span>
      </li>
      <li>
        <span class="title">训练方式：</span>
        <span class="text">{{infoList.trainWay}}</span>
      </li>
      <li>
        <span class="title">分组方式：</span>
        <span class="text">{{infoList.groupWay}}</span>
      </li>
      <li>
        <span class="title">分组人数：</span>
        <span class="text">{{infoList.groupPersonNumber}}</span>
      </li>
      <li>
        <span class="title">着装要求：</span>
        <span class="text">{{infoList.dressCode}}</span>
      </li>
      <li>
        <span class="title">训练单元类型：</span>
        <span class="text">{{infoList.subjectUnitType}}</span>
      </li>
      <li>
        <span class="title">上课教员名称：</span>
        <span class="text">{{infoList.chargeTeacherName}}</span>
      </li>
      <li>
        <span class="title">参加航天员名称：</span>
        <span class="text">{{names}}</span>
      </li>
      <li>
        <span class="title">训练场地：</span>
        <span class="text">{{infoList.trainAreaName}}</span>
      </li>
      <li>
        <span class="title">训练器材：</span>
        <span class="text">{{infoList.trainMaterialName}}</span>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {
    data() {
      //这里存放数据
      return {
        names: ''
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
      let arr = [];
      this.infoList.joinAstronautNames.forEach(item => {
        arr.push(item.trainImplementAstronautName);
      });
      this.names = arr.toString();
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