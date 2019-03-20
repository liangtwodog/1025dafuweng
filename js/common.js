$(document).ready(function() {
    refresh()
});
// $(window).resize(function() {
//     refresh()
// });
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
    if (window.orientation === 180 || window.orientation === 0) {
        $(".horizontalScreenHint").hide();
    }
    if (window.orientation === 90 || window.orientation === -90) {
        $(".horizontalScreenHint").show();
    }
}, false);
function refresh() {
    var bodyScale = 0;
    bodyScale = $(window).height()/1200
    if($(window).width()/$(window).height() > 750/1334){
        bodyScale = $(window).height()/1334
        $(".body").css({
            "zoom": bodyScale*100 +  "%"
        });
        if(690*bodyScale > $(window).width()){
            $(".zoomContent").css({
                "zoom": 1/bodyScale*$(window).width()/750*100 +  "%"
            });
        }
        if(750*bodyScale < $(window).width()){
            $(".myBgSscale").css({
                zoom: ($(window).width()/750)/bodyScale*100 +  "%",
            });
            $(".myBg").css({
                marginTop: ($(window).height()-1334*$(window).width()/750)/2
            })
        }
    }else {
        bodyScale = $(window).width()/750
        $(".body").css({
            "zoom": bodyScale*100 +  "%"
        });
        if(1206*bodyScale > $(window).height()){
            $(".zoomContent").css({
                "zoom": 1/bodyScale*$(window).height()/1334*100 +  "%"
            });
        }
        if(1334*bodyScale < $(window).height()){
            $(".myBgSscale").css({
                zoom: ($(window).height()/1334)/bodyScale*100 +  "%",
            });
            $(".myBg").css({
                marginLeft: ($(window).width()-750*$(window).height()/1334)/2
            })
        }
    }
}
// 用户信息
var userinfo ={};
var gameOverTime = moment("2022-10-15 18:00").unix();
var FUI = {};
var GetRequestValue ={};
var clickSound ={}
var bgmSound={}
var gameOverSound={}
var addScoreSound={}
var diceSound={}
var luckDrawSound={}
FUI.soundComponent=function(profile){
    this.profile={
        src:'', //音频文件地址
        altSrc:'', //备选音频文件地址 (不同浏览器支持的音频格式不同,可见附表)
        loop:false //是否循环播放,这个参数现在没有用上
    };
    if(profile) {
        $.extend(this.profile,profile);
    }
    this.soundObj=null;
    this.isIE = !-[1,];
    // /!*这个方法是前辈大牛发明的,利用ie跟非ie中JScript处理数组最后一个逗号“,”的差异,
    // 不过对于IE 9,这个办法就无效了,但此处正合我用,因为IE 9支持audio*!/
    this.init();
};
FUI.soundComponent.prototype={
    init:function(){
        this._setSrc();
    },
    _setSrc:function(){
        if(this.soundObj){
            if(this.isIE){
                this.soundObj[0].src=this.profile.src;
            }else{
                this.soundObj[0].innerHTML='<source src="'+this.profile.src+'" /> <source src="'+this.profile.altSrc+'" />';
            }
        }else{
            if(this.isIE){
                this.soundObj=$
                ('<bgsound volume="-10000" loop="1" src="'+this.profile.src+'">').appendTo('body');
                 //-10000是音量的最小值。先把音量关到最小,免得一加载就叮的一声,吓到人。
            }else{
                if(this.profile.loop){
                    this.soundObj=$('<audio preload="auto" autobuffer loop> <source src="'+this.profile.src+'" /> <source src="'+this.profile.altSrc+'" /> </audio>').appendTo('body');
                }else {
                    this.soundObj=$('<audio preload="auto" autobuffer> <source src="'+this.profile.src+'" /> <source src="'+this.profile.altSrc+'" /> </audio>').appendTo('body');
                }
            }
        }
    },
    setSrc:function(src,altSrc){
        this.profile.src=src;
        if(typeof altSrc!='undefined'){
            this.profile.altSrc=altSrc;
        }
        this._setSrc();
    },
    play:function(){
        // console.log(this.soundObj)
        if(this.soundObj){
            if(this.isIE){
                this.soundObj[0].volume = 1; //把音量打开。
                this.soundObj[0].src = this.profile.src;
            }else{
                this.soundObj.prevObject[0].currentTime = 0;
                this.soundObj.prevObject[0].play();
            }
        }
    },
    stop:function () {
        if(this.soundObj){
            if(this.isIE){
                this.soundObj[0].volume = 1; //把音量打开。
                this.soundObj[0].src = this.profile.src;
            }else{
                this.soundObj.prevObject[0].pause();
            }
        }
    }
};


