<template>
  <div class="week-plan">
    <v-header :titleData="title"></v-header>
    <div class="content">
      <header>
        <v-filter-week-plan
          v-show="isFilter"
          :currentRow="currentRow"
          v-on:saveFilter="saveFilter"
          v-on:onCancleFilter="onCancleFilter"
        >
        </v-filter-week-plan>
        <el-button size="mini" type="primary" v-on:click="openFilter"
          >筛 选<i class="el-icon-search el-icon--right"></i
        ></el-button>
        <el-radio-group size="mini" v-model="whichWeek" @change="switchWeek">
          <el-radio-button label="curWeek">本周</el-radio-button>
          <el-radio-button label="nextWeek">下周</el-radio-button>
        </el-radio-group>
      </header>
      <div class="contentList">
        <el-table
          :data="weekPlan.curWeekPlanList"
          height="480"
          border
          header-row-class-name="head"
          v-if="currentRow"
        >
          <el-table-column prop="classDate" label="日期" width="100">
          </el-table-column>
          <el-table-column prop="week" label="星期" width="100">
          </el-table-column>
          <el-table-column label="详情">
            <ul slot-scope="scope" class="sublist">
              <li
                v-for="(item, index) in scope.row.arrangeSubjectResult"
                :key="index"
              >
                <span class="span-tim"
                  >时间：{{ item.classSectionStartDate }}-{{
                    item.classSectionEndDate
                  }}</span
                >
                <span class="span-sub"
                  >训练单元：{{ item.subjectUnitName }}</span
                >
                <span class="span-tea"
                  >主教员：{{ item.chargeTeacherName }}</span
                >
                <span class="span-sec">节次：{{ item.classSection }}</span>
                <span class="span-are">训练场地：{{ item.trainAreaName }}</span
                ><br />
                <span class="span-ast"
                  >参训航天员：{{ item.joinAstronautNames }}</span
                >
              </li>
            </ul>
          </el-table-column>
          <!-- <el-table-column label="下午(14:00-17:50)">
            <ul slot-scope="scope" class="sublist">
              <li
                v-for="(item,index) in scope.row.arrangeSubjectResult"
                :key="index"
                v-show="
                  new Date(item.classSectionStartDate).getHours() >= 14 &&
                    new Date(item.classSectionStartDate).getHours() <= 17
                "
              >
                {{ item.subjectUnitName }}<br />
                节次{{ item.classSection }}<br />
                {{item.chargeTeacherName}}<br />
                {{item.trainAreaName}}
              </li>
            </ul>
          </el-table-column>
          <el-table-column label="晚上(19:00-22:50)">
            <ul slot-scope="scope" class="sublist">
              <li
                v-for="(item,index) in scope.row.arrangeSubjectResult"
                :key="index"
                v-show="
                  new Date(item.classSectionStartDate).getHours() >= 19 &&
                    new Date(item.classSectionStartDate).getHours() <= 22
                "
              >
                {{ item.subjectUnitName }}<br />
                节次{{ item.classSection }}<br />
                {{item.chargeTeacherName}}<br />
                {{item.trainAreaName}}
              </li>
            </ul>
          </el-table-column> -->
        </el-table>
        <el-table
          :data="weekPlan.nextWeekPlanList"
          height="480"
          border
          header-row-class-name="head"
          v-else
        >
          <el-table-column prop="classDate" label="日期" width="100">
          </el-table-column>
          <el-table-column prop="week" label="星期" width="100">
          </el-table-column>
          <el-table-column label="详情">
            <ul slot-scope="scope" class="sublist">
              <li
                v-for="(item, index) in scope.row.arrangeSubjectResult"
                :key="index"
              >
                <span class="span-tim"
                  >时间：{{ item.classSectionStartDate }}-{{
                    item.classSectionEndDate
                  }}</span
                >
                <span class="span-sub"
                  >训练单元：{{ item.subjectUnitName }}</span
                >
                <span class="span-tea"
                  >主教员：{{ item.chargeTeacherName }}</span
                >
                <span class="span-sec">节次：{{ item.classSection }}</span>
                <span class="span-are">训练场地：{{ item.trainAreaName }}</span
                ><br />
                <span class="span-ast"
                  >参训航天员：{{ item.joinAstronautNames }}</span
                >
              </li>
            </ul>
          </el-table-column>
          <!-- <el-table-column label="下午(14:00-17:50)">
            <ul slot-scope="scope" class="sublist">
              <li
                v-for="(item,index) in scope.row.arrangeSubjectResult"
                :key="index"
                v-show="
                  new Date(item.classSectionStartDate).getHours() >= 14 &&
                    new Date(item.classSectionStartDate).getHours() <= 17
                "
              >
                {{ item.subjectUnitName }}<br />
                节次{{ item.classSection }}<br />
                {{item.chargeTeacherName}}<br />
                {{item.trainAreaName}}
              </li>
            </ul>
          </el-table-column>
          <el-table-column label="晚上(19:00-22:50)">
            <ul slot-scope="scope" class="sublist">
              <li
                v-for="(item,index) in scope.row.arrangeSubjectResult"
                :key="index"
                v-show="
                  new Date(item.classSectionStartDate).getHours() >= 19 &&
                    new Date(item.classSectionStartDate).getHours() <= 22
                "
              >
                {{ item.subjectUnitName }}<br />
                节次{{ item.classSection }}<br />
                {{item.chargeTeacherName}}<br />
                {{item.trainAreaName}}
              </li>
            </ul>
          </el-table-column> -->
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getLoc
  } from '../utils/common.js';
  // import { weekPlan } from '../utils/data.js';
  export default {
    data() {
      //这里存放数据
      return {
        title: '周计划',
        whichWeek: 'curWeek',//默认本周
        isFilter: false,//筛选弹窗
        classColor: ["#F0FEE4", "#E4FEF1", "#E4FEF1", "#FEE3EA", "#E3EBFE"],
        timeData: [],
        currentRow: true,
      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {
      isFilter: {
        handler(newValue, oldValue) {
          if (!newValue) {
            plus.key.removeEventListener("backbutton", onPlusReady);
            this.onQuit();
          }
        }
      }
    },
    //方法集合
    methods: {
      //切换本周与下周
      switchWeek() {
        // this.weekPlan = getLoc("weekPlan");
        this.currentRow = !this.currentRow;
        this.dayToWeek(this.weekPlan);
      },
      //筛选弹框确定
      saveFilter(val) {
        if (this.currentRow) {
          let filterEmpty;
          for (let i = 0; i < val.length; i++) {
            if (val[i].arrangeSubjectResult.length == 0) {
              filterEmpty = true;
            } else {
              filterEmpty = false;
              break;
            }
          }
          if (filterEmpty) {
            this.weekPlan.curWeekPlanList = [];
          } else {
            this.weekPlan.curWeekPlanList = val;
          }
        } else {
          let filterEmpty;
          for (let i = 0; i < val.length; i++) {
            if (val[i].arrangeSubjectResult.length == 0) {
              filterEmpty = true;
            } else {
              filterEmpty = false;
              break;
            }
          }
          if (filterEmpty) {
            this.weekPlan.nextWeekPlanList = [];
          } else {
            this.weekPlan.nextWeekPlanList = val;
          }
        }
        this.dayToWeek(this.weekPlan);
        this.isFilter = false;
      },
      //筛选弹框取消
      onCancleFilter(val) {
        this.isFilter = val;
      },
      //打开筛选弹框
      openFilter() {
        this.isFilter = true;
        plus.key.removeEventListener("backbutton", onPlusReady);
        plus.key.addEventListener("backbutton", onBack => {
          this.isFilter = false;
        });
      },
      dayToWeek(obj) {
        for (let i = 0; i < obj.curWeekPlanList.length; i++) {
          let day = obj.curWeekPlanList[i].classDate;
          day = day.replace(/-/g, "/");
          let week = new Date(day).getDay();
          week = this.weekNumToStr(week);
          obj.curWeekPlanList[i].week = week;
          let subjectResult = obj.curWeekPlanList[i].arrangeSubjectResult;
          obj.curWeekPlanList[i].morning = "";
          for (let j = 0; j < subjectResult.length; j++) {
            let time = subjectResult[j].classSectionStartDate;
            if (subjectResult[j].classSectionStartDate.length > 15) {
              subjectResult[j].classSectionStartDate = subjectResult[j].classSectionStartDate.substr(10, 15);
              subjectResult[j].classSectionEndDate = subjectResult[j].classSectionEndDate.substr(10, 15);
            }
          }
        }
        for (let i = 0; i < obj.nextWeekPlanList.length; i++) {
          let day = obj.nextWeekPlanList[i].classDate;
          let week = new Date(day).getDay();
          week = this.weekNumToStr(week);
          obj.nextWeekPlanList[i].week = week;
          let subjectResult = obj.nextWeekPlanList[i].arrangeSubjectResult;
          for (let j = 0; j < subjectResult.length; j++) {
            if (subjectResult[j].classSectionStartDate.length > 15) {
              subjectResult[j].classSectionStartDate = subjectResult[j].classSectionStartDate.substr(10, 15);
              subjectResult[j].classSectionEndDate = subjectResult[j].classSectionEndDate.substr(10, 15);
            }
          }
        }
      },
      weekNumToStr(obj) {
        let week = obj;
        switch (week) {
          case 0:
            week = "星期天";
            break;
          case 1:
            week = "星期一";
            break;
          case 2:
            week = "星期二";
            break;
          case 3:
            week = "星期三";
            break;
          case 4:
            week = "星期四";
            break;
          case 5:
            week = "星期五";
            break;
            week = "星期天";
          default:
            week = "星期六";
            break;
        };
        return week;
      },
      //物理返还按键退出
      onQuit() {
        let quitTime = null;
        //添加新的物理返回按键监听事件
        plus.key.addEventListener("backbutton", onBack => {
          if (!quitTime) {
            quitTime = Date.now();
            this.toast({
              message: '再按一次返回键退出并注销登录',
              position: 'bottom',
              duration: 2000
            });
            setTimeout(_ => {
              quitTime = null;
            }, 2000);
          } else {
            if ((Date.now() - quitTime) <= 2000) {
              quitTime = null;
              plus.runtime.quit();
            }
          }
        });
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      //移除原有物理按键监听的绑定事件
      plus.key.removeEventListener("backbutton", onPlusReady);
      //执行新的物理返回按键方法
      this.onQuit();
      this.weekPlan = getLoc("weekPlan");
      this.dayToWeek(this.weekPlan);
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
    },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
  .week-plan {
    .content {
      margin: 0.1rem 0.2rem;
      header {
        padding: 0.2rem 0.7rem 0.2rem 0.7rem;
        .el-switch {
          padding: 0.05rem 0 0 0;
          float: right;
        }
      }
      .contentList {
        width: 92%;
        position: relative;
        margin: 0 auto;
        background: #fff;
        .sublist {
          li {
            margin: 0 0 0.2rem;
            background-color: #f5f6fa;
            border: 0.01rem none;
            border-radius: 0.08rem;
            text-align: left;
            span {
              display: inline-block;
              padding: 0.1rem;
            }
            .span-tim {
              width: 2.4rem;
            }
            .span-sub {
              width: 6rem;
            }
            .span-sec {
              width: 2rem;
            }
            .span-tea {
              width: 2rem;
            }
            .span-ast {
              vertical-align: top;
              word-wrap: break-word;
            }
          }
        }
      }
    }
  }
</style>
<style>
  .el-table .head th {
    background-color: #ececec;
    text-align: center;
    color: #7d7d7d;
  }
  .el-table--enable-row-transition .el-table__body td {
    text-align: center;
  }
  .content header .el-radio-group {
    float: right;
    margin-bottom: 0.2rem !important;
  }
  /* .week-plan .el-input__inner {
                  line-height: 0.45rem !important;
                }
                .content .el-select{
                  margin: 0 0.1rem 0 0;
                } */
</style>