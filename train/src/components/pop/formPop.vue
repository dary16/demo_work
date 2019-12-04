<template>
  <div class="fromPopContent">
    <h3 class="fromPopTitle">{{ popData.titleTotal }}</h3>
    <div class="fromContent">
      <div class="fromSubContent clearfix">
        <ul v-for="(item, index) in popData.options" :key="index">
          <li v-if="item.status == 1" class="fromPopBox">
            <span><i v-if="item.check">*</i>{{ item.title }}</span>
            <el-input
              v-model.trim="popReq[item.val]"
              v-bind:placeholder="item.placeholder"
              resize="none"
              :autosize="{ minRows: 2 }"
              :type="item.isTextarea"
              :maxlength="item.maxLength"
              :disabled="item.disabled"
              :suffix-icon="item.star"
            >
            </el-input>
          </li>
          <li v-if="item.status == 2" class="fromPopBox">
            <span><i v-if="item.check">*</i>{{ item.title }}</span>
            <el-select
              v-model="popReq[item.val]"
              v-bind:placeholder="item.placeholder"
            >
              <el-option
                v-for="itemSel in item.list"
                :key="itemSel.value"
                :label="itemSel.label"
                :value="itemSel.value"
              ></el-option>
            </el-select>
          </li>
          <li v-if="item.status == 3" class="fromPopBox">
            <span><i v-if="item.check">*</i>{{ item.title }}</span>
            <el-input
              readonly
              :placeholder="item.placeholder"
              v-model="time"
              @focus="chooseTime"
            >
            </el-input>
          </li>
          <li v-if="item.status == 4" class="fromPopBox">
            <span><i v-if="item.check">*</i>{{ item.title }}</span>
            <el-select
              multiple
              v-model="popReq[item.val]"
              v-bind:placeholder="item.placeholder"
            >
              <el-option
                v-for="itemSel in astronaut"
                :key="itemSel.trainImplementAstronautName"
                :label="itemSel.trainImplementAstronautName"
                :value="itemSel.trainImplementAstronautName"
              ></el-option>
            </el-select>
          </li>
          <li v-if="item.status == 5" class="fromPopBox">
            <span><i v-if="item.check">*</i>{{ item.title }}</span>
            <el-input
              readonly
              v-model="astronaut"
              :placeholder="item.placeholder"
              @focus="chooseAstronaut"
            >
            </el-input>
          </li>
          <li v-if="item.status == 6" class="fromPopBox">
            <span><i v-if="item.check">*</i>{{ item.title }}</span>
            <el-input
              readonly
              v-model="commentPerson"
              :placeholder="item.placeholder"
              @focus="chooseCommentPerson"
            >
            </el-input>
          </li>
        </ul>
      </div>

      <div class="popBtn">
        <button class="reset" v-on:click="onReset">清 空</button>
        <button class="submit" v-on:click="onSubmit">确 定</button>
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
        astronaut: '',//航体员
        astronautID: '',//航体员id
        astronautIDs: [],//航天员及ids
        commentPerson: '',//建议人
        commentID: '',//建议人id
        commentPersonIDs: []//建议人及ids
      };
    },
    props: ['popData', 'abnormalDate', 'commentDate', 'astronautChoose', 'commentPersonChoose'],
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
      //航体员
      astronautChoose: {
        handler(newValue, oldValue) {
          this.astronaut = '';
          this.astronautIDs = [];
          this.astronautIDs = newValue;
          for (let i = 0; i < newValue.length; i++) {
            if (i != 0) {
              this.astronautID += "," + newValue[i].trainImplementAstronautID;
              this.astronaut += "," + newValue[i].trainImplementAstronautName;
            } else {
              this.astronautID += newValue[i].trainImplementAstronautID;
              this.astronaut += newValue[i].trainImplementAstronautName;
            }
          }
          this.popReq.joinAstronautNames = [];
          this.popReq.joinAstronautNames = newValue;
        }
      },
      //建议人
      commentPersonChoose: {
        handler(newValue, oldValue) {
          this.commentPerson = '';
          this.commentPersonIDs = [];
          this.commentPersonIDs = newValue;
          for (let i = 0; i < newValue.length; i++) {
            if (i != 0) {
              this.commentID += "," + newValue[i].trainImplementAstronautID;
              this.commentPerson += "," + newValue[i].trainImplementAstronautName;
            } else {
              this.commentID += newValue[i].trainImplementAstronautID;
              this.commentPerson += newValue[i].trainImplementAstronautName;
            }
          }
          this.popReq.commentPersonName = [];
          this.popReq.commentPersonName = newValue;
        }
      }
    },
    methods: {
      onSubmit() {
        this.$emit('save', this.popReq);
        if (this.popReq.commentTitle != null && this.popReq.commentTitle != '' && this.popReq.commentDate != null && this.popReq.commentPersonName.length > 0) {
          this.popReq = {};
          this.time = null;
          this.commentPerson = '';
          this.commentPersonIDs = [];
        }
        if (this.popReq.dataItemName != null && this.popReq.joinAstronautNames.length > 0 && this.popReq.dataItemValue != null && this.popReq.dataItemValue != '') {
          if (/^[0-9]+.?[0-9]*/.test(this.popReq.dataItemValue) && parseFloat(this.popReq.dataItemValue) < 10000) {
            if (this.popReq.dataItemMeasureValue == null || this.popReq.dataItemMeasureValue == '') {
              this.popReq = {};
              this.astronaut = '';
              this.astronautIDs = [];
            } else if (/^[0-9]+.?[0-9]*/.test(this.popReq.dataItemMeasureValue) && parseFloat(this.popReq.dataItemMeasureValue) < 10000) {
              this.popReq = {};
              this.astronaut = '';
              this.astronautIDs = [];
            }
          }
        }
      },
      onReset() {
        this.popReq = {};
        this.time = null;
        this.astronaut = '';
        this.commentPerson = '';
        // this.$emit('cancle', false);
      },
      btnsFn(val) {
        this.$emit('getBtnFn', val);
      },
      chooseTime() {
        this.$emit('chooseTime');
      },
      //选择航天员
      chooseAstronaut() {
        this.$emit('chooseAstronaut', this.astronautIDs);
      },
      //选择建议人
      chooseCommentPerson() {
        this.$emit('chooseCommentPerson', this.commentPersonIDs);
      }
    },
  };
