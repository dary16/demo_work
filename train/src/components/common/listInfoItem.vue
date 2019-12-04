<template>
  <div class="xl-content">
    <div class="xl-item">
      <div class="content-info">
        <ul class="info-list">
          <li>
            <span class="name">授课时间：</span>
            <span class="value">{{infoList.classDate}}</span>
          </li>
          <li>
            <span class="name">训练地点：</span>
            <span class="value">{{infoList.trainAreaName}}</span>
          </li>
          <li>
            <span class="name">授课人员：</span>
            <span class="value">{{infoList.chargeTeacherName}}</span>
          </li>
          <li>
            <span class="name">训练单元：</span>
            <span class="value">{{infoList.subjectUnitName}}</span>
          </li>
          <li>
            <span class="name">节次：</span>
            <span class="value">{{infoList.classSection}}</span>
          </li>
          <li>
            <span class="name">分组人数：</span>
            <span class="value">{{infoList.groupPersonNumber}}</span>
          </li>
          <li>
            <span class="name">着装要求：</span>
            <span class="value">{{infoList.dressCode}}</span>
          </li>
          <li>
            <span class="name">授课学时：</span>
            <span class="value">{{infoList.subjectUnitClassHour}}</span>
          </li>
          <li>
            <span class="name">训练器材名称：</span>
            <span class="value">{{infoList.trainMaterialName}}</span>
          </li>
          <li class="w66">
            <span class="name">授课对象：</span>
            <span class="value">{{names}}</span>
          </li>
          <li>
            <span class="name">训练方式：</span>
            <span class="value">{{infoList.trainWay}}</span>
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
        names: ''
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
      if(this.infoList) {
        let arr = [];
        this.infoList.joinAstronautNames.forEach(item2 => {
          arr.push(item2.trainImplementAstronautName);
        });
        this.names = arr.join('，');
      }
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
    .xl-item {
      .content-header {
        width: 99.5%;
        padding: 0.05rem 0.1rem;
        background: #f2f2f2;
        border-bottom: 1px solid #949494;
        display: flex;
        .header-wrap {
          height: 0.5rem;
          line-height: 0.5rem;
          font-size: 0.25rem;
          margin-left: 0.2rem;
          width: 81.5%;
          display: flex;
          li {
            float: left;
            margin-right: 0.3rem;
            .name {
              width: 1.7rem;
              display: inline-block;
            }
          }
          &.other {
            flex: 1;
          }
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
          margin-right: 0.2rem;
        }
      }
      .content-info {
        padding: 0.1rem;
        display: flex;
        border-bottom: 1px solid #949494;
        .info-list {
          margin-left: 0.2rem;
          width: 100%;
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