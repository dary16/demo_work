<template>
  <div class="list-wrap">
    <v-list-title>训练详细内容</v-list-title>
    <div
      class="item-info"
      v-for="(item,index) in content"
      :key="item.trainContentID"
    >
      <div
        v-if="show == 1"
        class="info-wrap"
      >
        <span class="text">{{item.trainContentDesc}}</span>
        <div class="set-time">
          <span>{{item.trainContentStartDate}}</span>
          <span>{{item.trainContentEndDate}}</span>
        </div>
      </div>
      <div
        v-else
        class="info-wrap"
      >
        <span class="text">{{item.trainContentDesc}}</span>
        <div
          class="set-time"
          v-if="item.timeWay == '时间点'"
        >
          <button
            v-if="item.trainContentEndDate == ''"
            class="btn-set-time start-time"
            @click="chooseEndTime(index)"
          >完成时间</button>
          <span v-else>{{item.trainContentEndDate}}
            <i
              class="el-icon-edit"
              @click="chooseEndTime(index)"
            ></i>
          </span>
        </div>
        <div
          class="set-time"
          v-else
        >
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
        <div class="fault-title">
          <span>异常说明</span>
        </div>
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
</template>

<script>

  export default {
    data() {
      //这里存放数据
      return {
      };
    },
    props: ['content', 'show', 'way'],
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
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
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
</style>