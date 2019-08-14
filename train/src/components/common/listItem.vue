<template>
  <div class="xl-content">
    <div
      class="xl-item"
      v-for="(item,index) in newData"
      :key="item.subjectID"
    >
      <div class="content-header clearfix">
        <ul class="header-wrap">
          <li class="time">
            <span class="value">{{item.classDate}}</span>
          </li>
          <li class="other">
            <span class="value">{{item.classSection}}</span>
          </li>
          <li class="other">
            <span class="value">{{item.chargeTeacherName}}</span>
          </li>
          <li>
            <span class="value">{{item.trainAreaName}}</span>
          </li>
        </ul>
        <button
          class="normal-no-border fr"
          @click="doAction(index)"
          v-if="!item.trainOrNot"
        >
          <i class="el-icon-s-flag"></i>
          训练实施</button>
        <div
          class="more"
          @click="showInfo(index)"
        >
          <i class="el-icon-arrow-right"></i>
        </div>
        <span class="fr">
          <span v-if="item.upload && item.trainOrNot">已上传</span>
          <span v-if="chooseLoad">
            <!-- <el-checkbox :label="item.chargeTeacherID"></el-checkbox> -->
            <input
              type="checkbox"
              name="checkBoxs"
              v-model="item.isChecked"
              @change="changeFn(item,index)"
            >
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
            <span class="name">着装要求：</span>
            <span class="value">{{item.dressCode}}</span>
          </li>
          <li>
            <span class="name">授课学时：</span>
            <span class="value">{{item.subjectUnitClassHour}}</span>
          </li>
          <li>
            <span class="name">教学目标：</span>
            <div class="more-content">{{item.teachObjective}}
            </div>
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
        newData: []
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
      },
      changeFn(v, i) {
        //改变选中状态
        let changeV = JSON.parse(JSON.stringify(v));
        changeV.isChecked = v.isChecked;
        //根据选中状态改变数据
        for(let i = 0; i < this.infoList.length; i++) {
          if(this.infoList[i].chargeTeacherID === changeV.chargeTeacherID) {
            this.infoList[i] = changeV;
          }
          this.$emit('changeFn', this.infoList);
        }
      },
      //数据类型转换
      changType() {
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
      this.changType();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    updated() {
      this.changType();
    }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
  .xl-content {
    position: fixed;
    top: 1.7rem;
    bottom: 0rem;
    left: 1.2rem;
    right: 0;
    overflow-y: auto;
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
        .more {
          width: 1rem;
          font-size: 0.3rem;
          padding: 0 0.4rem;
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
            &:last-child {
              width: 100%;
              .name {
                float: left;
              }
            }
          }
          .more-content {
            width: 85%;
            display: inline-block;
            white-space: normal;
          }
        }
      }
    }
  }
</style>