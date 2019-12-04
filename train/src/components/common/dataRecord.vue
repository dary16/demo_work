<template>
  <div class="content">
    <div class="list">
      <ul>
        <li
          v-for="(item, index) in listChildData"
          :key="item.trainImplementDataItemID"
        >
          <dt>
            <h3>
              <img src="../../assets/icon_sjx.png" />{{ item.dataItemName }}
            </h3>
              <div>
                <el-popover
                  placement="left"
                  popper-class="moreBtnBox"
                >
                  <span
                    slot="reference"
                    class="el-icon-more"
                  >{{
                  isShowMoreBtn[index]
                }}</span>
                  <div class="moreBtn">
                    <!-- <el-button
                    type="text"
                    icon="el-icon-edit"
                    @click="updateChildData(index)"
                    >修改</el-button
                  > -->
                    <el-button
                      type="text"
                      icon="el-icon-delete-solid"
                      @click="deleteChildData(index)"
                    >删除</el-button>
                  </div>
                </el-popover>
              </div>
          </dt>
          <dd class="icn">
            <label>参训航天员</label>
            <span>
              <div class="astronautPer">
                {{ newArr[index] }}
              </div>
            </span>
          </dd>
          <dd>
            <label>数据项值</label>
            <span>{{ item.dataItemValue }}</span>
          </dd>
          <dd>
            <label>数据项标准值</label>
            <span>{{ item.dataItemMeasureValue }}</span>
          </dd>
          <dd>
            <label>数据单位</label>
            <span>{{ item.dataItemUnit }}</span>
          </dd>
          <dd>
            <label>数据项说明</label>
            <div class="desc">{{ item.dataItemDesc }}</div>
          </dd>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { getLoc } from '../../utils/common';
  export default {
    data() {
      //这里存放数据
      return {
        title: "数据项记录",
        popTitle: "选择参训航天员",
        listChildData: [],//从父组件传过来的页面初始化值
        chooseIndex: '-1',//选择航天员时的index
        flag: 0,//判断是选人还是新添加
        newArr: [],
        isShowMoreBtn: -1,
      };
    },
    props: ['listData'],
    //监听属性 类似于data概念
    computed: {
      ...mapState(['nowIndex', 'userName'])
    },
    //监控data中的数据变化
    watch: {
      listData: {
        handler(newValue, oldValue) {
          //选人后将数据更新
          if(this.flag == 1) {
            this.listChildData = newValue;
          } else {
            this.listChildData.splice(0, this.listChildData.length, ...newValue);
            this.listChildData.forEach(item => {
              let sy = [];
              item.joinAstronautNames.forEach(i => {
                sy.push(i.trainImplementAstronautName);
              })
              this.newArr.push(sy.toString());
            })
          }
        },
        deep: true
      }
    },
    //方法集合
    methods: {
      //选人
      choosePerson(i) {
        this.flag = 1;
        this.chooseIndex = i;
        this.$emit('choosePerson', i);
      },
      //删除数据项记录
      deleteChildData(i) {
        this.isShowMoreBtn = -1;
        this.$emit('deleteChildData', i);
      },
      //修改数据项记录
      updateChildData(i) {
        this.$emit('updateChildData', i);
        this.isShowMoreBtn = -1;
        this.$emit('updateChildData', i);
      },
      showMoreBtn(i) {
        this.isShowMoreBtn = i;
        console.log(this.isShowMoreBtn);
      }

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.listChildData = JSON.parse(JSON.stringify(this.listData));
      //   console.log(this.listChildData);
      this.listChildData.forEach(item => {
        let sy = [];
        item.joinAstronautNames.forEach(i => {
          sy.push(i.trainImplementAstronautName);
        })
        this.newArr.push(sy.toString());
      })
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
    },
    updated() {

    }, //生命周期 - 更新之后
    activated() {
    }, //如果页面有keep-alive缓存功能，这个函数会触发
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
    .list {
      font-size: 0.23rem;
      ul {
        li {
          border: 1px solid #f0f0f0;
          border-radius: 4px;
          margin-bottom: 0.3rem;
          padding: 0.1rem 0.2rem;
          line-height: 0.5rem;
          background-color: #fff;
          dt {
            border-bottom: 1px solid #f0f0f0;
            h3 {
              width: 4rem;
              display: inline-block;
              font-size: 0.25rem;
              font-weight: normal;
              color: #151515;
              img {
                margin-right: 0.1rem;
                width: 0.4rem;
                vertical-align: sub;
              }
            }
            > div {
              float: right;
              position: relative;
              > span {
                color: #ccc;
              }
              > span:active {
                color: #999;
              }
            }
          }
          dd {
            margin-bottom: 0.1rem;
            border-bottom: 1px solid #f0f0f0;
            &:last-child {
              border-bottom: none;
            }
            label {
              width: 2rem;
              display: inline-block;
              color: #4f4f4f;
            }
            span {
              width: 6rem;
              display: inline-block;
              vertical-align: top;
              text-align: right;
              word-wrap: break-word;
              color: #9a9a9a;
              font-size: 0.2rem;
              .astronautPer {
                display: inline;
              }
              .iconSize {
                float: right;
                font-size: 0.4rem;
                position: absolute;
                right: 0.3rem;
                color: #4c84ff;
              }
            }
            .desc {
              color: #9a9a9a;
              font-size: 0.2rem;
              line-height: 0.36rem;
            }
          }
        }
      }
    }
    .addRecord {
      margin-right: 0.2rem;
      margin-top: 0.1rem;
      text-align: center;
      button {
        padding: 0.1rem 0.2rem;
        border-radius: 3px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      }
    }
  }
  .moreBtn {
    background-color: #fff;
    border-radius: 4px;
    width: 1rem;
    button {
      width: 1rem;
      margin: 0;
      display: block;
      font-size: 0.2rem;
      border-bottom: 1px solid #e6e4e4;
      color: #409eff;
    }
    button:last-child {
      border-bottom: none;
      color: #f00;
    }
  }
</style>
<style>
  .moreBtnBox {
    padding: 0;
    width: 1rem;
  }
</style>