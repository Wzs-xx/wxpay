<template>
  <div>
    <!-- vant navbar -->
    <van-nav-bar :title="title">
      <template #left>
        <van-icon name="user-o" size="18" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field v-if="formData.tenantId<=0"
        v-model="formData.TenantCode"
        name="校园编码"
        label="校园编码"
        placeholder="请输入校园编码"
        :rules="[{ required: true, message: '请输入校园编码' }]"
      />
      <van-field
        v-model="formData.certNo"
        name="身份证号"
        label="身份证号"
        placeholder="身份证号"
        :rules="[{ required: true, message: '请填写身份证号' }]"
      />
      <van-field
        v-model="formData.studentName"
        name="姓名"
        label="姓名"
        placeholder="姓名"
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field
        v-model="formData.verifyCode"
        center
        clearable
        label="验证码"
        placeholder="请输入验证码"
      >
        <div slot="button">
          <img
            :src="verifyCodeImage.Base64Data"
            alt="验证码"
            @click="getVerifyCode"
          />
        </div>
      </van-field>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          @click="submit()"
          native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      title:"登录",
      formData: {
        tenantCode:"",
        tenantId:-1,
        certNo: "",
        studentName: "",
        verifyCode: "",
        verifyCodeToken: ""
      },
      verifyCodeImage: {
      }
    }
  },
  mounted() {
    var ctx = this.$api.getContext();
    if(ctx.TenantInfo){
      this.formData.tenantId = ctx.TenantInfo.Id;
      this.title = ctx.TenantInfo.Name;
    }
    this.getVerifyCode();
  },
  methods:{
        getVerifyCode:function(){
          this.$http.get("/api/VerifyCodeImage",{}).then((res)=>{
              this.verifyCodeImage = res.data;
              this.formData.verifyCodeToken = res.data.Token;
            });

        },
        submit:function(){
            this.$http.post("/api/auth2/certno",this.formData).then((res)=>{
              this.$api.setContext(res.data.SelfInfo);
              this.$api.setAccessToken(res.data.AccessToken);
              this.$router.push({ path: 'home' });
            });
            
        }
    }
}
</script>

<style>
</style>