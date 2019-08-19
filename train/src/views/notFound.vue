<template>
  <div class="not">
    <!-- <img src="../assets/404.jpg"/> -->
    <div class="text">
      对不起, 您访问的页面不存在!
      <a href="./">返回首页</a>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped lang="less">
  .not {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
    text-align: center;
    line-height: 100%;
    background: url("../assets/404.jpg");
    background-size: 100% 100%;
    img {
      display: inline;
    }
    .text {
      display: inline-block;
      font-size: 24px;
      color: #333;
      margin-top: 0.5rem;
      a {
        display: block;
        margin-top: 30px;
        color: chocolate;
      }
    }
  }
</style>