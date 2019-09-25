<template>
  <div class="week-plan">
    <v-header :titleData="title"></v-header>
    <div class="content">
      <header>
        <el-select
          v-model="weekDay"
          placeholder="请选择"
          @change="handleCurrentChange"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </header>
      <div class="contentList">
        <el-table
          :data="weekPlan.curWeekPlanList"
          height="800"
          border
          header-row-class-name="head"
          v-if="currentRow == '1'"
        >
          <el-table-column prop="classDate" label="日期" width="100">
          </el-table-column>
          <el-table-column prop="week" label="星期" width="100">
          </el-table-column>
          <el-table-column label="上午(8:00-11:50)">
            <ul slot-scope="scope" class="sublist">
              <li
                v-for="item in scope.row.arrangeSubjectResult"
                v-show="
                  new Date(item.classSectionStartDate).getHours() >= 8 &&
                    new Date(item.classSectionStartDate).getHours() <= 11
                "
              >
                {{ item.subjectUnitName }}<br />
                节次{{ item.classSection }}
              </li>
            </ul>
          </el-table-column>
          <el-table-column label="下午(14:00-17:50)">
            <ul slot-scope="scope" class="sublist">
              <li
                v-for="item in scope.row.arrangeSubjectResult"
                v-show="
                  new Date(item.classSectionStartDate).getHours() >= 14 &&
                    new Date(item.classSectionStartDate).getHours() <= 17
                "
              >
                {{ item.subjectUnitName }}<br />
                节次{{ item.classSection }}
              </li>
            </ul>
          </el-table-column>
          <el-table-column label="晚上(19:00-22:50)">
            <ul slot-scope="scope" class="sublist">
              <li
                v-for="item in scope.row.arrangeSubjectResult"
                v-show="
                  new Date(item.classSectionStartDate).getHours() >= 19 &&
                    new Date(item.classSectionStartDate).getHours() <= 22
                "
              >
                {{ item.subjectUnitName }}<br />
                节次{{ item.classSection }}
              </li>
            </ul>
          </el-table-column>
        </el-table>
        <el-table
          :data="weekPlan.nextWeekPlanList"
          height="800"
          border
          header-row-class-name="head"
          v-else
        >
          <el-table-column prop="classDate" label="日期" width="100">
          </el-table-column>
          <el-table-column prop="week" label="星期" width="100">
          </el-table-column>
          <el-table-column label="上午(8:00-11:50)">
            <ul slot-scope="scope" class="sublist">
              <li
                v-for="item in scope.row.arrangeSubjectResult"
                v-show="
                  new Date(item.classSectionStartDate).getHours() >= 8 &&
                    new Date(item.classSectionStartDate).getHours() <= 11
                "
              >
                {{ item.subjectUnitName }}<br />
                节次{{ item.classSection }}
              </li>
            </ul>
          </el-table-column>
          <el-table-column label="下午(14:00-17:50)">
            <ul slot-scope="scope" class="sublist">
              <li
                v-for="item in scope.row.arrangeSubjectResult"
                v-show="
                  new Date(item.classSectionStartDate).getHours() >= 14 &&
                    new Date(item.classSectionStartDate).getHours() <= 17
                "
              >
                {{ item.subjectUnitName }}<br />
                节次{{ item.classSection }}
              </li>
            </ul>
          </el-table-column>
          <el-table-column label="晚上(19:00-22:50)">
            <ul slot-scope="scope" class="sublist">
              <li
                v-for="item in scope.row.arrangeSubjectResult"
                v-show="
                  new Date(item.classSectionStartDate).getHours() >= 19 &&
                    new Date(item.classSectionStartDate).getHours() <= 22
                "
              >
                {{ item.subjectUnitName }}<br />
                节次{{ item.classSection }}
              </li>
            </ul>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getLoc
  } from '../utils/common.js';
  import { weekPlan } from '../utils/data.js';
  export default {
    data() {
      //这里存放数据
      return {
        title: '周计划',
        weekDay: '',
        options: [{
          value: '1',
          label: '本周'
        }, {
          value: '2',
          label: '下一周'
        }],
        weekPlan: {},
        classColor: ["#F0FEE4", "#E4FEF1", "#E4FEF1", "#FEE3EA", "#E3EBFE"],
        timeData: [],
        currentRow: '1'
      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      dayToWeek(obj) {
        console.log(obj);
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
          }
        }
        for (let i = 0; i < obj.nextWeekPlanList.length; i++) {
          let day = obj.nextWeekPlanList[i].classDate;
          let week = new Date(day).getDay();
          week = this.weekNumToStr(week);
          obj.nextWeekPlanList[i].week = week;
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
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      //this.timeData = getLoc('weekPlanData');
      if (weekPlan()) {
        this.weekPlan = weekPlan();
        this.dayToWeek(this.weekPlan);
      }
      console.log(weekPlan());
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
        text-align: center;
        height: 1rem;
        line-height: 1rem;
      }
      .contentList {
        width: 92%;
        position: relative;
        margin: 0 auto;
        background: #fff;
        .sublist {
          li {
            background-color: #d09e9e;
            width: 1.4rem;
            padding: 0.05rem;
            margin: 0 0.1rem 0.1rem 0;
            display: inline-block;
          }
        }
      }
    }
  }
</style>
<style>
  .el-table .head th {
    background-color: #e2e2e2;
  }
  .week-plan .el-input__inner {
    line-height: 0.45rem !important;
    height: 0.45rem !important;
  }
</style>