<template>
  <div class='test'>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        prop="subjectName"
        label="科目名称"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
      >
      </el-table-column>
      <el-table-column
        prop="num"
        label="节次"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

  export default {
    data() {
      //这里存放数据
      return {
        tableData: [{
          id: '12987122',
          name: '王小虎',
          subjectName: '科目三',
          address: '三号楼A座1105',
          num: 2
        }, {
          id: '12987123',
          name: '王小虎',
          subjectName: '科目三',
          address: '三号楼A座1105',
          num: 2
        }, {
          id: '12987124',
          name: '王小虎',
          subjectName: '科目三',
          address: '三号楼',
          num: 1
        }, {
          id: '12987125',
          name: '王小虎',
          subjectName: '科目三',
          address: '三号楼A座1105',
          num: 2
        }, {
          id: '12987126',
          name: '王小虎',
          subjectName: '科目三',
          address: '三号楼',
          num: 1
        }]
      };
    },
    //监听属性 类似于data概念
    computed: {

    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if(columnIndex === 0) {
          if(rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
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
  .test {
    margin: 1rem auto;
    font-size: 0.5rem;
    background: #fff;
  }
</style>