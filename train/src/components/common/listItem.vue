<template>
  <div class="xl-content">
    <div
      class="xl-item"
      v-for="(item,index) in infoList"
      :key="item.subjectID"
    >
      <div class="content-header clearfix">
        <span class="time">{{item.classDate}}</span>
        <button
          class="normal-btn fr"
          @click="doAction(index)"
          v-if="!item.trainOrNot"
        >训练实施</button>
        <span class="fr">
          <span v-if="item.upload && item.trainOrNot">已上传</span>
          <span v-if="chooseLoad">
            <el-checkbox></el-checkbox>
          </span>
        </span>
      </div>
      <div class="content-info">
        <ul class="info-list">
          <li>
            <span class="name">科目名称：</span>
            <span class="value">{{item.subjectUnitName}}</span>
          </li>
          <li>
            <span class="name">授课时间：</span>
            <span class="value">{{item.classDate}}</span>
          </li>
          <li>
            <span class="name">授课学时：</span>
            <span class="value">{{item.classSection}}</span>
          </li>
          <li>
            <span class="name">着装要求：</span>
            <span class="value">{{item.dressCode}}</span>
          </li>
          <li>
            <span class="name">授课人员：</span>
            <span class="value">{{item.chargeTeacherName}}</span>
          </li>
          <li>
            <span class="name">训练器材名称：</span>
            <span class="value">{{item.trainMaterialName}}</span>
          </li>
          <li class="w66">
            <span class="name">授课对象：</span>
            <span class="value">{{item.joinAstronautNames}}</span>
          </li>
          <li>
            <span class="name">训练方式：</span>
            <span class="value">{{item.trainWay}}</span>
          </li>
        </ul>
        <div
          class="more"
          @click="showInfo(index)"
        >
          <i class="el-icon-d-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      //这里存放数据
      return {

      };
    },
    props: ['infoList', 'chooseLoad'],
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      doAction(val) {
        this.$emit("doAction", val);
      },
      showInfo(val) {
        this.$emit("showInfo", val);
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
  .xl-content {
    position: absolute;
    top: 1.4rem;
    bottom: 0rem;
    overflow-y: auto;
    .xl-item {
      .content-header {
        width: 99.5%;
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
        .fr {
          span {
            height: 0.5rem;
            line-height: 0.5rem;
            font-size: 0.24rem;
            padding-right: 0.2rem;
          }
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
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            .name {
              width: 1.7rem;
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
          font-size: 1rem;
          img {
            width: 1rem;
          }
        }
      }
    }
  }
</style>