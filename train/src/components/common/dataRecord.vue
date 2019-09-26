<template>
  <div class="content">
    <div
      class="item"
      v-for="(item,index) in listChildData"
      :key="item.trainImplementDataItemID"
    >
      <dl>
        <dd>
          <label>数据项名称：</label>
          <span>{{item.dataItemName}}</span>
        </dd>
        <dd class="icn">
          <label>参训航天员：</label>
          <span>{{item.joinAstronautNames}}</span>
          <span class="iconSize">
            <i
              class="el-icon-s-check"
              @click="choosePerson(index)"
            ></i>
          </span>
        </dd>
        <dd>
          <label>数据项说明：</label>
          <span>{{item.dataItemDesc}}</span>
        </dd>
        <dd>
          <label>数据项值：</label>
          <span>{{item.dataItemValue}}</span>
        </dd>
        <dd>
          <label>数据项标准值：</label>
          <span>{{item.dataItemMeasureValue}}</span>
        </dd>
        <dd>
          <label>数据单位：</label>
          <span>{{item.dataItemUnit}}</span>
        </dd>
      </dl>
    </div>
    <div class="addRecord">
      <button
        class="normal-btn"
        @click="addRole"
      >新增一行</button>
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
        flag: 0//判断是选人还是新添加 选人值为1 新添加值为2
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
            this.listChildData[this.chooseIndex].joinAstronautNames = JSON.parse(JSON.stringify(newValue[this.chooseIndex].joinAstronautNames));
          } else {
            console.log('看我多了，额');
            this.listChildData.splice(0, this.listChildData.length, ...newValue);
            // this.listChildData.push(newValue);
          }

        },
        deep: true
      }
    },
    //方法集合
    methods: {
      addRole() {
        this.flag = 2;
        this.$emit('addRole', this.flag);
      },
      //选人
      choosePerson(i) {
        this.flag = 1;
        this.$emit('choosePerson', i);
        this.chooseIndex = i;
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      console.log(this.listData);
      this.listChildData = JSON.parse(JSON.stringify(this.listData));;
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    updated() {
      console.log('update', this.listChildData, this.listData);

    }, //生命周期 - 更新之后
    activated() {
      console.log('actived');
    }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang="less" scoped>
  .content {
    margin: 0.1rem 0.2rem;
    overflow-y: auto;
    .item {
      padding: 0.2rem 0.4rem;
      border: 1px solid #e6e4e4;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      margin-bottom: 0.2rem;
      border-radius: 4px;
      dl {
        font-size: 0.26rem;
        dd {
          height: 0.4rem;
          line-height: 0.4rem;
          label {
            width: 3rem;
            display: inline-block;
          }
          .iconSize {
            font-size: 0.4rem;
            position: absolute;
            right: 0.2rem;
            color: #4c84ff;
          }
        }
        dd.icn {
          position: relative;
        }
      }
    }
    .addRecord {
      text-align: center;
    }
  }
</style>