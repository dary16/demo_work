<template>
  <div class='record'>
    <v-info-header
      v-on:backFn="back"
      :titleData="title"
    ></v-info-header>
    <div class="content">
      <div
        class="item"
        v-for="(item,index) in listData"
        :key="item.id"
      >
        <dl>
          <dd>
            <label>数据项名称：</label>
            <span>{{item.name}}</span>
          </dd>
          <dd class="icn">
            <label>参训航天员：</label>
            <span>{{item.person}}</span>
            <span class="iconSize">
              <i
                class="el-icon-tickets"
                @click="choosePerson(index)"
              ></i>
            </span>
          </dd>
          <dd>
            <label>数据项说明：</label>
            <span>{{item.explain}}</span>
          </dd>
          <dd>
            <label>数据项值：</label>
            <span>{{item.value}}</span>
          </dd>
          <dd>
            <label>数据项标准值：</label>
            <span>{{item.standardValue}}</span>
          </dd>
          <dd>
            <label>数据单位：</label>
            <span>{{item.unity}}</span>
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
    <v-pop-box
      v-if="isShowBox"
      :popData="popData"
      v-on:save="saveFn"
      v-on:cancle="cancleFn"
    ></v-pop-box>
    <v-choose-people
      v-if="isShowPeople"
      v-on:save="savePeopleFn"
      v-on:cancle="cancelPeopleFn"
    ></v-choose-people>
  </div>
</template>

<script>
  export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
      //这里存放数据
      return {
        title: "数据项记录",
        isShowBox: false,
        isShowPeople: false,
        nowIndex: -1,
        listData: [
          {
            name: "数据项名称",
            person: '刘鹏，李伟，张杰明，孙俪，李成斌',
            explain: '数据项说明',
            value: '50',
            standardValue: '80',
            unity: '米'
          },
          {
            name: "数据项名称",
            person: '刘鹏，李伟，张杰明，孙俪，李成斌',
            explain: '数据项说明',
            value: '52',
            standardValue: '66',
            unity: '个'
          }
        ],
        popData: {
          'titleTotal': '新增',
          'options': [{
            'status': 1,
            'title': '数据项目名称',
            'placeholder': '请输入数据项目名称',
            'val': 'name'
          }, {
            'status': 1,
            'title': '参训航天员',
            'placeholder': '请输入参训航天员',
            'val': 'person'
          }, {
            'status': 1,
            'title': '数据项说明',
            'placeholder': '请输入数据项说明',
            'val': 'explain'
          }, {
            'status': 1,
            'title': '数据项值',
            'placeholder': '请输入数据项值',
            'val': 'value'
          }, {
            'status': 1,
            'title': '数据项标准值',
            'placeholder': '请输入数据项标准值',
            'val': 'standardValue'
          }, {
            'status': 2,
            'title': '数据项单位',
            'placeholder': '请选择数据单位',
            'val': 'unity',
            'list': [
              {
                value: '米',
                label: '米'
              }, {
                value: '个',
                label: '个'
              }]
          }]
        }
      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      back() {
        window.history.back();
      },
      addRole() {
        this.isShowBox = true;
      },
      //保存
      saveFn(val) {
        this.isShowBox = false;
        // console.log(val);
        this.listData.push(val);
      },
      //取消
      cancleFn(val) {
        this.isShowBox = val;
      },
      //选人
      choosePerson(i) {
        this.isShowPeople = true;
        this.nowIndex = i;
        console.log(this.nowIndex);
      },
      //选人弹窗 确定
      savePeopleFn(val) {
        this.isShowPeople = false;
        this.listData[this.nowIndex].person = val.toString();
      },
      //选人弹窗 取消
      cancelPeopleFn(val) {
        this.isShowPeople = false;
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang="less" scoped>
  .record {
    .content {
      margin: 0.1rem 0.2rem;
      position: absolute;
      top: 1rem;
      right: 0;
      left: 0;
      bottom: 0;
      overflow-y: auto;
      .item {
        padding: 0.2rem 0.4rem;
        border: 1px solid #006699;
        margin-bottom: 0.2rem;
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
            }
            span {
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
  }
</style>