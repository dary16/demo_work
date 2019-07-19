<template>
  <div class='info'>
    <v-info-header
      v-on:backFn="back"
      :titleData="title"
    ></v-info-header>
    <div class="content">
      <v-list-title :listTilte="listTitle1"></v-list-title>
      <div class="item-info">
        <span class="arrived">实到人员</span>
        <div class="tags">
          <el-tag
            :class="{'active':item.showTag}"
            class="peopleTag"
            size="mini"
            v-for="(item,index) in tags"
            :key="item.id"
            @click="tagFn(index)"
          >{{item.name}}</el-tag>
        </div>
        <button
          class="normal-btn fr"
          @click="setPostFn"
        >设置岗位</button>
      </div>
      <v-list-title :listTilte="listTitle2"></v-list-title>
      <div class="item-info">
        <span class="text">训练实施内容详细训练实施内容啦啦啦啦</span>
        <button
          class="normal-btn"
          @click="setTime"
          v-if="showTime"
        >完成时间</button>
        <span v-else>{{nowTime}}</span>
        <div class="fr nicon">
          <i
            class="el-icon-menu"
            @click="errorRecord"
          ></i>
        </div>
      </div>
      <v-list-title :listTilte="listTitle3"></v-list-title>
      <div class="item-info">
        <span class="text">操作方式错误，操作方式错误，操作方式错误，操作方式错误，操作方式错误，关键字11212啦啦啦啦</span>
        <span class="time">2019-04-28 08:52</span>
        <div class="fr">
          <span>张淼</span>
        </div>
      </div>
      <v-list-title :listTilte="listTitle4"></v-list-title>
      <div class="item-info">
        <span class="text">详细内容详细内容啦啦啦啦</span>
      </div>
    </div>
    <div class="buttons">
      <button
        class="normal-btn-lg mr"
        @click="suggestion"
      >意见建议</button>
      <button
        class="normal-btn-lg mr"
        @click="recordFn"
      >数据项记录</button>
    </div>
    <v-set-post
      v-if="isShowSet"
      :tags="tags"
      v-on:save="saveFn"
      v-on:cancle="cancelFn"
      :popTitle="popTitle"
    ></v-set-post>
  </div>
</template>

<script>
  //例如：import 《组件名称》 from '《组件路径》';

  export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
      //这里存放数据
      return {
        showTag: false,
        showTime: true,
        isShowSet: false,
        nowTime: '',
        popTitle: "设置岗位",
        listTitle1: "人员签到",
        listTitle2: '训练详细内容',
        listTitle3: '异常说明',
        listTitle4: '训练实施',
        title: "训练实施信息",
        tags: [{ name: "张三", id: "001", showTag: false, num: "11" }, { name: "王四", id: "002", showTag: false }, { name: "王五", id: "003", showTag: false, num: "12" }, { name: "李三", id: "004", showTag: false, num: "13" }, { name: "李东", id: "005", showTag: false, num: "14" }, { name: "张杰", id: "006", showTag: false, num: "15" }]
      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      tagFn(i) {
        this.tags[i].showTag = !this.tags[i].showTag;
      },
      //设置时间
      setTime() {
        this.showTime = false;
        let time = this.util.formatDate(new Date().getTime(), 3);
        this.nowTime = time;
      },
      //返回
      back() {
        this.$router.push('/layout');
      },
      //意见建议
      suggestion() {
        this.$router.push('/suggestion');
      },
      //数据项记录
      recordFn() {
        this.$router.push('/record');
      },
      //异常记录
      errorRecord() {
        this.$router.push('/errorRecord');
      },
      //设置岗位
      setPostFn() {
        this.isShowSet = true;
      },
      //保存
      saveFn() {
        this.isShowSet = false;
      },
      cancelFn() {
        this.isShowSet = false;
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
  .info {
    .content {
      padding: 0.1rem 0.2rem;
      .item-info {
        padding: 0.2rem 0.3rem;
        border: 1px solid #006699;
        min-height: 1rem;
        span {
          display: inline-block;
          font-size: 0.25rem;
        }
        span.text {
          height: 0.5rem;
          line-height: 0.5rem;
          width: 12rem;
        }
        .arrived {
          font-size: 0.25rem;
          font-weight: bold;
          margin-right: 0.1rem;
        }
        .nicon {
          font-size: 0.4rem;
        }
        .tags {
          display: inline-block;
          .peopleTag {
            margin-right: 0.05rem;
          }
          .peopleTag.active {
            background: #006699;
          }
        }
      }
    }
    .buttons {
      text-align: center;
      line-height: 1rem;
    }
  }
</style>