function myRequest(option) {
    var xhr = $.ajax({
        type: option.type,
        url:option.path,
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded",
        data: option.data,
        timeout: 10000,
        beforeSend: function (xhr) {
            if(option.path.indexOf("pagesize") < 0){
                $("#myloading").show();
            }
            xhr.setRequestHeader("Authorization", "Bearer "+mytoken);
        },
        success: function (json){
            $("#myloading").hide();
            if(json.code === 200){
                option.successCallback(json)
            }else {
                option.errorCallback(json)
            }
        },
        error: function (json) {
            $("#myloading").hide();
            if(json.status === 401){
                var  newUrl = gameBaseUrl+"/api/getCode?state=user";
                for(var key in GetRequestValue){
                    newUrl= newUrl +"&"+key+"="+GetRequestValue[key];
                }
                // 重定向的链接
                location.href=newUrl;
            }
            option.errorCallback(json)
        },
        complete: function (XMLHttpRequest,status) {
            if(status == 'timeout') {
                xhr.abort();    // 超时后中断请求
                $("#myloading").hide();
            }
        }
    });

}
//获取链接参数
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
//获取微信jssdk配置
function getSign(){
    var option = {
        path:gameBaseUrl + "/api/share",
        type:'post',
        data:{
            url: location.href,
            rec:GetRequestValue.rec
        },
        successCallback:function (res) {
            var  showUrl = gameBaseUrl+"/api/getCode?state=user";
            for(var key in GetRequestValue){
                if(key !== "rec"){
                    showUrl= showUrl +"&"+key+"="+GetRequestValue[key];
                }
            }
            showUrl = showUrl + "&rec="+res.data.rec;
            wx.config({
                debug: false,
                appId: res.data.appid,
                timestamp:res.data.timestamp ,
                nonceStr: res.data.noncestr,
                signature: res.data.signature,
                jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareTimeline','onMenuShareQZone','scanQRCode'] // 必填，需要使用的JS接口列表
            });
            wx.ready(function(){
                wx.onMenuShareAppMessage({
                    title: '果粉大狂欢 坚果来作战 ！', // 分享标题
                    desc: '坚果寻宝大作战！果本1025，好礼非你莫属~', // 分享描述
                    link: fiboSDK.dealUrl(showUrl), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: window.location.origin+'/gbsy/images/showImg.png', // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        alert("分享成功!");
                        fiboSDK.share('friend');
                    },
                    cancel: function () {
                        alert("分享给朋友失败");
                    }
                });
                wx.onMenuShareTimeline({
                    title: '果粉大狂欢 坚果来作战 ！', // 分享标题
                    link: fiboSDK.dealUrl(showUrl), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    // link: fiboSDK.dealUrl(showUrl), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: window.location.origin+'/gbsy/images/showImg.png', // 分享图标
                    success: function () {
                        // 用户点击了分享后执行的回调函数
                        fiboSDK.share('timeline');
                    }
                } );
                wx.error(function(res){
                    if(window.location.href.split("?")[0].indexOf("store")> -1){
                        setMyTips("当前活动火爆，如有部分功能不能使用，请刷新！")
                    }
                    console.log(res);
                });
            });
        },
        errorCallback:function () {

        }
    };
    myRequest(option)
}
// 判断用户是否已经登录
function login() {
    GetRequestValue = GetRequest();
    mytoken = GetRequestValue.token;
    if(mytoken === undefined || mytoken === ""){
        var token = "";
        if(window.location.href.split("?")[0].indexOf("store")> -1){
            token = window.localStorage.getItem('storeToken', mytoken);
        }else {
            token = window.localStorage.getItem('userToken', mytoken);
        }
        if (!token) {
            console.log("需要重定向")
            var  newUrl = gameBaseUrl+"/api/getCode?state=user";
            for(var key in GetRequestValue){
                newUrl= newUrl +"&"+key+"="+GetRequestValue[key];
            }
            // 重定向的链接
            location.href=newUrl;
        }else {
            mytoken = token;
            getSign();
            getStatSetting();
            if(window.location.href.split("?")[0].indexOf("store")> -1){
                 clickSound=new FUI.soundComponent({src:'./audio/click.mp3',altSrc:'./audio/click.mp3'});
                 luckDrawSound=new FUI.soundComponent({src:'./audio/luckDraw.mp3',altSrc:'./audio/luckDraw.mp3'});
            }else {
                 clickSound=new FUI.soundComponent({src:'./audio/click.mp3',altSrc:'./audio/click.mp3'});
                 luckDrawSound=new FUI.soundComponent({src:'./audio/luckDraw.mp3',altSrc:'./audio/luckDraw.mp3'});
                 bgmSound=new FUI.soundComponent({src:'./audio/bgm.mp3',altSrc:'./audio/bgm.mp3',loop:true});
                 addScoreSound=new FUI.soundComponent({src:'./audio/addScore.mp3',altSrc:'./audio/addScore.mp3',loop:true});
                 diceSound=new FUI.soundComponent({src:'./audio/dice.mp3',altSrc:'./audio/dice.mp3'});
                 gameOverSound=new FUI.soundComponent({src:'./audio/gameOver.mp3',altSrc:'./audio/gameOver.mp3'});
            }
        }
    }else {
        console.log("已经登录");
        if(window.location.href.split("?")[0].indexOf("store")> -1){
            window.localStorage.setItem('storeToken', mytoken);
        }else {
            window.localStorage.setItem('userToken', mytoken);
        }
        var  newUrl = location.href.split("?")[0];
        for(var key in GetRequestValue){
            if(key !== "token"){
                if(newUrl.indexOf("?") < 0){
                    newUrl = newUrl+"?"+key+"="+GetRequestValue[key]
                }else {
                    newUrl= newUrl +"&"+key+"="+GetRequestValue[key];
                }
            }
        }
        window.location.replace(newUrl);
    }
}
// login();
if(window.location.href.split("?")[0].indexOf("store")> -1){
  clickSound=new FUI.soundComponent({src:'./audio/click.mp3',altSrc:'./audio/click.mp3'});
  luckDrawSound=new FUI.soundComponent({src:'./audio/luckDraw.mp3',altSrc:'./audio/luckDraw.mp3'});
}else {
  clickSound=new FUI.soundComponent({src:'./audio/click.mp3',altSrc:'./audio/click.mp3'});
  luckDrawSound=new FUI.soundComponent({src:'./audio/luckDraw.mp3',altSrc:'./audio/luckDraw.mp3'});
  bgmSound=new FUI.soundComponent({src:'./audio/bgm.mp3',altSrc:'./audio/bgm.mp3',loop:true});
  addScoreSound=new FUI.soundComponent({src:'./audio/addScore.mp3',altSrc:'./audio/addScore.mp3',loop:true});
  diceSound=new FUI.soundComponent({src:'./audio/dice.mp3',altSrc:'./audio/dice.mp3'});
  gameOverSound=new FUI.soundComponent({src:'./audio/gameOver.mp3',altSrc:'./audio/gameOver.mp3'});
}

