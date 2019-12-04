<template>
  <div class="popCover">
    <div class="mask"></div>
    <div class="popContent">
      <div class="popTitle">
        <a
          href="javascript:;"
          v-on:click="onCancle"
        >取消</a>
        <h3>{{popTitle}}</h3>
      </div>
      <div class="content">
        <div class="subContent clearfix">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <el-checkbox-group
            v-model="checkPeoples"
            @change="handleCheckPeoplesChange"
          >
            <el-checkbox
              v-for="item in peoples"
              :key="item"
              :label="item"
            >{{item}}</el-checkbox>
          </el-checkbox-group>
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
  import { mapState } from 'vuex';
  import { getLoc, setLoc } from '../../utils/common.js';
  export default {
    data() {
      return {
        checkAll: false,//控制全选
        checkPeoples: [],//所选航体员
        peoples: [],//所有的航体员
        isIndeterminate: true,//设置 indeterminate 状态，只负责样式控制
      };
    },
    props: ['popTitle','changeIndex'],
    computed: {
      ...mapState(['userInfo', 'nowIndex','tabIndex', 'userName'])
    },
    mounted() { 

      },
    created() {
      if(this.tabIndex === 1) {
        let names = getLoc(this.userName+"_n").notActionList[this.nowIndex].joinAstronautNames;
        let checkedNames = getLoc(this.userName+"_n").notActionList[this.nowIndex].trainData[this.changeIndex].joinAstronautNames;
        names.forEach(name => {
          this.peoples.push(name.trainImplementAstronautName);
        });
        checkedNames.forEach(checkeName => {
          this.checkPeoples.push(checkeName.trainImplementAstronautName);
        })
      } else if(this.tabIndex === 2) {
        let names = getLoc(this.userName+"_y").trainListData[this.nowIndex].joinAstronautNames;
        let checkedNames = getLoc(this.userName+"_y").trainListData[this.nowIndex].trainData[this.changeIndex].joinAstronautNames;
        names.forEach(name => {
          this.peoples.push(name.trainImplementAstronautName);
        });
        checkedNames.forEach(checkeName => {
          this.checkPeoples.push(checkeName.trainImplementAstronautName);
        })
      }
    },
    methods: {
      onSubmit() {
        let updateCheck = [];
        if(this.tabIndex === 1){
          let allNameIDs = getLoc(this.userName+"_n").notActionList[this.nowIndex].joinAstronautNames;
          this.checkPeoples.forEach(nameID=>{
            allNameIDs.forEach(allNameId => {
              if(nameID === allNameId.trainImplementAstronautName){
                updateCheck.push(allNameId);
              }
            });
          })
        }else if(this.tabIndex === 2){
          let allNameIDs = getLoc(this.userName+"_y").trainListData[this.nowIndex].joinAstronautNames;
          this.checkPeoples.forEach(nameID=>{
            allNameIDs.forEach(allNameId => {
              if(nameID === allNameId.trainImplementAstronautName){
                updateCheck.push(allNameId);
              }
            });
          })
        }
        this.$emit('save', updateCheck);
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
    left: 50%;
    margin-left: -3rem;
    top: 2rem;
    z-index: 1999;
    border-radius: 0.08rem;
    overflow: hidden;
    width: 8rem;
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
        padding: 0.3rem 0;
        ul {
          li {
            padding-left: 0.08rem;
            color: #090909;
            margin-bottom: 0.15rem;
            overflow: hidden;
            span {
              float: left;
              font-size: 0.23rem;
              height: 0.45rem;
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
        margin-top: 0.1rem;
        margin-bottom: 0.15rem;
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
  .popContent {
    .content {
      .subContent {
        .el-checkbox{
          font-size: 0.3rem !important;
        }
        .el-checkbox__label{
          font-size: 0.25rem !important;
        }
      }
    }
  }
</style>
