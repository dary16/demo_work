<template>
  <div class='suggestion'>
    <v-info-header
      v-on:backFn="back"
      :titleData="title"
    ></v-info-header>
    <div class="content">
      <div class="list">
        <ul>
          <li
            v-for="(item,index) in listData"
            :key="item.trainImplementCommentID"
          >
            <dd>
              <label>意见建议标题:</label>
              <span>{{item.commentTitle}}</span>
            </dd>
            <dd>
              <label>关键字:</label>
              <span>{{item.keyword}}</span>
            </dd>
            <dd>
              <label>建议人:</label>
              <span>
                <div class="commentPer">
                  {{newArr[index]}}
                </div>
              </span>
            </dd>
            <dd>
              <label>意见建议时间:</label>
              <span>{{item.commentDate}}</span>
            </dd>
            <dd>
              <label>意见建议说明:</label>
              <span>{{item.commentExplain}}</span>
            </dd>
          </li>
        </ul>
      </div>
    </div>

    <!-- <v-form-pop
      :popData="popData"
      :commentDate="commentDate"
      :commentPersonChoose="commentPersonChoose"
      v-on:save="saveFn"
      v-on:chooseTime="chooseTime"
      v-on:chooseCommentPerson="chooseCommentPerson"
    ></v-form-pop> -->
    <v-choose-astronaut
      v-if="isAstronaut"
      v-on:save="saveAstronautFn"
      v-on:cancle="cancelAstronautFn"
      :popTitle="popTitle"
      :astronautNames="astronautNames"
      :commentPersonChoose="commentPersonChoose"
    ></v-choose-astronaut>
    <mt-datetime-picker
      ref="picker"
      type="datetime"
      v-model="dateval"
      @confirm="handleConfirm"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      hour-format="{value} 时"
      minute-format="{value} 分"
      :endDate="new Date()"
    >
    </mt-datetime-picker>
  </div>
</template>

