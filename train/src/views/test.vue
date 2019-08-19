/*
 * @Author: dairui 
 * @Date: 2019-08-19 11:18:38 
 * @Last Modified by: dairui
 * @Last Modified time: 2019-08-19 13:43:59
 */

<template>
  <div class="mask">
    <div>
      <div class="popHeader">
        <h3>实力统计</h3>
        <i
          class="el-icon-close"
          v-on:click="closeFn"
        ></i>
      </div>
      <div class="contentList">
        <ul class="title">
          <li class="width-num"></li>
          <li>周一</li>
          <li>周二</li>
          <li>周三</li>
          <li>周四</li>
          <li>周五</li>
          <li>周六</li>
          <li>周日</li>
        </ul>
        <ul class="nums">
          <li
            v-for="item in num"
            class="width-num"
          >{{item}}</li>
        </ul>
        <div class="tableSelf">
          <div
            v-for="(item,index) in instanceCountArr"
            class="clearfix rowSelf"
          >
            <div
              class="colSelf"
              v-bind:style="{lineHeight:defaultHeight*item.classSection.length+'px'}"
            >
              {{item.subjectUnitName}}
            </div>
            <div class="colSelf">
              <dl class="sortCol">
                <dt v-bind:style="{lineHeight:defaultHeight*item.maxLength+'px'}">{{item.leaderNum}}</dt>
                <dd>
                  <ul>
                    <li
                      v-for="subItem in item.leaderList"
                      v-bind:style="{lineHeight:parseInt((defaultHeight*item.maxLength-(item.leaderList.length-1))/item.leaderList.length)+'px'}"
                    >
                      <span>{{subItem.user_rank}}</span>
                      <span>{{subItem.user_num}}</span>
                    </li>
                  </ul>
                </dd>
              </dl>
            </div>
            <div class="colSelf">
              <!-- personTable -->
              <dl class="sortCol">
                <dt v-bind:style="{lineHeight:defaultHeight*item.maxLength+'px'}">{{item.soldierNum}}</dt>
                <dd>
                  <ul>
                    <li
                      v-for="subItem in item.soldierList"
                      v-bind:style="{lineHeight:parseInt((defaultHeight*item.maxLength-(item.soldierList.length-1))/item.soldierList.length)+'px'}"
                    >
                      <span>{{subItem.user_rank}}</span>
                      <span>{{subItem.user_num}}</span>
                    </li>
                  </ul>
                </dd>
              </dl>
            </div>
            <div class="colSelf">
              <dl class="sortCol">
                <dt v-bind:style="{lineHeight:defaultHeight*item.maxLength+'px'}">{{item.carNum}}</dt>
                <dd>
                  <ul>
                    <li
                      v-for="subItem in item.carList"
                      v-bind:style="{lineHeight:parseInt((defaultHeight*item.maxLength-(item.carList.length-1))/item.carList.length)+'px'}"
                    >
                      <span>{{subItem.carType}}</span>
                      <span>{{subItem.count}}</span>
                    </li>
                  </ul>
                </dd>
              </dl>
            </div>
            <div
              class="colSelf"
              style="border-right:none;"
            >
              <dl class="sortCol">
                <dt v-bind:style="{lineHeight:defaultHeight*item.maxLength+'px'}">{{item.materialNum}}</dt>
                <dd>
                  <ul>
                    <li
                      v-for="subItem in item.materialList"
                      v-bind:style="{lineHeight:parseInt((defaultHeight*item.maxLength-(item.materialList.length-1))/item.materialList.length)+'px'}"
                    >
                      <span>{{subItem.equipType}}</span>
                      <span>{{subItem.count}}</span>
                    </li>
                  </ul>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex';
  export default {
    data() {
      return {
        instanceCountArr: [
          { "classSection": ["节次1", "节次2"], "subjectUnitName": "科目单元名称", "trainAreaName": "第三教学楼", "chargeTeacherName": "张三" },
          { "classSection": ["节次3"], "subjectUnitName": "体能训练", "trainAreaName": "第三教学楼", "chargeTeacherName": "张三" },
          { "classSection": ["节次4", "节次5"], "subjectUnitName": "科目单元名称", "trainAreaName": "第三教学楼", "chargeTeacherName": "张三" }
        ],
        num: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        maxLength: 0,
        defaultHeight: 30
      };
    },
    props: [],
    created() {
      this.getInstanceCountFn();
    },
    methods: {
      ...mapActions(['_getInfo']),
      //获取实力统计列表
      getInstanceCountFn() {
        /* this._getInfo({
          ops: {},
          api: 'getInstanceCount',
          callback: res => {
            res.forEach(item => {
              //人员
              var a = item.psersonList.length;
              //领导
              var b = item.leaderList.length;
              //战士
              var c = item.soldierList.length;
              //车辆
              var d = item.carList.length;
              //装备
              var e = item.materialList.length;
              item.maxLength = Math.max(a, b, c, d, e);
            })
            this.each = res;
          }
        }); */
      },
      //关闭
      closeFn() {
        this.$emit('closeClick', false)
      }
    }
  }
