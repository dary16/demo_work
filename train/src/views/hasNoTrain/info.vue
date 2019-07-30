<template>
  <div class='info'>
    <v-info-header
      v-on:backFn="back"
      :titleData="title"
    ></v-info-header>
    <div class="content">
      <div class="list-wrap">
        <v-list-title :listTilte="listTitle1"></v-list-title>
        <div class="item-info">
          <div class="item-info-title">
            <span class="arrived">实到人员</span>
            <!-- <el-button
              type="primary"
              plain
              icon="el-icon-setting"
              @click="setPostFn"
            >设置岗位</el-button> -->
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
              v-for="(item,index) in tags"
              :key="item.trainImplementAstronautID"
              @click="tagFn(index)"
            >{{item.trainImplementAstronautName}}<span v-if="item.post !== ''">({{item.post}})</span></el-tag>
          </div>

        </div>
      </div>
      <div class="list-wrap">
        <v-list-title :listTilte="listTitle2"></v-list-title>
        <div
          class="item-info"
          v-for="(item,index) in trainList"
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
              <span class="text">{{item2.content}}</span>
              <span class="time">{{item2.time}}</span>
              <div class="fr">
                <span>{{item2.name}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="buttons">
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
        >
        </el-date-picker>
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

    <v-set-post
      v-if="isShowSet"
      :tags="tags"
      v-on:save="saveFn"
      v-on:cancle="cancelFn"
      :popTitle="popTitle"
    ></v-set-post>
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
        isSignIn: false,
        isShowSet: false,
        value1: '',
        trainList: [],
        popTitle: "设置岗位",
        listTitle1: "普通训练任务",
        listTitle2: '训练详细内容',
        listTitle3: '异常说明',
        title: "训练实施信息",
        tags: [
          { trainImplementAstronautName: "张三", trainImplementAstronautID: "001", isSignIn: false, post: "01" },
          { trainImplementAstronautName: "王四", trainImplementAstronautID: "002", isSignIn: false, post: "" },
          { trainImplementAstronautName: "王五", trainImplementAstronautID: "003", isSignIn: false, post: "02" }
        ]
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['nowIndex', 'userIndex', 'allData'])
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      ...mapMutations(['_allData']),
      tagFn(i) {
        this.tags[i].isSignIn = !this.tags[i].isSignIn;
      },
      //设置时间
      setTime(index) {
        let time = this.util.formatDate(new Date().getTime(), 3);
        // this.allData.allData.user[this.userIndex].notActionList[this.nowIndex].trainList[index].trainClassHour = "sdkfldsl";
        // getLoc('allData').allData.user[this.userIndex].notActionList[this.nowIndex].trainList[index].trainClassHour = "sdkfldsl";
        // console.log(getLoc('allData'));
        // this._allData(resData);
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
      //异常记录
      errorRecord(index) {
        this.$router.push('/errorRecord/' + index);
      },
      //设置岗位
      setPostFn() {
        this.isShowSet = true;
      },
      //保存
      saveFn(v) {
        this.tags = v;
        this.isShowSet = false;
      },
      cancelFn() {
        this.isShowSet = false;
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      if(this.$route.params.trainList) {
        this.trainList = this.$route.params.trainList;
      } else {
        // this.trainList = getLoc('allData').allData.user[this.userIndex].notActionList[this.nowIndex].trainList;
      }
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang="less" scoped>
  .info {
    .content {
      padding: 0.1rem 0.2rem;
      position: fixed;
      bottom: 0;
      right: 0;
      top: 0.7rem;
      left: 2.7rem;
      overflow-y: auto;
      .list-wrap {
        border: 1px solid #e9ecf4;
        margin-bottom: 0.28rem;
        .item-info {
          padding: 0.05rem 0.35rem 0.35rem 0.35rem;
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
            display: inline-block;
            margin-left: 0.16rem;
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
            width: 8rem;
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
            span {
            }
          }
          .fault-info {
            padding: 0.1rem 0.3rem;
            span {
              font-size: 0.24rem;
            }
            span.text {
              height: 0.5rem;
              line-height: 0.5rem;
              width: 8rem;
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