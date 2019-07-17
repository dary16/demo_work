<template>
  <div class='layout'>
    <div class="main">
      <div v-show="tabIndex==0 && showLayout">
        <v-search-header></v-search-header>
        <div class="xl-list clearfix">
          <div class="xl-header">
            <h2>未实施训练</h2>
            <div class="xl-right">
              <span>2019.07.17 11:01</span>
              <button class="normal-btn">数据下载</button>
            </div>
          </div>
          <div class="xl-content">
            <div
              class="xl-item"
              v-for="item in infoList"
              :key="item.id"
            >
              <div class="content-header clearfix">
                <span class="time">{{item.time}}</span>
                <button
                  class="normal-btn fr"
                  @click="doAction"
                >训练实施</button>
              </div>
              <div class="content-info">
                <ul class="info-list">
                  <li>
                    <span class="name">科目名称：</span>
                    <span class="value">{{item.studyName}}</span>
                  </li>
                  <li>
                    <span class="name">课程单元：</span>
                    <span class="value">{{item.studyUnity}}</span>
                  </li>
                  <li>
                    <span class="name">授课学时：</span>
                    <span class="value">{{item.studyTime}}</span>
                  </li>
                  <li>
                    <span class="name">组训学时：</span>
                    <span class="value">{{item.zxTime}}</span>
                  </li>
                  <li>
                    <span class="name">授课人员：</span>
                    <span class="value">{{item.teachName}}</span>
                  </li>
                  <li>
                    <span class="name">授课时间：</span>
                    <span class="value">{{item.teachTime}}</span>
                  </li>
                  <li class="w66">
                    <span class="name">授课对象：</span>
                    <span class="value">{{item.learnPeoples}}</span>
                  </li>
                  <li>
                    <span class="name">训练方式：</span>
                    <span class="value">{{item.teachStyle}}</span>
                  </li>
                </ul>
                <div class="more"><img src="../assets/logo.png" alt=""></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="tabIndex == 1">
        <h2>已实施</h2>
      </div>
      <div v-show="tabIndex == 2">
        <h2>周计划</h2>
      </div>
      <div v-show="tabIndex == 3">
        <h2>退出</h2>
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
      },
      doAction() {
        console.log(this.$router);
        // this.showLayout = false;
        this.$router.push('/action');
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
    .main {
      .xl-list {
        .xl-header {
          width: 100%;
          padding: 0.05rem 0.1rem;
          border-top: 1px solid #949494;
          border-bottom: 1px solid #949494;
          display: flex;
          background: #f2f2f2;
          h2 {
            font-size: 0.3rem;
            color: #006699;
            width: 3rem;
            height: 0.5rem;
            line-height: 0.5rem;
            margin-left: 0.2rem;
          }
          .xl-right {
            flex: 1;
            .normal-btn,
            span {
              float: right;
            }

            span {
              height: 0.5rem;
              line-height: 0.5rem;
              font-size: 0.25rem;
              margin-left: 0.2rem;
              margin-right: 0.3rem;
              display: inline-block;
            }
          }
        }
        .xl-content {
          width: 98%;
          position: absolute;
          top: 2.1rem;
          bottom: 1rem;
          overflow-y: auto;
          .xl-item {
            .content-header {
              width: 99.9%;
              padding: 0.05rem 0.1rem;
              background: #f2f2f2;
              border-bottom: 1px solid #949494;
              .time {
                height: 0.5rem;
                line-height: 0.5rem;
                font-size: 0.25rem;
                float: left;
                margin-left: 0.2rem;
              }
              button {
                margin-right: 0.3rem;
              }
            }
            .content-info {
              padding: 0.2rem;
              display: flex;
              border-bottom: 1px solid #949494;
              .info-list {
                margin-left: 0.1rem;
                flex: 1;
                li {
                  width: 33%;
                  text-align: left;
                  float: left;
                  height: 0.5rem;
                  line-height: 0.5rem;
                  font-size: 0.25rem;
                  .name {
                    width: 1.6rem;
                    display: inline-block;
                  }
                  .value {
                    display: inline-block;
                    // width: 100%;
                    // overflow: hidden;
                    // text-emphasis: none;
                    // white-space: nowrap;
                  }
                }
              }
              .more {
                width: 3rem;
                img {
                  width: 1rem;
                }
              }
            }
          }
        }
      }
    }
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
  .w66 {
    width: 66% !important;
  }
  .fr {
    float: right;
  }
</style>