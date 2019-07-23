<template>
  <div class='week-plan'>
    <div class="content">
      <header>
        <el-select
          v-model="weekDay"
          placeholder="请选择"
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
      <el-table
        ref="singleTable"
        :data="timeData"
        highlight-current-row
        border
        height="270"
        @current-change="handleCurrentChange"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          width="50"
          fixed="left"
          align="center"
        >
        </el-table-column>
        <el-table-column
          property="monday"
          label="周一"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{scope.row.monday.name}}</span><br>
            <span>{{scope.row.monday.courseName}}</span><br>
            <span>{{scope.row.monday.address}}</span>
          </template>
        </el-table-column>
        <el-table-column
          property="tuesday"
          label="周二"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{scope.row.tuesday.name}}</span><br>
            <span>{{scope.row.tuesday.courseName}}</span><br>
            <span>{{scope.row.tuesday.address}}</span>
          </template>

        </el-table-column>
        <el-table-column
          property="wednesday"
          label="周三"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{scope.row.wednesday.name}}</span><br>
            <span>{{scope.row.wednesday.courseName}}</span><br>
            <span>{{scope.row.wednesday.address}}</span>
          </template>

        </el-table-column>
        <el-table-column
          property="thursday"
          label="周四"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{scope.row.thursday.name}}</span><br>
            <span>{{scope.row.thursday.courseName}}</span><br>
            <span>{{scope.row.thursday.address}}</span>
          </template>

        </el-table-column>
        <el-table-column
          property="friday"
          label="周五"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{scope.row.friday.name}}</span><br>
            <span>{{scope.row.friday.courseName}}</span><br>
            <span>{{scope.row.friday.address}}</span>
          </template>

        </el-table-column>
        <el-table-column
          property="satusday"
          label="周六"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{scope.row.satusday.name}}</span><br>
            <span>{{scope.row.satusday.courseName}}</span><br>
            <span>{{scope.row.satusday.address}}</span>
          </template>

        </el-table-column>
        <el-table-column
          property="sunday"
          label="周日"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{scope.row.sunday.name}}</span><br>
            <span>{{scope.row.sunday.courseName}}</span><br>
            <span>{{scope.row.sunday.address}}</span>
          </template>

        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {
    getLoc
  } from '../utils/common.js';
  export default {
    data() {
      //这里存放数据
      return {
        weekDay: '',
        options: [{
          value: '1',
          label: '第一周'
        }, {
          value: '2',
          label: '第二周'
        }, {
          value: '3',
          label: '第三周'
        }, {
          value: '4',
          label: '第四周'
        }, {
          value: '5',
          label: '第五周'
        }],
        timeData: [],
        currentRow: null
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
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.timeData = getLoc('weekPlanData');
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
      //   this.timeData = getLoc('allData').allData.weekplan;
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
    }
  }
</style>
<style>
  .week-plan .el-input__inner {
    line-height: 0.45rem !important;
    height: 0.45rem !important;
  }
</style>