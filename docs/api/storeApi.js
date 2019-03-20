/* eslint-disable */

var storeApi = {};
//获取转发数
storeApi.shareAmount = function(){
    var option = {
        path:gameBaseUrl + "/api/share_amount",
        type:'get',
        successCallback:function (res) {
            $(".indexContent .title p").html(res.data);
        },
        errorCallback:function (res) {
            $(".indexContent .title p").html(0);
            setMyTips("当前用户量爆满，游戏火热进行中，请稍后加载数据！")
        }
    };
    // myRequest(option)
  $(".indexContent .title p").html(500);
};
//获取转发全国排名
storeApi.getRank = function(data){
    var option = {
        path:gameBaseUrl + "/api/getRank?page="+data.page+"&pagesize=10",
        type:'get',
        successCallback:function (res) {
            var rankList = res.data.top100;
            $(".nationalRankingsDiv .rankTitle span").html(res.data.rank);
            $(".nationalRankingsDiv .shareAmountTitle span").html(res.data.share_amount);
            if(rankList.length === 0){
                var html ='<li><p style="text-align: center;width: 100%;background-color: #FEE470;">暂无排名信息查询喔！</p></li>';
                $(".nationalRankingsDiv ul").append(html);
            }else {
                var html = '';
                for(var i = 0; i < rankList.length; i++){
                    var rank = parseInt(data.page) - 1;
                    rank = parseInt(rank)*10 + (i+1);
                    html+='<li><div class="placing"><span>'+rank+'</span></div>' +
                        '<div class="province">'+rankList[i].province+'</div>' +
                        '<div class="headerImg"><div class="userHeader"><img src="'+rankList[i].avatar+'"></div></div>' +
                        '<div class="storeName">'+rankList[i].store_name+'</div>' +
                        '<div class="forwardNb">'+rankList[i].share_amount+'</div></li>';
                }
                $(".nationalRankingsDiv ul").append(html);
                loading = false;
                if(parseInt(res.data.count) === $(".nationalRankingsDiv ul li").length){
                    var html ='<li><p style="text-align: center;width: 100%;background-color: #FEE470;">end</p></li>';
                    $(".nationalRankingsDiv ul").append(html);
                    loading = true;
                }
            }
        },
        errorCallback:function () {
            $(".nationalRankingsDiv ul").empty();
            var html ='<li><p style="text-align: center;width: 100%;background-color: #FEE470;">暂无排名信息查询喔！</p></li>';
            $(".nationalRankingsDiv ul").append(html);
        }
    };
    // myRequest(option)
  let res = {
    data: {
      top100: [],
      rank: 2,
      share_amount: 500,
      count: 5
    }
  }
  if (data.page === 1) {
    res = {
      data: {
        top100: [
          {
            province: '广东',
            avatar: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            store_name: '南山店',
            share_amount: '500'
          },
          {
            province: '广东',
            avatar: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            store_name: '南山店',
            share_amount: '500'
          },
          {
            province: '广东',
            avatar: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            store_name: '南山店',
            share_amount: '500'
          },
          {
            province: '广东',
            avatar: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            store_name: '南山店',
            share_amount: '500'
          },
          {
            province: '广东',
            avatar: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            store_name: '南山店',
            share_amount: '500'
          }
        ],
        rank: 2,
        share_amount: 500,
        count: 5
      }
    }
  }
  var rankList = res.data.top100;
  $(".nationalRankingsDiv .rankTitle span").html(res.data.rank);
  $(".nationalRankingsDiv .shareAmountTitle span").html(res.data.share_amount);
  if(rankList.length === 0){
    var html ='<li><p style="text-align: center;width: 100%;background-color: #FEE470;">暂无排名信息查询喔！</p></li>';
    $(".nationalRankingsDiv ul").append(html);
  }else {
    var html = '';
    for(var i = 0; i < rankList.length; i++){
      var rank = parseInt(data.page) - 1;
      rank = parseInt(rank)*10 + (i+1);
      html+='<li><div class="placing"><span>'+rank+'</span></div>' +
          '<div class="province">'+rankList[i].province+'</div>' +
          '<div class="headerImg"><div class="userHeader"><img src="'+rankList[i].avatar+'"></div></div>' +
          '<div class="storeName">'+rankList[i].store_name+'</div>' +
          '<div class="forwardNb">'+rankList[i].share_amount+'</div></li>';
    }
    $(".nationalRankingsDiv ul").append(html);
    loading = false;
    if(parseInt(res.data.count) === $(".nationalRankingsDiv ul li").length){
      var html ='<li><p style="text-align: center;width: 100%;background-color: #FEE470;">end</p></li>';
      $(".nationalRankingsDiv ul").append(html);
      loading = true;
    }
  }
  $("#myloading").hide();
};
//获取核销列表
storeApi.getCheckList = function(data){
    var option = {
        path:gameBaseUrl + "/api/checkList?page="+data.page+"&pagesize=10",
        type:'get',
        successCallback:function (res) {
            var List = res.data.rows;
            $(".writeOffAwardDiv .writeOffNb span").html(res.data.count);
            if(List.length === 0){
                var html ='<li><p style="text-align: center;width: 100%;background-color: #FEE470;">暂无核销信息查询喔！</p></li>';
                $(".writeOffAwardDiv ul").append(html);
            }else {
                var html = '';
                for(var i = 0; i < List.length; i++){
                    html+='<li>' +
                        '<div class="headerImg"><div class="userHeader"><img src="'+List[i].avatar+'"></div></div>' +
                        '<div class="userName">'+List[i].nickname+'</div>';
                    if(!List[i].checkPrize){
                        html+= '<div class="writeOffType">一片面膜</div>';
                    }else {
                        html+= '<div class="writeOffType writeOffType1">一片面膜+面膜套盒</div>';
                    }
                    html+='<div class="time"><p>'+moment(parseInt(List[i].exchange_time)*1000).format("YY-MM-DD")+'</p><p>'+moment(parseInt(List[i].exchange_time)*1000).format("HH:mm")+'</p></div></li>';
                }
                $(".writeOffAwardDiv ul").append(html);
                loading = false;
                if(parseInt(res.data.count) === $(".writeOffAwardDiv ul li").length){
                    var html ='<li><p style="text-align: center;width: 100%;background-color: #FEE470;">end</p></li>';
                    $(".writeOffAwardDiv ul").append(html);
                    loading = true;
                }
            }
        },
        errorCallback:function (res) {
            $(".writeOffAwardDiv ul").empty();
            var html ='<li><p style="text-align: center;width: 100%;background-color: #FEE470;">暂无核销信息查询喔！</p></li>';
            $(".writeOffAwardDiv ul").append(html);
        }
    };
    // myRequest(option)
  let res = {
      data: {
        count: 2,
        rows: []
      }
  }
  if (data.page === 1) {
    res = {
      data: {
        count: 2,
        rows: [
          {
            avatar: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            nickname: 'x小猪佩奇',
            checkPrize: true,
            exchange_time: 1553002691
          },
          {
            avatar: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            nickname: 'x小猪佩奇',
            checkPrize: false,
            exchange_time: 1553002691
          }
        ]
      }
    }
  }
  var List = res.data.rows;
  $(".writeOffAwardDiv .writeOffNb span").html(res.data.count);
  if(List.length === 0){
    var html ='<li><p style="text-align: center;width: 100%;background-color: #FEE470;">暂无核销信息查询喔！</p></li>';
    $(".writeOffAwardDiv ul").append(html);
  }else {
    var html = '';
    for(var i = 0; i < List.length; i++){
      html+='<li>' +
          '<div class="headerImg"><div class="userHeader"><img src="'+List[i].avatar+'"></div></div>' +
          '<div class="userName">'+List[i].nickname+'</div>';
      if(!List[i].checkPrize){
        html+= '<div class="writeOffType">一片面膜</div>';
      }else {
        html+= '<div class="writeOffType writeOffType1">一片面膜+面膜套盒</div>';
      }
      html+='<div class="time"><p>'+moment(parseInt(List[i].exchange_time)*1000).format("YY-MM-DD")+'</p><p>'+moment(parseInt(List[i].exchange_time)*1000).format("HH:mm")+'</p></div></li>';
    }
    $(".writeOffAwardDiv ul").append(html);
    loading = false;
    if(parseInt(res.data.count) === $(".writeOffAwardDiv ul li").length){
      var html ='<li><p style="text-align: center;width: 100%;background-color: #FEE470;">end</p></li>';
      $(".writeOffAwardDiv ul").append(html);
      loading = true;
    }
  }
  $("#myloading").hide();
};
//核销奖品
storeApi.checkPrize = function(){
    // wx.scanQRCode({
    //     needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    //     scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
    //     success: function (res) {
    //         var openid = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
    //         var option = {
    //             path:gameBaseUrl + "/api/check",
    //             type:'post',
    //             data:{
    //                 openid:openid
    //             },
    //             successCallback:function (res) {
    //                 switch (res.data.checkStatus) {
    //                     case 'expire':
    //                         setMyTips("活动结束，停止核销");
    //                         break;
    //                     case 'invalidation':
    //                         setMyTips("二维码无效");
    //                         break;
    //                     case 'checked':
    //                         setMyTips("已经核销过该二维码");
    //                         break;
    //                     case 'success':
    //                         $(".canvasContent").show();
    //                         $(".canvasContent .luckDraw").show();
    //                         if(res.data.prizeStatus === 1){
    //                             startLuckDraw(1,0);
    //                             try {
    //                                 var form ={
    //                                     "店主名称": userinfo.nickname,
    //                                     "店主unionid": userinfo.unionid,
    //                                     "面膜套盒": 1,
    //                                 };
    //                                 fiboSDK.saveFormInfo(form,'checkPrize');
    //                             }catch (e) {
    //                                 console.log(e)
    //                             }
    //                         }else {
    //                             startLuckDraw(1,2);
    //                             try {
    //                                 var form ={
    //                                     "店主名称": userinfo.nickname,
    //                                     "店主unionid": userinfo.unionid,
    //                                     "面膜套盒": 0,
    //                                 };
    //                                 fiboSDK.saveFormInfo(form,'checkPrize');
    //                             }catch (e) {
    //                                 console.log(e)
    //                             }
    //                         }
    //                         break;
    //                 }
    //             },
    //             errorCallback:function () {
    //                 setMyTips("当前用户量爆满，店家火热核销中，请稍后核销！")
    //             }
    //         };
    //         myRequest(option)
    //     }
    // });
  const res = {
      data: {
        checkStatus: 'success',
        prizeStatus: 1
      }
  }
  switch (res.data.checkStatus) {
    case 'expire':
      setMyTips("活动结束，停止核销");
      break;
    case 'invalidation':
      setMyTips("二维码无效");
      break;
    case 'checked':
      setMyTips("已经核销过该二维码");
      break;
    case 'success':
      $(".canvasContent").show();
      $(".canvasContent .luckDraw").show();
      if(res.data.prizeStatus === 1){
        startLuckDraw(1,0);
      }else {
        startLuckDraw(1,2);
      }
      break;
  }
};
//获取二位码
storeApi.getQrcode = function(){
    var option = {
        path:gameBaseUrl + "/api/getQrcode",
        type:'get',
        successCallback:function (res) {
            $(".extensionDiv .storeName").html(res.data.store_name);
            $("#QRcode").empty();
            var qrcode = new QRCode(document.getElementById("QRcode"), {
                text: res.data.str,
                width: 300,
                height: 300,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
        },
        errorCallback:function (res) {
            $(".extensionDiv .closeBtn").click();
            setMyTips("当前用户量爆满，游戏火热进行中，请稍后加载数据！")
        }
    };
    // myRequest(option)
};


