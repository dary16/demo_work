<template>
  <div class="list-wrap">
    <v-list-title>训练详细内容</v-list-title>

    <div
      class="item-info"
      v-for="(item,index) in content"
      :key="item.trainContentID"
    >
      <el-collapse v-model="activeName">
        <el-collapse-item :name="index">
          <template slot="title">
            <div @click="stopPrep">
              <div class="title-info">
                <i class="header-icon el-icon-caret-right"></i>
                <span>{{item.trainContentName}}</span>
              </div>
              <div class="time">
                <div
                  v-if="show == 1"
                  class="info-wrap"
                >
                  <div
                    class="set-time"
                    v-if="item.timeWay == '时间点'"
                  >
                    <button class="btn-set-time start-time">完成时间</button>
                    <span>{{item.trainContentEndDate}}
                    </span>
                  </div>
                  <div
                    class="set-time"
                    v-else
                  >
                    <button class="btn-set-time start-time">开始时间</button>
                    <span>{{item.trainContentStartDate}}
                    </span>

                    <button class="btn-set-time">结束时间</button>
                    <span>{{item.trainContentEndDate}}
                    </span>
                  </div>
                </div>
                <div
                  v-else
                  class="info-wrap"
                >
                  <div
                    class="set-time"
                    v-if="item.timeWay == '时间点'"
                  >
                    <button
                      class="btn-set-time start-time"
                      @click="chooseEndTime(index)"
                    >完成时间</button>
                    <span>{{item.trainContentEndDate}}
                      <i
                        class="el-icon-edit"
                        @click="chooseEndTime(index)"
                        v-show="item.trainContentEndDate !== ''"
                      ></i>
                    </span>
                  </div>
                  <div
                    class="set-time"
                    v-else
                  >
                    <button
                      class="btn-set-time start-time"
                      @click.stop="chooseStartTime(index)"
                      v-if="item.trainContentStartDate == ''"
                    >开始时间</button>
                    <button
                      v-else
                      class="btn-set-time start-time"
                    >开始时间</button>
                    <span>{{item.trainContentStartDate}}
                      <i
                        class="el-icon-edit"
                        v-show="item.trainContentStartDate !== ''"
                        @click.stop="chooseStartTime(index)"
                      ></i>
                    </span>

                    <button
                      class="btn-set-time"
                      @click.stop="chooseEndTime(index)"
                      v-if="item.trainContentEndDate == ''"
                    >结束时间</button>
                    <button
                      class="btn-set-time"
                      v-else
                    >结束时间</button>
                    <span>{{item.trainContentEndDate}}
                      <i
                        class="el-icon-edit"
                        @click="chooseEndTime(index)"
                        v-show="item.trainContentEndDate !== ''"
                      ></i>
                    </span>
                  </div>

                  <div class="fr nicon">
                    <button
                      class="normal-no-border"
                      @click.stop="errorRecord(index)"
                    ><i class="error-icon el-icon-circle-plus"></i>添加异常</button>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <div class="error-list">
            <div class="content">{{item.trainContentDesc}}</div>
            <div
              class="fault-list"
              v-if="item.faultInfo.length > 0"
              v-for="(item2,index2) in item.faultInfo"
              :key="item2.id"
            >
              <el-collapse :v-model="errorActive">
                <el-collapse-item :name="index2">
                  <template slot="title">
                    <div @click="stopPrep">
                      <img src="../../assets/warn.png" class="error-icon"/>
                      <span class="fault-title">{{item2.abnormalObject}}在{{item2.abnormalDate}}发生了异常</span>
                    </div>
                  </template>
                  <div class="fault-info">{{item2.abnormalExplain}}</div>
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

  export default {
    data() {
      //这里存放数据
      return {
        activeName: 0,
        errorActive: 0
      };
    },
    props: ['content', 'show'],
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      chooseStartTime(i) {
        this.$emit('chooseStartTime', i)
      },
      chooseEndTime(i) {
        this.$emit('chooseEndTime', i)
      },
      errorRecord(i) {
        this.$emit('errorRecord', i)
      },
      stopPrep(e) {
        e.stopPropagation();
        return false;
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
  @import "../../style/global.less";
  .list-wrap {
    .item-info {
      //   padding: 0.05rem 0.35rem 0rem 0.35rem;
      position: relative;
      //   border: 1px solid @c-border;
      .title-info {
        font-size: 0.22rem;
        height: 0.7rem;
        line-height: 0.7rem;
        width: 7.7rem;
        padding-left: 0.35rem;
        display: inline-block;
      }
      .time {
        display: inline-block;
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
          .set-time {
            display: inline-block;
            width: 6rem;
            .btn-set-time {
              margin-right: 0.25rem;
            }
            span {
              display: inline-block;
              margin-right: 0.4rem;
            }
          }
        }
      }
      .error-icon {
        width: 0.2rem;
      }
      .error-list {
        padding-left: 0.3rem;
      }
      .content {
        font-size: 0.2rem;
        padding-left: 0.23rem;
        line-height: 0.5rem;
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
      margin-top: 0.1rem;
      border-bottom: 1px solid transparent;
      .fault-title {
        font-size: 0.2rem;
        height: 0.6rem;
        line-height: 0.6rem;
        padding-left: 0.15rem;
      }
      .error-icon {
        color: #ed5353;
      }
      .fault-info {
        padding: 0.1rem 0.3rem;
        font-size: 0.2rem;
        color: #808383;
        .keyword {
          color: #808383;
          font-size: 0.2rem;
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
    margin-right: 0.5rem !important;
  }
</style>