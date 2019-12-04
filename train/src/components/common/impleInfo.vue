<template>
  <div class="info">
    <v-info-header
      v-on:backFn="back"
      :titleData="infoChildData.title"
      :show="show"
    ></v-info-header>

    <div class="content">
      <div class="button-finish">
        <i
          class="el-icon-info"
          v-on:click="openTag"
          v-if="this.tabIndex == 1"
          v-show="tabIndex === 1"
        ></i>
        <el-divider
          direction="vertical"
          v-if="this.tabIndex == 1"
          v-show="tabIndex === 1"
        ></el-divider>
        <el-tag v-show="isTag" size="mini" type="info" v-if="this.tabIndex == 1"
          >点击实施完成后可上传数据</el-tag
        >
        <button
          v-show="tabIndex === 1"
          class="normal-btn-lg fr"
          @click="confirmDoneFn"
        >
          实施完成
        </button>
        <el-badge
          :value="suggNum"
          type="primary"
          :max="99"
          class="badgeNum"
          v-if="suggNum !== 0"
        >
          <button class="sugg-rec-btu" @click="suggestion">意见建议</button>
        </el-badge>
        <button class="sugg-rec-btu" v-else @click="suggestion">
          意见建议
        </button>
        <el-badge
          :value="recordNum"
          type="primary"
          :max="99"
          class="badgeNum"
          v-if="recordNum !== 0"
        >
          <button class="sugg-rec-btu" @click="recordFn">数据项记录</button>
        </el-badge>
        <button class="sugg-rec-btu" v-else @click="recordFn">
          数据项记录
        </button>
      </div>
      <div class="list-wrap">
        <v-list-title>普通训练任务</v-list-title>
        <div class="item-info">
          <div class="tags-wrap">
            <div class="arrived">实到人员：</div>
            <div class="tags">
              <el-tag
                :class="{ active: item.dateTime }"
                class="peopleTag"
                size="mini"
                v-for="(item, index) in infoChildData.tags"
                :key="item.trainImplementAstronautID"
                @click="tagFn(index)"
                >{{ item.trainImplementAstronautName }}
                <span
                  v-if="item.label === '' || item.label === 'undefined'"
                ></span>
                <span v-else>({{ item.label }})</span>
              </el-tag>
            </div>
            <button class="normal-no-border fr tag-btn" @click="setPostFn">
              <i class="el-icon-setting"></i> 设置岗位
            </button>
          </div>
          <div class="peoples">
            <div class="p-left">
              <h3>主教员</h3>
              <div class="select-wrap">
                <el-select
                  v-model="firstName"
                  size="small"
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
                  v-model="helpName"
                  size="small"
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
        :trainWay="infoChildData.trainWay"
        v-on:chooseComplete="chooseComplete"
        v-on:chooseStartTime="chooseStartTime"
        v-on:chooseEndTime="chooseEndTime"
        v-on:updateTime="updateTime"
        v-on:errorRecord="errorRecord"
        v-on:updateEndTime="updateEndTime"
      ></v-train-info-content>
    </div>
    <!-- 异常弹框 -->
    <v-pop-box
      v-show="isShowBox"
      :popData="popData"
      :abnormalDate="abnormalDate"
      :abnormalList="abnormalList"
      v-on:save="savePopFn"
      v-on:cancle="cancleFn"
      v-on:chooseTime="chooseTime"
    >
    </v-pop-box>
    <!-- 训练内容修改时间弹窗 -->
    <v-pop-box
      v-show="contentBox"
      :popData="timeData"
      :trainContentStartDate="trainContentStartDate"
      :trainContentTiming="trainContentTiming"
      :trainContentEndDate="trainContentEndDate"
      v-on:save="saveContantTime"
      v-on:cancle="cancleFn"
      v-on:chooseStartDate="chooseStartDate"
      v-on:chooseTiming="chooseTiming"
      v-on:chooseEndDate="chooseEndDate"
    >
    </v-pop-box>
    <!-- 异常时间选择器年月日时分 -->
    <mt-datetime-picker
      ref="picker"
      type="datetime"
      v-model="dateval"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      hour-format="{value} 时"
      minute-format="{value} 分"
      @confirm="handleConfirm"
      :endDate="new Date()"
    >
    </mt-datetime-picker>
    <!-- 训练内容时间选择器时分 -->
    <mt-datetime-picker
      ref="pickerHour"
      type="time"
      v-model="datevalHour"
      hour-format="{value} 时"
      minute-format="{value} 分"
      @confirm="confirmContentDate"
    >
    </mt-datetime-picker>
  </div>
</template>

