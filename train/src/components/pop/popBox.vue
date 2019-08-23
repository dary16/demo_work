<template>
  <transition name="pop">
    <div class="popCover">
      <div class="mask"></div>
      <div class="popContent">
        <h3 class="popTitle"></h3>
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
                <span>{{item.title}}：</span>
                <el-input
                  v-model.trim="popReq[item.val]"
                  size="mini"
                  v-bind:placeholder="item.placeholder"
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
                <span>{{item.title}}：</span>
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
              <li v-if="item.status == 3">
                <span>{{item.title}}：</span>
                <el-input
                  v-model.trim="popReq[item.val]"
                  size="mini"
                  v-bind:placeholder="item.placeholder"
                  :disabled="item.disabled"
                  :suffix-icon="item.star"
                  @focus="test"
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
            <a
              href="javascript:;"
              v-on:click="onCancle"
            >取消</a>
          </div>
        </div>
      </div>
      <mt-datetime-picker
        ref="picker"
        type="time"
        @confirm="handleConfirm"
        v-model="popReq.commentDate"
        hour-format="{value} 时"
        minute-format="{value} 分"
        :endDate="new Date()"
      >
      </mt-datetime-picker>
    </div>
  </transition>
</template>
<script>
  export default {
    data() {
      return {
        popReq: {},//弹窗的数据
      };
    },
    props: ['popData', 'formData'],
    created() {
    },
    methods: {
      onSubmit() {
        this.$emit('save', this.popReq);
      },
      onCancle() {
        this.$emit('cancle', false);
      },
      btnsFn(val) {
        this.$emit('getBtnFn', val);
      },
      createFn() {

      },
      beforeFileUpload() {

      },
      test() {
        this.$refs.picker.open();
      },
      handleConfirm(value) {
        this.popReq.commentDate = value;
      }
    }
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
    width: 6rem;
    left: 50%;
    margin-left: -3rem;
    top: 2rem;
    z-index: 1999;
    border-radius: 0.08rem;
    overflow: hidden;
    h3 {
      height: 0.4rem;
      line-height: 0.4rem;
      background: #2f4553;
      color: #fff;
      font-size: 0.2rem;
      text-indent: 0.02rem;
      font-weight: normal;
    }
    .content {
      padding: 0.05rem 0;
      background: #cfd6f3;
      .subContent {
        ul {
          li {
            padding-left: 0.05rem;
            color: #2f4553;
            margin-bottom: 0.05rem;
            overflow: hidden;
            span {
              float: left;
              font-size: 0.23rem;
              height: 0.45rem;
              line-height: 0.45rem;
              width: 1.8rem;
              text-align: right;
            }
          }
        }
      }
      .popBtn {
        text-align: center;
        margin-top: 0.1rem;
        margin-bottom: 0.15rem;
        a {
          display: inline-block;
          width: 1.2rem;
          height: 0.38rem;
          line-height: 0.38rem;
          background: #2f4553;
          color: #fff;
          text-align: center;
          border-radius: 0.05rem;
          box-shadow: 1px 3px 1px rgba(0, 0, 0, 0.3);
        }
        a:hover {
          text-decoration: none;
        }
        a:nth-child(1) {
          margin-right: 0.8rem;
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
  }
</style>
