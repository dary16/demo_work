<template>
  <div class='info'>
    <v-info-header
      v-on:backFn="back"
      :titleData="infoChildData.title"
    ></v-info-header>
    <div class="content">
      <div class="list-wrap">
        <v-list-title :listTilte="infoChildData.listTitle1"></v-list-title>
        <div class="item-info">
          <div class="item-info-title">
            <span class="arrived">实到人员</span>
            <button
              class="normal-btn-border fr"
              @click="setPostFn"
            ><i class="el-icon-setting"></i>
              设置岗位</button>
          </div>
          <div class="tags">
            <el-tag
              :class="{'active':item.isSignIn}"
              class="peopleTag"
              size="mini"
              v-for="(item,index) in infoChildData.tags"
              :key="item.trainImplementAstronautID"
              @click="tagFn(index)"
            >{{item.trainImplementAstronautName}}<span v-if="item.post !== ''">({{item.post}})</span></el-tag>
          </div>
        </div>
      </div>
      <div class="list-wrap">
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
              >开始时间</button>
              <span v-else>{{item.trainContentStartDate}}</span>
              <button
                v-if="item.trainContentEndDate == ''"
                class="btn-set-time"
              >结束时间</button>
              <span v-else>{{item.trainContentEndDate}}</span>
            </div>
            <!-- <button
              class="btn-set-time"
              @click="setTime(index)"
              v-if="item.trainClassHour == ''"
            >完成时间</button>
            <span v-else>{{item.trainClassHour}}</span> -->

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
      </div>
      <div class="buttons">
        <button
          class="normal-btn-border-lg mr"
          @click="suggestion"
        >意见建议</button>
        <button
          class="normal-btn-lg mr"
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
        infoChildData: {}//存储父组件传来的infoData
      };
    },
    props: ['infoData'],
    //监听属性 类似于data概念
    computed: {
      ...mapState(['userId', 'nowIndex'])
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
    //方法集合
    methods: {
      ...mapMutations(['_allData']),
      tagFn(i) {
        //改变签到状态
        this.infoChildData.tags[i].isSignIn = !this.infoChildData.tags[i].isSignIn;

        let oldActionData = getLoc(this.userId).notActionData;
        let arrLen = getLoc(this.userId).notActionData[this.nowIndex].trainImpleData.peoples.length;
        //数组的替换
        oldActionData[this.nowIndex].trainImpleData.peoples.splice(0, arrLen, ...this.infoChildData.tags);
        //更新本地数据存储
        setLoc(this.userId, { "notActionData": JSON.parse(JSON.stringify(oldActionData)) });

      },
      //设置时间
      setTime(index) {
        // let time = this.util.formatDate(new Date().getTime(), 3);
        // this.allData.allData.user[this.userIndex].notActionList[this.nowIndex].trainList[index].trainClassHour = "sdkfldsl";
        // getLoc('allData').allData.user[this.userIndex].notActionList[this.nowIndex].trainList[index].trainClassHour = "sdkfldsl";
        // console.log(getLoc('allData'));
        // this._allData(resData);
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
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.infoChildData = JSON.parse(JSON.stringify(this.infoData));
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    updated() {
      console.log('update');
    }, //生命周期 - 更新之后
    activated() {
      console.log('actived');
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