<script>
  import {
    getLoc, setLoc, formatDateMin
  } from '../../utils/common.js';
  import { mapState } from 'vuex';
  export default {
    data() {
      //这里存放数据
      return {
        title: "意见建议",
        dateval: '',//默认时间选择器为当前时间
        listData: [],
        commentDate: '',//建议时间
        astronautNames: [],//可选的建议人
        commentPersonChoose: [],//已选的建议人
        astronautChecked: [],
        isAstronaut: false,//建议人弹框
        popTitle: '选择建议人',
        popData: {
          'titleTotal': '添加训练实施意见建议',
          'options': [{
            'status': 1,
            'check': true,
            'title': '意见建议标题',
            'placeholder': '请输入意见建议标题',
            'val': 'commentTitle',
            'maxLength': 32
          }, {
            'status': 1,
            'title': '关键字',
            'placeholder': '请输入关键字',
            'val': 'keyword',
            'maxLength': 32
          }, {
            'status': 6,
            'check': true,
            'title': '建议人',
            'placeholder': '请选择建议人',
            'val': 'commentPersonName',
          }, {
            'status': 3,
            'check': true,
            'title': '意见建议时间',
            'placeholder': '请选择意见建议时间',
            'val': 'commentDate'
          }, {
            'status': 1,
            'title': '意见建议说明',
            'placeholder': '请输入意见建议说明',
            'val': 'commentExplain',
            'maxLength': 125,
            'isTextarea': 'textarea'
          }]
        },
        newArr: []
      };
    },
    //监听属性 类似于data概念
    computed: {
      ...mapState(['nowIndex', 'userInfo', 'tabIndex', 'userName']),
    },
    //方法集合
    methods: {
      back() {
        this.$router.go(-1);
      },
      // addSuggestion() {
      //   this.isShowBox = true;
      // },
      //选择意见建议人
      chooseCommentPerson(val) {
        this.commentPersonChoose = val;
        this.isAstronaut = true;
      },
      //取消建议人弹框
      cancelAstronautFn(val) {
        this.isAstronaut = val;
      },
      //确定建议人
      saveAstronautFn(val) {
        this.commentPersonChoose = val;
        this.isAstronaut = false;
        // let strIds = [];
        // let strNames = [];
        // val.forEach(item => {
        //   strIds.push(item.trainImplementAstronautID);
        //   strNames.push(item.trainImplementAstronautName);
        // });

        // this.personSelect = strNames.toString();
        // this.isAstronaut = false;
        // this.personIds = strIds.toString();
        // console.log(this.personSelect);
      },
      //保存
      saveFn(val) {
        if(!val.commentTitle) {
          this.message.warning("请输入意见建议标题！");
          return false;
        }
        if(val.commentPersonName == undefined || val.commentPersonName.toString() == '' || !val.commentPersonName) {
          this.message.warning("请输入建议人！");
          return false;
        }
        if(!val.commentDate) {
          this.message.warning("请选择意见建议时间！");
          return false;
        }
        // this.isShowBox = false;
        this.listData.push(val);
        if(this.tabIndex === 1) {
          let oldActionData = getLoc(this.userName + "_n").notActionList;
          //数组的替换
          oldActionData[this.nowIndex].commentData.push(val);
          //更新本地数据存储
          setLoc(this.userName + "_n", { "notActionList": JSON.parse(JSON.stringify(oldActionData)) });
        } else if(this.tabIndex === 2) {
          let oldTrainData = getLoc(this.userName + "_y").trainListData;
          //数组的替换
          oldTrainData[this.nowIndex].commentData.push(val);
          //更新本地数据存储
          setLoc(this.userName + "_y", { "trainListData": JSON.parse(JSON.stringify(oldTrainData)) });
        }
        this.message.success("新增一条意见建议！");
      },
      //打开时间插件
      chooseTime() {
        this.dateval = new Date();
        this.$refs.picker.open();
      },
      //时间插件确认
      handleConfirm(value) {
        this.commentDate = formatDateMin(value);
      },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      console.log(this.$route.params.editIndex);
      if(this.tabIndex === 1) {
        //获取建议人数据
        this.astronautNames = getLoc(this.userName + "_n").notActionList[this.nowIndex].joinAstronautNames;
        let oldActionData = getLoc(this.userName + "_n").notActionList;
        if(this.$route.params.addData) {
          this.listData = getLoc(this.userName + "_n").notActionList[this.nowIndex].commentData;
          this.listData.push(this.$route.params.addData);
          let sy = [];
          item.commentPersonName.forEach(i => {
            sy.push(i.trainImplementAstronautName);
          })
          this.newArr.push(sy.toString());
          oldActionData[this.nowIndex].commentData.push(this.$route.params.addData);
          //更新本地缓存
          setLoc(this.userName + "_n", { "notActionList": JSON.parse(JSON.stringify(oldActionData)), });
        } else {
          this.listData = getLoc(this.userName + "_n").notActionList[this.nowIndex].commentData;
          this.listData.forEach(item => {
            let sy = [];
            item.commentPersonName.forEach(i => {
              sy.push(i.trainImplementAstronautName);
            })
            this.newArr.push(sy.toString());
          })
        }
      } else if(this.tabIndex === 2) {
        this.astronautNames = getLoc(this.userName + "_y").trainListData[this.nowIndex].joinAstronautNames
        let oldTrainData = getLoc(this.userName + "_y").trainListData;
        if(this.$route.params.addData) {
          this.listData = getLoc(this.userName + "_y").trainListData[this.nowIndex].commentData;
          this.listData.push(this.$route.params.addData);
          this.listData.forEach(item => {
            let sy = [];
            item.commentPersonName.forEach(i => {
              sy.push(i.trainImplementAstronautName);
            })
            this.newArr.push(sy.toString());
          })
          oldTrainData[this.nowIndex].commentData.push(this.$route.params.addData);
          //更新本地缓存
          setLoc(this.userName + "_y", { "trainListData": JSON.parse(JSON.stringify(oldTrainData)) });
        } else {
          this.listData = getLoc(this.userName + "_y").trainListData[this.nowIndex].commentData;
          this.listData.forEach(item => {
            let sy = [];
            item.commentPersonName.forEach(i => {
              sy.push(i.trainImplementAstronautName);
            })
            this.newArr.push(sy.toString());
          })
        }
      }

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang="less" scoped>
  .content {
    width: 50%;
    margin: 0.1rem 0.2rem;
    overflow-y: auto;
    position: fixed;
    bottom: 1%;
    top: 0.7rem;
    left: 8rem;
    .s-title {
      position: relative;
      right: 45%;
      margin-right: 0.2rem;
      margin-top: 0.1rem;
      height: 0.6rem;
      line-height: 0.6rem;
      button {
        padding: 0.1rem 0.2rem;
        border-radius: 3px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      }
    }
    .list {
      font-size: 0.23rem;
      ul {
        li {
          border: 1px solid #e6e4e4;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
          margin-bottom: 0.3rem;
          padding: 0.1rem 0.2rem;
          line-height: 0.5rem;
          label {
            width: 2rem;
            display: inline-block;
          }
          span {
            width: 6rem;
            display: inline-block;
            vertical-align: top;
            word-wrap: break-word;
            .commentPer {
              display: inline;
            }
          }
          .name {
            margin-right: 0.3rem;
          }
        }
      }
    }
  }
</style>