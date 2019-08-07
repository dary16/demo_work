<template>
  <div>
    <keep-alive>
      <v-imple-info
        :infoData="infoData"
        v-on:setPostFn="setPostFn"
        v-on:errorRecord="errorRecord"
        v-on:recordFn="recordFn"
        v-on:suggestion="suggestion"
        v-on:back="back"
        v-on:updateFn="updateFn"
        v-on:updateTimeFn="updateTimeFn"
        v-on:doneFn="doneFn"
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
          listTitle1: "普通训练任务",
          listTitle2: '训练详细内容',
          listTitle3: '异常说明',
          title: "训练实施信息",
          index: '',
          tags: [],
        },
        isShowSet: false,
        popTitle: "设置岗位",
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['nowIndex', 'allData', 'userInfo'])
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
        let oldActionData = getLoc(this.userInfo.userID).notActionData;
        let arrLen = oldActionData[this.nowIndex].joinAstronautNames.length;
        //数组的替换
        oldActionData[this.nowIndex].joinAstronautNames.splice(0, arrLen, ...v);
        setLoc(getLoc('userInfo').userID, { "notActionData": JSON.parse(JSON.stringify(oldActionData)), "loadTime": getLoc(this.userInfo.userID).loadTime });
        this.infoData.tags = v;
        this.isShowSet = false;
      },
      cancelFn() {
        this.isShowSet = false;
      },
      //更新数据
      updateFn() {
        this.infoData.tags = getLoc(this.userInfo.userID).notActionData[this.nowIndex].joinAstronautNames;
      },
      //更新时间数据
      updateTimeFn() {
      },
      //完成
      doneFn() {
        console.log('done');
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      if(this.$route.params.trainList) {
        this.infoData.trainList = this.$route.params.trainList;
        this.infoData.index = this.$route.params.index;
        this.infoData.tags = getLoc(this.userInfo.userID).notActionData[this.nowIndex].joinAstronautNames;
      } else {
        //判断是否有新添加数据
        if(this.$route.params.addData) {
          //获取本地未实施数据
          let oldActionData = getLoc(this.userInfo.userID).notActionData;
          //将新添加数据push到oldActionData内
          oldActionData[this.nowIndex].trainImpleData.trainList[this.$route.params.index].faultInfo.push(this.$route.params.addData);
          //将数据存储到本地
          setLoc(getLoc('userInfo').userID, { "notActionData": JSON.parse(JSON.stringify(oldActionData)), "loadTime": getLoc(this.userInfo.userID).loadTime });
          this.infoData.trainList = oldActionData[this.nowIndex].trainImpleData.trainList;
        } else {
          this.infoData.tags = getLoc(this.userInfo.userID).notActionData[this.nowIndex].joinAstronautNames;
          this.infoData.trainList = getLoc(this.userInfo.userID).notActionData[this.nowIndex].trainImpleData.trainList;
        }
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