//全国排名的页码
var getGameRandCurpage = 1;
//核销列表page
var getwriteOffAwardpage = 1;
// 是否加载中
var loading = true;

$(".indexContent .activityBtn").on("click",function () {
    $(".activityDescriptionDiv").show();
    $("#curtain").show();
    clickSound.play();
    fiboSDK.btnClick("activityBtn","店主查看活动详情");
});
$(".indexContent .nationalRankingsBtn").on("click",function () {
    $("#myloading").show();
    clickSound.play();
    $(".nationalRankingsDiv").show();
    $("#curtain").show();
    $(".nationalRankingsDiv ul").empty();
    getGameRandCurpage = 1;
    storeApi.getRank({"page":getGameRandCurpage});
    fiboSDK.btnClick("nationalRankingsBtn1","店主查看全国排名");
});
$(".indexContent .writeOffAward").on("click",function () {
    $("#myloading").show();
    clickSound.play();
    $(".writeOffAwardDiv").show();
    $("#curtain").show();
    $(".writeOffAwardDiv ul").empty();
    getwriteOffAwardpage = 1;
    storeApi.getCheckList({"page":getwriteOffAwardpage});
    fiboSDK.btnClick("writeOffAward","店主查看核销记录");
});
$(".indexContent .extensionBtn").on("click",function () {
    clickSound.play();
    $(".extensionDiv").show();
    $("#curtain").show();
    storeApi.getQrcode();
    fiboSDK.btnClick("extensionBtn","店主查看推广二维码");
    // if(QRcodeCard === ""){
    //     html2canvas(document.querySelector(".extensionDiv .extensionContent "), {backgroundColor:null}).then(canvas => {
    //         QRcodeCard = canvas.toDataURL("image/png")
    //         $(".extensionDiv .extensionContent img").attr("src", QRcodeCard);
    //         $(".extensionDiv .extensionContent img").css({
    //             "width": "630px",
    //             "height": "909px",
    //             "top": 0,
    //             "left": 0
    //         })
    //     }).catch(canvas => {
    //         $(".extensionDiv .closeBtn").click();
    //         alert("生成二位码出错，请重新点击生成！");
    //     });
    // }else {
    //     $(".extensionDiv").show();
    //     $("#curtain").show();
    // }

});

// 活动介绍
$(".activityDescriptionDiv .borderClose").on("click",function () {
    clickSound.play();
    $(".activityDescriptionDiv").hide();
    $("#curtain").hide();
});
$(".activityDescriptionDiv .borderIsok").on("click",function () {
    clickSound.play();
    $(".activityDescriptionDiv").hide();
    $("#curtain").hide();
});
$(".activityDescriptionDiv .descriptionBtn").on("click",function () {
    clickSound.play();
    $(".activityDescriptionDiv .activityDescriptionContent").show();
    $(".activityDescriptionDiv .activityPrizeContent").hide();
});
$(".activityDescriptionDiv .prizeBtn").on("click",function () {
    clickSound.play();
    $(".activityDescriptionDiv .activityDescriptionContent").hide();
    $(".activityDescriptionDiv .activityPrizeContent").show();
});

//监听全国列表的滚动条
$(".nationalRankingsDiv ul").scroll(function() {
    if($(".nationalRankingsDiv ul").scrollTop() > ($(".nationalRankingsDiv ul")[0].scrollHeight - $(".nationalRankingsDiv ul").height() - 200)){
        if(!loading){
            loading = true;
            getGameRandCurpage +=1;
            storeApi.getRank({"page":getGameRandCurpage});
        }
    }
});
//全国排名
$(".nationalRankingsDiv .borderClose").on("click",function () {
    clickSound.play();
    $(".nationalRankingsDiv").hide();
    $("#curtain").hide();
});

//奖品核销
$(".writeOffAwardDiv .borderClose").on("click",function () {
    clickSound.play();
    $(".writeOffAwardDiv").hide();
    $("#curtain").hide();
});
//监听奖品核销列表的滚动条
$(".writeOffAwardDiv ul").scroll(function() {
    if($(".writeOffAwardDiv ul").scrollTop() > ($(".writeOffAwardDiv ul")[0].scrollHeight - $(".writeOffAwardDiv ul").height() - 200)){
        if(!loading){
            loading = true;
            getGameRandCurpage +=1;
            storeApi.getCheckList({"page":getGameRandCurpage});
        }
    }
});

// 调用扫码
$(".writeOffAwardDiv .writeOffBtn").on("click",function () {
    if(moment().unix() > moment("2018-10-18 00:00").unix()) {
        setMyTips("活动结束，停止核销")
    }else {
        $(".writeOffAwardDiv .borderClose").click();
        luckDrawSound.play();
        luckDrawSound.stop();
        storeApi.checkPrize();
        fiboSDK.btnClick("writeOffBtn","店主调起核销功能");
    }
    clickSound.play();
});
//推广二位码
$(".extensionDiv .closeBtn").on("click",function () {
    clickSound.play();
    $(".extensionDiv").hide();
    $("#curtain").hide();
});

// 奖品界面
$(".winningPrizeDiv .borderClose").on("click",function () {
    clickSound.play();
    $(".winningPrizeDiv").hide();
    $(".canvasContent").hide();
});
$(".winningPrizeDiv .borderIsok").on("click",function () {
    clickSound.play();
    $(".winningPrizeDiv").hide();
    $(".canvasContent").hide();
    $(".indexContent .writeOffAward").click();
});

//温馨提示
$(".myTipsDiv .borderClose").on("click",function () {
    clickSound.play();
    $(".myTipsDiv").hide();
    $(".canvasContent").hide();
});
$(".myTipsDiv .borderIsok").on("click",function () {
    clickSound.play();
    $(".myTipsDiv").hide();
    $(".canvasContent").hide();
});


storeApi.shareAmount();