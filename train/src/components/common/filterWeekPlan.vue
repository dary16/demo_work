<template>
  <div class="popCover">
    <div class="mask"></div>
    <div class="popContent">
      <div class="popTitle">
        <a href="javascript:;" v-on:click="onCancle">取消</a>
        <h3>筛选周计划</h3>
      </div>
      <div class="content">
        <el-select
          size="medium"
          v-model="teacherName"
          clearable
          placeholder="请选择主教员"
          @change="nameTeacherChange"
        >
          <el-option
            v-for="item in optionsTeacher"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          size="medium"
          v-model="subjectName"
          clearable
          placeholder="请选择课目名称"
          @change="nameSubjectChange"
        >
          <el-option
            v-for="item in optionsSubject"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          size="medium"
          v-model="areaName"
          placeholder="请选择训练场地"
          clearable
          @change="nameAreaChange"
        >
          <el-option
            v-for="item in optionsArea"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          size="medium"
          v-model="astronautName"
          clearable
          placeholder="请选择航天员"
          @change="nameAstronautChange"
        >
          <el-option
            v-for="item in optionsAstronaut"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="popBtn">
          <a href="javascript:;" v-on:click="onSubmit">确定</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getLoc } from "../../utils/common.js";
export default {
  props: ["currentRow"],
  watch:{
    currentRow:{
      handler(newValue, oldValue){
        try {
          if(!newValue){
            this.teacherName = this.teacherNameNext;
            this.subjectName = this.subjectNameNext;
            this.areaName = this.areaNameNext;
            this.astronautName = this.astronautNameNext;
          }else{
            this.teacherName = this.teacherNameCur;
            this.subjectName = this.subjectNameCur;
            this.areaName = this.areaNameCur;
            this.astronautName = this.astronautNameCur;
          }
        } catch (error) {
          console.log("下周筛选的条件为空");
        }
        this.optionsTeacher = [];
        this.optionsSubject = [];
        this.optionsArea = [];
        this.optionsAstronaut = [];
        if(!newValue){
          this.weekPlan = getLoc("weekPlan");
          this.selectList ('teacherName',this.weekPlan.nextWeekPlanList,'options');
          this.selectList ('subjectName',this.weekPlan.nextWeekPlanList,'options');
          this.selectList ('areaName',this.weekPlan.nextWeekPlanList,'options');
          this.selectList ('astronautName',this.weekPlan.nextWeekPlanList,'options');
        }else{
          this.weekPlan = getLoc("weekPlan");
          this.selectList("teacherName", this.weekPlan.curWeekPlanList, "options");
          this.selectList("subjectName", this.weekPlan.curWeekPlanList, "options");
          this.selectList("areaName", this.weekPlan.curWeekPlanList, "options");
          this.selectList("astronautName", this.weekPlan.curWeekPlanList, "options");
        }
      }
    }
  },
  data() {
    return {
      optionsTeacher: [], //主教员
      optionsSubject: [], //科目
      optionsArea: [], //场地
      optionsAstronaut: [], //航天员
      weekPlan: {}, //周计划
      teacherName: "", //选择的主教员--------
      subjectName: "", //选择的课程名
      areaName: "", //选择的场地名
      astronautName: "", //选择的航天员
      teacherNameCur: "", //本周选择的主教员--------
      subjectNameCur: "", //本周选择的课程名
      areaNameCur: "", //本周选择的场地名
      astronautNameCur: "", //本周选择的航天员
      teacherNameNext: "", //下周选择的主教员--------
      subjectNameNext: "", //下周选择的课程名
      areaNameNext: "", //下周选择的场地名
      astronautNameNext: "", //下周选择的航天员
    };
  },
  methods: {
    nameTeacherChange(val) {
      if(!this.currentRow){
        this.teacherNameNext = val;
      }else{
        this.teacherNameCur = val;
      }
      this.teacherName = val;
    },
    nameSubjectChange(val) {
      if(!this.currentRow){
        this.subjectNameNext = val;
      }else{
        this.subjectNameCur =val;
      }
      this.subjectName = val;
    },
    nameAreaChange(val) {
      if(!this.currentRow){
        this.areaNameNext = val;
      }else{
        this.areaNameCur = val;
      }
      this.areaName = val;
    },
    nameAstronautChange(val) {
      if(!this.currentRow){
        this.astronautNameNext = val;
      }else{
        this.astronautNameCur = val;
      }
      this.astronautName = val;
    },
    //确定
    onSubmit() {
      this.weekPlan = getLoc("weekPlan");
      let week;
      if(this.currentRow){
        week = this.weekPlan.curWeekPlanList;
      }else{
        week = this.weekPlan.nextWeekPlanList;
      }
      let newNameList = [];
      if(this.teacherName != ''){
          for (let i = 0; i < week.length; i++) {
            for (let j = 0; j < week[i].arrangeSubjectResult.length; j++) {
              let teacherNameList = week[i].arrangeSubjectResult[j].chargeTeacherName.split("，");
              for (let q = 0; q < teacherNameList.length; q++) {
                if(this.teacherName == teacherNameList[q]){
                    newNameList.push(week[i].arrangeSubjectResult[j]);
                }else if(q == teacherNameList.length-1){
                    week[i].arrangeSubjectResult = [];
                    break;
                }
              }
            }
            if(newNameList.length>0){
                week[i].arrangeSubjectResult = newNameList;
            }           
            newNameList = [];
          }
      }else{
          if(this.currentRow){
            week = this.weekPlan.curWeekPlanList;
          }else{
            week = this.weekPlan.nextWeekPlanList;
          }
      }
      if(this.subjectName != ''){
          for (let i = 0; i < week.length; i++) {
            for (let j = 0; j < week[i].arrangeSubjectResult.length; j++) {
              let subjectNameList = week[i].arrangeSubjectResult[j].subjectUnitName.split("，");
              for (let q = 0; q < subjectNameList.length; q++) {
                if (this.subjectName == subjectNameList[q]) {
                  newNameList.push(week[i].arrangeSubjectResult[j]);
                }else if(q == subjectNameList.length-1){
                    week[i].arrangeSubjectResult = [];
                    break;
                }
              }
            }
            if(newNameList.length>0){
                week[i].arrangeSubjectResult = newNameList;
            }
            newNameList = [];
          }
      }else{
          if(this.currentRow){
            week = this.weekPlan.curWeekPlanList;
          }else{
            week = this.weekPlan.nextWeekPlanList;
          }
      }
      if(this.areaName != ''){
          for (let i = 0; i < week.length; i++) {
            for (let j = 0; j < week[i].arrangeSubjectResult.length; j++) {
              let areaNameList = week[i].arrangeSubjectResult[j].trainAreaName.split("，");
              for (let q = 0; q < areaNameList.length; q++) {
                if (this.areaName == areaNameList[q]) {
                  newNameList.push(week[i].arrangeSubjectResult[j]);
                }else if(q == areaNameList.length-1){
                   week[i].arrangeSubjectResult = [];
                   break;
                }
              }
            }
            if(newNameList.length>0){
                week[i].arrangeSubjectResult = newNameList;
            }
            newNameList = [];
          }
      }else{
          if(this.currentRow){
            week = this.weekPlan.curWeekPlanList;
          }else{
            week = this.weekPlan.nextWeekPlanList;
          }
      }
      if(this.astronautName != ''){
          for (let i = 0; i < week.length; i++) {
            for (let j = 0; j < week[i].arrangeSubjectResult.length; j++) {
              let astronautNameList = week[i].arrangeSubjectResult[j].joinAstronautNames.split("，");
              for (let q = 0; q < astronautNameList.length; q++) {
                if (this.astronautName == astronautNameList[q]) {
                  newNameList.push(week[i].arrangeSubjectResult[j]);
                }else if(q == astronautNameList.length-1){
                    week[i].arrangeSubjectResult = [];
                    break;
                }
              }
            }
            if(newNameList.length>0){
                week[i].arrangeSubjectResult = newNameList;
            }
            newNameList = [];
          }
      }else{
          if(this.currentRow){
            week = this.weekPlan.curWeekPlanList;
          }else{
            week = this.weekPlan.nextWeekPlanList;
          }
      }
      this.$emit("saveFilter",week);
    },
    //取消
    onCancle() {
        this.$emit("onCancleFilter",false);
    },
    //获取本周和下周数据的筛选条件数据
    selectList(selectType, week, isOptions) {
      if (selectType != null && selectType == "teacherName") {
        let newNameList = [];
        for (let i = 0; i < week.length; i++) {
          for (let j = 0; j < week[i].arrangeSubjectResult.length; j++) {
            let nameList = week[i].arrangeSubjectResult[j].chargeTeacherName.split("，");
            for (let q = 0; q < nameList.length; q++) {
              if (isOptions == "options") {
                newNameList.push(nameList[q]);
              }
            }
          }
        }
        if (isOptions == "options") {
          for (var p = 0; p < [...new Set(newNameList)].length; p++) {
            this.optionsTeacher.push({
              value: [...new Set(newNameList)][p],
              label: [...new Set(newNameList)][p]
            });
          }
        }
      }
      if (selectType != null && selectType == "subjectName") {
        let newNameList = [];
        for (let i = 0; i < week.length; i++) {
          for (let j = 0; j < week[i].arrangeSubjectResult.length; j++) {
            let nameList = week[i].arrangeSubjectResult[j].subjectUnitName.split("，");
            for (let q = 0; q < nameList.length; q++) {
              if (isOptions == "options") {
                newNameList.push(nameList[q]);
              }
            }
          }
        }
        if (isOptions == "options") {
          for (var p = 0; p < [...new Set(newNameList)].length; p++) {
            this.optionsSubject.push({
              value: [...new Set(newNameList)][p],
              label: [...new Set(newNameList)][p]
            });
          }
        }
      }
      if (selectType != null && selectType == "areaName") {
        let newNameList = [];
        for (let i = 0; i < week.length; i++) {
          for (let j = 0; j < week[i].arrangeSubjectResult.length; j++) {
            let nameList = week[i].arrangeSubjectResult[j].trainAreaName.split("，");
            for (let q = 0; q < nameList.length; q++) {
              if (isOptions == "options") {
                newNameList.push(nameList[q]);
              }
            }
          }
        }
        if (isOptions == "options") {
          for (var p = 0; p < [...new Set(newNameList)].length; p++) {
            this.optionsArea.push({
              value: [...new Set(newNameList)][p],
              label: [...new Set(newNameList)][p]
            });
          }
        }
      }

      if (selectType != null && selectType == "astronautName") {
        let newNameList = [];
        for (let i = 0; i < week.length; i++) {
          for (let j = 0; j < week[i].arrangeSubjectResult.length; j++) {
            let nameList = week[i].arrangeSubjectResult[j].joinAstronautNames.split("，");
            for (let q = 0; q < nameList.length; q++) {
              if (isOptions == "options") {
                newNameList.push(nameList[q]);
              }
            }
          }
        }
        if (isOptions == "options") {
          for (var p = 0; p < [...new Set(newNameList)].length; p++) {
            this.optionsAstronaut.push({
              value: [...new Set(newNameList)][p],
              label: [...new Set(newNameList)][p]
            });
          }
        }
      }
    }
  },
  created() {
    this.weekPlan = getLoc("weekPlan");
    //本周的下拉列表数据
    this.selectList("teacherName", this.weekPlan.curWeekPlanList, "options");
    this.selectList("subjectName", this.weekPlan.curWeekPlanList, "options");
    this.selectList("areaName", this.weekPlan.curWeekPlanList, "options");
    this.selectList("astronautName", this.weekPlan.curWeekPlanList, "options");
  }
};
</script>
<style lang="less" scoped>
.on {
  background: #1c6492 !important;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1998;
}
.popContent {
  position: fixed;
  background: #fff;
  left: 55%;
  margin-left: -3rem;
  top: 2rem;
  z-index: 1999;
  border-radius: 0.08rem;
  overflow: hidden;
  width: 5rem;
  .popTitle {
    position: relative;
    h3 {
      height: 0.6rem;
      line-height: 0.6rem;
      background: #fff;
      color: #090909;
      text-indent: 0.02rem;
      font-weight: normal;
      text-align: center;
      font-size: 0.26rem;
    }
    a {
      position: absolute;
      right: 0.3rem;
      top: 0.15rem;
      font-size: 0.22rem;
      color: #348aff;
    }
  }
  .content {
    padding: 0.2rem 0.3rem;
    background: #f5f6fa;
    .popBtn {
      text-align: center;
      margin-top: 0.1rem;
      margin-bottom: 0.15rem;
      a {
        display: inline-block;
        width: 2.2rem;
        height: 0.45rem;
        line-height: 0.45rem;
        background: #3388ff;
        color: #fff;
        text-align: center;
        font-size: 0.24rem;
      }
      a:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
<style>
.content .el-select {
  margin: 0.1rem 0;
  width: 100%;
}
</style>