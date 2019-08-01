<template>
  <div class='record'>
    <v-info-header
      v-on:backFn="back"
      :titleData="title"
    ></v-info-header>
    <v-data-record
      :listData="listData"
      v-on:addRole="addRole"
      v-on:choosePerson="choosePerson"
    ></v-data-record>
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
    ></v-choose-people>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import {
    getLoc
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
        popData: {
          'titleTotal': '新增',
          'options': [{
            'status': 1,
            'title': '数据项目名称',
            'placeholder': '请输入数据项目名称',
            'val': 'dataItemName'
          }, {
            'status': 1,
            'title': '参训航天员ID',
            'placeholder': '请输入参训航天员ID',
            'val': 'joinAstronautIDs'
          }, {
            'status': 1,
            'title': '数据项说明',
            'placeholder': '请输入数据项说明',
            'val': 'dataItemDesc'
          }, {
            'status': 1,
            'title': '数据项值',
            'placeholder': '请输入数据项值',
            'val': 'dataItemValue'
          }, {
            'status': 1,
            'title': '数据项标准值',
            'placeholder': '请输入数据项标准值',
            'val': 'dataItemMeasureValue'
          }, {
            'status': 2,
            'title': '数据项单位',
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
      ...mapState(['nowIndex', 'userIndex', 'userId'])
    },
    //监控data中的数据变化
    watch: {},
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
        this.isShowBox = false;
        // console.log(val);
        this.listData.push(val);
      },
      //取消
      cancleFn(val) {
        this.isShowBox = val;
      },
      //选人
      choosePerson(i) {
        this.isShowPeople = true;
      },
      //选人弹窗 确定
      savePeopleFn(val) {
        this.isShowPeople = false;
        console.log(val);
        this.listData = getLoc(this.userId).notActionData[this.nowIndex].trainData;
      },
      //选人弹窗 取消
      cancelPeopleFn(val) {
        this.isShowPeople = false;
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.listData = getLoc(this.userId).notActionData[this.nowIndex].trainData;
      //   console.log(this.listData, 'data');
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
            span {
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