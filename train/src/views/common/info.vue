<template>
  <div>
    <keep-alive>
      <v-imple-info
        :infoData="infoData"
        v-on:setPostFn="setPostFn"
        v-on:recordFn="recordFn"
        v-on:suggestion="suggestion"
        v-on:back="back"
        v-on:doneFn="doneFn"
        v-on:updateFn="updateFn"
        v-on:updateTiming="updateTiming"
        v-on:updateComplete="updateComplete"
      ></v-imple-info>
    </keep-alive>
    <keep-alive>
      <v-set-post
        v-if="isShowSet"
        :tags="infoData.tags"
        v-on:save="saveFn"
        v-on:cancle="cancelFn"
        :popTitle="popTitle"
      ></v-set-post>
    </keep-alive>

  </div>
</template>

<script>
  import {
    getLoc, setLoc
  } from '../../utils/common.js';
  import { mapState, mapMutations } from 'vuex';
  export default {
    data() {
      //这里存放数据
      return {
        infoData: {
          isSignIn: false,
          value1: '',
          trainList: [],
          index: '',
          tags: [],
          teachList: [],
          helpTeachList: [],
          chargeTeacherName: '',
          auxiliaryLecturerName: '',
          trainWay: '',//判断是理论课还是操作训练
          title: '',
        },
        isShowSet: false,
        popTitle: "设置岗位",
        test: '',
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['nowIndex', 'userName', 'userInfo', 'tabIndex'])
    },
    //监控data中的数据变化
    watch: {
      isShowSet:{
        handler(newValue, oldValue){
          if(!newValue){
            plus.key.removeEventListener("backbutton",onPlusReady);
            plus.key.addEventListener("backbutton",onBack => {
              this.$router.go(-1);
            });
          }
        }
      }
    },
    //方法集合
    methods: {
      ...mapMutations(['_allData']),
      tagFn(i) {
        this.tags[i].isSignIn = !this.tags[i].isSignIn;
      },
      //设置时间
      setTime(index) {
        let time = this.util.formatDate(new Date().getTime(), 3);
      },
      //返回
      back() {
        this.$router.go(-1);
      },
      //意见建议
      suggestion() {
        this.$router.push('/suggestion');
      },
      //数据项记录
      recordFn() {
        this.$router.push('/record');
      },
      //设置岗位
      setPostFn() {
        this.isShowSet = true;
        plus.key.removeEventListener("backbutton",onPlusReady);
        plus.key.addEventListener("backbutton",onBack => {
          this.isShowSet = false;
        });
      },
      //保存
      saveFn(v) {
        if(this.tabIndex === 1) {
          let oldActionData = getLoc(this.userName + '_n').notActionList;
          let arrLen = oldActionData[this.nowIndex].joinAstronautNames.length;
          //数组的替换
          oldActionData[this.nowIndex].joinAstronautNames.splice(0, arrLen, ...v);
          setLoc((this.userName + '_n'), { "notActionList": JSON.parse(JSON.stringify(oldActionData)) });
          this.infoData.tags = v;
          this.infoData.trainList = getLoc(this.userName + '_n').notActionList[this.nowIndex].trainImpleData.trainList;
          this.isShowSet = false;
        } else if(this.tabIndex === 2) {
          let oldTrainData = getLoc(this.userName + '_y').trainListData;
          let arrLen = oldTrainData[this.nowIndex].joinAstronautNames.length;
          //数组的替换
          oldTrainData[this.nowIndex].joinAstronautNames.splice(0, arrLen, ...v);
          setLoc((this.userName + '_y'), { "trainListData": JSON.parse(JSON.stringify(oldTrainData)) });
          this.infoData.tags = v;
          this.infoData.trainList = getLoc(this.userName + '_y').trainListData[this.nowIndex].trainImpleData.trainList;
          this.isShowSet = false;
        }

      },
      cancelFn() {
        this.isShowSet = false;
      },
      //完成
      doneFn() {
        this.$router.go(-1);
      },
      //更新数据
      updateFn() {
        if(this.tabIndex === 1) {
          this.infoData.tags = getLoc(this.userName + '_n').notActionList[this.nowIndex].joinAstronautNames;
          this.infoData.trainList = getLoc(this.userName + '_n').notActionList[this.nowIndex].trainImpleData.trainList;
        } else if(this.tabIndex === 2) {
          this.infoData.tags = getLoc(this.userName + '_y').trainListData[this.nowIndex].joinAstronautNames;
          this.infoData.trainList = getLoc(this.userName + '_y').trainListData[this.nowIndex].trainImpleData.trainList;
        }

      },
      updateTiming(Timing) {
        this.infoData = Timing;
      },
      updateComplete(complete){
        this.infoData = complete;
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      //移除原有物理返回按键事件
      plus.key.removeEventListener("backbutton",onPlusReady);
      //添加新监听，绑定物理返回按键事件
      plus.key.addEventListener("backbutton",onBack => {
        this.back();
      });
      let notList = getLoc(this.userName + '_n');
      let list = getLoc(this.userName + '_y')
      //判断是已实施还是未实施
      if(this.tabIndex === 1) {
        let oldActionData = notList.notActionList[this.nowIndex];
        this.infoData.tags = oldActionData.joinAstronautNames;
        this.infoData.trainList = oldActionData.trainImpleData.trainList;
        this.infoData.teachList = oldActionData.teachList;
        this.infoData.helpTeachList = oldActionData.helpTeachList;
        this.infoData.chargeTeacherName = oldActionData.chargeTeacherName;
        this.infoData.auxiliaryLecturerName = oldActionData.auxiliaryLecturerName;
        this.infoData.trainWay = oldActionData.trainWay;
        this.infoData.title = '训练实施';
      } else if(this.tabIndex === 2) {
        //已实施
        let trainData = list.trainListData[this.nowIndex];
        this.infoData.tags = trainData.joinAstronautNames;
        this.infoData.trainList = trainData.trainImpleData.trainList;
        this.infoData.teachList = trainData.teachList;
        this.infoData.helpTeachList = trainData.helpTeachList;
        this.infoData.chargeTeacherName = trainData.chargeTeacherName;
        this.infoData.auxiliaryLecturerName = trainData.auxiliaryLecturerName;
        this.infoData.trainWay = trainData.trainWay;
        this.infoData.title = '训练修改';
      }
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    updated() {
      //   console.log('info update');
    }, //生命周期 - 更新之后
    activated() {
      //   console.log('info active');
    }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang="less" scoped>
  .info {
    .content {
      padding: 0.1rem 0.2rem;
      position: fixed;
      bottom: 0;
      right: 0.52rem;
      top: 0.7rem;
      left: 3.5rem;
      overflow-y: auto;
      .list-wrap {
        border: 1px solid #e9ecf4;
        margin-bottom: 0.28rem;
        .item-info {
          padding: 0.05rem 0.35rem 0rem 0.35rem;
          //   border: 1px solid #006699;
          min-height: 1rem;
          .item-info-title {
            height: 0.8rem;
            line-height: 0.8rem;
            position: relative;
            padding-left: 0.15rem;
            button {
              position: absolute;
              right: 0;
              margin: 0.2rem 0;
            }
            .arrived {
              font-size: 0.25rem;
              font-weight: bold;
              margin-right: 0.1rem;
            }
          }
          span {
            display: inline-block;
            font-size: 0.25rem;
          }
          .nicon {
            margin-top: 0.03rem;
          }
          .tags {
            height: 0.46rem;
            line-height: 0.46rem;
            margin-left: 0.16rem;
            margin-bottom: 0.3rem;
            .peopleTag {
              margin-right: 0.05rem;
            }
            .peopleTag.active {
              background: #006699;
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
      }
    }
    .buttons {
      text-align: right;
      line-height: 1rem;
    }
  }
</style>