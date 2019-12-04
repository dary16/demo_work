<template>
    <div class="popCover">
      <div class="mask"></div>
      <div class="popContent">
        <div class="popTitle">
          <h3>{{popData.titleTotal}}</h3>
          <a
            href="javascript:;"
            v-on:click="onCancle"
          >取消</a>
        </div>

        <div class="content">
          <div class="subContent clearfix">
            <ul
              v-for="(item,index) in popData.options"
              :key="index"
            >
              <li
                v-if="item.status == 1"
                class="popBox"
              >
                <span><i v-if="item.check">*</i>{{item.title}}：</span>
                <el-input
                  v-model.trim="popReq[item.val]"
                  size="mini"
                  resize="none"
                  v-bind:placeholder="item.placeholder"
                  rows=2
                  :type="item.isTextarea"
                  :maxlength="item.maxLength"
                  :disabled="item.disabled"
                  :suffix-icon="item.star"
                >
                  <i
                    v-if="item.visible"
                    class="el-icon-star-off el-input__icon"
                    slot="suffix"
                  ></i>
                  <i
                    v-if="item.editable"
                    class="el-icon-edit el-input__icon"
                    slot="suffix"
                  ></i>
                </el-input>
              </li>
              <li v-if="item.status == 2">
                <span><i v-if="item.check">*</i>{{item.title}}：</span>
                <el-select
                  class="popBox"
                  v-model="popReq[item.val]"
                  v-bind:placeholder="item.placeholder"
                  size="mini"
                >
                  <el-option
                    v-for="itemSel in item.list"
                    :key="itemSel.value"
                    :label="itemSel.label"
                    :value="itemSel.value"
                  ></el-option>
                </el-select>
              </li>
              <li
                v-if="item.status == 3"
                class="popBox"
              >
                <span><i v-if="item.check">*</i>{{item.title}}：</span>
                <el-input
                  readonly
                  size="mini"
                  :placeholder="item.placeholder"
                  v-model="time"
                  @focus="chooseTime"
                >
                </el-input>
              </li>
              <li v-if="item.status == 4">
                <span><i v-if="item.check">*</i>{{item.title}}：</span>
                <el-select
                  class="popBox"
                  v-model="popReq[item.val]"
                  v-bind:placeholder="item.placeholder"
                  size="mini"
                >
                  <el-option
                    v-for="itemSel in abnormalList"
                    :key="itemSel.value"
                    :label="itemSel.label"
                    :value="itemSel.value"
                  ></el-option>
                </el-select>
              </li>
              <li
                v-if="item.status == 5"
                class="popBox"
              >
                <span><i v-if="item.check">*</i>{{item.title}}：</span>
                <el-input
                  readonly
                  size="mini"
                  :placeholder="item.placeholder"
                  v-model="startDate"
                  @focus="chooseStartDate"
                >
                </el-input>
              </li>
              <li
                v-if="item.status == 6"
                class="popBox"
              >
                <span><i v-if="item.check">*</i>{{item.title}}：</span>
                <el-input
                  readonly
                  size="mini"
                  :placeholder="item.placeholder"
                  v-model="timing"
                  @focus="chooseTiming"
                >
                </el-input>
              </li>
              <li
                v-if="item.status == 7"
                class="popBox"
              >
                <span><i v-if="item.check">*</i>{{item.title}}：</span>
                <el-input
                  readonly
                  size="mini"
                  :placeholder="item.placeholder"
                  v-model="endDate"
                  @focus="chooseEndDate"
                >
                </el-input>
              </li>
            </ul>
          </div>

          <div class="popBtn">
            <a
              href="javascript:;"
              v-on:click="onSubmit"
            >确定</a>
          </div>
        </div>
      </div>

    </div>
