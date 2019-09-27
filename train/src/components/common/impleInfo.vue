<template>
  <div class='info'>
    <v-info-header
      v-on:backFn="back"
      :titleData="infoChildData.title"
      :show="show"
    ></v-info-header>

    <div class="content">
      <div class="button-finish">
        <button
          class="normal-btn-lg fr"
          @click="doneFn"
        >实施完成</button>
      </div>
      <div class="list-wrap">
        <v-list-title>普通训练任务</v-list-title>
        <div class="item-info">
          <div class="tags-wrap">
            <div class="arrived">实到人员：</div>
            <div class="tags">
              <el-tag
                :class="{'active':item.isSignIn}"
                class="peopleTag"
                size="mini"
                v-for="(item,index) in infoChildData.tags"
                :key="item.trainImplementAstronautID"
                @click="tagFn(index)"
              >{{item.trainImplementAstronautName}}
                <span v-if="item.post !== ''">({{item.post}})</span>
              </el-tag>
            </div>
            <button
              class="normal-no-border fr tag-btn"
              @click="setPostFn"
            ><i class="el-icon-setting"></i>
              设置岗位</button>
          </div>
          <div class="peoples">
            <div class="p-left">
              <h3>主教员</h3>
              <div class="select-wrap">
                <el-select
                  size="mini"
                  v-model="firstName"
                  multiple
                  placeholder="请选择"
                  @change="changName"
                >
                  <el-option
                    v-for="item in infoChildData.teachList"
                    :key="item.chargeTeacherID"
                    :label="item.chargeTeacherName"
                    :value="item.chargeTeacherName"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="p-right">
              <h3>辅助教员</h3>
              <div class="select-wrap">
                <el-select
                  size="mini"
                  v-model="helpName"
                  multiple
                  placeholder="请选择"
                  @change="changHelpName"
                >
                  <el-option
                    v-for="item in infoChildData.helpTeachList"
                    :key="item.chargeTeacherID"
                    :label="item.chargeTeacherName"
                    :value="item.chargeTeacherName"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <v-train-info-content
        :content="infoChildData.trainList"
        :show="show"
        v-on:chooseStartTime="chooseStartTime"
        v-on:chooseEndTime="chooseEndTime"
        v-on:errorRecord="errorRecord"
      ></v-train-info-content>
      <div class="buttons">
        <button
          class="normal-btn-border-lg mr"
          @click="suggestion"
        >意见建议</button>
        <button
          class="normal-btn-border-lg mr"
          @click="recordFn"
        >数据项记录</button>
      </div>
    </div>
    <v-pop-box
      v-if="isShowBox"
      :popData="popData"
      :abnormalDate="abnormalDate"
      v-on:save="savePopFn"
      v-on:cancle="cancleFn"
      v-on:chooseTime="chooseTime"
    >
    </v-pop-box>
    <mt-datetime-picker
      ref="picker"
      type="datetime"
      v-model="dateVal"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      hour-format="{value} 时"
      minute-format="{value} 分"
      @confirm="handleConfirm"
      :endDate="new Date()"
    >
    </mt-datetime-picker>
  </div>
</template>

