<template>
  <div class="record">
    <v-info-header v-on:backFn="back" :titleData="title"></v-info-header>

    <v-data-record
      :listData="listData"
      v-on:choosePerson="choosePerson"
      v-on:deleteChildData="deleteChildData"
      v-on:updateChildData="updateChildData"
    ></v-data-record>
    <v-form-pop
      :popData="popData"
      :astronautNames="astronautNames"
      :astronautChoose="astronautChoose"
      v-on:save="saveFn"
      v-on:chooseAstronaut="chooseAstronaut"
    ></v-form-pop>
    <v-choose-people
      v-if="isShowPeople"
      v-on:save="savePeopleFn"
      v-on:cancle="cancelPeopleFn"
      :popTitle="chooseTitle"
      :changeIndex="changeIndex"
    ></v-choose-people>
    <v-choose-astronaut
      v-if="isAstronaut"
      v-on:save="saveAstronautFn"
      v-on:cancle="cancelAstronautFn"
      :popTitle="popTitle"
      :astronautNames="astronautNames"
      :astronautChecked="astronautChecked"
    ></v-choose-astronaut>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import {
    getLoc, setLoc
  } from '../../utils/common.js';
  export default {
    data() {
      //这里存放数据
      return {
        title: "数据项记录",
        isShowPeople: false,//修改航体员弹窗标识
        isAstronaut: false,//选择航体员弹窗标识
        popTitle: "选择参训航天员",
        chooseTitle: "修改参训航天员",
        listData: [],
        changeIndex: '-1',
        astronautNames: [],//所有航体员弹框数据
        astronautChoose: [],//已选航体员
        astronautChecked: [],//已选航体员回显数据
        popData: {
          'titleTotal': '添加训练实施数据项记录',
          'options': [{
            'status': 1,
            'check': true,
            'title': '数据项名称',
            'placeholder': '请输入数据项名称',
            'val': 'dataItemName',
            'maxLength': 32
          }, {
            'status': 5,
            'title': '参训航天员',
            'check': true,
            'placeholder': '请选择参训航天员',
            'val': 'joinAstronautNames',
          }, {
            'status': 1,
            'title': '数据项值',
            'check': true,
            'placeholder': '请输入数据项值',
            'val': 'dataItemValue',
            'maxLength': 8
          }, {
            'status': 1,
            'title': '数据项标准值',
            'placeholder': '请输入数据项标准值',
            'val': 'dataItemMeasureValue',
            'maxLength': 8
          }, {
            'status': 1,
            'title': '数据单位',
            'placeholder': '请输入数据单位',
            'val': 'dataItemUnit',
            'maxLength': 8
          }, {
            'status': 1,
            'title': '数据项说明',
            'placeholder': '请输入数据项说明',
            'val': 'dataItemDesc',
            'maxLength': 64
          }]
        }
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['nowIndex', 'userInfo', 'tabIndex', 'userName']),
    },
    //方法集合
    methods: {
      back() {
        this.$router.go(-1);
      },
      //保存
      saveFn(val) {
        var re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字
        if (!val.dataItemName) {
          this.message.warning("请输入数据项目名称！");
          return false
        }
        if (val.joinAstronautNames == undefined || val.joinAstronautNames == '') {
          this.message.warning("请选择参训航天员！");
          return false
        }
        if (!val.dataItemValue) {
          this.message.warning("请输入数据项值！");
          return false;
        }
        if (!re.test(val.dataItemValue)) {
          this.message.warning("数据项值必须为数字！");
          return false;
        }
        if (parseFloat(val.dataItemValue) >= 10000) {
          this.message.warning("数据项值必须小于10000！");
          return false;
        }
        if (val.dataItemMeasureValue && !re.test(val.dataItemMeasureValue)) {
          this.message.warning("数据项标准值必须为数字！");
          return false;
        }
        if (val.dataItemMeasureValue && parseFloat(val.dataItemMeasureValue) >= 10000) {
          this.message.warning("数据项标准值必须小于10000！");
          return false;
        }
        this.listData.push(val);
        if (this.tabIndex === 1) {
          let oldActionData = getLoc(this.userName + "_n").notActionList;
          //数组的替换
          oldActionData[this.nowIndex].trainData.push(val);
          //更新本地数据存储
          setLoc(this.userName + "_n", { "notActionList": JSON.parse(JSON.stringify(oldActionData)) });
        } else if (this.tabIndex === 2) {
          let oldTrainData = getLoc(this.userName + "_y").trainListData;
          //数组的替换
          oldTrainData[this.nowIndex].trainData.push(val);
          //更新本地数据存储
          setLoc(this.userName + "_y", { "trainListData": JSON.parse(JSON.stringify(oldTrainData)) });
        }
        this.message.success("新增一条数据项记录！");
      },
      //选择航天员
      chooseAstronaut(value) {
        this.astronautChecked = value;
        this.isAstronaut = true;
      },
      //选择航体员弹窗--取消
      cancelAstronautFn(val) {
        this.isAstronaut = val;
      },
      //选择航体员弹窗--确定
      saveAstronautFn(val) {
        this.astronautChoose = val;
        this.isAstronaut = false;
      },
      //删除数据
      deleteChildData(i) {
        this.$confirm('是否删除此条数据项记录，删除后数据不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listData.splice(i, 1);
          if(this.tabIndex === 1){
            let oldActionData = getLoc(this.userName + "_n").notActionList;
            oldActionData[this.nowIndex].trainData = this.listData;
            setLoc(this.userName + "_n", { "notActionList": JSON.parse(JSON.stringify(oldActionData)) });
          }else if(this.tabIndex === 2){
            let oldActionData = getLoc(this.userName + "_y").trainListData;
            oldActionData[this.nowIndex].trainData = this.listData;
            setLoc(this.userName + "_y", { "trainListData": JSON.parse(JSON.stringify(oldActionData)) });
          }
        }).catch(() => {
          this.message.info("已取消删除！");
        });
      },
      //修改数据项记录
      updateChildData() {

      },
      //修改航体员
      choosePerson(i) {
        this.changeIndex = i;
        this.isShowPeople = true;
      },
      //修改航体员弹窗--确定
      savePeopleFn(val) {
        if (!val.length > 0) {          ;
          this.$message({
            message: '请至少选择一个参训航天员',
            type: 'warning'
          });
          return false
        }
        this.isShowPeople = false;
        if (this.tabIndex === 1) {
          this.listData = getLoc(this.userName + "_n").notActionList[this.nowIndex].trainData;
          this.listData[this.changeIndex].joinAstronautNames = val;
          //修改选中航天员
          let oldActionData = getLoc(this.userName + "_n").notActionList;
          oldActionData[this.nowIndex].trainData[this.changeIndex].joinAstronautNames = val;
          setLoc(this.userName + "_n", { "notActionList": JSON.parse(JSON.stringify(oldActionData)) });
        } else if (this.tabIndex === 2) {
          this.listData = getLoc(this.userName + "_y").trainListData[this.nowIndex].trainData;
          this.listData[this.changeIndex].joinAstronautNames = val;
          let oldActionData = getLoc(this.userName + "_y").trainListData;
          oldActionData[this.nowIndex].trainData[this.changeIndex].joinAstronautNames = val;
          setLoc(this.userName + "_y", { "trainListData": JSON.parse(JSON.stringify(oldActionData)) });
        }
      },
      //修改航体员弹窗--取消
      cancelPeopleFn(val) {
        this.isShowPeople = false;
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      if (this.tabIndex === 1) {
        //获取航天员数据
        this.astronautNames = getLoc(this.userName + "_n").notActionList[this.nowIndex].joinAstronautNames;
        this.listData = getLoc(this.userName + "_n").notActionList[this.nowIndex].trainData;
      } else if (this.tabIndex === 2) {
        this.astronautNames = getLoc(this.userName + "_y").trainListData[this.nowIndex].joinAstronautNames;
        this.listData = getLoc(this.userName + "_y").trainListData[this.nowIndex].trainData;
      }
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang="less" scoped>
  .record {
    .content {
      width: 50%;
      margin: 0.2rem 0.2rem 0;
      overflow-y: auto;
      position: fixed;
      bottom: 0;
      top: 0.7rem;
      left: 8rem;
      .item {
        padding: 0.2rem 0.4rem;
        border: 1px solid #006699;
        margin-bottom: 0.2rem;
        dl {
          font-size: 0.26rem;
          dd {
            height: 0.4rem;
            line-height: 0.4rem;
            label {
              width: 3rem;
              display: inline-block;
            }
            .iconSize {
              font-size: 0.4rem;
              position: absolute;
              right: 0.2rem;
            }
          }
          dd.icn {
            position: relative;
          }
        }
      }
      .addRecord {
        text-align: center;
      }
    }
  }
</style>