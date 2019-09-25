<template>
  <div class='record'>
    <v-info-header
      v-on:backFn="back"
      :titleData="title"
    ></v-info-header>
    <keep-alive>
      <v-data-record
        :listData="listData"
        v-on:addRole="addRole"
        v-on:choosePerson="choosePerson"
      ></v-data-record>
    </keep-alive>
    <v-pop-box
      v-if="isShowBox"
      :popData="popData"
      v-on:save="saveFn"
      v-on:cancle="cancleFn"
    ></v-pop-box>
    <v-choose-people
      v-if="isShowPeople"
      v-on:save="savePeopleFn"
      v-on:cancle="cancelPeopleFn"
      :popTitle="popTitle"
      :changeIndex="changeIndex"
    ></v-choose-people>
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
        isShowBox: false,
        isShowPeople: false,
        popTitle: "选择参训航天员",
        listData: [],
        changeIndex: '-1',
        popData: {
          'titleTotal': '新增',
          'options': [{
            'status': 1,
            'check':true,
            'title': '数据项目名称',
            'placeholder': '请输入数据项目名称',
            'val': 'dataItemName'
          }, {
            'status': 1,
            'title': '参训航天员名称',
            'placeholder': '请输入参训航天员',
            'val': 'joinAstronautNames'
          }, {
            'status': 1,
            'title': '数据项说明',
            'check':true,
            'placeholder': '请输入数据项说明',
            'val': 'dataItemDesc'
          }, {
            'status': 1,
            'title': '数据项值',
            'check':true,
            'placeholder': '请输入数据项值',
            'val': 'dataItemValue'
          }, {
            'status': 1,
            'title': '数据项标准值',
            'check':true,
            'placeholder': '请输入数据项标准值',
            'val': 'dataItemMeasureValue'
          }, {
            'status': 2,
            'title': '数据项单位',
            'check':true,
            'placeholder': '请选择数据单位',
            'val': 'dataItemUnit',
            'list': [
              {
                value: '米',
                label: '米'
              }, {
                value: '个',
                label: '个'
              }]
          }]
        }
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['nowIndex', 'userInfo', 'tabIndex'])
    },
    //监控data中的数据变化
    watch: {
      listData: {
        handler(newValue, oldValue) {
          if(this.tabIndex === 1) {
            let oldActionData = getLoc(this.userInfo.userID).notActionData;
            let arrLen = getLoc(this.userInfo.userID).notActionData[this.nowIndex].trainData.length;
            //数组的替换
            oldActionData[this.nowIndex].trainData.splice(0, arrLen, ...newValue);
            //更新本地数据存储
            setLoc(getLoc('userInfo').userID, { "notActionData": JSON.parse(JSON.stringify(oldActionData)), "loadTime": getLoc(this.userInfo.userID).loadTime });
          } else if(this.tabIndex === 2) {
            let oldTrainData = getLoc(this.userInfo.personID).trainListData;
            let arrLen = getLoc(this.userInfo.personID).trainListData[this.nowIndex].trainData.length;
            //数组的替换
            oldTrainData[this.nowIndex].trainData.splice(0, arrLen, ...newValue);
            //更新本地数据存储
            setLoc(getLoc('userInfo').personID, { "trainListData": JSON.parse(JSON.stringify(oldTrainData)) });
          }
        },
        deep: true
      }
    },
    //方法集合
    methods: {
      back() {
        this.$router.go(-1);
      },
      addRole() {
        this.isShowBox = true;
      },
      //保存
      saveFn(val) {        
        console.log(val);
        var re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字
        for(var i=0;i<this.popData.options.length;i++){
          var names = this.popData.options[i].val;
          var checks = this.popData.options[i].check;
          if(val[names] == undefined && checks){
            this.$message({
              message: this.popData.options[i].placeholder,
              type: 'warning'
            });
            return false
          }else if(!re.test(val.dataItemValue)){
            this.$message({
              message: "数据项值必须为数字",
              type: 'warning'
            });
            return false
          }else if(!re.test(val.dataItemMeasureValue)){
            this.$message({
              message: "数据项标准值必须为数字",
              type: 'warning'
            });
            return false
          }
        }
        this.isShowBox = false;        
        this.listData.push(val);
      },
      //取消
      cancleFn(val) {
        this.isShowBox = val;
      },
      //选人
      choosePerson(i) {
        this.isShowPeople = true;
        this.changeIndex = i;
      },
      //选人弹窗 确定
      savePeopleFn(val) {
        if(!val.length>0){;
          this.$message({
            message: '请至少选择一个参训航天员',
            type: 'warning'
          });
          return false
        }
        this.isShowPeople = false;
        if(this.tabIndex === 1) {
          this.listData = getLoc(this.userInfo.userID).notActionData[this.nowIndex].trainData;
          this.listData[this.changeIndex].joinAstronautNames = val.toString();
        } else if(this.tabIndex === 2) {
          this.listData = getLoc(this.userInfo.personID).trainListData[this.nowIndex].trainData;
          this.listData[this.changeIndex].joinAstronautNames = val.toString();
        }
      },
      //选人弹窗 取消
      cancelPeopleFn(val) {
        this.isShowPeople = false;
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      if(this.tabIndex === 1) {
        this.listData = getLoc(this.userInfo.userID).notActionData[this.nowIndex].trainData;
      } else if(this.tabIndex === 2) {
        this.listData = getLoc(this.userInfo.personID).trainListData[this.nowIndex].trainData;
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
      margin: 0.1rem 0.2rem;
      overflow-y: auto;
      position: fixed;
      bottom: 0;
      right: 0.52rem;
      top: 0.7rem;
      left: 1.5rem;
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