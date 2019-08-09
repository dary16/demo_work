<template>
  <div class='info'>
    <v-info-header
      v-on:backFn="back"
      :titleData="infoChildData.title"
    ></v-info-header>
    <div class="content">
      <div class="list-wrap">
        <v-list-title>普通训练任务</v-list-title>
        <div class="item-info">
          <div class="tags">
            <span class="arrived">实到人员：</span>
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
            class="normal-btn-border fr tag-btn"
            @click="setPostFn"
          ><i class="el-icon-setting"></i>
            设置岗位</button>
        </div>
      </div>
      <!-- <div class="list-wrap">
        <v-list-title :listTilte="infoChildData.listTitle2"></v-list-title>
        <div
          class="item-info"
          v-for="(item,index) in infoChildData.trainList"
          :key="item.trainContentID"
        >
          <div class="info-wrap">
            <span class="text">{{item.trainContentDesc}}</span>
            <div class="set-time">
              <button
                v-if="item.trainContentStartDate == ''"
                class="btn-set-time start-time"
                @click="chooseStartTime(index)"
              >开始时间</button>
              <span v-else>{{item.trainContentStartDate}}
                <i
                  class="el-icon-edit"
                  @click="chooseStartTime(index)"
                ></i>
              </span>

              <button
                v-if="item.trainContentEndDate == ''"
                class="btn-set-time"
                @click="chooseEndTime(index)"
              >结束时间</button>
              <span v-else>{{item.trainContentEndDate}}
                <i
                  class="el-icon-edit"
                  @click="chooseEndTime(index)"
                ></i>
              </span>
            </div>

            <div class="fr nicon">
              <button
                class="btn-normal"
                @click="errorRecord(index)"
              >添加异常</button>
            </div>
          </div>
          <div
            class="fault-list"
            v-if="item.faultInfo.length > 0"
          >
            <div class="fault-title"><span>异常说明</span></div>
            <div
              class="fault-info"
              v-for="item2 in item.faultInfo"
              :key="item2.id"
            >
              <div class="flex-wrap">
                <span class="text">{{item2.abnormalExplain}}</span>
                <span class="time">{{item2.abnormalDate}}</span>
                <span class="obj">{{item2.abnormalObject}}</span>
              </div>
              <div class="keyword">异常关键字</div>
            </div>
          </div>
        </div>
      </div> -->
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
          class="normal-btn-lg mr"
          @click="recordFn"
        >数据项记录</button>
        <button
          class="normal-btn-lg"
          @click="doneFn"
        >完成</button>

        <mt-datetime-picker
          ref="picker"
          type="datetime"
          @confirm="handleConfirm"
          @cancel="cancelFn"
          v-model="test"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          hour-format="{value} 时"
          minute-format="{value} 分"
          :endDate="new Date()"
        >
        </mt-datetime-picker>
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
        show: 0
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
        this.nowTime = this.util.formatDate(new Date().getTime());
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
        this.nowTime = this.util.formatDate(new Date().getTime());
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
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    updated() {
      //   console.log('update');
    }, //生命周期 - 更新之后
    activated() {
      //   console.log('actived');
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
          position: relative;
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
            .nicon {
              margin-top: 0.03rem;
            }
            .peopleTag {
              margin-right: 0.05rem;
              background: none;
              border: 1px solid #eaedf4;
              color: #4c4f56;
            }
            .peopleTag.active {
              //   background: #006699;
              border-color: #2fcc9b;
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
      }
    }
    .buttons {
      text-align: right;
      line-height: 1rem;
    }
  }
</style>