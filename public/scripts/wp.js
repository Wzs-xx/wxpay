//微信公众号接口包装
///全局上下文，此处代码目的是提供接口说明方便开发人员理解，不用导入
(function(){ 
    var $http = window.axios;
    var $api = window.api;
    /**
     * 微信jsapi_ticket获取时间，ticket有效期时间是7200s,超期后要重新获取。
     */
    var ticketTime = new Date(2000,1,1);
    var appId="wx6c1fc903611e3da2";
    var jsApiList = ['chooseWXPay',
    'openEnterpriseChat',
    'openEnterpriseContact',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'onMenuShareQZone',
    'startRecord',
    'stopRecord',
    'onVoiceRecordEnd',
    'playVoice',
    'pauseVoice',
    'stopVoice',
    'onVoicePlayEnd',
    'uploadVoice',
    'downloadVoice',
    'chooseImage',
    'previewImage',
    'uploadImage',
    'downloadImage',
    'translateVoice',
    'getNetworkType',
    'openLocation',
    'getLocation',
    'hideOptionMenu',
    'showOptionMenu',
    'hideMenuItems',
    'showMenuItems',
    'hideAllNonBaseMenuItem',
    'showAllNonBaseMenuItem',
    'closeWindow',
    'scanQRCode',
    'updateAppMessageShareData',
    'updateTimelineShareData'];
    var wpapi = {
      isWeixin:function(){
        return 
      },
      isMobile:function(){
        var ua = window.navigator.userAgent.toLowerCase();
        return (ua.match(/micromessenger/i) && !ua.match(/wechatdevtools/i) && !ua.match(/windowswechat/i));
      },
      startup:function(){            
        return new Promise(function(resolve, reject){
            var now = new Date();
            if((now - ticketTime) < 7200000){
                wx.ready(function(){
                    wx.checkJsApi({
                        jsApiList:jsApiList,
                        success:function(res){
                            resolve();
                        }
                    });                    
                  });
            }
            $http.post("/api/ticket",{
                appId:appId,
                url:location.href
            }).then(function (res){
              console.log(res);
            
                var time = new Date();
                time.setTime(parseInt(res.data.timestamp) * 1000);
                ticketTime = time;
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.appId, // 必填，公众号的唯一标识
                    timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.signature,// 必填，签名
                    jsApiList: jsApiList // 必填，需要使用的JS接口列表
                  });
                wx.ready(function(){
                  wx.checkJsApi({
                      jsApiList:jsApiList,
                      success:function(res){
                          resolve();
                      }
                  });                    
                });
            }).catch(function (error) {
              console.log(error);
            }); 
        });         
      },
      /**
       * 发起微信支付
       * @param data {
                    "appId":"weixin_appid_XXXXX",
                    "nonceStr":"nonceStrXXXXXXX",
                    "package":"prepay_id=wxXXXXXXX",
                    "signType":"MD5",
                    "timeStamp":"68183131XX",
                    "paySign":"XXXXXXXX"
                } 
       * @returns Promise
       */
      pay:function(data){
        if(!$api.isWeixin()){
          alert("请在微信手机端发起支付动作。");
          return;
        }
        return new Promise(function(resolve, reject){
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest',
          data,
          function(res){
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                resolve(res);
              }
              else{
                alert("微信支付调用失败："+ JSON.stringify(res));
                reject(res);
              }   
            }
          );
        });
      },
      chooseImage : function (count) {
        var that = this;
      
        return new Promise(function(resolve, reject){
          that.startup().then(function(){
          wx.chooseImage({
            count: count, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              resolve(res.localIds);
            },
            fail: function (res) {
                alert("选择图片出现错误" + JSON.stringify(res));
                reject(res);
            }
          });
        });
      });
    }

  };

    window["weixin"] = wpapi;

    wx.error(function(res){
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        alert(res);
      });
 })();