<script>
  import {
    getLoc, setLoc, formatDateMin
  } from '@/utils/common.js';
  import { mapMutations, mapState } from 'vuex';

  export default {
    data() {
      //这里存放数据
      return {
        infoChildData: {},//存储父组件传来的infoData
        faultIndex: 0,
        nowTime: '', //记录当前时间
        abnormalDate: '',
        firstName: [],
        helpName: [],
        dateVal: '',
        show: 0,
        isShowBox: false,
        popData: {
          'titleTotal': '新增',
          'options': [{
            'status': 3,
            'title': '时间',
            'placeholder': '点击选择时间',
            'val': 'abnormalDate'
          }, {
            'status': 1,
            'title': '异常说明',
            'placeholder': '请输入异常说明',
            'val': 'abnormalExplain'
          }, {
            'status': 1,
            'title': '异常产生对象',
            'placeholder': '请输入异常产生对象',
            'val': 'abnormalObject'
          }, {
            'status': 1,
            'title': '关键字',
            'placeholder': '请输入关键字',
            'val': 'keyword'
          }]
        }
      };
    },
    props: ['infoData'],
    //监听属性 类似于data概念
    computed: {
      ...mapState(['userInfo', 'nowIndex', 'tabIndex', 'userName'])
    },
    //监控data中的数据变化
    watch: {
      infoData: {
        handler(newValue, oldValue) {
          this.infoChildData = JSON.parse(JSON.stringify(newValue));
        },
        deep: true
      }
    },
    methods: {
      ...mapMutations(['_allData']),
      tagFn(i) {
        //判断是否有签到字段，有就改变，没有就添加
        if(this.infoChildData.tags[i].hasOwnProperty('isSignIn')) {
          this.infoChildData.tags[i].isSignIn = !this.infoChildData.tags[i].isSignIn;
        } else {
          this.infoChildData.tags[i].isSignIn = true;
        }

        if(this.tabIndex === 1) {
          //改变签到状态
          let oldActionData = getLoc(this.userName + '_n').notActionList;
          let arrLen = oldActionData[this.nowIndex].joinAstronautNames.length;
          //数组的替换
          oldActionData[this.nowIndex].joinAstronautNames.splice(0, arrLen, ...this.infoChildData.tags);
          //更新本地数据存储
          setLoc(this.userName + '_n', { "notActionList": JSON.parse(JSON.stringify(oldActionData)) });

          this.$emit('updateFn');
        } else if(this.tabIndex === 2) {
          //改变签到状态
          let oldTrainData = getLoc(this.userName + '_y').trainListData;
          let arrLen = oldTrainData[this.nowIndex].joinAstronautNames.length;
          //数组的替换
          oldTrainData[this.nowIndex].joinAstronautNames.splice(0, arrLen, ...this.infoChildData.tags);
          //更新本地数据存储
          setLoc(this.userName + '_y', { "trainListData": JSON.parse(JSON.stringify(oldTrainData)) });
        }

      },
      //返回
      back() {
        this.$emit('back');
      },
      //意见建议
      suggestion() {
        this.$emit('suggestion');
      },
      //数据项记录
      recordFn() {
        this.$emit('recordFn');
      },
      //异常记录
      errorRecord(index) {
        this.faultIndex = index;
        this.isShowBox = true;
      },
      //设置岗位
      setPostFn() {
        this.$emit('setPostFn');
      },
      //开始时间
      chooseStartTime(i) {
        this.nowTime = this.util.formatDate(new Date().getTime(), 7);
        this.infoChildData.trainList[i].trainContentStartDate = this.nowTime;
        if(this.tabIndex === 1) {
          let oldActionData = getLoc(this.userName + '_n').notActionList;;
          let arrLen = oldActionData[this.nowIndex].trainImpleData.trainList.length;
          //数组的替换
          oldActionData[this.nowIndex].trainImpleData.trainList.splice(0, arrLen, ...this.infoChildData.trainList);
          //更新本地数据存储
          setLoc(this.userName + '_n', { "notActionList": JSON.parse(JSON.stringify(oldActionData)) });

        } else if(this.tabIndex === 2) {
          let oldTrainData = getLoc(this.userName + '_n').trainListData;
          let arrLen = oldTrainData[this.nowIndex].trainImpleData.trainList.length;
          //数组的替换
          oldTrainData[this.nowIndex].trainImpleData.trainList.splice(0, arrLen, ...this.infoChildData.trainList);
          //更新本地数据存储
          setLoc(this.userName + '_y', { "trainListData": JSON.parse(JSON.stringify(oldTrainData)) });
        }
      },
      //结束时间
      chooseEndTime(i) {
        this.nowTime = this.util.formatDate(new Date().getTime(), 7);
        this.infoChildData.trainList[i].trainContentEndDate = this.nowTime;
        if(this.tabIndex === 1) {
          let oldActionData = getLoc(this.userName + '_n').notActionList;
          let arrLen = oldActionData[this.nowIndex].trainImpleData.trainList.length;
          //数组的替换
          oldActionData[this.nowIndex].trainImpleData.trainList.splice(0, arrLen, ...this.infoChildData.trainList);
          //更新本地数据存储
          setLoc(this.userName + '_n', { "notActionList": JSON.parse(JSON.stringify(oldActionData)) });

        } else if(this.tabIndex === 2) {
          let oldTrainData = getLoc(this.userName + '_y').trainListData;
          let arrLen = oldTrainData[this.nowIndex].trainImpleData.trainList.length;
          //数组的替换
          oldTrainData[this.nowIndex].trainImpleData.trainList.splice(0, arrLen, ...this.infoChildData.trainList);
          //更新本地数据存储
          setLoc(this.userName + '_y', { "trainListData": JSON.parse(JSON.stringify(oldTrainData)) });
        }
      },
      doneFn() {
        if(this.tabIndex === 1) {
          //未实施数据
          let oldActionData = getLoc(this.userName + '_n').notActionList;

          //更改未实施数据的实施状态
          oldActionData[this.nowIndex].trainOrNot = true;
          //判断已实施里面是否有数据
          if(getLoc(this.userName + '_y')) {
            //获取已实施数据
            let trainData = getLoc(this.userName + '_y').trainListData;
            //向已实施数据里面添加数据
            trainData.push(oldActionData[this.nowIndex]);
            //将已实施数据更新到缓存
            setLoc(this.userName + '_y', { "trainListData": trainData });
          } else {
            //第一次将数据存到已实施里
            let arr = [];
            arr.push(oldActionData[this.nowIndex]);
            setLoc(this.userName + '_y', { "trainListData": arr });
          }
          //在未实施数据里删除已实施数据
          oldActionData.splice(this.nowIndex, 1);
          //更新未实施数据
          setLoc(this.userName + '_n', { "notActionList": JSON.parse(JSON.stringify(oldActionData)) });
          this.$emit('doneFn');
        } else if(this.tabIndex === 2) {
          this.$router.push('./train');
        }
      },
      //辅助教员
      changHelpName(v) {
        if(this.tabIndex === 1) {
          let oldActionData = getLoc(this.userName + '_n').notActionList;

          oldActionData[this.nowIndex].auxiliaryLecturerName = v.toString();
          //更新未实施数据
          setLoc(this.userName + '_n', { "notActionList": oldActionData });

        } else if(this.tabIndex === 2) {
          let oldTrainData = getLoc(this.userInfo.username + '_y').trainListData;
          oldTrainData[this.nowIndex].auxiliaryLecturerName = v.toString;
          //更新未实施数据
          setLoc(getLoc(this.userName + '_y'), { "trainListData": oldTrainData });
        }
      },
      //主教员
      changName(v) {
        if(this.tabIndex === 1) {
          let oldActionData = getLoc(this.userName + '_n').notActionList;
          oldActionData[this.nowIndex].chargeTeacherName = v.toString();
          //更新未实施数据
          setLoc(this.userName + '_n', { "notActionList": oldActionData });
        } else if(this.tabIndex === 2) {
          let oldTrainData = getLoc(this.userInfo.username + '_y').trainListData;
          oldTrainData[this.nowIndex].chargeTeacherName = v.toString();
          //更新已实施数据
          setLoc(getLoc(this.userInfo.username + '_y'), { "trainListData": oldTrainData });
        }

      },
      //保存
      savePopFn(val) {
        this.isShowBox = false;
        if(!val.abnormalDate) {
          this.message.warning("请选择异常时间");
          return false;
        }
        if(!val.abnormalExplain) {
          this.message.warning("请输入异常说明");
          return false;
        }
        if(!val.abnormalObject) {
          this.message.warning("请输入异常产生对象");
          return false;
        }
        if(this.tabIndex === 1) {
          let oldActionData = getLoc(this.userName + '_n').notActionList;
          //获取未实施对应异常列表数据
          oldActionData[this.nowIndex].trainImpleData.trainList[this.faultIndex].faultInfo.push(val);

          setLoc(this.userName + '_n', { "notActionList": JSON.parse(JSON.stringify(oldActionData)) });
          //更新数据
          this.infoChildData.trainList = getLoc(this.userInfo.username + '_n').notActionList[this.nowIndex].trainImpleData.trainList;
        } else if(this.tabIndex === 2) {
          let trainData = getLoc(this.userName + '_y').trainListData;
          //获取已实施对应异常列表数据
          let trainList = trainData[this.nowIndex].trainImpleData.trainList[this.faultIndex].faultInfo;
          trainList.push(this.errorData);
          setLoc(this.userName + '_y', { "trainListData": JSON.parse(JSON.stringify(trainData)) });
        }
      },
      //取消
      cancleFn(val) {
        this.isShowBox = val;
      },
      chooseTime() {
        this.$refs.picker.open();
        this.dateVal = new Date();
      },
      handleConfirm(value) {
        this.abnormalDate = formatDateMin(value);
        // this.popData.options[0].val = formatDateMin(value);
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.infoChildData = JSON.parse(JSON.stringify(this.infoData));
      if(this.infoChildData.chargeTeacherName) {
        this.firstName = this.infoChildData.chargeTeacherName.toString().split(',');
        this.helpName = this.infoChildData.auxiliaryLecturerName.toString().split(',');
      }
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    updated() {
    }, //生命周期 - 更新之后
    activated() {
      //   console.log('actived');
    }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang="less" scoped>
  @import "../../style/global.less";
  .info {
    .content {
      padding: 0.1rem 0.73rem 0.5rem 0.78rem;
      position: fixed;
      bottom: 0;
      right: 0;
      top: 0.7rem;
      left: 1.2rem;
      overflow-y: auto;
      background: #f5f6fa;
      .button-finish {
        height: 1rem;
        line-height: 1rem;
        button {
          margin: 0.24rem 0;
        }
      }
      .list-wrap {
        border: 1px solid @c-border;
        margin-bottom: 0.3rem;
        background: #fff;
        // padding-bottom: 0.1rem;
        .item-info {
          //   padding: 0.05rem 0.35rem 0rem 0.35rem;
          display: flex;
          border-top: 1px solid @c-border;
          .tags-wrap {
            flex: 1;
            border-right: 1px solid @c-border;
            padding: 0.26rem 0 0.24rem 0.2rem;
            .arrived {
              font-size: 0.2rem;
              font-weight: bold;
              height: 0.4rem;
              line-height: 0.4rem;
              padding-left: 0.26rem;
            }
            .tag-btn {
              margin: 0.06rem 0.36rem 0.06rem 0;
            }
            .tags {
              height: 0.62rem;
              line-height: 0.62rem;
              padding-left: 0.2rem;
              float: left;
              span {
                display: inline-block;
                font-size: 0.25rem;
              }
              .nicon {
                margin-top: 0.03rem;
              }
              .peopleTag {
                margin-right: 0.1rem;
                background: none;
                border: 1px solid #eaedf4;
                color: #4c4f56;
                height: 0.36rem;
                line-height: 0.36rem;
              }
              .peopleTag.active {
                border-color: #b6eddc;
                background: #eefbf7;
              }
            }
          }
          .peoples {
            width: 4.9rem;
            display: flex;
            padding: 0.26rem 0 0.24rem 0;
            .select-wrap {
              margin: 0 0.1rem;
            }
            .p-left {
              flex: 1;
              h3 {
                height: 0.4rem;
                line-height: 0.4rem;
                font-size: 0.2rem;
                text-align: center;
              }
              .el-select {
                height: 0.62rem;
                line-height: 0.62rem;
              }
            }
            .p-right {
              flex: 1;
              h3 {
                height: 0.4rem;
                line-height: 0.4rem;
                font-size: 0.2rem;
                text-align: center;
              }
              .el-select {
                height: 0.62rem;
                line-height: 0.62rem;
              }
            }
          }
        }
        .info-wrap {
          padding: 0.25rem 0 0.25rem 0.15rem;
          span {
            display: inline-block;
            font-size: 0.24rem;
          }
          span.text {
            height: 0.5rem;
            line-height: 0.5rem;
            width: 7rem;
          }
          .set-time {
            display: inline-block;
            .btn-set-time {
              margin-right: 0.5rem;
            }
            span {
              display: inline-block;
              margin-right: 0.4rem;
            }
          }
        }
        .fault-list {
          .fault-title {
            font-size: 0.2rem;
            height: 0.6rem;
            line-height: 0.6rem;
            padding-left: 0.15rem;
            color: #e82b34;
          }
          .fault-info {
            padding: 0.1rem 0.3rem;
            .flex-wrap {
              display: flex;
              span {
                font-size: 0.24rem;
                &.text {
                  height: 0.5rem;
                  line-height: 0.5rem;
                  width: 8rem;
                }
                &.time {
                  height: 0.5rem;
                  line-height: 0.5rem;
                  width: 3rem;
                }
                &.obj {
                  height: 0.5rem;
                  line-height: 0.5rem;
                  flex: 1;
                  text-align: right;
                }
              }
            }
            .keyword {
              color: #808383;
              font-size: 0.2rem;
              height: 0.32rem;
              line-height: 0.32rem;
            }
          }
        }
        &:last-child {
          color: #f00 !important;
        }
      }
    }
    .buttons {
      text-align: right;
      line-height: 1rem;
    }
  }
</style>
<style>
  /* .select-wrap .el-input--mini .el-input__inner {
                    height: 0.36rem !important;
                    line-height: 0.36rem !important;
                    font-size: 0.18rem !important;
                  } */
  .select-wrap .el-select-dropdown__list {
    padding: 0 !important;
  }
  .el-select-dropdown__item {
    height: 0.36rem !important;
    line-height: 0.36rem !important;
  }
  .el-popper[x-placement^="bottom"] {
    margin-top: 0 !important;
  }
  .el-select-dropdown__item {
    font-size: 0.18rem !important;
  }
  .el-input--mini .el-input__icon {
    line-height: 0.36rem !important;
  }
  .el-select .el-input__inner {
    padding-right: 0.3rem !important;
  }
  .el-select .el-input .el-select__caret {
    font-size: 0.14rem !important;
  }
</style>