<template>
  <div class="popCover">
    <div class="mask"></div>
    <div class="popContent">
      <div class="popTitle">
        <h3>{{ popTitle }}</h3>
        <a href="javascript:;" v-on:click="onCancle">取消</a>
      </div>
      <div class="content setPost">
        <div class="subContent clearfix">
          <ul>
            <li
              v-for="(item, i) in newTags"
              :key="item.trainImplementAstronautID"
            >
              <span>{{ item.trainImplementAstronautName }}</span>
              <el-radio-group
                size="small"
                v-model="item.label"
                @change="changeFn"
              >
                <el-radio
                  :label="item.label"
                  border
                  v-for="item in radioData"
                  :key="item.value"
                  >{{ item.label }}</el-radio
                >
              </el-radio-group>
              <el-time-picker
                v-model="item.dateTime"
                :picker-options="{
                  selectableRange: '06:30:00 - 22:30:00'
                }"
                format="HH:mm"
                placeholder="选择时间"
                :clearable="false"
                @change="changeTime"
                @focus="focus(i)"
                :editable="false"
              >
              </el-time-picker>
            </li>
          </ul>
        </div>
        <div class="popBtn">
          <a href="javascript:;" v-on:click="onSubmit">确定</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getLoc } from '@/utils/common.js';
  export default {
    data() {
      return {
        newTags: [], //存储从父组件传过来的值
        timeIndex: -1, //记录签到时间索引
        radioData: [] //记录岗位的值
      };
    },
    props: ['tags', 'popTitle'],
    created() {
      this.radioData = getLoc('base').trainPostList;
      this.newTags = JSON.parse(JSON.stringify(this.tags));
    },
    watch: {},
    methods: {
      onSubmit() {
        for (let i = 0; i < this.newTags.length; i++) {
          for (let j = 0; j < this.radioData.length; j++) {
            if (this.newTags[i].label == this.radioData[j].label) {
              this.newTags[i].post = this.radioData[j].value
            }
          }
        }
        this.$emit('save', this.newTags);
      },
      onCancle() {
        this.$emit('cancle', false);
      },
      changeFn(v) {
      },
      //签到时间点击确定触发
      changeTime(obj) {
        //格式转换
        let timeLess = this.util.formatDate(obj.getTime());
        this.newTags[this.timeIndex].dateTime = timeLess;
      },
      focus(v) {
        this.timeIndex = v;
      }
    },
    activated() {
      this.newTags = JSON.parse(JSON.stringify(this.tags));
    } //如果页面有keep-alive缓存功能，这个函数会触发
  };
</script>
<style lang="less" scoped>
  .on {
    background: #1c6492 !important;
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1998;
  }
  .popContent {
    position: absolute;
    background: #fff;
    left: 42%;
    top: 50%;
    transform: translateX(-42%) translateY(-50%);
    -webkit-transform: translateX(-42%) translateY(-50%);
    z-index: 1999;
    .popTitle {
      position: relative;
      h3 {
        height: 0.6rem;
        line-height: 0.6rem;
        background: #fff;
        color: #090909;
        text-indent: 0.02rem;
        font-weight: normal;
        text-align: center;
        font-size: 0.26rem;
      }
      a {
        position: absolute;
        right: 0.15rem;
        top: 0.15rem;
        font-size: 0.22rem;
        color: #348aff;
      }
    }
    .content {
      padding: 0.2rem 0.4rem;
      background: #f5f6fa;
      .subContent {
        max-height: 5rem;
        padding: 0.4rem 0.3rem 0;
        overflow: auto;
        ul {
          li {
            padding-left: 0.05rem;
            color: #2f4553;
            margin-bottom: 0.05rem;
            overflow: hidden;
            span {
              float: left;
              font-size: 0.23rem;
              height: 0.55rem;
              line-height: 0.55rem;
              width: 1rem;
              text-align: left;
            }
          }
        }
      }
      .popBtn {
        text-align: center;
        margin: 0.2rem 0;
        a {
          display: inline-block;
          width: 2.2rem;
          height: 0.45rem;
          line-height: 0.45rem;
          background: #3388ff;
          color: #fff;
          text-align: center;
          font-size: 0.24rem;
        }
        a:hover {
          text-decoration: none;
        }
      }
    }
  }

  // // 分割线
  .el-input--mini {
    width: 4rem;
    background: #fff;
    border-radius: 0.05rem;
    height: 0.3rem;
    line-height: 0.3rem;
  }
  .el-select--mini {
    width: 4rem;
    background: #fff;
    border-radius: 0.05rem;
    height: 0.22rem;
    line-height: 0.28rem;
  }
  .setPost .el-date-editor.el-input,
  .setPost .el-date-editor.el-input__inner {
    vertical-align: top;
    border-radius: 0.05rem;
    width: 2rem !important;
  }
  .setPost .el-radio {
    margin-right: 0 !important;
  }
  .el-input--mini .el-input__inner {
    height: 0.22rem !important;
    line-height: 0.22rem !important;
  }
</style>
<style lang="less">
  input[type="file"] {
    display: none !important;
  }
  .setPost {
    .el-input__inner {
      font-size: 0.2rem !important;
      height: 26px !important;
      line-height: 26px !important;
    }
    .el-input__icon {
      line-height: 26px !important;
    }
  }
</style>
