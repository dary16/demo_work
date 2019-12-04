<template>
  <div class="xl-content">
    <div
      class="xl-item"
      v-for="(item, index) in infoList"
      :key="item.arrangeSubjectResultID"
    >
      <div
        class="left-icon"
        @click="showInfo(index)"
      >
        <img v-if="item.trainWay == '理论授课'" src="../../assets/lilun.png" />
        <img v-else src="../../assets/caozuo.png" />
      </div>
        <div
          class="center"
          @click="showInfo(index)"
        >
          <i v-show="tabIndex === 1 && unfinishedTime === 1 && unfinishedTimeIndex === index" class="header-icon iconfont iconjishi"></i>
          <i v-show="tabIndex === 2 && unfinishedTime === 2 && unfinishedTimeIndex === index" class="header-icon iconfont iconjishi"></i>
          <ul class="top">
            <li style="width:4rem;">{{ item.subjectUnitName }}</li>
            <li>{{ item.classDate }}</li>
            <li>{{ item.classSection }}</li>
            <li>{{ item.trainAreaName }}</li>
          </ul>
          <ul class="info">
            <li>教员：{{ item.chargeTeacherName }}</li>
            <li>课程单元：{{ item.subjectUnitName }}</li>
            <li>授课学时：{{ item.subjectUnitClassHour }}</li>
          </ul>
          <div class="clearfix"></div>
        </div>
        <div class="right-btn">
          <button
            class="normal-no-border fr fs-24"
            v-if="!item.trainOrNot"
            @click="doAction(index)"
          >
            <img class="flag" src="../../assets/xlss.png" />
          训练实施
        </button>
            <button
              class="normal-no-border fr"
              v-else
              v-show="!item.upload && item.trainOrNot"
              @click="doEdit(index)"
            >
              <img class="flag" src="../../assets/xlss.png" />
          训练修改
        </button>
        </div>
        <span
          class="watchIcon"
          @click="showInfo(index)"
        ><i class="el-icon-arrow-right"></i></span>
      </div>
    </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';
  export default {
    data() {
      //这里存放数据
      return {
        newData: []
      };
    },
    props: ['infoList','unfinishedTime','unfinishedTimeIndex'],
    //监听属性 类似于data概念
    computed: {
      ...mapState(['tabIndex']),
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      doAction(val) {
        this.$emit("doAction", val);
      },
      doEdit(val) {
        this.$emit("doEdit", val);
      },
      showInfo(val) {
        this.$emit("showInfo", val);
      },
      //数据类型转换
      changType() {
        //转换格式
        this.newData = JSON.parse(JSON.stringify(this.infoList));
        this.newData.forEach(item => {
          let arr = [];
          item.joinAstronautNames.forEach(item2 => {
            arr.push(item2.trainImplementAstronautName);
          });
          item.joinAstronautNames = arr.join('，');
        })
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      //授课对象数据类型进行转换
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    updated() {
      //   this.changType();
    }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
  @import "../../style/global.less";
  .xl-content {
    position: fixed;
    top: 1rem;
    bottom: 1rem;
    left: 1.2rem;
    right: 0;
    overflow-y: auto;
    .xl-item {
      padding: 0 0.5rem 0 0.5rem;
      background: #fff;
      margin: 0 0 2% 0;
      position: relative;
      clear: both;
      .left-icon {
        position: absolute;
        top: 50%;
        left: 0.5rem;
        transform: translateY(-50%);
        img {
          width: 0.6rem;
        }
      }
      .center {
        position: relative;
        margin: 0 0 0 0.8rem;
        padding: 0.2rem 0 0.2rem;
        border-bottom: 1px solid @c-border;
        .iconjishi {
          font-size: 0.4rem;
          color: #f00;
          position: absolute;
          top: 0.05rem;
          right: 0;
        }
        .top {
          li {
            float: left;
            font-size: 0.26rem;
            padding-right: 0.8rem;
            line-height: 0.52rem;
          }
        }
        .info {
          clear: both;
          li {
            float: left;
            font-size: 0.2rem;
            color: #9a9a9a;
            padding-right: 0.44rem;
            line-height: 0.44rem;
          }
        }
      }
      .right-btn {
        position: absolute;
        right: 2rem;
        top: 50%;
        transform: translateY(-50%);
        button {
          border: 1px solid @c-border;
          border-radius: 0.3rem;
          padding: 0 0.3rem;
          background-color: #f5f7fa;
          .flag {
            width: 0.2rem;
            height: 0.2rem;
          }
        }
      }
      .watchIcon {
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.3rem;
      }
    }
  }
</style>