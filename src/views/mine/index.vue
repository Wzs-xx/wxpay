<template>
  <div>
    <van-row style="padding-top: 1rem">
      <van-col span="2" offset="1">
        <van-image
          round
          width="4rem"
          height="4rem"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
      /></van-col>
      <van-col span="9" offset="4" style="text-align: left"> 赵江山 </van-col>
    </van-row>

    <van-cell-group inset>
      <van-cell title="测试微信选取图片" is-link v-on:click="chooseImage"/>
      <van-cell title="测试微信支付" is-link v-on:click="wxpay"/>
      <van-cell title="设置" is-link url="/settings" />
      <van-cell title="注销" is-link to="/"/>
    </van-cell-group>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  methods:{
    chooseImage:function(){
            this.$weixin.chooseImage().then((res)=>{
              alert(res);

            });
    },
    wxpay:function(){
        this.$http.post("/SF/api/StudentChargeBill/4/1/wechatpay").then((res)=>{
            this.$weixin.pay(res.data).then((res2)=>{
              alert(res2);

            });

        });

            
    }
  }
}
</script>

<style>
</style>