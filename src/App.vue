<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>

  </div>
</template>
<script>
export default {
  data(){
    return {
      isRouterAlive:true
    }
  },
  mounted:function(){
    //if(isWeixin()){
    //  alert("在微信内")
    //}

    var that = this;
    var token = this.$api.getQueryArgVal("token");
    if(token){
      this.$http.post("/api/selfinfo2?token=" + token,).then((res)=>{
          window['$context'] = res.data;
      });
    }         
    else if (process.env.NODE_ENV === "development") {
      this.$http.post("/api/auth2/dev",{
        WxUserId:0,
        UserId:0,
        TenantId:596,
        MemberId:0,
        StudentId:0,
        ParentId:0
      }).then((res)=>{
          window['$context'] = res.data;
      });
    }else {
      this.$http.post("/api/auth2/dev",{
        WxUserId:0,
        UserId:0,
        TenantId:596,
        MemberId:0,
        StudentId:0,
        ParentId:0
      }).then((res)=>{
          window['$context'] = res.data;
                    this.isRouterAlive = false;
          that.$nextTick(function(){
            that.isRouterAlive = true;
          });
      });
    }
    
  }
}
</script>

<style>
#app {

}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
