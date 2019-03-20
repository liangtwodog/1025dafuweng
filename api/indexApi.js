/* eslint-disable */

var indexApi = {};
//获取转发全国排名
indexApi.getRank = function(data){
    var option = {
        path:gameBaseUrl + "/api/getRank?page="+data.page+"&pagesize=10",
        type:'get',
        successCallback:function (res) {
            var rankList = res.data.top100;
            $(".nationalRankingsDiv .rankings span").html(res.data.rank);
            $(".nationalRankingsDiv .allScore span").html(res.data.oldScores_total);
            if(rankList.length === 0){
                var html ='<li><p style="text-align: center;width: 100%;background-color: #FEE470;">暂无排名信息查询喔！</p></li>';
                $(".nationalRankingsDiv ul").append(html);
            }else {
                var html = '';
                for(var i = 0; i < rankList.length; i++){
                    var rank = parseInt(data.page) - 1;
                    rank = parseInt(rank)*10 + (i+1);
                    html+='<li>' +
                        '<div class="placing"><span>'+rank+'</span></div>' +
                        '<div class="headerImg"><div class="userHeader"><img src="'+rankList[i].avatar+'"></div></div>' +
                        '<div class="userName">'+rankList[i].nickname+'</div>' +
                        '<div class="score">'+rankList[i].scores_total+'</div></li>';
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
      rank: 1,
      count: 10,
      oldScores_total: 400,
      top100: []
    }
  }
  if (data.page === 1) {
    res = {
      data: {
        rank: 1,
        oldScores_total: 400,
        count: 10,
        top100: [
          {
            avatar: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            nickname: '小猪',
            scores_total: 100
          },
          {
            avatar: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            nickname: '小猪',
            scores_total: 100
          },
          {
            avatar: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            nickname: '小猪',
            scores_total: 100
          },
          {
            avatar: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            nickname: '小猪',
            scores_total: 100
          },
          {
            avatar: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            nickname: '小猪',
            scores_total: 100
          },
          {
            avatar: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            nickname: '小猪',
            scores_total: 100
          },
          {
            avatar: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            nickname: '小猪',
            scores_total: 100
          },
          {
            avatar: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            nickname: '小猪',
            scores_total: 100
          },
          {
            avatar: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            nickname: '小猪',
            scores_total: 100
          },
          {
            avatar: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            nickname: '小猪',
            scores_total: 100
          }
        ]
      }
    }
  }
  var rankList = res.data.top100;
  $(".nationalRankingsDiv .rankings span").html(res.data.rank);
  $(".nationalRankingsDiv .allScore span").html(res.data.oldScores_total);
  if(rankList.length === 0){
    var html ='<li><p style="text-align: center;width: 100%;background-color: #FEE470;">暂无排名信息查询喔！</p></li>';
    $(".nationalRankingsDiv ul").append(html);
  }else {
    var html = '';
    for(var i = 0; i < rankList.length; i++){
      var rank = parseInt(data.page) - 1;
      rank = parseInt(rank)*10 + (i+1);
      html+='<li>' +
          '<div class="placing"><span>'+rank+'</span></div>' +
          '<div class="headerImg"><div class="userHeader"><img src="'+rankList[i].avatar+'"></div></div>' +
          '<div class="userName">'+rankList[i].nickname+'</div>' +
          '<div class="score">'+rankList[i].scores_total+'</div></li>';
    }
    $(".nationalRankingsDiv ul").append(html);
    loading = false;
    if(parseInt(res.data.count) === $(".nationalRankingsDiv ul li").length){
        console.log(1111111111)
      var html ='<li><p style="text-align: center;width: 100%;background-color: #FEE470;">end</p></li>';
      $(".nationalRankingsDiv ul").append(html);
      loading = true;
    }
  }
  $("#myloading").hide();

};
//获取用户分数
indexApi.getScoreDetail = function(data){
    var option = {
        path:gameBaseUrl + "/api/getScoreDetail?page="+data.page+"&pagesize=10",
        type:'get',
        successCallback:function (res) {
            var List = res.data.score;
            if(List.length === 0){
                var html ='<li><p style="text-align: center;width: 100%;background-color: #FEE470;">暂无分数信息查询喔！</p></li>';
                $(".myScoreDiv ul").append(html);
            }else {
                var html = '';
                for(var i = 0; i < List.length; i++){
                    html+=' <li><div class="time">' + moment(parseInt(List[i].play_time)*1000).format('MM-DD HH:mm')+'</div><div class="score">'+List[i].score+'</div> </li>';
                }
                $(".myScoreDiv ul").append(html);
                $(".myScoreDiv .title").html("总分："+res.data.sum);
                loading = false;
                if(parseInt(res.data.count) === $(".myScoreDiv ul li").length){
                    var html ='<li><p style="text-align: center;width: 100%;background-color: #FEE470;">end</p></li>';
                    $(".myScoreDiv ul").append(html);
                    loading = true;
                }
            }
        },
        errorCallback:function () {
            $(".myScoreDiv ul").empty();
            var html ='<li><p style="text-align: center;width: 100%;background-color: #FEE470;">暂无分数信息查询喔！</p></li>';
            $(".myScoreDiv ul").append(html);
        }
    };
    // myRequest(option)
  let res = {
    data: {
      score: [],
    }
  }
  if (data.page === 1) {
    res = {
      data: {
        count: 4,
        sum: 560,
        score: [
            {
              play_time: 1553002691,
              score: 140
            },
          {
            play_time: 1553002691,
            score: 140
          },
          {
            play_time: 1553002691,
            score: 140
          },
          {
            play_time: 1553002691,
            score: 140
          }
        ],
      }
    }
  }
  var List = res.data.score;
  if(List.length === 0){
    var html ='<li><p style="text-align: center;width: 100%;background-color: #FEE470;">暂无分数信息查询喔！</p></li>';
    $(".myScoreDiv ul").append(html);
  }else {
    var html = '';
    for(var i = 0; i < List.length; i++){
      html+=' <li><div class="time">' + moment(parseInt(List[i].play_time)*1000).format('MM-DD HH:mm')+'</div><div class="score">'+List[i].score+'</div> </li>';
    }
    $(".myScoreDiv ul").append(html);
    $(".myScoreDiv .title").html("总分："+res.data.sum);
    loading = false;
    if(parseInt(res.data.count) === $(".myScoreDiv ul li").length){
      var html ='<li><p style="text-align: center;width: 100%;background-color: #FEE470;">end</p></li>';
      $(".myScoreDiv ul").append(html);
      loading = true;
    }
  }
  $("#myloading").hide();
};
//获取奖品信息
indexApi.getPrize = function(){
    var option = {
        path:gameBaseUrl + "/api/getPrize",
        type:'get',
        successCallback:function (res) {
            if(res.data.phone === null){
                $(".setPhoneDiv").show();
                $("#curtain").show();
            }else {
                var prizeList = res.data.player_prize;
                var html ='';
                if(prizeList.length === 0){
                    $(".myPrizesDiv .prizeList").empty();
                    var html = '<li class="noPrize">暂无奖品~</li>';
                    $(".myPrizesDiv .prizeList").append(html)
                }else {
                    $(".myPrizesDiv .prizeList").empty();
                    if(prizeList.length===1){
                        for(var i = 0; i < prizeList.length; i++){
                            if(parseInt(prizeList[i].prize) === 2){
                                var html = '<li class="prize prize1"></li>';
                                $(".myPrizesDiv .prizeList").append(html)
                                $(".myPrizesDiv .borderIsok1").show();
                                $(".myPrizesDiv .borderIsok").hide();
                            }
                            if(parseInt(prizeList[i].prize) === 3){
                                var html = '<li class="prize prize2"></li>';
                                $(".myPrizesDiv .prizeList").append(html)
                                $(".myPrizesDiv .prize2").on("click",function () {
                                    clickSound.play();
                                    $(".myPrizesDiv .borderClose").click();
                                    indexApi.getAddress()
                                    fiboSDK.btnClick("seeAddress","用户查看收货地址");
                                })
                                $(".myPrizesDiv .borderIsok1").hide();
                                $(".myPrizesDiv .borderIsok").show();
                            }
                        }
                    }else {
                        for(var i = 0; i < prizeList.length; i++){
                            if(parseInt(prizeList[i].prize) === 2){
                                var html = '<li class="prize prize1"><p>点击领取奖品</p></li>';
                                $(".myPrizesDiv .prizeList").append(html)
                                $(".myPrizesDiv .prize1").on("click",function () {
                                    clickSound.play();
                                    $(".myPrizesDiv .borderClose").click();
                                    indexApi.getQrcode();
                                    fiboSDK.btnClick("seeQrcode","用户查看奖品二维码");
                                })
                            }
                            if(parseInt(prizeList[i].prize) === 3){
                                var html = '<li class="prize prize2"></li>';
                                $(".myPrizesDiv .prizeList").append(html)
                                $(".myPrizesDiv .prize2").on("click",function () {
                                    clickSound.play();
                                    $(".myPrizesDiv .borderClose").click();
                                    indexApi.getAddress()
                                    fiboSDK.btnClick("seeAddress","用户查看收货地址");
                                })
                            }
                            if(parseInt(prizeList[i].prize) === 5){
                                var html = '<li class="prize prize3"><p>已于核销面膜时当场核销</p></li>';
                                $(".myPrizesDiv .prizeList").append(html);
                            }
                        }
                        $(".myPrizesDiv .borderIsok1").hide();
                        $(".myPrizesDiv .borderIsok").show();
                    }
                }
                $(".myPrizesDiv").css({
                    "marginTop": -$(".myPrizesDiv").height()/2 + 30
                });
                $(".myPrizesDiv").show();
                $("#curtain").show();
            }
        },
        errorCallback:function (res) {
            setMyTips("当前用户量爆满，游戏火热进行中，请稍后加载数据！")
        }
    };
    // myRequest(option)
  const res = {
      data: {
          phone: 18312029915,
        player_prize: []
      }
  }
  if(res.data.phone === null){
    $(".setPhoneDiv").show();
    $("#curtain").show();
  }else {
    var prizeList = res.data.player_prize;
    var html ='';
    if(prizeList.length === 0){
      $(".myPrizesDiv .prizeList").empty();
      var html = '<li class="noPrize">暂无奖品~</li>';
      $(".myPrizesDiv .prizeList").append(html)
    }else {
      $(".myPrizesDiv .prizeList").empty();
      if(prizeList.length===1){
        for(var i = 0; i < prizeList.length; i++){
          if(parseInt(prizeList[i].prize) === 2){
            var html = '<li class="prize prize1"></li>';
            $(".myPrizesDiv .prizeList").append(html)
            $(".myPrizesDiv .borderIsok1").show();
            $(".myPrizesDiv .borderIsok").hide();
          }
          if(parseInt(prizeList[i].prize) === 3){
            var html = '<li class="prize prize2"></li>';
            $(".myPrizesDiv .prizeList").append(html)
            $(".myPrizesDiv .prize2").on("click",function () {
              clickSound.play();
              $(".myPrizesDiv .borderClose").click();
              indexApi.getAddress()
              fiboSDK.btnClick("seeAddress","用户查看收货地址");
            })
            $(".myPrizesDiv .borderIsok1").hide();
            $(".myPrizesDiv .borderIsok").show();
          }
        }
      }else {
        for(var i = 0; i < prizeList.length; i++){
          if(parseInt(prizeList[i].prize) === 2){
            var html = '<li class="prize prize1"><p>点击领取奖品</p></li>';
            $(".myPrizesDiv .prizeList").append(html)
            $(".myPrizesDiv .prize1").on("click",function () {
              clickSound.play();
              $(".myPrizesDiv .borderClose").click();
              indexApi.getQrcode();
              fiboSDK.btnClick("seeQrcode","用户查看奖品二维码");
            })
          }
          if(parseInt(prizeList[i].prize) === 3){
            var html = '<li class="prize prize2"></li>';
            $(".myPrizesDiv .prizeList").append(html)
            $(".myPrizesDiv .prize2").on("click",function () {
              clickSound.play();
              $(".myPrizesDiv .borderClose").click();
              indexApi.getAddress()
              fiboSDK.btnClick("seeAddress","用户查看收货地址");
            })
          }
          if(parseInt(prizeList[i].prize) === 5){
            var html = '<li class="prize prize3"><p>已于核销面膜时当场核销</p></li>';
            $(".myPrizesDiv .prizeList").append(html);
          }
        }
        $(".myPrizesDiv .borderIsok1").hide();
        $(".myPrizesDiv .borderIsok").show();
      }
    }
    $(".myPrizesDiv").css({
      "marginTop": -$(".myPrizesDiv").height()/2 + 30
    });
    $(".myPrizesDiv").show();
    $("#curtain").show();
  }
};
//获取奖品二位码
indexApi.getQrcode = function(){
    var option = {
        path:gameBaseUrl + "/api/getQrcode",
        type:'get',
        successCallback:function (res) {
            $("#prizeQRcode").empty();
            var qrcode = new QRCode(document.getElementById("prizeQRcode"), {
                text: res.data.str,
                width: 328,
                height: 328,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
            $(".prizesQRcodeDiv").show();
            $("#curtain").show();
            if(res.data.prize_status === 1){
                $(".prizesQRcodeDiv .writtenOffAfter").show();
            }else {
                $(".prizesQRcodeDiv .writtenOffAfter").hide();
            }
        },
        errorCallback:function (res) {
            setMyTips("当前用户量爆满，游戏火热进行中，请稍后加载数据！")
        }
    };
    myRequest(option)
};
//填写手机号码
indexApi.registMember = function(data){
    var option = {
        path:gameBaseUrl + "/api/registMember",
        type:'post',
        data:{
            phone: data.phone
        },
        successCallback:function (res) {
            fiboSDK.btnClick("registMemberBtn","用户填写手机号码");
            try {
                var form ={
                    "用户名称": userinfo.nickname,
                    "用户unionid": userinfo.unionid,
                    "电话号码": data.phone,
                };
                fiboSDK.saveFormInfo(form,'registMember');
            }catch (e) {
                console.log("上传手机号码埋点失败")
            }
            $(".setPhoneDiv").hide();
            $("#curtain").hide();
            indexApi.getPrize();
        },
        errorCallback:function (res) {
            if(json.code === 400){
                setMyTips("输入的手机号码有误")
            }else {
                setMyTips("当前用户量爆满，游戏火热进行中，请稍后加载数据！")
            }
        }
    };
    myRequest(option)
};
//获取地址信息
indexApi.getAddress = function(){
    var option = {
        path:gameBaseUrl + "/api/getAddress",
        type:'get',
        successCallback:function (res) {
            if(res.data !== null){
                $(".setAddressDiv .userName").val(res.data.name);
                $(".setAddressDiv .phoneNb").val(res.data.phone);
                $(".setAddressDiv .userAddress").val(res.data.address);
            }
            $(".setAddressDiv").show();
            $("#curtain").show();
        },
        errorCallback:function (res) {
            setMyTips("当前用户量爆满，游戏火热进行中，请稍后加载数据！")
        }
    };
    myRequest(option)
};
//填写地址
indexApi.addAddress = function(data){
    var option = {
        path:gameBaseUrl + "/api/addAddress",
        type:'post',
        data:{
            phone: data.phone,
            name: data.name,
            address: data.address
        },
        successCallback:function (res) {
            fiboSDK.btnClick("addAddress","用户填写奖品地址");
            try {
                var form ={
                    "用户名称": userinfo.nickname,
                    "用户unionid": userinfo.unionid,
                    "电话号码": data.phone,
                    "收货人姓名": data.name,
                    "收货地址": data.address
                };
                fiboSDK.saveFormInfo(form,'addAddress');
            }catch (e) {
                console.log("上传奖品地址埋点失败")
            }
            setMyTips("地址设置成功！");
            $(".setAddressDiv").hide();
            $("#curtain").hide();
        },
        errorCallback:function (res) {
            if(json.code === 400){
                setMyTips("输入的参数有误")
            }else if(json.code === 403){
                setMyTips("创建的地址已经超过24小时，无法更改收货信息了")
            }else {
                setMyTips("当前用户量爆满，游戏火热进行中，请稍后加载数据！")
            }
        }
    };
    myRequest(option)
};
//开始游戏
indexApi.play = function(){
    var option = {
        path:gameBaseUrl + "/api/play",
        type:'get',
        successCallback:function (res) {
            gameInfo = res.data;
            chanceNb.p.frame = chanceNb.p.frame - 1;
            diceRoller(gameInfo[parseInt(2 - chanceNb.p.frame)]);
        },
        errorCallback:function (res) {
            if(res.code === 400){
                $(".noChanceDiv").show();
                $(".canvasContent").show();
                $(".canvasContent .curtain").show();
            }else {
                setMyTips("当前用户量爆满，游戏火热进行中，请稍后加载数据！")
            }
        }
    };
    // myRequest(option)
  const type = Math.floor(Math.random()*10)
  const gameInfoArray = [
      [
        {
          position: 3,
          prize: 0,
          score: 30,
          scoreesSum: 30,
          step: 3,
          playAgain: {
            gameArray: [
              {
                position: 4,
                prize: 1,
                score: 5,
                scoreesSum: 35,
                step: 1
              }
            ]
          }
        },
        {
          position: 5,
          prize: 10,
          score: 20,
          scoreesSum: 55,
          step: 1
        },
        {
          position: 9,
          prize: 0,
          score: 40,
          scoreesSum: 95,
          step: 4
        }
      ],
    [
      {
        position: 2,
        prize: 0,
        score: 40,
        scoreesSum: 40,
        step: 2
      },
      {
        position: 5,
        prize: 30,
        score: 60,
        scoreesSum: 100,
        step: 3
      },
      {
        position: 11,
        prize: 0,
        score: 6,
        scoreesSum: 160,
        step: 6
      }
    ],
    [
      {
        position: 3,
        prize: 0,
        score: 30,
        scoreesSum: 30,
        step: 3,
        playAgain: {
          gameArray: [
            {
              position: 4,
              prize: 1,
              score: 5,
              scoreesSum: 35,
              step: 1
            }
          ]
        }
      },
      {
        position: 6,
        prize: 1,
        score: 20,
        scoreesSum: 55,
        step: 2
      },
      {
        position: 9,
        prize: 0,
        score: 30,
        scoreesSum: 85,
        step: 3
      }
    ],
    [
      {
        position: 6,
        prize: 0,
        score: 60,
        scoreesSum: 60,
        step: 6
      },
      {
        position: 12,
        prize: 1,
        score: 60,
        scoreesSum: 120,
        step: 6,
        playAgain: {
          gameArray: [
            {
              position: 18,
              prize: 1,
              score: 120,
              scoreesSum: 240,
              step: 6
            }
          ]
        }
      },
      {
        position: 24,
        prize: 0,
        score: 60,
        scoreesSum: 300,
        step: 6
      }
    ],
    [
      {
        position: 2,
        prize: 0,
        score: 40,
        scoreesSum: 40,
        step: 2
      },
      {
        position: 5,
        prize: 30,
        score: 60,
        scoreesSum: 100,
        step: 3
      },
      {
        position: 11,
        prize: 0,
        score: 6,
        scoreesSum: 160,
        step: 6
      }
    ],
    [
      {
        position: 3,
        prize: 0,
        score: 30,
        scoreesSum: 30,
        step: 3,
        playAgain: {
          gameArray: [
            {
              position: 4,
              prize: 1,
              score: 5,
              scoreesSum: 35,
              step: 1
            }
          ]
        }
      },
      {
        position: 6,
        prize: 1,
        score: 20,
        scoreesSum: 55,
        step: 2
      },
      {
        position: 9,
        prize: 0,
        score: 30,
        scoreesSum: 85,
        step: 3
      }
    ],
    [
      {
        position: 6,
        prize: 0,
        score: 60,
        scoreesSum: 60,
        step: 6
      },
      {
        position: 12,
        prize: 1,
        score: 60,
        scoreesSum: 120,
        step: 6,
        playAgain: {
          gameArray: [
            {
              position: 18,
              prize: 1,
              score: 120,
              scoreesSum: 240,
              step: 6
            }
          ]
        }
      },
      {
        position: 24,
        prize: 0,
        score: 60,
        scoreesSum: 300,
        step: 6
      }
    ],
    [
      {
        position: 3,
        prize: 0,
        score: 30,
        scoreesSum: 30,
        step: 3,
        playAgain: {
          gameArray: [
            {
              position: 9,
              prize: 1,
              score: 60,
              scoreesSum: 90,
              step: 6
            }
          ]
        }
      },
      {
        position: 12,
        prize: 1,
        score: 30,
        scoreesSum: 120,
        step: 3,
        playAgain: {
          gameArray: [
            {
              position: 18,
              prize: 1,
              score: 120,
              scoreesSum: 240,
              step: 6
            }
          ]
        }
      },
      {
        position: 23,
        prize: 30,
        score: 20,
        scoreesSum: 260,
        step: 5
      }
    ],
    [
      {
        position: 1,
        prize: 0,
        score: 10,
        scoreesSum: 10,
        step: 1
      },
      {
        position: 2,
        prize: 0,
        score: 20,
        scoreesSum: 30,
        step: 1,
      },
      {
        position: 4,
        prize: 0,
        score: 10,
        scoreesSum: 40,
        step: 2
      }
    ],
    [
      {
        position: 3,
        prize: 0,
        score: 30,
        scoreesSum: 30,
        step: 3,
        playAgain: {
          gameArray: [
            {
              position: 9,
              prize: 1,
              score: 60,
              scoreesSum: 90,
              step: 6
            }
          ]
        }
      },
      {
        position: 12,
        prize: 1,
        score: 30,
        scoreesSum: 120,
        step: 3,
        playAgain: {
          gameArray: [
            {
              position: 18,
              prize: 1,
              score: 120,
              scoreesSum: 240,
              step: 6
            }
          ]
        }
      },
      {
        position: 23,
        prize: 30,
        score: 20,
        scoreesSum: 260,
        step: 5
      }
    ],
  ]
  console.log(type)
  gameInfo = gameInfoArray[type];
  console.log(11111111111111111)
  chanceNb.p.frame = chanceNb.p.frame - 1;
  diceRoller(gameInfo[parseInt(2 - chanceNb.p.frame)]);
};
//结束游戏
indexApi.complete = function(){
    // if(moment().unix() > gameOverTime){
    //     over();
    // }else {
    //     var option = {
    //         path:gameBaseUrl + "/api/complete",
    //         type:'get',
    //         successCallback:function (res) {
    //             over();
    //         },
    //         errorCallback:function (res) {
    //             setMyTips("当前用户量爆满，游戏火热进行中，请稍后加载数据！");
    //             gameOverBtnLoading = true
    //         }
    //     };
    //     myRequest(option)
    // }
  over()
    function over() {
        fiboSDK.btnClick("complete","用户确认游戏结果");
        $("#quintus_container").hide();
        Q.clearStages();
        Q.stageScene("level");
        gameInfo = '';
      console.log(22222222)
        $(".canvasContent").hide();
        $(".gameOverDiv").hide();
        $(".bodyBg").show();
        gameOverBtnLoading = true;
    }
};

