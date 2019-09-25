/*
 * @Author: dairui 
 * @Date: 2019-08-19 11:18:38 
 * @Last Modified by: dairui
 * @Last Modified time: 2019-09-03 16:31:24
 */

<template>
  <div>
    <div class="main">
      <button @click="closeFn">停止</button>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex';
  export default {
    data() {
      return {
        websock: null
      };
    },
    props: [],
    created() {
      //   this.initWebSocket();
      this.init();
    },
    methods: {
      init() {
        const wsuri = 'ws://127.0.0.1:8090/';
        ws.onopen = function() {
          connection.innerHTML = '服务器正常<br/>'
        }
        ws.onmessage = function(e) {
          var _str = e.data;
          var data = JSON.parse(_str.toString('utf-8'));
          console.log(data);
        }
      },
      //初始化websocket
      initWebSocket() {
        if(typeof (WebSocket) === "undefined") {
          alert("浏览器不支持websocket")
          return false
        }
        const wsuri = 'ws://192.168.200.199:80/';
        this.websock = new WebSocket(wsuri);
        this.websock.onopen = this.websocketonopen;
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      //连接成功
      websocketonopen() {
        console.log('websocket连接成功');
      },
      //接收后端返回的数据
      websocketonmessage(e) {
        let dataJson = JSON.parse(e.data);
        console.log(dataJson);
      },
      //数据发送
      websocketsend(Data) {
        this.websock.send(Data);
      },
      //连接建立失败重连
      websocketonerror(e) {
        console.log(`连接失败的信息：`, e);
        // this.initWebSocket();
      },
      //关闭连接
      websocketclose(e) {
        console.log(`断开连接`, e);
      },
      closeFn() {
        if(this.websock) {
          this.websock.close();
        }
      }
    },
    destroyed() {
      if(this.websock) {
        this.websock.close();
      }
    }
  }
</script>

<style scoped lang="less">
</style>
