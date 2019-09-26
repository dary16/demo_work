<template>
  <div class="popCover">
    <div class="mask"></div>
    <div class="popContent">
      <h3 class="popTitle">{{popTitle}}</h3>
      <div class="content">
        <div class="subContent clearfix">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 10px 0;"></div>
          <el-checkbox-group
            v-model="checkPeoples"
            @change="handleCheckPeoplesChange"
          >
            <el-checkbox
              v-for="item in peoples"
              :label="item"
              :key="item"
            >{{item}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="popBtn">
          <a
            href="javascript:;"
            v-on:click="onCancle"
          >取消</a>
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
  import { mapState } from 'vuex';
  import { getLoc, setLoc } from '../../utils/common.js';
  export default {
    data() {
      return {
        checkAll: false,//控制全选
        checkPeoples: [],//所选人
        peoples: [],//后期需要动态计算
        isIndeterminate: true//设置 indeterminate 状态，只负责样式控制
      };
    },
    props: ['popTitle','changeIndex'],
    computed: {
      ...mapState(['userInfo', 'nowIndex', 'tabIndex', 'userName'])
    },
    created() {
      if(this.tabIndex === 1) {
        let names = getLoc(this.userName+"_n").notActionList[this.nowIndex].joinAstronautNames;
        let checkedNames = getLoc(this.userName+"_n").notActionList[this.nowIndex].trainData[this.changeIndex].joinAstronautNames;
        names.forEach(name => {
          this.peoples.push(name.trainImplementAstronautName);
          if(checkedNames.indexOf(name.trainImplementAstronautName)>=0){
            this.checkPeoples.push(name.trainImplementAstronautName);
          }
        });
      } else if(this.tabIndex === 2) {
        let names = getLoc(this.userName+"_y").trainListData[this.nowIndex].joinAstronautNames;
        let checkedNames = getLoc(this.userName+"_y").trainListData[this.nowIndex].trainData[this.changeIndex].joinAstronautNames;
        names.forEach(name => {
          this.peoples.push(name.trainImplementAstronautName);
          if(checkedNames.indexOf(name.trainImplementAstronautName)>=0){
            this.checkPeoples.push(name.trainImplementAstronautName);
          }
        });

      }

    },
    methods: {
      onSubmit() {
        this.$emit('save', this.checkPeoples);
      },
      onCancle() {
        this.$emit('cancle', false);
      },
      //全选
      handleCheckAllChange(val) {
        var peopleOptions = this.peoples;
        this.checkPeoples = val ? peopleOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckPeoplesChange(value) {
        // alert(value);
        //setLoc(this.userName+"_n",getLoc(this.userName+"_y").trainListData[this.nowIndex].joinAstronautNames);
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.peoples.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.peoples.length;
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
    width: 4rem;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1999;
    border-radius: 0.08rem 0 0 0.08rem;
    overflow: hidden;
    h3 {
      height: 0.6rem;
      line-height: 0.6rem;
      padding-left: 0.2rem;
      background: #2f4553;
      color: #fff;
      font-size: 0.2rem;
      text-indent: 0.02rem;
      font-weight: normal;
    }
    .content {
      background: #cfd6f3;
      position: absolute;
      top: 0.6rem;
      right: 0;
      bottom: 0;
      left: 0;
      .subContent {        
        position: absolute;
        top: 0.2rem;
        bottom: 1rem;
        left: 0.4rem;
        right: 0.4rem;
        overflow-y: auto;
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
        .el-checkbox-group{
          .el-checkbox{
            display: block;
            height: 0.48rem;
            line-height: 0.48rem;
            margin-right: 0;
            .el-checkbox__input{
              .el-checkbox__inner{
                border-radius: 50%;
              }
            }
          }
        }
      }
      .popBtn {
        text-align: center;
        margin-top: 0.1rem;
        margin-bottom: 0.15rem;
        position: absolute;
        bottom: 0.2rem;
        right: 0.4rem;
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
