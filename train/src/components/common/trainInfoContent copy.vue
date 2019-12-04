<template>
  <div class="list-wrap">
    <v-list-title>训练详细内容</v-list-title>

    <div
      class="item-info clearfix"
      v-for="(item, index) in content"
      :key="item.trainContentID"
    >
      <el-collapse v-model="activeName">
        <el-collapse-item :name="index">
          <template slot="title">
            <div
              @click="stopPrep"
              class="list-wrap clearfix"
            >
              <div class="title-info">
                <i class="header-icon iconfont iconuntitled3"></i>
                <span>{{ item.trainContentName }}({{item.trainClassHour}})</span>
              </div>
              <div class="time">
                <div class="info-wrap">
                  <div
                    v-if="trainWay == '理论授课'"
                    class="set-complete"
                  >
                    <el-radio-group
                      v-model="item.radio"
                      @change="changeFn(index)"
                    >
                      <el-radio :label="1">未完成</el-radio>
                      <el-radio :label="2">已完成</el-radio>
                    </el-radio-group>
                  </div>
                  <div
                    class="set-time"
                    v-else-if="item.timeWay == '时间点'"
                    style="margin-right:0.2rem;"
                  >
                    <button
                      v-if="item.trainContentEndDate == '' && !isTimingNow"
                      class="btn-set-time start-time"
                      @click="chooseEndTime(index)"
                    >完成时间</button>
                    <button
                      v-else-if="isTimingNow && item.trainContentEndDate == ''"
                      @click.stop="messageTiming"
                      class="btn-set-time start-time"
                    >完成时间</button>
                    <button
                      v-else-if="item.trainContentEndDate !== ''"
                      @click.stop="updateEndTime(index, item.trainContentEndDate)"
                      class="btn-set-time"
                    >修改时间</button>
                    <span>{{ item.trainContentEndDate }} </span>
                  </div>
                  <div
                    class="set-time"
                    v-else
                  >
                    <button
                      class="btn-set-time start-time"
                      @click.stop="chooseStartTime(index)"
                      v-if="item.trainContentStartDate == '' && !isTimingNow"
                    >开始计时</button>
                    <button
                      v-else-if="isTimingNow && item.trainContentEndDate == '' && index != timingIndex && !item.isTiming"
                      @click.stop="messageTiming"
                      class="btn-set-time start-time"
                    >开始计时</button>
                    <button
                      class="btn-set-time"
                      @click.stop="chooseEndTime(index)"
                      v-if="item.trainContentEndDate == '' && item.trainContentTiming !== '' && item.trainContentStartDate !== ''"
                    >结束计时</button>
                    <button
                      v-if="item.trainContentEndDate !== ''"
                      @click.stop="updateTime(index)"
                      class="btn-set-time"
                    >修改时间</button>
                    <span v-show="startTimeFlag || index != timingIndex">{{ item.trainContentStartDate }} </span>
                    <span v-show="item.trainContentEndDate !== '' || item.trainContentEndDate !== ''">
                      <i class="iconfont iconline"></i>
                    </span>
                    <span v-show="endTimeFlag || index != timingIndex">{{ item.trainContentEndDate }} </span>
                    <span v-show="timingFlag || index != timingIndex">
                      {{ item.trainContentTiming }}
                    </span>
                  </div>

                  <div class="fr nicon">
                    <button
                      class="normal-no-border"
                      @click.stop="errorRecord(index)"
                    ><i class="error-icon el-icon-circle-plus"></i>
                      添加异常<span v-show="item.faultInfo.length >0">{{'('+item.faultInfo.length+')'}}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <div class="error-list">
            <div class="content">{{ item.trainContentDesc }}</div>
            <div
              class="fault-list"
              v-for="(item2, index2) in item.faultInfo"
              :key="item2.id"
            >
              <el-collapse :v-model="errorActive">
                <el-collapse-item :name="index2">
                  <template slot="title">
                    <div
                      @click="stopPrep"
                      style="width:98%;"
                    >
                      <img src="../../assets/warn.png" class="error-icon" />
                      <span class="fault-title">{{ item2.abnormalObject }}在{{ item2.abnormalDate }}发生了异常</span>
                    </div>
                  </template>
                  <div class="fault-info">说明：{{ item2.abnormalExplain }}</div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  import {
    getLoc, setLoc
  } from '@/utils/common.js';
  import { mapMutations, mapState } from 'vuex';
  export default {
    data() {
      //这里存放数据
      return {
        activeName: 0,
        errorActive: 0,
        timingFlag: true,
        timingIndex: -1,
        endTimeFlag: true,
        startTimeFlag: true,
        selectableRange: ''
      };
    },
    props: ['content', 'show', 'trainWay'],
    //监听属性 类似于data概念
    computed: {
      ...mapState(['isTimingNow', 'nowIndex', 'tabIndex', 'userName'])
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      ...mapMutations(['_isTimingNow']),
      changeFn(i) {
        this.$emit('chooseComplete', i, this.content[i].radio);
      },
      messageTiming() {
        this.message.warning('正在计时');
      },
      //开始计时
      chooseStartTime(i) {
        this._isTimingNow(true); //正在计时的全局标识
        // this.timingIndex = i;
        // this.$emit('chooseStartTime', i);
        //获取开始时间，并记录
        let time = new Date().getTime();
        setLoc(this.userName + '_t', { 'time': time, 'username': this.userName, 'status': this.tabIndex, 'trainIndex': this.nowIndex, 'timeIndex': i });
        console.log(this.content);
        // this.content.trainList[i].trainContentTiming = '';
        // this.content.trainList[i].trainContentTime = 0;
        // this.content.trainList[i].isTiming = true;
        // this.$emit('updateTiming', this.infoChildData);
        // this._timeIndex(i);
        // this.newTimer = setInterval(_ => {
        //   this.content.trainList[i].trainContentTime += 1000;
        //   let t = this.content.trainList[i].trainContentTime;
        //   if(t > 0) {
        //     let hour = Math.floor((t / 3600000) % 24)
        //     let min = Math.floor((t / 60000) % 60)
        //     let sec = Math.floor((t / 1000) % 60)
        //     hour = hour < 10 ? '0' + hour : hour
        //     min = min < 10 ? '0' + min : min
        //     sec = sec < 10 ? '0' + sec : sec
        //     let format = hour + ':' + min + ":" + sec

        //     this.content.trainList[i].trainContentTiming = format;
        //   }
        // }, 1000);
      },
      //结束计时
      chooseEndTime(i) {
        this._isTimingNow(false); //正在计时的全局标识
        this.timingIndex = i;
        this.$emit('chooseEndTime', i);
      },
      errorRecord(i) {
        this.$emit('errorRecord', i);
      },
      stopPrep(e) {
        e.stopPropagation();
        return false;
      },
      //修改开始，结束，计时时间弹框
      updateTime(i) {
        this.$emit('updateTime', i);
      },
      //修改完成时间
      updateEndTime(i, trainContentEndDate) {
        this.$emit('updateEndTime', i, trainContentEndDate);
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      if(this.trainWay == '理论授课') {
        for(let i = 0; i < this.content.length; i++) {
          if(this.content[i].radio == undefined) {
            this.content[i].radio = 1;
          }
        }
      }

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    updated() { }, //生命周期 - 更新之后
    activated() { } //如果页面有keep-alive缓存功能，这个函数会触发
  };
</script>
<style lang="less" scoped>
  @import "../../style/global.less";
  .list-wrap {
    height: 0.7rem;
    line-height: 0.7rem;
    .item-info {
      //   padding: 0.05rem 0.35rem 0rem 0.35rem;
      position: relative;
      //   border: 1px solid @c-border;
      .list-wrap {
        width: 100%;
        .title-info {
          font-size: 0.24rem;
          height: 0.7rem;
          line-height: 0.7rem;
          padding-left: 0.35rem;
          display: inline-block;
          max-width: 8rem;
          overflow: hidden;
          //   text-overflow: ellipsis;
          //   white-space: nowrap;
        }
        .time {
          float: right;
          .info-wrap {
            //   padding: 0.25rem 0 0.25rem 0.15rem;
            span {
              display: inline-block;
              font-size: 0.24rem;
            }
            span.text {
              height: 0.5rem;
              line-height: 0.5rem;
              width: 7rem;
            }
            .set-complete {
              display: inline-block;
              margin: 0 0.5rem;
            }
            .set-time {
              display: inline-block;
              // width: 9rem;
              .btn-set-time {
                margin: 0.15rem 0.05rem;
              }
              span {
                display: inline-block;
              }
            }
          }
        }
      }
      .error-icon {
        width: 0.2rem;
        margin-right: 0.1rem;
      }
      .error-list {
        padding-left: 0.3rem;
      }
      .content {
        font-size: 0.22rem;
        padding-left: 0.23rem;
        line-height: 0.7rem;
        white-space: normal;
        // border-bottom: 1px solid @c-border;
      }
      .tag-btn {
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
      }
      .tags {
        height: 0.46rem;
        line-height: 0.46rem;
        margin-left: 0.16rem;
        margin-bottom: 0.3rem;
        .arrived {
          font-size: 0.25rem;
          font-weight: bold;
          margin-right: 0.1rem;
        }
        span {
          display: inline-block;
          font-size: 0.25rem;
        }
        .peopleTag {
          margin-right: 0.05rem;
          background: none;
          border: 1px solid #eaedf4;
          color: #4c4f56;
        }
        .peopleTag.active {
          border-color: #b6eddc;
          background: #eefbf7;
        }
      }
    }

    .fault-list {
      padding-left: 0.26rem;
      margin-bottom: 0.1rem;
      //   margin-top: 0.1rem;
      border-bottom: 1px solid transparent;
      .fault-title {
        font-size: 0.22rem;
        height: 0.7rem;
        line-height: 0.7rem;
        padding-left: 0.15rem;
      }
      .error-icon {
        color: #ed5353;
      }
      .fault-info {
        padding: 0.1rem 0.3rem;
        font-size: 0.22rem;
        color: #808383;
        .keyword {
          color: #808383;
          font-size: 0.22rem;
          height: 0.32rem;
          line-height: 0.32rem;
        }
      }
    }
  }
</style>
<style lang="less">
  .item-info .el-collapse-item__header {
    height: 0.7rem;
    line-height: 0.7rem;
    // border-bottom: none !important;
  }
  .item-info .el-collapse-item__header.is-active {
    border-bottom-color: #e9ecf4 !important;
  }
  .item-info .el-collapse-item__content {
    padding-bottom: 0 !important;
  }
  .item-info .el-collapse-item__arrow.el-icon-arrow-right {
    margin-right: 0.2rem !important;
    margin-left: 0.2rem !important;
    font-size: 0.2rem;
  }
  .set-time .el-date-editor {
    width: 1.6rem !important;
  }
  .set-time .el-date-editor .el-input__inner {
    padding-right: 10px !important;
    font-size: 0.23rem !important;
  }
</style>
