<template>
  <div class='layout'>
    <div class="main">
      <div v-show="tabIndex==0">
        <v-search-header></v-search-header>
        <v-not-action v-bind:infoList="infoList"></v-not-action>
      </div>
    </div>
    <div v-show="tabIndex == 1">
      <v-search-header></v-search-header>
      <v-action :infoList="infoList2"></v-action>
    </div>
    <div v-show="tabIndex == 2">
      <h2>周计划</h2>
    </div>
    <div v-show="tabIndex == 3">
      <v-exit></v-exit>
    </div>
    <v-tab
      :list="tabList"
      @tabIndex="getTabIndex"
    ></v-tab>
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
        showLayout: true,
        tabIndex: 0,
        tabList: [
          {
            name: "未实施",
            id: '001',
            src: "../assets/logo.png"
          },
          {
            name: "已实施",
            id: '002',
            src: "../assets/logo.png"
          }, {
            name: "周计划",
            id: '003',
            src: "../assets/logo.png"
          }, {
            name: "退出",
            id: '004',
            src: "../assets/logo.png"
          }
        ],
        infoList: [
          {
            time: "1995.06.30 12:00",
            studyName: "基础知识训练",
            studyUnity: "航天基础知识",
            studyTime: "1小时",
            zxTime: "40分钟",
            teachName: "李伟",
            teachTime: "节次1",
            learnPeoples: "张三，李四，王五，赵柳，李杰，赵松俭",
            teachStyle: "理论授课",
            id: '001'
          },
          {
            time: "1998.04.30 14:00",
            studyName: "基础知识训练",
            studyUnity: "航天基础知识",
            studyTime: "2小时",
            zxTime: "65分钟",
            teachName: "李伟",
            teachTime: "节次2",
            learnPeoples: "刘亦菲，张三，李四，王五，赵柳，李杰，赵松俭",
            teachStyle: "理论授课",
            id: '002'
          },
          {
            time: "1995.06.30 12:00",
            studyName: "基础知识训练",
            studyUnity: "航天基础知识",
            studyTime: "2小时",
            zxTime: "30分钟",
            teachName: "李伟",
            teachTime: "节次3",
            learnPeoples: "王宝强，张三，李四，王五，赵柳，李杰，赵松俭",
            teachStyle: "理论授课",
            id: '003'
          },
          {
            time: "2005.06.30 12:00",
            studyName: "基础知识训练",
            studyUnity: "航天基础知识",
            studyTime: "1.5小时",
            zxTime: "50分钟",
            teachName: "李嘉伟",
            teachTime: "节次5",
            learnPeoples: "丽丽，张三，李四，王五，赵柳，李杰，赵松俭",
            teachStyle: "理论授课",
            id: '004'
          },
        ],
        infoList2: [
          {
            time: "1995.06.30 12:00",
            studyName: "基础知识训练",
            studyUnity: "航天基础知识",
            studyTime: "1小时",
            zxTime: "40分钟",
            teachName: "李伟",
            teachTime: "节次1",
            learnPeoples: "张三，李四，王五，赵柳，李杰，赵松俭",
            teachStyle: "理论授课",
            id: '001',
            upload: false
          },
          {
            time: "1998.04.30 14:00",
            studyName: "基础知识训练",
            studyUnity: "航天基础知识",
            studyTime: "2小时",
            zxTime: "65分钟",
            teachName: "李伟",
            teachTime: "节次2",
            learnPeoples: "刘亦菲，张三，李四，王五，赵柳，李杰，赵松俭",
            teachStyle: "理论授课",
            id: '002',
            upload: false
          },
          {
            time: "1995.06.30 12:00",
            studyName: "基础知识训练",
            studyUnity: "航天基础知识",
            studyTime: "2小时",
            zxTime: "30分钟",
            teachName: "李伟",
            teachTime: "节次3",
            learnPeoples: "王宝强，张三，李四，王五，赵柳，李杰，赵松俭",
            teachStyle: "理论授课",
            id: '003',
            upload: false
          },
          {
            time: "2005.06.30 12:00",
            studyName: "基础知识训练",
            studyUnity: "航天基础知识",
            studyTime: "1.5小时",
            zxTime: "50分钟",
            teachName: "李嘉伟",
            teachTime: "节次5",
            learnPeoples: "丽丽，张三，李四，王五，赵柳，李杰，赵松俭",
            teachStyle: "理论授课",
            id: '004',
            upload: true
          },
        ]
      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      getTabIndex(value) {
        this.tabIndex = value;
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
  .layout {
    margin: 0.2rem;
    width: 98%;
    height: 100%;
    border: 1px solid #949494;
  }
  .clearfix:after {
    content: "";
    display: block;
    clear: both;
  }
  .normal-btn {
    height: 0.4rem;
    padding: 0.05rem 0.2rem;
    background: #006699;
    color: #fff;
    font-size: 0.2rem;
    border-radius: 0.08rem;
    margin-top: 0.05rem;
  }
</style>