</script>
<style lang="less" scoped>
  .fromPopContent {
    position: fixed;
    left: 1.2rem;
    top: 0.7rem;
    width: 6.6rem;
    bottom: 0;
    overflow-y: auto;
    border-right: solid 1px white;
    background-color: #fff;
    .fromPopTitle {
      font-size: 0.28rem;
      font-weight: normal;
      margin: 0.2rem 0.3rem 0.2rem;
      text-align: left;
    }
    .fromContent {
      margin: 0.1rem 0.4rem 0.2rem 0.3rem;
      .fromSubContent {
        ul {
          li {
            span {
              height: 0.45rem;
              line-height: 0.45rem;
              width: 1.9rem;
              text-align: left;
              font-size: 0.23rem;
              color: #666;
              display: block;
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
        margin-top: 0.2rem;
        button {
          width: 2.5rem;
          height: 0.5rem;
          margin-right: 0.2rem;
          padding: 0.2rem;
          background: #3288fe;
          color: #fff;
          font-size: 0.24rem;
          line-height: 0.1rem;
          border-radius: 0.05rem;
        }
        .reset {
          text-align: center;
          border: 1px solid #3288fe;
          background-color: #fff;
          color: #3288fe;
        }
      }
    }
  }
</style>
<style lang="less">
  .fromPopContent {
    .fromPopBox {
      .el-input {
        .el-input__inner {
          font-size: 0.22rem !important;
        }
      }
      .el-divider {
        margin: 0.3rem 0;
        .el-divider__text {
          background-color: #f5f6fa !important;
        }
      }
      .el-select {
        .el-input {
          .el-input__inner {
            //width: 3.8rem !important;
          }
        }
      }
      .el-textarea {
        .el-textarea__inner {
          //width: 3.8rem;
          //float: right;
          margin: 0;
          position: relative;
          left: 0;
          max-height: 1rem;
          font-size: 0.25rem;
        }
      }
    }
    .el-input {
      //width: 3.8rem;
      line-height: 0.7rem;
      .el-input__inner {
        height: 0.5rem !important;
        line-height: 0.5rem !important;
      }
    }
  }
</style>
