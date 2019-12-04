<template>
  <div class="week-plan">
    <v-header :titleData="title"></v-header>
    <div class="content">
      <header>
        <el-select
          v-model="options.value"
          placeholder="请选择"
          @change="nameTeacherChange"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-switch
          style="display: block"
          v-model="whichWeek"
          active-color="#13ce66"
          @change="handleCurrentChange"
          inactive-color="#67a8f1"
          active-text="本周"
          inactive-text="下一周"
        >
        </el-switch>
      </header>
      <div class="contentList">
        <el-table
          :data="weekPlan.curWeekPlanList"
          height="550"
          border
          align="center"
          header-row-class-name="head"
          v-if="currentRow"
        >
          <el-table-column
            prop="classDate"
            label="日期"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="week"
            label="星期"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            label="内容"
            align="center"
          >
            <div
              slot-scope="scope"
              class="sublist"
            >
              <ul v-for="item in scope.row.arrangeSubjectResult">
                <li>日期：{{item.classDate}}</li>
                <li>开始时间：{{item.classSectionStartDate}}</li>
                <li>结束时间：{{item.classSectionEndDate}}</li>
                <li>科目名称：{{item.subjectUnitName}}</li>
                <li>航天员：{{item.auxiliaryLecturerName}}</li>
                <li>节次：{{item.classSection}}</li>
                <li>训练方式：{{item.trainWay}}</li>
                <li>训练场地：{{item.trainAreaName}}</li>
                <li>训练器材：{{item.trainMaterialName}}</li>
                <li>主教员：{{item.chargeTeacherName}}</li>

              </ul>
            </div>
          </el-table-column>
        </el-table>
        <el-table
          :data="weekPlan.nextWeekPlanList"
          height="550"
          border
          header-row-class-name="head"
          v-else
        >
          <el-table-column
            prop="classDate"
            label="日期"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="week"
            label="星期"
            width="100"
          >
          </el-table-column>
          <el-table-column label="内容">
            <div
              slot-scope="scope"
              class="sublist"
            >
              <ul v-for="item in scope.row.arrangeSubjectResult">
                <li>日期：{{item.classDate}}</li>
                <li>开始时间：{{item.classSectionStartDate}}</li>
                <li>结束时间：{{item.classSectionEndDate}}</li>
                <li>科目名称：{{item.subjectUnitName}}</li>
                <li>航天员：{{item.auxiliaryLecturerName}}</li>
                <li>节次：{{item.classSection}}</li>
                <li>训练方式：{{item.trainWay}}</li>
                <li>训练场地：{{item.trainAreaName}}</li>
                <li>训练器材：{{item.trainMaterialName}}</li>
                <li>主教员：{{item.chargeTeacherName}}</li>
              </ul>
            </div>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getLoc, setLoc
  } from '../utils/common.js';
  import WeekPlanData from '../utils/weekPlan.js';
  export default {
    data() {
      //这里存放数据
      return {
        title: '周计划',
        whichWeek: true,
        options: [],
        teacherName: {},
        classColor: ["#F0FEE4", "#E4FEF1", "#E4FEF1", "#FEE3EA", "#E3EBFE"],
        timeData: [],
        currentRow: true,
        currentName: '',
        weekPlan: {}
      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      //按主教员筛选本周安排
      selectNameCurTeacher() {
        let newNameList = [];
        this.weekPlan = getLoc("weekPlan");
        for(let i = 0; i < this.weekPlan.curWeekPlanList.length; i++) {
          for(let j = 0; j < this.weekPlan.curWeekPlanList[i].arrangeSubjectResult.length; j++) {
            let nameList = this.weekPlan.curWeekPlanList[i].arrangeSubjectResult[j].chargeTeacherName.split('，');
            for(let q = 0; q < nameList.length; q++) {
              if(this.currentName == nameList[q]) {
                newNameList.push(this.weekPlan.curWeekPlanList[i].arrangeSubjectResult[j]);
              }
            }
          }
          this.weekPlan.curWeekPlanList[i].arrangeSubjectResult = newNameList;
          newNameList = [];
        }
      },
      //按主教员筛选下周安排
      selectNameNextTeacher() {
        let newNameList = [];
        this.weekPlan = getLoc("weekPlan");
        for(let i = 0; i < this.weekPlan.nextWeekPlanList.length; i++) {
          for(let j = 0; j < this.weekPlan.nextWeekPlanList[i].arrangeSubjectResult.length; j++) {
            let nameList = this.weekPlan.nextWeekPlanList[i].arrangeSubjectResult[j].chargeTeacherName.split('，');
            for(let q = 0; q < nameList.length; q++) {
              if(this.currentName == nameList[q]) {
                newNameList.push(this.weekPlan.nextWeekPlanList[i].arrangeSubjectResult[j]);
              }
            }
          }
          this.weekPlan.nextWeekPlanList[i].arrangeSubjectResult = newNameList;
          newNameList = [];
        }
      },
      //切换本周和下周
      handleCurrentChange(val) {
        this.currentRow = val;
        if(this.currentRow) {
          if(this.currentName != '') {
            this.selectNameCurTeacher();
            this.dayToWeek(this.weekPlan);
          }
        }
        if(!this.currentRow) {
          if(this.currentName != '') {
            this.selectNameNextTeacher();
            this.dayToWeek(this.weekPlan);
          }
        }
      },
      //下拉选择主教员
      nameTeacherChange(val) {
        this.currentName = val;
        if(this.currentRow) {
          this.selectNameCurTeacher();
          this.dayToWeek(this.weekPlan);
        }
        if(!this.currentRow) {
          this.selectNameNextTeacher();
          this.dayToWeek(this.weekPlan);
        }
      },
      dayToWeek(obj) {
        console.log(obj);
        for(let i = 0; i < obj.curWeekPlanList.length; i++) {
          let day = obj.curWeekPlanList[i].classDate;
          day = day.replace(/-/g, "/");
          let week = new Date(day).getDay();
          week = this.weekNumToStr(week);
          obj.curWeekPlanList[i].week = week;
          let subjectResult = obj.curWeekPlanList[i].arrangeSubjectResult;
          obj.curWeekPlanList[i].morning = "";
          for(let j = 0; j < subjectResult.length; j++) {
            let time = subjectResult[j].classSectionStartDate;
          }
        }
        for(let i = 0; i < obj.nextWeekPlanList.length; i++) {
          let day = obj.nextWeekPlanList[i].classDate;
          let week = new Date(day).getDay();
          week = this.weekNumToStr(week);
          obj.nextWeekPlanList[i].week = week;
        }
      },
      weekNumToStr(obj) {
        let week = obj;
        switch(week) {
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
          if(!quitTime) {
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
            if((Date.now() - quitTime) <= 2000) {
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
      //   plus.key.removeEventListener("backbutton", onPlusReady);
      //执行新的物理返回按键方法
      //   this.onQuit();
      console.log(WeekPlanData);
      setLoc("weekPlan", WeekPlanData)

      this.weekPlan = getLoc("weekPlan");
      this.dayToWeek(this.weekPlan);
      let optionsName = [];
      for(var i = 0; i < this.weekPlan.curWeekPlanList.length; i++) {
        for(var j = 0; j < this.weekPlan.curWeekPlanList[i].arrangeSubjectResult.length; j++) {
          let nameTeachers = this.weekPlan.curWeekPlanList[i].arrangeSubjectResult[j].chargeTeacherName.split("，");
          for(var q = 0; q < nameTeachers.length; q++) {
            optionsName.push(nameTeachers[q]);
          }
        }
      }
      for(var p = 0; p < [...new Set(optionsName)].length; p++) {
        this.options.push({ "value": [...new Set(optionsName)][p], "label": [...new Set(optionsName)][p] })
      }
      // console.log(weekPlan());
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
        .el-switch {
          padding: 0 0.7rem 0.24rem 0;
          text-align: right;
          height: 0.5rem;
        }
        .el-select {
          position: relative;
          left: 7rem;
        }
      }
      .contentList {
        width: 92%;
        position: relative;
        margin: 0 auto;
        background: #fff;
        .sublist {
          text-align: left;
          ul {
            background: #f3f3f3;
            border: 1px solid #333;
            margin-bottom: 0.1rem;
            li {
              padding: 0.05rem;
              margin: 0 0.1rem 0.1rem 0;
              display: inline-block;
            }
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