<script>
  import {
    getLoc, setLoc, formatDateMin, formatDate
  } from '@/utils/common.js';
  import { mapMutations, mapState } from 'vuex';

  export default {
    data() {
      //这里存放数据
      return {
        abnormalList: [], //异常类型所有数据
        infoChildData: {},//存储父组件传来的infoData
        faultIndex: 0,//异常数据对应数组下标
        dateval: '',//时间选择器默认时间为当前时间--年月日时分
        datevalHour: '',//时间选择器默认时间为当前时间--时分
        nowTime: '', //记录当前时间
        abnormalDate: '',//异常时间
        contentBox: false,//修改训练内容时间弹框
        contentTimeIndex: 0,//训练内容时间对应数组下标
        firstName: [],
        helpName: [],
        show: 0,
        isShowBox: false,
        isTag: false,
        suggNum: 0,
        recordNum: 0,
        nowTiming: false,//判断此条训练实施内是否正在计时
        popData: {
          'titleTotal': '新增训练实施异常信息',
          'options': [{
            'status': 4,
            'title': '异常类型',
            'placeholder': '请选择异常类型',
            'val': 'abnormalType',
            'check': true
          },
          {
            'status': 3,
            'title': '异常产生时间',
            'placeholder': '点击选择时间',
            'val': 'abnormalDate',
            'check': true
          },
          {
            'status': 1,
            'title': '异常产生对象',
            'placeholder': '请输入异常产生对象',
            'val': 'abnormalObject',
            'check': true,
            'maxLength': 35,
          },
          {
            'status': 1,
            'title': '关键字',
            'placeholder': '请输入关键字',
            'val': 'keyword',
            'maxLength': 32
          },
          {
            'status': 1,
            'title': '异常说明',
            'placeholder': '请输入异常说明',
            'val': 'abnormalExplain',
            'check': 'true',
            'maxLength': 500,
            'isTextarea': 'textarea'
          }]
        },
        timeData: {
          'titleTotal': '修改时间',
          'options': [{
            'status': 5,
            'title': '开始时间',
            'placeholder': '点击修改开始时间',
            'val': 'trainContentStartDate'
          }, {
            'status': 6,
            'title': '计时时间',
            'placeholder': '点击修改计时时间',
            'val': 'trainContentTiming'
          }, {
            'status': 7,
            'title': '结束时间',
            'placeholder': '点击修改结束时间',
            'val': 'trainContentEndDate'
          }]
        },
        trainContentStartDate: '',//开始时间
        trainContentTiming: '',//计时时间
        trainContentEndDate: '',//结束时间
        whichContentTime: '',
        newTimer: null
      };
    },
    props: ['infoData'],
    //监听属性 类似于data概念
    computed: {
      ...mapState(['userInfo', 'nowIndex', 'tabIndex', 'userName', 'timer', 'timeFlag', 'timeIndex', 'isTimingNow', 'unfinishedTime' ,'unfinishedTimeIndex'])
    },
    //监控data中的数据变化
    watch: {
      infoData: {
        handler(newValue, oldValue) {
          this.infoChildData = JSON.parse(JSON.stringify(newValue));
        },
        deep: true
      },
      timer: {
        handler(newValue, oldValue) {
          let oldActionData = '';
          if (this.tabIndex === 1) {
            oldActionData = getLoc(this.userName + '_n').notActionList;
          } else if (this.tabIndex === 2) {
            oldActionData = getLoc(this.userName + '_y').trainListData;
          }
          if (oldActionData[this.nowIndex].trainImpleData.trainList.length > this.timeIndex && oldActionData[this.nowIndex].trainImpleData.trainList[this.timeIndex].isTiming) {
            this.infoChildData.trainList[this.timeIndex].trainContentTiming = this.timer;
            if(this.tabIndex === 1){
              oldActionData[this.nowIndex].trainImpleData.trainList[this.timeIndex].trainContentTiming = this.timer;
              oldActionData[this.nowIndex].trainImpleData.trainList[this.timeIndex].trainContentTime = this.infoChildData.trainList[this.timeIndex].trainContentTime;
              setLoc(this.userName + '_n', { "notActionList": JSON.parse(JSON.stringify(oldActionData)) });
            }else if(this.tabIndex === 2){
              oldActionData[this.nowIndex].trainImpleData.trainList[this.timeIndex].trainContentTiming = this.timer;
              oldActionData[this.nowIndex].trainImpleData.trainList[this.timeIndex].trainContentTime = this.infoChildData.trainList[this.timeIndex].trainContentTime;
              setLoc(this.userName + '_y', { "trainListData": JSON.parse(JSON.stringify(oldActionData)) });
            }
          }
        }
      },
      isShowBox: {
        handler(newValue, oldValue) {
          if (!newValue) {
            plus.key.removeEventListener("backbutton",onPlusReady);
            plus.key.addEventListener("backbutton",onBack => {
              this.$router.go(-1);
            });
          }
        }
      },
      contentBox: {
        handler(newValue, oldValue) {
          if (!newValue) {
            plus.key.removeEventListener("backbutton",onPlusReady);
            plus.key.addEventListener("backbutton",onBack => {
              this.$router.go(-1);
            });
          }
        }
      }
    },
    methods: {
      ...mapMutations(['_allData', '_timer', '_timeFlag', '_timeIndex', '_isTimingNow', '_unfinishedTime', '_unfinishedTimeIndex']),
      /**
       * 理论课是否完成
       */
      chooseComplete(i, val) {
        if (val == 2) {
          this.infoChildData.trainList[i].radio = val;
          this.infoChildData.trainList[i].trainContentEndDate = formatDateMin(new Date());

        }
        if (val == 1) {
          this.infoChildData.trainList[i].radio = val;
          this.infoChildData.trainList[i].trainContentEndDate = '';
        }
        let oldActionData = '';
        if (this.tabIndex === 1) {
          oldActionData = getLoc(this.userName + '_n').notActionList;
        } else if (this.tabIndex === 2) {
          oldActionData = getLoc(this.userName + '_y').trainListData;
        }
        //数组的替换
        oldActionData[this.nowIndex].trainImpleData.trainList[i].trainContentEndDate = this.infoChildData.trainList[i].trainContentEndDate;
        oldActionData[this.nowIndex].trainImpleData.trainList[i].radio = this.infoChildData.trainList[i].radio;
        if (this.tabIndex === 1) {
          setLoc(this.userName + '_n', { "notActionList": JSON.parse(JSON.stringify(oldActionData)) });
        } else if (this.tabIndex === 2) {
          setLoc(this.userName + '_y', { "trainListData": JSON.parse(JSON.stringify(oldActionData)) });
        }
        this.$emit('updateComplete', this.infoChildData);
      },
      //补0操作
      toDub(n) {
        if (n < 10) {
          return "0" + n;
        }
        else {
          return "" + n;
        }
      },
      /**
      * 修改计时耗时
      */
      changeTiming(i, val) {
        this.infoChildData.trainList[i].trainContentTiming = val;
        let startTime = this.infoChildData.trainList[i].trainContentStartDate.split(":");
        let endTime = this.infoChildData.trainList[i].trainContentEndDate.split(":");
        let timeArr = val.split(":");
        endTime[0] = parseInt(timeArr[0]) + parseInt(startTime[0]);
        if (endTime[0] >= 24) {
          endTime[0] = parseInt(endTime[0]) - 24;
        }
        endTime[1] = parseInt(timeArr[1]) + parseInt(startTime[1]);
        if (endTime[1] >= 60) {
          endTime[1] -= 60;
          endTime[0] = parseInt(endTime[0]) + 1;
        }
        this.infoChildData.trainList[i].trainContentEndDate = this.toDub(endTime[0]) + ":" + this.toDub(endTime[1])/*+":"+this.toDub(endTime[2])*/;
        this.infoChildData.trainList[i].trainContentTime = timeArr[0] * 3600000 + timeArr[1] * 60000;
        return this.infoChildData.trainList[i].trainContentEndDate;
      },

      /**
       * 修改开始和结束时间
       */
      changeStartEndTime(i, end, start) {
        //获取修改后的结束时间和开始时间差毫秒数
        let t = new Date("1970/01/01 " + end) - new Date("1970/01/01 " + start);
        //毫秒转化
        if (t > 0) {
          let hour = Math.floor((t / 3600000) % 24)
          let min = Math.floor((t / 60000) % 60)
          // let sec = Math.floor((t / 1000) % 60)
          hour = hour < 10 ? '0' + hour : hour
          min = min < 10 ? '0' + min : min
          // sec = sec < 10 ? '0' + sec : sec
          let format = hour + ':' + min/*+":"+sec*/
          this.infoChildData.trainList[i].trainContentTiming = format
          //存数据
          let oldActionData;
          if (this.tabIndex === 1) {
            oldActionData = getLoc(this.userName + '_n').notActionList;
          } else if (this.tabIndex === 2) {
            oldActionData = getLoc(this.userName + '_y').trainListData;
          }
          this.infoChildData.trainList[i].trainContentStartDate = start;
          this.infoChildData.trainList[i].trainContentEndDate = end;
          this.infoChildData.trainList[i].trainContentTime = t;
          return this.infoChildData.trainList[i].trainContentTiming;
        } else {
          this.message.warning("结束时间小于等于开始时间！");
        }
      },
      //开始计时
      startTime(i) {
        this.infoChildData.trainList[i].trainContentTiming = '';
        this.infoChildData.trainList[i].trainContentTime = 0;
        this.infoChildData.trainList[i].isTiming = true;
        this.$emit('updateTiming', this.infoChildData);
        this._timeIndex(i);
        this._unfinishedTime(this.tabIndex);
        this._unfinishedTimeIndex(this.nowIndex);
        // this["time"] = setInterval(_ => {
        this.newTimer = setInterval(_ => {
          this.infoChildData.trainList[i].trainContentTime += 1000;
          let t = this.infoChildData.trainList[i].trainContentTime;
          if (t > 0) {
            let hour = Math.floor((t / 3600000) % 24);
            let min = Math.floor((t / 60000) % 60);
            let sec = Math.floor((t / 1000) % 60);
            hour = hour < 10 ? '0' + hour : hour;
            min = min < 10 ? '0' + min : min;
            sec = sec < 10 ? '0' + sec : sec;
            let format = hour + ':' + min + ":" + sec;
            this._timer(format);
            this.infoChildData.trainList[this.timeIndex].trainContentTiming = this.timer;
            this.infoChildData.trainList[this.timeIndex].trainContentTime = t;
          }
        }, 1000);
        this._timeFlag(this[('time')]);
      },
      //结束计时
      stopTime(i) {  //结束
        this.infoChildData.trainList[i].isTiming = false;
        this[('time')] = this.timeFlag;
        // clearInterval(this[('time')]);
        clearInterval(this.newTimer);
        this._unfinishedTime(-1);
        this._unfinishedTimeIndex(-1);
        if (this.tabIndex === 1) {
          let oldActionData = getLoc(this.userName + '_n').notActionList;
          let arrLen = oldActionData[this.nowIndex].trainImpleData.trainList.length;
          //数组的替换
          oldActionData[this.nowIndex].trainImpleData.trainList.splice(0, arrLen, ...this.infoChildData.trainList);
          //更新本地数据存储
          setLoc(this.userName + '_n', { "notActionList": JSON.parse(JSON.stringify(oldActionData)) });
        } else if (this.tabIndex === 2) {
          let oldTrainData = getLoc(this.userName + '_y').trainListData;
          let arrLen = oldTrainData[this.nowIndex].trainImpleData.trainList.length;
          //数组的替换
          oldTrainData[this.nowIndex].trainImpleData.trainList.splice(0, arrLen, ...this.infoChildData.trainList);
          //更新本地数据存储
          setLoc(this.userName + '_y', { "trainListData": JSON.parse(JSON.stringify(oldTrainData)) });
        }
      },
      tagFn(i) {
        //判断是否有签到字段，有就改变，没有就添加
        if (this.infoChildData.tags[i].hasOwnProperty('isSignIn')) {
          this.infoChildData.tags[i].isSignIn = !this.infoChildData.tags[i].isSignIn;
        } else {
          this.infoChildData.tags[i].isSignIn = true;
        }
        if (this.tabIndex === 1) {
          //改变签到状态
          let oldActionData = getLoc(this.userName + '_n').notActionList;
          let arrLen = oldActionData[this.nowIndex].joinAstronautNames.length;
          //数组的替换
          oldActionData[this.nowIndex].joinAstronautNames.splice(0, arrLen, ...this.infoChildData.tags);
          //更新本地数据存储
          setLoc(this.userName + '_n', { "notActionList": JSON.parse(JSON.stringify(oldActionData)) });
          this.$emit('updateFn');
        } else if (this.tabIndex === 2) {
          //改变签到状态
          let oldTrainData = getLoc(this.userName + '_y').trainListData;
          let arrLen = oldTrainData[this.nowIndex].joinAstronautNames.length;
          //数组的替换
          oldTrainData[this.nowIndex].joinAstronautNames.splice(0, arrLen, ...this.infoChildData.tags);
          //更新本地数据存储
          setLoc(this.userName + '_y', { "trainListData": JSON.parse(JSON.stringify(oldTrainData)) });
          this.$emit('updateFn');
        }

      },
      //打开提示信息
      openTag() {
        this.isTag = !this.isTag;
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
        plus.key.removeEventListener("backbutton", onPlusReady);
        plus.key.addEventListener("backbutton",onBack => {
          this.isShowBox = false;
        });
      },
      //设置岗位
      setPostFn() {
        this.$emit('setPostFn');
      },
      //开始时间
      chooseStartTime(i) {
        let time = new Date().getTime();
        setLoc('timerFlag', { 'time': time, 'username': this.userName, 'status': this.tabIndex, 'trainIndex': this.nowIndex, 'timeIndex': i });
        this.nowTime = this.util.formatDate(new Date().getTime(), 7);
        this.trainContentStartDate = this.nowTime;
        this.infoChildData.trainList[i].trainContentStartDate = this.nowTime;
        this.startTime(i);
        if (this.tabIndex === 1) {
          let oldActionData = getLoc(this.userName + '_n').notActionList;;
          let arrLen = oldActionData[this.nowIndex].trainImpleData.trainList.length;
          //数组的替换
          oldActionData[this.nowIndex].trainImpleData.trainList.splice(0, arrLen, ...this.infoChildData.trainList);
          //更新本地数据存储
          setLoc(this.userName + '_n', { "notActionList": JSON.parse(JSON.stringify(oldActionData)) });

        } else if (this.tabIndex === 2) {
          let oldTrainData = getLoc(this.userName + '_y').trainListData;
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
        this.trainContentEndDate = this.nowTime;
        this.infoChildData.trainList[i].trainContentEndDate = this.nowTime;
        this.stopTime(i);
        localStorage.removeItem('timerFlag');
        if (this.tabIndex === 1) {
          let oldActionData = getLoc(this.userName + '_n').notActionList;
          let arrLen = oldActionData[this.nowIndex].trainImpleData.trainList.length;
          //数组的替换
          oldActionData[this.nowIndex].trainImpleData.trainList.splice(0, arrLen, ...this.infoChildData.trainList);
          //更新本地数据存储
          setLoc(this.userName + '_n', { "notActionList": JSON.parse(JSON.stringify(oldActionData)) });

        } else if (this.tabIndex === 2) {
          let oldTrainData = getLoc(this.userName + '_y').trainListData;
          let arrLen = oldTrainData[this.nowIndex].trainImpleData.trainList.length;
          //数组的替换
          oldTrainData[this.nowIndex].trainImpleData.trainList.splice(0, arrLen, ...this.infoChildData.trainList);
          //更新本地数据存储
          setLoc(this.userName + '_y', { "trainListData": JSON.parse(JSON.stringify(oldTrainData)) });
        }
      },
      //判断是否正在计时
      TimingNow() {
        let infoData;
        if (this.tabIndex === 1 && getLoc(this.userName + '_n') != null) {
          infoData = getLoc(this.userName + '_n').notActionList[this.nowIndex].trainImpleData;
        }
        if (this.tabIndex === 2 && getLoc(this.userName + '_y') != null) {
          infoData = getLoc(this.userName + '_y').trainListData[this.nowIndex].trainImpleData;
        }
        if (infoData.trainList.length > 0) {
          for (let i = 0; i < infoData.trainList.length; i++) {
            if (infoData.trainList[i].isTiming) {
              this.nowTiming = true;
              break;
            } else {
              this.nowTiming = false;
            }
          }
        }
      },
      //确认完成实施
      confirmDoneFn() {
        this.TimingNow();
        if (!this.nowTiming) {
          this.$confirm('是否确认完成实施?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            closeOnClickModal: false,
            showClose: false,
          }).then(() => {
            this.doneFn();
          }).catch(() => {
            this.message.info("已取消！");
          });
        } else if (this.nowTiming) {
          this.message.warning("正在计时中，若训练结束，请点击结束计时");
        }
      },

      doneFn() {
        if (this.tabIndex === 1) {
          //未实施数据
          let oldActionData = getLoc(this.userName + '_n').notActionList;

          //更改未实施数据的实施状态
          oldActionData[this.nowIndex].trainOrNot = true;
          oldActionData[this.nowIndex].upload = false;
          //判断已实施里面是否有数据
          if (getLoc(this.userName + '_y')) {
            //获取已实施数据
            let trainData = getLoc(this.userName + '_y').trainListData;
            //向已实施数据里面添加数据
            trainData.unshift(oldActionData[this.nowIndex]);
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
        } else if (this.tabIndex === 2) {
          this.$router.push('./train');
        }
      },
      //辅助教员
      changHelpName(v) {
        if (this.tabIndex === 1) {
          let oldActionData = getLoc(this.userName + '_n').notActionList;
          if (v.length > 1) {
            oldActionData[this.nowIndex].auxiliaryLecturerName = v.toString().replace(/,/, '，');
          } else {
            oldActionData[this.nowIndex].auxiliaryLecturerName = v.toString();
          }
          //更新未实施数据
          setLoc(this.userName + '_n', { "notActionList": oldActionData });
        } else if (this.tabIndex === 2) {
          let oldTrainData = getLoc(this.userName + '_y').trainListData;
          if (v.length > 1) {
            oldTrainData[this.nowIndex].auxiliaryLecturerName = v.toString().replace(/,/, '，');
          } else {
            oldTrainData[this.nowIndex].auxiliaryLecturerName = v.toString();
          }
          //更新未实施数据
          setLoc(this.userName + '_y', { "trainListData": oldTrainData });
        }
      },
      //主教员
      changName(v) {
        if (this.tabIndex === 1) {
          let oldActionData = getLoc(this.userName + '_n').notActionList;
          if (v.length > 1) {
            oldActionData[this.nowIndex].chargeTeacherName = v.toString().replace(/,/, '，');
          } else {
            oldActionData[this.nowIndex].chargeTeacherName = v.toString();
          }
          //更新未实施数据
          setLoc(this.userName + '_n', { "notActionList": oldActionData });
        } else if (this.tabIndex === 2) {
          let oldTrainData = getLoc(this.userName + '_y').trainListData;
          if (v.length > 1) {
            oldTrainData[this.nowIndex].chargeTeacherName = v.toString().replace(/,/, '，');
          } else {
            oldTrainData[this.nowIndex].chargeTeacherName = v.toString();
          }
          //更新已实施数据
          setLoc(this.userName + '_y', { "trainListData": oldTrainData });
        }

      },
      //保存
      savePopFn(val) {
        if (!val.abnormalType) {
          this.message.warning("请选择异常类型");
          return false;
        }
        if (!val.abnormalDate) {
          this.message.warning("请选择异常产生时间");
          return false;
        }
        if (!val.abnormalObject) {
          this.message.warning("请输入异常产生对象");
          return false;
        }
        if (!val.abnormalExplain) {
          this.message.warning("请输入异常说明");
          return false;
        }
        this.isShowBox = false;
        if (this.tabIndex === 1) {
          let oldActionData = getLoc(this.userName + '_n').notActionList;
          //获取未实施对应异常列表数据
          oldActionData[this.nowIndex].trainImpleData.trainList[this.faultIndex].faultInfo.push(val);

          setLoc(this.userName + '_n', { "notActionList": JSON.parse(JSON.stringify(oldActionData)) });
          //更新数据
          this.infoChildData.trainList = getLoc(this.userName + '_n').notActionList[this.nowIndex].trainImpleData.trainList;
        } else if (this.tabIndex === 2) {
          let trainData = getLoc(this.userName + '_y').trainListData;
          //获取已实施对应异常列表数据
          let trainList = trainData[this.nowIndex].trainImpleData.trainList[this.faultIndex].faultInfo;
          trainList.push(val);
          setLoc(this.userName + '_y', { "trainListData": JSON.parse(JSON.stringify(trainData)) });
          //更新数据
          this.infoChildData.trainList = getLoc(this.userName + '_y').trainListData[this.nowIndex].trainImpleData.trainList;
        }
      },
      //保存训练内容时间
      saveContantTime() {
        if (this.trainContentTiming != null) {
          this.infoChildData.trainList[this.contentTimeIndex].trainContentStartDate = this.trainContentStartDate;
          this.infoChildData.trainList[this.contentTimeIndex].trainContentTiming = this.trainContentTiming;
          this.infoChildData.trainList[this.contentTimeIndex].trainContentEndDate = this.trainContentEndDate;
          if (this.tabIndex === 1) {
            let oldActionData = getLoc(this.userName + '_n').notActionList;
            let arrLen = oldActionData[this.nowIndex].trainImpleData.trainList.length;
            //数组的替换
            oldActionData[this.nowIndex].trainImpleData.trainList.splice(0, arrLen, ...this.infoChildData.trainList);
            //更新本地数据存储
            setLoc(this.userName + '_n', { "notActionList": JSON.parse(JSON.stringify(oldActionData)) });

          } else if (this.tabIndex === 2) {
            let oldTrainData = getLoc(this.userName + '_y').trainListData;
            let arrLen = oldTrainData[this.nowIndex].trainImpleData.trainList.length;
            //数组的替换
            oldTrainData[this.nowIndex].trainImpleData.trainList.splice(0, arrLen, ...this.infoChildData.trainList);
            //更新本地数据存储
            setLoc(this.userName + '_y', { "trainListData": JSON.parse(JSON.stringify(oldTrainData)) });
          }
          this.contentBox = false;
        } else {
          this.message.warning("结束时间小于等于开始时间！");
        }
      },
      //修改训练内容时间弹框--展示
      updateTime(i) {
        this.contentBox = true;
        plus.key.removeEventListener("backbutton",onPlusReady);
        plus.key.addEventListener("backbutton",onBack => {
          this.contentBox = false;
        });
        this.contentTimeIndex = i;
        this.trainContentStartDate = this.infoChildData.trainList[i].trainContentStartDate;
        this.trainContentTiming = this.infoChildData.trainList[i].trainContentTiming;
        this.trainContentEndDate = this.infoChildData.trainList[i].trainContentEndDate;
      },
      //取消--弹框
      cancleFn(val) {
        this.isShowBox = val;
        this.contentBox = val;
      },
      //选择异常时间
      chooseTime() {
        this.dateval = new Date();
        this.$refs.picker.open();
      },
      //选择异常时间--确认
      handleConfirm(value) {
        this.abnormalDate = formatDateMin(value);
        return false;
      },
      //选择开始时间
      chooseStartDate() {
        this.whichContentTime = '1';
        this.datevalHour = this.trainContentStartDate;
        this.$refs.pickerHour.open();
      },
      //选择计时时间
      chooseTiming() {
        this.whichContentTime = '2'
        this.datevalHour = this.trainContentTiming;
        this.$refs.pickerHour.open();
      },
      //选择结束时间
      chooseEndDate() {
        this.whichContentTime = '3'
        this.datevalHour = this.trainContentEndDate;
        this.$refs.pickerHour.open();
      },
      //选择完成时间
      updateEndTime(i, trainContentEndDate) {
        this.contentTimeIndex = i;
        this.whichContentTime = '4'
        this.$refs.pickerHour.open();
        this.datevalHour = trainContentEndDate;
      },
      //选择训练内容时间确认按钮
      confirmContentDate(value) {
        //开始
        if (this.whichContentTime == '1') {
          this.trainContentStartDate = value;
          this.trainContentTiming = this.changeStartEndTime(this.contentTimeIndex, this.trainContentEndDate, this.trainContentStartDate);
          return false;
        }
        //计时
        if (this.whichContentTime == '2') {
          if (Math.floor(value.slice(0, 2)) > 0 || Math.floor(value.slice(3, 5)) > 0) {
            this.trainContentTiming = value;
            this.trainContentEndDate = this.changeTiming(this.contentTimeIndex, this.trainContentTiming);
          } else {
            this.message.warning("计时时间不能为零！");
          }
          return false;
        }
        //结束
        if (this.whichContentTime == '3') {
          this.trainContentEndDate = value;
          this.trainContentTiming = this.changeStartEndTime(this.contentTimeIndex, this.trainContentEndDate, this.trainContentStartDate);
          return false;
        }
        //完成
        if (this.whichContentTime == '4') {
          this.infoChildData.trainList[this.contentTimeIndex].trainContentEndDate = value;
          if (this.tabIndex === 1) {
            let oldActionData = getLoc(this.userName + '_n').notActionList;
            let arrLen = oldActionData[this.nowIndex].trainImpleData.trainList.length;
            //数组的替换
            oldActionData[this.nowIndex].trainImpleData.trainList.splice(0, arrLen, ...this.infoChildData.trainList);
            //更新本地数据存储
            setLoc(this.userName + '_n', { "notActionList": JSON.parse(JSON.stringify(oldActionData)) });
          } else if (this.tabIndex === 2) {
            let oldTrainData = getLoc(this.userName + '_y').trainListData;
            let arrLen = oldTrainData[this.nowIndex].trainImpleData.trainList.length;
            //数组的替换
            oldTrainData[this.nowIndex].trainImpleData.trainList.splice(0, arrLen, ...this.infoChildData.trainList);
            //更新本地数据存储
            setLoc(this.userName + '_y', { "trainListData": JSON.parse(JSON.stringify(oldTrainData)) });
          }
        }
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      //获取异常类型列表
      this.abnormalList = getLoc("base").abnormalList;
      if (this.tabIndex === 1) {
        this.suggNum = getLoc(this.userName + "_n").notActionList[this.nowIndex].commentData.length;
        this.recordNum = getLoc(this.userName + "_n").notActionList[this.nowIndex].trainData.length;
      } else if (this.tabIndex === 2) {
        this.suggNum = getLoc(this.userName + "_y").trainListData[this.nowIndex].commentData.length;
        this.recordNum = getLoc(this.userName + "_y").trainListData[this.nowIndex].trainData.length;
      }
      this.infoChildData = JSON.parse(JSON.stringify(this.infoData));
      if (this.infoChildData.chargeTeacherName) {
        this.firstName = this.infoChildData.chargeTeacherName.toString().split('，');
      }
      if (this.infoChildData.auxiliaryLecturerName) {
        this.helpName = this.infoChildData.auxiliaryLecturerName.toString().split('，');
      }
      //判断是否有计时任务未结束
      if (getLoc('timerFlag') !== null) {
        //再判断当前登录用户是否是之前未完成计时的用户
        let oldTime = getLoc('timerFlag');
        if (getLoc('userName') === oldTime.username) {
          this._isTimingNow(true);
          //获取当前时间
          let time = new Date().getTime();
          //与开始计时的时间差
          let cha = time - oldTime.time;
          if (cha > 0) {
            let hour = Math.floor((cha / 3600000) % 24);
            let min = Math.floor((cha / 60000) % 60);
            let sec = Math.floor((cha / 1000) % 60);
            hour = hour < 10 ? '0' + hour : hour;
            min = min < 10 ? '0' + min : min;
            sec = sec < 10 ? '0' + sec : sec;
            let format = hour + ':' + min;
            // this._timer(format)
            console.log(format, this.infoChildData);
            this.infoChildData.trainList[oldTime.timeIndex].trainContentTiming = format;
          }
          this.infoChildData.trainList[oldTime.timeIndex].trainContentTime = cha;
          this.infoChildData.trainList[oldTime.timeIndex].isTiming = true;
          this._timeIndex(oldTime.timeIndex);
          this.$emit('updateTiming', this.infoChildData);

          //启动定时器
          this.newTimer = setInterval(_ => {
            this.infoChildData.trainList[oldTime.timeIndex].trainContentTime += 1000;
            let t = this.infoChildData.trainList[oldTime.timeIndex].trainContentTime;
            if (t > 0) {
              let hour = Math.floor((t / 3600000) % 24);
              let min = Math.floor((t / 60000) % 60);
              let sec = Math.floor((t / 1000) % 60);
              hour = hour < 10 ? '0' + hour : hour;
              min = min < 10 ? '0' + min : min;
              sec = sec < 10 ? '0' + sec : sec;
              let format = hour + ':' + min + ":" + sec;
              // this._timer(format)
              this.infoChildData.trainList[this.timeIndex].trainContentTiming = format;
            }
          }, 1000);
        } else {
          //切换用户后将所有正在计时的状态变为false
          let oldActionData = '';
          if(this.tabIndex === 1){
              oldActionData = getLoc(this.userName + '_n').notActionList;
          }else if(this.tabIndex === 2){
              oldActionData = getLoc(this.userName + '_y').trainListData;
          }
          for (let i = 0; i < infoData.trainList.length; i++) {
            oldActionData[this.nowIndex].trainImpleData.trainList[i].isTiming = false;
          }
          if(this.tabIndex === 1){
            setLoc(this.userName + '_n', { "notActionList": JSON.parse(JSON.stringify(oldActionData)) });
          }else if(this.tabIndex === 2){
            setLoc(this.userName + '_y', { "trainListData": JSON.parse(JSON.stringify(oldActionData)) });
          }
          this._isTimingNow(false);
          localStorage.removeItem('timerFlag');
        }
      }
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    updated() {
    }, //生命周期 - 更新之后
    activated() {
      //   console.log('actived');
    },
    beforeDestroy() {
      clearInterval(this.newTimer);
    },
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
        .sugg-rec-btu {
          float: right;
          height: 0.52rem;
          padding: 0.15rem 0.72rem;
          background: #fff;
          font-size: 0.24rem;
          line-height: 0.2rem;
          color: #3288fe;
          border: 1px solid #3288fe;
        }
        .el-badge {
          float: right;
        }
        button {
          margin: 0.24rem 0.1rem;
          width: 3.17rem;
        }
        .suggButton {
          // display: inline;
          margin: 0 0.1rem 0.2rem 0;
          float: right;
        }
        .recordButton {
          // display: inline;
          margin: 0 0.1rem 0.2rem 0;
          float: right;
        }
      }
      .sugg-record-button {
        position: relative;
        left: 10.2rem;
        display: inline;
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
              font-size: 0.24rem;
              font-weight: bold;
              height: 0.4rem;
              line-height: 0.4rem;
              padding-left: 0.26rem;
            }
            .tag-btn {
              margin: 0.06rem 0.36rem 0.06rem 0;
            }
            .tags {
              width: 6.1rem;
              word-break: break-all;
              word-wrap: break-word;
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
            // width: 4.9rem;
            max-width: 6rem;
            display: flex;
            padding: 0.26rem 0 0.24rem 0;
            .select-wrap {
              margin: 0 0.1rem;
            }
            .p-left {
              h3 {
                height: 0.4rem;
                line-height: 0.4rem;
                font-size: 0.24rem;
                text-align: center;
              }
              .el-select {
                height: 0.63rem;
                line-height: 0.62rem;
              }
            }
            .p-right {
              h3 {
                height: 0.4rem;
                line-height: 0.4rem;
                font-size: 0.24rem;
                text-align: center;
              }
              .el-select {
                height: 0.63rem;
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
  .select-wrap .el-select--small .el-select__tags {
    white-space: nowrap !important;
    overflow: hidden !important;
    display: block !important;
    left: 0.1rem !important;
  }
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
    font-size: 0.24rem !important;
  }
  .el-input--small .el-input__icon {
    line-height: 0.36rem !important;
  }
  .el-select--small .el-input__inner {
    height: 25px !important;
    padding-right: 0.2rem !important;
  }
  .el-select .el-input .el-select__caret {
    font-size: 0.14rem !important;
  }
  .button-finish .el-badge .el-badge__content {
    position: absolute !important;
    top: 0.21rem !important;
    right: 0.3rem !important;
  }
</style>