//获取斐波那契sdk配置
function getStatSetting(){
    var appid = '';
    if(window.location.href.split("?")[0].indexOf("store")> -1){
        appid = "c5d5357e-2985-44f7-ac66-aa832b3eb40d"
    }else {
        appid = "83a19dd5-18e6-4c48-ad62-949646205bb5"
    }
    // appid = 'IJRIJZZZU';
    var option = {
        path:gameBaseUrl + "/api/getFiboInfo",
        type:'GET',
        successCallback:function (res) {
            userinfo = res.data.userinfo;
            fiboSDK.init({
                pfid: 'mk_fib6Yvqam',
                appid: appid,
                mpid: res.data.mpid,
                openid: res.data.openid,
                userInfo: res.data.userInfo
            })
        },
        errorCallback:function () {

        }
    };
    myRequest(option)
}


//设置温馨提示
function setMyTips(str) {
    $(".canvasContent").show();
    $("#myTipsDiv").show();
    $("#myTipsDiv .tips").html(str)
}
//抽奖
function startLuckDraw(type, PrizeType) {
    var luckDrawPrize = [];
    var luckDrawBorder = [{x:0, y:0}];
    var LuckDrawLamp = [{x: -620, y: 0}, {x: -1120, y: 0}];
    var luckDraw = [{x: -1670, y: 0}, {x: -1670, y: -740}];
    var NowLuckDrawLamp = 0;
    var NowLuckDrawPrize = 0;
    switch (parseInt(type)){
        case 1:
            // 幸运大抽奖
            luckDrawBorder = {x:0, y:0};
            luckDrawPrize = [{x:0, y:-680},{x:-420, y:-680},{x:-870, y:-680},{x:-870, y:-390}];
            break;
        case 2:
            bgmSound.stop();
            luckDrawBorder = {x:-860, y:-1450};
            luckDrawPrize = [{x:0, y:-2140},{x:-400, y:-2140},{x:-800, y:-2140},{x:-1200, y:-2140}];
            break;
    }
    $(".luckDraw .luckDrawContent").css({
        "background-position": luckDrawBorder.x+"px "+luckDrawBorder.y+"px"
    })
    $(".luckDraw .luckDrawPrize").css({
        "background-position": luckDrawPrize[0].x+"px "+luckDrawPrize[0].y+"px"
    })
    var LuckDrawLampInterval = setInterval(function () {
        NowLuckDrawLamp = (NowLuckDrawLamp+1)%2
        $(".luckDraw .luckDrawContent .luckDrawLamp").css({
            "background-position": LuckDrawLamp[NowLuckDrawLamp].x+"px "+LuckDrawLamp[NowLuckDrawLamp].y+"px"
        });
        $(".luckDraw").css({
            "background-position": luckDraw[NowLuckDrawLamp].x+"px "+luckDraw[NowLuckDrawLamp].y+"px"
        });
    }, 200);
    setTimeout(function () {
        luckDrawSound.play();
        Interval1()
    },1300);


    function Interval1() {
        var luckDrawPrizeInterval =  setInterval(function () {
            if(parseInt(NowLuckDrawPrize/4) == 3){
                clearInterval(luckDrawPrizeInterval);
                Interval2();
            }else {
                NowLuckDrawPrize ++;
                $(".luckDraw .luckDrawPrize").css({
                    "background-position": luckDrawPrize[NowLuckDrawPrize%4].x+"px "+luckDrawPrize[NowLuckDrawPrize%4].y+"px"
                });
            }
        }, 100)
    }
    function Interval2() {
        var luckDrawPrizeInterval =  setInterval(function () {
            if(parseInt(NowLuckDrawPrize/4) == 14){
                clearInterval(luckDrawPrizeInterval);
                Interval3();
            }else {
                NowLuckDrawPrize ++;
                $(".luckDraw .luckDrawPrize").css({
                    "background-position": luckDrawPrize[NowLuckDrawPrize%4].x+"px "+luckDrawPrize[NowLuckDrawPrize%4].y+"px"
                });
            }
        }, 50)
    }
    function Interval3() {
        var luckDrawPrizeInterval =  setInterval(function () {
            if(parseInt(NowLuckDrawPrize/4) == 15 && NowLuckDrawPrize%4 == PrizeType){
                clearInterval(luckDrawPrizeInterval);
                luckDrawSound.stop();
                setTimeout(function () {
                    clearInterval(LuckDrawLampInterval);
                    showPrize(type, PrizeType);
                    // 当时惊喜抽奖是需要重启游戏bgm
                    if(parseInt(type) === 2){
                        bgmSound.play();
                    }
                },2000)
            }else {
                NowLuckDrawPrize ++;
                $(".luckDraw .luckDrawPrize").css({
                    "background-position": luckDrawPrize[NowLuckDrawPrize%4].x+"px "+luckDrawPrize[NowLuckDrawPrize%4].y+"px"
                });
            }
        },350)
    }
}

