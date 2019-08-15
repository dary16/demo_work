<template>
  <div class='info'>
    <v-info-header
      v-on:backFn="back"
      :titleData="infoChildData.title"
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
                  placeholder="请选择"
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
                  placeholder="请选择"
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
  </div>
</template>

<script>
  import {
    getLoc, setLoc
  } from '../../utils/common.js';
  import { mapMutations, mapState } from 'vuex';

  export default {
    data() {
      //这里存放数据
      return {
        infoChildData: {},//存储父组件传来的infoData
        test: '',
        time: {
          index: '',
          type: ''
        },
        nowTime: '',
        show: 0,
        firstName: '',
        helpName: ''
      };
    },
    props: ['infoData'],
    //监听属性 类似于data概念
    computed: {
      ...mapState(['userInfo', 'nowIndex'])
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
        //改变签到状态
        this.infoChildData.tags[i].isSignIn = !this.infoChildData.tags[i].isSignIn;
        let oldActionData = getLoc(this.userInfo.userID).notActionData;
        let arrLen = getLoc(this.userInfo.userID).notActionData[this.nowIndex].joinAstronautNames.length;
        //数组的替换
        oldActionData[this.nowIndex].joinAstronautNames.splice(0, arrLen, ...this.infoChildData.tags);
        //更新本地数据存储
        setLoc(getLoc('userInfo').userID, { "notActionData": JSON.parse(JSON.stringify(oldActionData)), "loadTime": getLoc(this.userInfo.userID).loadTime });
        this.$emit('updateFn');
      },
      //设置时间
      setTime(index) {
        // let time = this.util.formatDate(new Date().getTime(), 3);
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
        this.$emit('errorRecord', index);
      },
      //设置岗位
      setPostFn() {
        this.$emit('setPostFn');
      },
      //开始时间
      chooseStartTime(i) {
        this.nowTime = this.util.formatDate(new Date().getTime(), 7);
        this.infoChildData.trainList[i].trainContentStartDate = this.nowTime;
        let oldActionData = getLoc(this.userInfo.userID).notActionData;
        let arrLen = getLoc(this.userInfo.userID).notActionData[this.nowIndex].trainImpleData.trainList.length;
        //数组的替换
        oldActionData[this.nowIndex].trainImpleData.trainList.splice(0, arrLen, ...this.infoChildData.trainList);
        //更新本地数据存储
        setLoc(getLoc('userInfo').userID, { "notActionData": JSON.parse(JSON.stringify(oldActionData)), "loadTime": getLoc(this.userInfo.userID).loadTime });
        this.$emit('updateTimeFn');
      },
      //结束时间
      chooseEndTime(i) {
        this.nowTime = this.util.formatDate(new Date().getTime(), 7);
        this.infoChildData.trainList[i].trainContentEndDate = this.nowTime;
        let oldActionData = getLoc(this.userInfo.userID).notActionData;
        let arrLen = getLoc(this.userInfo.userID).notActionData[this.nowIndex].trainImpleData.trainList.length;
        //数组的替换
        oldActionData[this.nowIndex].trainImpleData.trainList.splice(0, arrLen, ...this.infoChildData.trainList);
        //更新本地数据存储
        setLoc(getLoc('userInfo').userID, { "notActionData": JSON.parse(JSON.stringify(oldActionData)), "loadTime": getLoc(this.userInfo.userID).loadTime });
        this.$emit('updateTimeFn');
      },
      handleConfirm(value) {
        //时间转换
        this.test = this.util.formatDateMin(value).slice(0, 16);
        let oldActionData = getLoc(this.userInfo.userID).notActionData;
        let arrLen = getLoc(this.userInfo.userID).notActionData[this.nowIndex].trainImpleData.trainList.length;

        if(this.time.type == 'start') {
          this.infoChildData.trainList[this.time.index].trainContentStartDate = this.test;
        } else {
          this.infoChildData.trainList[this.time.index].trainContentEndDate = this.test;
        }
      },
      cancelFn() {
        this.time.index = '';
        this.time.type = '';
      },
      doneFn() {
        //未实施数据
        let oldActionData = getLoc(this.userInfo.userID).notActionData;

        //更改未实施数据的实施状态
        oldActionData[this.nowIndex].trainOrNot = true;
        //判断已实施里面是否有数据
        if(getLoc(this.userInfo.personID)) {
          //获取已实施数据
          let trainData = getLoc(this.userInfo.personID).trainListData;
          //向已实施数据里面添加数据
          trainData.push(oldActionData[this.nowIndex]);
          //将已实施数据更新到缓存
          setLoc(getLoc('userInfo').personID, { "trainListData": trainData });
        } else {
          //第一次将数据存到已实施里
          let arr = [];
          arr.push(oldActionData[this.nowIndex]);
          setLoc(getLoc('userInfo').personID, { "trainListData": arr });
        }
        //在未实施数据里删除已实施数据
        oldActionData.splice(this.nowIndex, 1);
        //更新未实施数据
        setLoc(getLoc('userInfo').userID, { "notActionData": JSON.parse(JSON.stringify(oldActionData)), "loadTime": getLoc(this.userInfo.userID).loadTime });
        this.$emit('doneFn');
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.infoChildData = JSON.parse(JSON.stringify(this.infoData));
      this.firstName = this.infoChildData.teachList[0].chargeTeacherName || '';
      this.helpName = this.infoChildData.helpTeachList[0].chargeTeacherName || '';
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
                //   background: #006699;
                border-color: #2fcc9b;
              }
            }
          }
          .peoples {
            width: 4.9rem;
            display: flex;
            padding: 0.26rem 0 0.24rem 0;
            .select-wrap {
              margin: 0 0.2rem;
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
  .select-wrap .el-input--mini .el-input__inner {
    height: 0.36rem !important;
    line-height: 0.36rem !important;
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
</style>