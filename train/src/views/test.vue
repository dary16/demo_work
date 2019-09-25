/*
 * @Author: dairui 
 * @Date: 2019-08-19 11:18:38 
 * @Last Modified by: dairui
 * @Last Modified time: 2019-09-23 14:09:38
 */

  <template>
  <el-table
    :data="tableData"
    style="width: 100%"
  >
    <el-table-column
      prop="date"
      label="日期"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180"
    >
    </el-table-column>
    <el-table-column label="地址">
      <template slot-scope="scope">
        <ul>
          <li v-for="item in datas">
            <span>{{item.subjectUnitName}}</span>
            <span>{{item.trainAreaName}}</span>
            <span>{{item.chargeTeacherName}}</span>
          </li>
        </ul>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex';
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        datas:
          [
            {
              "subjectID": "0CDC37B008A94B71AC5D98FDC8743631",
              "classSection": "1",
              "subjectUnitName": "wang课目1-2-1",
              "trainAreaName": "训练场地1",
              "chargeTeacherName": "刘二，刘一",
              "shift": "1"
            },
            {
              "subjectID": "0CDC37B008A94B71AC5D98FDC8743631",
              "classSection": "1,2",
              "subjectUnitName": "wang课目1-2-1",
              "trainAreaName": "训练场地1",
              "chargeTeacherName": "刘二，刘一",
              "shift": "1"
            },
            {
              "subjectID": "0CDC37B008A94B71AC5D98FDC8743631",
              "classSection": "1,2,3",
              "subjectUnitName": "wang课目1-2-1",
              "trainAreaName": "训练场地1",
              "chargeTeacherName": "刘二，刘一",
              "shift": "1"
            },
            {
              "subjectID": "0CDC37B008A94B71AC5D98FDC8743631",
              "classSection": "11,12",
              "subjectUnitName": "wang课目1-2-1",
              "trainAreaName": "训练场地1",
              "chargeTeacherName": "刘二，刘一",
              "shift": "1"
            },
            {
              "subjectID": "0CDC37B008A94B71AC5D98FDC8743631",
              "classSection": "2",
              "subjectUnitName": "wang课目1-2-1",
              "trainAreaName": "训练场地1",
              "chargeTeacherName": "刘二，刘一",
              "shift": "1"
            },
            {
              "subjectID": "0CDC37B008A94B71AC5D98FDC8743631",
              "classSection": "2",
              "subjectUnitName": "wang课目1-2-1",
              "trainAreaName": "训练场地1",
              "chargeTeacherName": "刘二，刘一",
              "shift": "1"
            },
            {
              "subjectID": "0CDC37B008A94B71AC5D98FDC8743631",
              "classSection": "2,3,4",
              "subjectUnitName": "wang课目1-2-1",
              "trainAreaName": "训练场地1",
              "chargeTeacherName": "刘二，刘一",
              "shift": "1"
            },
            {
              "subjectID": "0CDC37B008A94B71AC5D98FDC8743631",
              "classSection": "9,10",
              "subjectUnitName": "wang课目1-2-1",
              "trainAreaName": "训练场地1",
              "chargeTeacherName": "刘二，刘一",
              "shift": "1"
            }
          ],
        num: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        maxLength: 0,
        defaultHeight: 30
      };
    },
    props: [],
    created() {
      this.getInstanceCountFn();
    },
    methods: {
      ...mapActions(['_getInfo']),
      //获取实力统计列表
      getInstanceCountFn() {
        /* this._getInfo({
          ops: {},
          api: 'getInstanceCount',
          callback: res => {
            res.forEach(item => {
              //人员
              var a = item.psersonList.length;
              //领导
              var b = item.leaderList.length;
              //战士
              var c = item.soldierList.length;
              //车辆
              var d = item.carList.length;
              //装备
              var e = item.materialList.length;
              item.maxLength = Math.max(a, b, c, d, e);
            })
            this.each = res;
          }
        }); */
      },
      //关闭
      closeFn() {
        this.$emit('closeClick', false)
      }
    }
  }
</script>

<style scoped lang="less">
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 9998;
    background: rgba(0, 0, 0, 0.5);
    .popHeader {
      font-weight: 400;
      color: rgba(224, 224, 224, 1);
      text-align: left;
      font-size: 20px;
      line-height: 38px;
      cursor: pointer;
      z-index: 1001;
      width: 100%;
      height: 38px;
      background: linear-gradient(
        90deg,
        rgba(0, 65, 117, 1),
        rgba(15, 108, 178, 1)
      );
      box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.8);
      position: relative;
      h3 {
        display: inline-block;
        padding-left: 12px;
      }
      .el-icon-close {
        position: absolute;
        top: 10px;
        right: 12px;
      }
    }
    .contentList {
      background: #3a6089;
      .width-num {
        width: 1rem;
      }
      ul.nums {
        margin-block-start: 0;
        margin-block-end: 0;
        width: 13%;
        text-align: center;
        float: left;
        li {
          line-height: 30px;
          color: #fff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.8);
          border-right: 1px solid rgba(255, 255, 255, 0.8);
        }
      }
      ul.title {
        overflow: hidden;
        background: #144368;
        font-size: 16px;
        box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0.5);
        color: #fff;
        padding-right: 17px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.8);
        display: flex;
        li {
          flex: 1;
          text-align: center;
          overflow: hidden;
          line-height: 65px;
          border-right: 1px solid rgba(255, 255, 255, 0.8);
          &:first-child {
            width: 1rem;
          }
          h4,
          .subTitle {
            display: block;
            //   width: 100%;
            line-height: 32px;
            //   border: 1px solid red;
          }
          h4 {
            border-bottom: 1px solid rgba(255, 255, 255, 0.8);
          }
        }
        .subTitle {
          overflow: hidden;
          li {
            float: left;
            //   border: 1px solid red;
            line-height: 32px;
            border-right: none;
          }
          li:nth-child(1) {
            width: 24%;
            border-right: 1px solid rgba(255, 255, 255, 0.1);
          }
          li:nth-child(2) {
            width: 76%;
            overflow: hidden;
            span {
              float: left;
            }
            span:nth-child(1) {
              width: 75%;
              border-right: 1px solid rgba(255, 255, 255, 0.1);
            }
            span:nth-child(2) {
              width: 25%;
            }
          }
        }
      }

      div.tableSelf {
        height: 620px;
        overflow-y: auto;
        background: #3a6089;
        color: #e0e0e0;
        font-size: 14px;
        .rowSelf {
          border-bottom: 1px solid rgba(255, 255, 255, 0.8);
          .colSelf {
            float: left;
            width: 18%;
            text-align: center;
            line-height: 30px;
            box-sizing: border-box;
            border-right: 1px solid rgba(255, 255, 255, 0.8);
            .sortCol {
              overflow: hidden;
              dt,
              dd {
                float: left;
              }
              dt {
                width: 24%;
                font-weight: normal;
              }
              dd {
                width: 76%;
                ul {
                  li {
                    overflow: hidden;
                    span {
                      float: left;
                      width: 75%;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      display: block;
                      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                      border-left: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    span:last-child {
                      width: 25%;
                    }
                  }
                  li:last-child {
                    span {
                      border-bottom: none;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .width-10 {
        width: 10% !important;
      }
    }
  }
</style>