//设置奖品
function showPrize(type, PrizeType) {
    $(".canvasContent .luckDraw").hide();
    var borderTitle = {x: -850, y:-1140};
    var prizeImg = '';
    var prizeIntroduce = '';
    switch (parseInt(type)){
        // 幸运大抽奖
        case 1:
            if(parseInt(PrizeType) === 0){
                borderTitle = {x: -850, y:-930};
                prizeImg = {x: 0, y:-1010};
                prizeIntroduce = '请发放一片面膜 + 一份面膜套盒！';
                $(".canvasContent .winningPrizeDiv").show();
                $(".canvasContent .winningPrizeDiv .prize").show();
                $(".canvasContent .winningPrizeDiv").removeClass("noWinningPrizeDiv");
            }else {
                borderTitle = {x: -850, y:-1140};
                prizeImg = {x: -1670, y: -740};
                prizeIntroduce = '与大奖擦肩而过，请发放一片面膜！';
                $(".canvasContent .winningPrizeDiv").addClass("noWinningPrizeDiv");
                $(".canvasContent .winningPrizeDiv").show();
                $(".canvasContent .winningPrizeDiv .prize").hide();
            }
            break;
        // 惊喜大抽奖
        case 2:
            if(parseInt(PrizeType) === 0){
                borderTitle = {x: -600, y:-2600};
                prizeImg = {x: -210, y:-2410};
                prizeIntroduce = '<p class="prizeName">获得珍爱套盒一份！</p><p>请继续完成游戏后去“我的奖品”页面领取，中途退出游戏分数和奖品将失效！</p>';
                $(".canvasContent .winningPrizeDiv").show();
                $(".canvasContent .winningPrizeDiv .prize").show();
                $(".canvasContent .winningPrizeDiv").removeClass("noWinningPrizeDiv");
            }else {
                setResult(gameResult.score);
            }
            break;
    }
    $(".canvasContent .winningPrizeDiv .prizeImg").css({
        "background-position": prizeImg.x+"px "+prizeImg.y+"px"
    });
    $(".canvasContent .winningPrizeDiv .borderTitle").css({
        "background-position": borderTitle.x+"px "+borderTitle.y+"px"
    });
    $(".canvasContent .winningPrizeDiv .prizeIntroduce").html(prizeIntroduce);

    $(".canvasContent .winningPrizeDiv").css({
        "marginTop": -$(".canvasContent .winningPrizeDiv").height()/2 + 30
    });
}