</template>
<script>
  export default {
    data() {
      return {
        popReq: {},//弹窗的数据
        time: '',
        startDate: this.trainContentStartDate,
        timing:this.trainContentTiming,
        endDate:this.trainContentEndDate,
      };
    },
    props: ['popData', 'abnormalDate', 'commentDate', 'abnormalList','trainContentStartDate','trainContentTiming','trainContentEndDate'],
    created() { },
    watch: {
      abnormalDate: {
        handler(newValue, oldValue) {
          this.popReq.abnormalDate = newValue;
          this.time = newValue;
        }
      },
      //意见建议选择时间数据
      commentDate: {
        handler(newValue, oldValue) {
          this.popReq.commentDate = newValue;
          this.time = newValue;
        }
      },
      //开始时间
      trainContentStartDate:{
        handler(newValue, oldValue) {
          this.popReq.trainContentStartDate = newValue;
          this.startDate = newValue;
        }
      },
      //计时时间
      trainContentTiming:{
        handler(newValue, oldValue) {
          this.popReq.trainContentTiming = newValue;
          this.timing = newValue;
        }
      },
      //结束时间
      trainContentEndDate:{
        handler(newValue, oldValue) {
          this.popReq.trainContentEndDate = newValue;
          this.endDate = newValue;
        }
      }
    },
    methods: {
      onSubmit() {
        this.$emit('save', this.popReq);
        if(this.popReq.abnormalType != undefined && this.popReq.abnormalDate != undefined && this.popReq.abnormalObject != undefined && this.popReq.abnormalExplain != undefined){
          this.popReq = {};
          this.time = '';
        }
      },
      onCancle() {
        this.$emit('cancle', false);
        this.popReq = {};
        this.time = '';
      },
      btnsFn(val) {
        this.$emit('getBtnFn', val);
      },
      chooseTime() {
        this.$emit('chooseTime');
      },
      chooseStartDate() {
        this.$emit('chooseStartDate');
      },
      chooseTiming() {
        this.$emit('chooseTiming');
      },
      chooseEndDate() {
        this.$emit('chooseEndDate');
      }
    },
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
    position: fixed;
    background: #fff;
    left: 50%;
    margin-left: -3rem;
    top: 1rem;
    z-index: 1999;
    border-radius: 0.08rem;
    overflow: hidden;
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
        right: 0.3rem;
        top: 0.15rem;
        font-size: 0.22rem;
        color: #348aff;
      }
    }
    .content {
      padding: 0.2rem 0.3rem;
      background: #f5f6fa;
      .subContent {
        padding: 0;
        ul {
          li {
            padding-left: 0.08rem;
            color: #090909;
            margin-bottom: 0.25rem;
            // overflow: hidden;
            span {
              float: left;
              font-size: 0.23rem;
              // height: 0.45rem;
              line-height: 0.45rem;
              width: 1.9rem;
              text-align: right;
              i {
                font-style: normal;
                padding-right: 2px;
                vertical-align: middle;
                color: #f00;
              }
            }
          }
        }
      }
      .popBtn {
        text-align: center;
        margin-bottom: 0.1rem;
        a {
          display: inline-block;
          width: 2.2rem;
          height: 0.45rem;
          line-height: 0.45rem;
          background: #3388ff;
          color: #fff;
          text-align: center;
          font-size: 0.24rem;
          //   border-radius: 0.05rem;
          //   box-shadow: 1px 3px 1px rgba(0, 0, 0, 0.3);
        }
        a:hover {
          text-decoration: none;
        }
      }
      .el-select {
          width: 3.8rem;
      }
    }
  }

  // // 分割线
  .el-input--mini {
    width: 3.8rem;
    background: #fff;
    border-radius: 0.05rem;
    height: 0.3rem;
    line-height: 0.3rem;
  }
  .el-select--mini {
    width: 3.8rem;
    background: #fff;
    border-radius: 0.05rem;
    height: 0.4rem;
    line-height: 0.28rem;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 4rem;
    vertical-align: top;
    border-radius: 0.05rem;
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
  .popCover {
    .el-input__inner {
      font-size: 0.23rem !important;
    }
    .el-textarea{
      .el-textarea__inner{
        border: none;
      }
    }
    .el-textarea{
      .el-textarea__inner{
        border: none;
        font-size: 0.23rem !important;
      }
    }
    .el-select--mini{
      position: relative;
      right: 0.1rem;
      width: 3.8rem;
      margin: 0 0 0 0.1rem !important;
    }
  }
  .subContent {
    .el-select--mini {
      height: 18px;
      .el-select__tags {
        white-space: nowrap;
        overflow: hidden;
        display: block;
        margin: 1px 1px 2px 1px;
      }
    }
  }
  .popBox{
    .el-textarea{
      height: auto !important;
    }
  }
</style>
