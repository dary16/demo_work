<template>
  <div class='info'>
    <v-info-header
      v-on:backFn="back"
      :titleData="title"
    ></v-info-header>
    <div class="content">
      <v-list-title :listTilte="listTitle1"></v-list-title>
      <div class="item-info">
        <span class="arrived">实到人员</span>
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
        <button
          class="normal-btn fr"
          @click="setPostFn"
        >设置岗位</button>
      </div>
      <div class="info-list">
        <v-list-title :listTilte="listTitle2"></v-list-title>
        <div
          class="item-info"
          v-for="(item,index) in trainList"
          :key="item.trainContentID"
        >
          <div class="info-wrap">
            <span class="text">{{item.trainContentDesc}}</span>
            <button
              class="normal-btn"
              @click="setTime(index)"
              v-if="item.endTime == ''"
            >完成时间</button>
            <span v-else>{{item.trainClassHour}}</span>
            <div class="fr nicon">
              <i
                class="el-icon-circle-plus"
                @click="errorRecord(index)"
              ></i>
            </div>
          </div>

          <div
            class="fault-list"
            v-if="item.faultInfo.length > 0"
          >
            <div class="fault-title"><i class="el-icon-s-flag"></i><span>异常说明</span></div>
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

      <v-list-title :listTilte="listTitle4"></v-list-title>
      <div class="item-info">
        <span class="text">实施内容实施内容啦啦啦啦</span>
      </div>
    </div>
    <div class="buttons">
      <button
        class="normal-btn-lg mr"
        @click="suggestion"
      >意见建议</button>
      <button
        class="normal-btn-lg mr"
        @click="recordFn"
      >数据项记录</button>
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
  export default {
    data() {
      //这里存放数据
      return {
        isSignIn: false,
        isShowSet: false,
        trainList: [],
        popTitle: "设置岗位",
        listTitle1: "人员签到",
        listTitle2: '训练详细内容',
        listTitle3: '异常说明',
        listTitle4: '训练实施',
        title: "训练实施信息",
        tags: [
          { trainImplementAstronautName: "张三", trainImplementAstronautID: "001", isSignIn: false, post: "01" },
          { trainImplementAstronautName: "王四", trainImplementAstronautID: "002", isSignIn: false, post: "" },
          { trainImplementAstronautName: "王五", trainImplementAstronautID: "003", isSignIn: false, post: "02" }
        ]
      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      tagFn(i) {
        this.tags[i].isSignIn = !this.tags[i].isSignIn;
      },
      //设置时间
      setTime(index) {
        let time = this.util.formatDate(new Date().getTime(), 3);
        this.trainList[index].endTime = time;
        setLoc('trainListData', this.trainList);
        // this._allData(resData);
      },
      //返回
      back() {
        this.$router.push('/layout');
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
        console.log(v);
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
        console.log(this.$route.params.trainList, 'data');
        this.trainList = this.$route.params.trainList;
      }
      //   if(this.$route.params.addData) {
      //     this.trainList[this.$route.params.index].faultInfo.push(this.$route.params.addData);
      // setLoc('trainListData', this.trainList);
      //   }
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang="less" scoped>
  .info {
    .content {
      padding: 0.1rem 0.2rem;
      .item-info {
        padding: 0.2rem 0.3rem;
        border: 1px solid #006699;
        min-height: 1rem;

        span {
          display: inline-block;
          font-size: 0.25rem;
        }
        span.text {
          height: 0.5rem;
          line-height: 0.5rem;
          width: 12rem;
        }
        .arrived {
          font-size: 0.25rem;
          font-weight: bold;
          margin-right: 0.1rem;
        }

        .tags {
          display: inline-block;
          .peopleTag {
            margin-right: 0.05rem;
          }
          .peopleTag.active {
            background: #006699;
          }
        }
      }
      .info-list {
        .item-info {
          padding: 0 !important;
          .info-wrap {
            padding: 0.2rem 0.3rem;
            span {
              display: inline-block;
              font-size: 0.25rem;
            }
            span.text {
              height: 0.5rem;
              line-height: 0.5rem;
              width: 12rem;
            }
            .nicon {
              font-size: 0.4rem;
            }
          }
          .fault-list {
            .fault-title {
              font-size: 0.25rem;
              height: 0.6rem;
              line-height: 0.6rem;
              padding-left: 0.4rem;
              background: #006699;
              border-left: 1px solid #006699;
              border-right: 1px solid #006699;
              color: #fff;
              span {
                margin-left: 0.1rem;
              }
            }
            .fault-info {
              padding: 0.1rem 0.3rem;
            }
          }
        }
      }
    }
    .buttons {
      text-align: center;
      line-height: 1rem;
    }
  }
</style>