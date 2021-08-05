<!-- @format -->

<template>
 <div>
  <van-row style="padding-top: 1rem">
   <van-col span="2" offset="1"> <van-image round width="4rem" height="4rem" src="https://img01.yzcdn.cn/vant/cat.jpeg" /></van-col>
   <van-col span="9" offset="4" style="text-align: left"> 赵江山 </van-col>
  </van-row>
  <van-tabbar v-model="active">
   <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
   <van-tabbar-item icon="setting-o" to="/mine">我的</van-tabbar-item>
  </van-tabbar>
 </div>
</template>

<script>
export default {};
</script>

<style></style>