</script>

<style scoped lang="less">
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 9998;
    background: rgba(0, 0, 0, 0.5);
    .popHeader {
      font-weight: 400;
      color: rgba(224, 224, 224, 1);
      text-align: left;
      font-size: 20px;
      line-height: 38px;
      cursor: pointer;
      z-index: 1001;
      width: 100%;
      height: 38px;
      background: linear-gradient(
        90deg,
        rgba(0, 65, 117, 1),
        rgba(15, 108, 178, 1)
      );
      box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.8);
      position: relative;
      h3 {
        display: inline-block;
        padding-left: 12px;
      }
      .el-icon-close {
        position: absolute;
        top: 10px;
        right: 12px;
      }
    }
    .contentList {
      background: #3a6089;
      .width-num {
        width: 1rem;
      }
      ul.nums {
        margin-block-start: 0;
        margin-block-end: 0;
        width: 13%;
        text-align: center;
        float: left;
        li {
          line-height: 30px;
          color: #fff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.8);
          border-right: 1px solid rgba(255, 255, 255, 0.8);
        }
      }
      ul.title {
        overflow: hidden;
        background: #144368;
        font-size: 16px;
        box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0.5);
        color: #fff;
        padding-right: 17px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.8);
        display: flex;
        li {
          flex: 1;
          text-align: center;
          overflow: hidden;
          line-height: 65px;
          border-right: 1px solid rgba(255, 255, 255, 0.8);
          &:first-child {
            width: 1rem;
          }
          h4,
          .subTitle {
            display: block;
            //   width: 100%;
            line-height: 32px;
            //   border: 1px solid red;
          }
          h4 {
            border-bottom: 1px solid rgba(255, 255, 255, 0.8);
          }
        }
        .subTitle {
          overflow: hidden;
          li {
            float: left;
            //   border: 1px solid red;
            line-height: 32px;
            border-right: none;
          }
          li:nth-child(1) {
            width: 24%;
            border-right: 1px solid rgba(255, 255, 255, 0.1);
          }
          li:nth-child(2) {
            width: 76%;
            overflow: hidden;
            span {
              float: left;
            }
            span:nth-child(1) {
              width: 75%;
              border-right: 1px solid rgba(255, 255, 255, 0.1);
            }
            span:nth-child(2) {
              width: 25%;
            }
          }
        }
      }

      div.tableSelf {
        height: 620px;
        overflow-y: auto;
        background: #3a6089;
        color: #e0e0e0;
        font-size: 14px;
        .rowSelf {
          border-bottom: 1px solid rgba(255, 255, 255, 0.8);
          .colSelf {
            float: left;
            width: 18%;
            text-align: center;
            line-height: 30px;
            box-sizing: border-box;
            border-right: 1px solid rgba(255, 255, 255, 0.8);
            .sortCol {
              overflow: hidden;
              dt,
              dd {
                float: left;
              }
              dt {
                width: 24%;
                font-weight: normal;
              }
              dd {
                width: 76%;
                ul {
                  li {
                    overflow: hidden;
                    span {
                      float: left;
                      width: 75%;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      display: block;
                      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                      border-left: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    span:last-child {
                      width: 25%;
                    }
                  }
                  li:last-child {
                    span {
                      border-bottom: none;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .width-10 {
        width: 10% !important;
      }
    }
  }
</style>
