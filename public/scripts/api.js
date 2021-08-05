///全局上下文，此处代码目的是提供接口说明方便开发人员理解，不用导入
(function(){ 
    var $http = window.axios;
            /**
         * 匿名访问默认令牌，没有任何绑定信息
         */
    var defaultAccessToken = "GmrqDowo9llzgkuiEd-QjxbwmkF0gsSMF7AhGj8-QAWCpB5usH5CEN-UZHKdI0Qo5rSXbMDT-ceCsWxNesDv9nyhG6wQ7RzFtv3hu_sfmYRz0kL1YiwBQxt4C8W4VyiJ";
    var getQueryArgVal = function(argName) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == argName) { return pair[1]; }
        }
        return (false);
    }
    var token = getQueryArgVal("accessToken");
    if(!token){
        token = sessionStorage.getItem("token");
    }
    var context = {};

    if(token){
        $http.get("/api/selfinfo2?accessToken="+token).then((res)=>{
            context = res;
        });
        context = JSON.parse(sessionStorage.getItem("context"));
    }

    var api = {

        /**
         * 判断当前访问是否在微信浏览器内
         */        
         isWeixin:function(){
            var ua = window.navigator.userAgent.toLowerCase();
            return (ua.match(/MicroMessenger/i) == 'micromessenger');
          },
        getQueryArgVal:function(argName) {
            return getQueryArgVal(false);
        },
        /**
         * 获取当前会话的访问令牌
        */
        getAccessToken:function(){
            if(token) return token;
            return defaultAccessToken;
        },
        isWxAuth:function(){
            if(!context) return false;
            if(!context.WxUserInfo) return false;
            return context.WxUserInfo.Id > 0;
        },
        isStudentAuth:function(){
            if(!context) return false;
            if(!context.StudentInfo) return false;
            return context.StudentInfo.Id > 0;
        },
        getContext : function(){
            return context;
        },
        setContext:function(ctx){
            context = ctx; 
            sessionStorage.setItem("context",JSON.stringify(ctx));     
        },
        setAccessToken:function(accessToken){
            token = accessToken;
            sessionStorage.setItem("token",accessToken);
        }
    };
    window["api"] = api;
 })();