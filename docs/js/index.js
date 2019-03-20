//全国排名的页码
var getGameRandCurpage = 1;
// 分数详情页面
var getScorePage = 1;
// 是否加载中
var loading = true;
// 是否点击了上传结果按钮
var gameOverBtnLoading = true;
$(".indexContent .gameDescriptionBtn").on("click",function () {
    $(".gameDescriptionDiv").show();
    $("#curtain").show();
    clickSound.play();
    fiboSDK.btnClick("gameDescriptionBtn","用户查看游戏说明");
});
$(".indexContent .myPrizesBtn").on("click",function () {
    clickSound.play();
    indexApi.getPrize();
    fiboSDK.btnClick("myPrizesBtn","用户查看奖品");
});
$(".indexContent .nationalRankingsBtn").on("click",function () {
    $("#myloading").show();
    $(".nationalRankingsDiv").show();
    $("#curtain").show();
    getGameRandCurpage = 1;
    $(".nationalRankingsDiv ul").empty();
    indexApi.getRank({"page":getGameRandCurpage});
    clickSound.play();
    fiboSDK.btnClick("NationalRankingsBtn","用户查看全国排名");
});

// 游戏说明
$(".gameDescriptionDiv .borderClose").on("click",function () {
    $(".gameDescriptionDiv").hide();
    $("#curtain").hide();
    clickSound.play();
});
$(".gameDescriptionDiv .borderIsok").on("click",function () {
    $(".gameDescriptionDiv").hide();
    $("#curtain").hide();
    clickSound.play();
});
$(".gameDescriptionDiv .descriptionBtn").on("click",function () {
    $(".gameDescriptionContent").show();
    $(".gamePrizeContent").hide();
    clickSound.play();
});
$(".gameDescriptionDiv .prizeBtn").on("click",function () {
    $(".gamePrizeContent").show();
    $(".gameDescriptionContent").hide();
    clickSound.play();
});

//全国排名
$(".nationalRankingsDiv .borderClose").on("click",function () {
    $(".nationalRankingsDiv").hide();
    $("#curtain").hide();
    clickSound.play();
});
$(".nationalRankingsDiv .myScoreBtn").on("click",function () {
    $("#myloading").show();
    $(".nationalRankingsDiv").hide();
    $(".myScoreDiv").show();
    getScorePage = 1;
    $(".myScoreDiv ul").empty();
    indexApi.getScoreDetail({page:getScorePage})
    clickSound.play();
    fiboSDK.btnClick("myScoreBtn","用户查看分数详情");
});
//监听全国列表的滚动条
$(".nationalRankingsDiv ul").scroll(function() {
    console.log($(".nationalRankingsDiv ul").scrollTop())
    console.log($(".nationalRankingsDiv ul")[0].scrollHeight)
    console.log($(".nationalRankingsDiv ul").height())
    if($(".nationalRankingsDiv ul").scrollTop() > ($(".nationalRankingsDiv ul")[0].scrollHeight - $(".nationalRankingsDiv ul").height() - 200)){
        if(!loading){
            loading = true;
            getGameRandCurpage +=1;
            indexApi.getRank({"page":getGameRandCurpage});
        }
    }
});

//分数详情
$(".myScoreDiv .borderClose").on("click",function () {
    $(".myScoreDiv").hide();
    $("#curtain").hide();
    clickSound.play();
});
$(".myScoreDiv .borderIsok").on("click",function () {
    $(".myScoreDiv").hide();
    $("#curtain").hide();
    clickSound.play();
});
//监听分数详情列表的滚动条
$(".myScoreDiv ul").scroll(function() {
    if($(".myScoreDiv ul").scrollTop() > ($(".myScoreDiv ul")[0].scrollHeight - $(".myScoreDiv ul").height() - 200)){
        if(!loading){
            loading = true;
            getScorePage +=1;
            indexApi.getScoreDetail({page:getScorePage})
        }
    }
});

//手机号确认
$(".setPhoneDiv .borderClose").on("click",function () {
    $(".setPhoneDiv").hide();
    $("#curtain").hide();
    clickSound.play();
});
$(".setPhoneDiv .borderIsok").on("click",function () {
    var phoneNb = $(".setPhoneDiv .phoneNb").val();
    if(!phoneNb.match(/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[0-9]{1}))+\d{8})$/)){
        $(".setPhoneDiv .phoneNb").val("");
        setMyTips("电话号码错误，请重新输入")
    }else {
        indexApi.registMember({phone: phoneNb})
    }
    clickSound.play();
});

//我的奖品
$(".myPrizesDiv .borderClose").on("click",function () {
    $(".myPrizesDiv").hide();
    $("#curtain").hide();
    clickSound.play();
});
$(".myPrizesDiv .borderIsok").on("click",function () {
    $(".myPrizesDiv").hide();
    $("#curtain").hide();
    clickSound.play();
});
$(".myPrizesDiv .borderIsok1").on("click",function () {
    clickSound.play();
    $(".myPrizesDiv .borderClose").click();
    indexApi.getQrcode();
    fiboSDK.btnClick("seeQrcode","用户查看奖品二维码");
});
//领奖二维码
$(".prizesQRcodeDiv .borderClose").on("click",function () {
    $(".prizesQRcodeDiv").hide();
    $("#curtain").hide();
    clickSound.play();
});

//填写收货信息
$(".setAddressDiv .borderClose").on("click",function () {
    $(".setAddressDiv").hide();
    $("#curtain").hide();
    clickSound.play();
});
$(".setAddressDiv .borderIsok").on("click",function () {
    clickSound.play();
    if($(".setAddressDiv .userName").val() === " " || $(".setAddressDiv .userName").val() === ""){
        setMyTips("联系人姓名不能为空");
        return;
    }
    var phoneNb = $(".setAddressDiv .phoneNb").val();
    if(!phoneNb.match(/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[0-9]{1}))+\d{8})$/)){
        $(".setAddressDiv .phoneNb").val("");
        setMyTips("电话号码错误，请重新输入");
        return;
    }
    if($(".setAddressDiv .userAddress").val() === " " || $(".setAddressDiv .userAddress").val() === ""){
        setMyTips("地址不能为空");
        return;
    }
    indexApi.addAddress({phone:phoneNb, address: $(".setAddressDiv .userAddress").val(), name: $(".setAddressDiv .userName").val()})
});

//活动结束
$(".activityOverDiv .borderClose").on("click",function () {
    $(".activityOverDiv").hide();
    $("#curtain").hide();
    clickSound.play();
});
$(".activityOverDiv .borderIsok").on("click",function () {
    $(".activityOverDiv").hide();
    $("#curtain").hide();
    clickSound.play();
    // Q.stageScene("level");
    try {
        bgmSound.play();
        gameOverSound.play();
        gameOverSound.stop();
        addScoreSound.play();
        addScoreSound.stop();
        diceSound.play();
        diceSound.stop();
        luckDrawSound.play();
        luckDrawSound.stop();
    }catch (e) {
        console.log(e)
    }
    playerIndex = 0;
    fiboSDK.btnClick("startGameBtn","开始游戏");
    $("#quintus_container").show();
    $(".bodyBg").hide();
});

//游戏结束
$(".gameOverDiv .borderClose").on("click",function () {
    if(gameOverBtnLoading){
        gameOverBtnLoading = false
        indexApi.complete();
        clickSound.play();
    }
});
$(".gameOverDiv .borderIsok").on("click",function () {
    if(gameOverBtnLoading){
        gameOverBtnLoading = false
        indexApi.complete();
        clickSound.play();
    }
});

//这个小时没机会了
$(".noChanceDiv .borderClose").on("click",function () {
    bgmSound.stop();
    $("#quintus_container").hide();
    $(".canvasContent").hide();
    $(".noChanceDiv").hide();
    $(".bodyBg").show();
    clickSound.play();
});
$(".noChanceDiv .borderIsok").on("click",function () {
    bgmSound.stop();
    $("#quintus_container").hide();
    $(".canvasContent").hide();
    $(".noChanceDiv").hide();
    $(".bodyBg").show();
    clickSound.play();

});
//第一次游戏
$(".oneGameDiv .borderClose").on("click",function () {
    $(".oneGameDiv").hide();
    $("#curtain").hide();
    clickSound.play();
});
$(".oneGameDiv .borderIsok").on("click",function () {
    $(".oneGameDiv").hide();
    $("#curtain").hide();
    clickSound.play();
    starGame();
});



//温馨提示
$("#myTipsDiv .borderClose").on("click",function () {
    $(".myTipsDiv").hide();
    $(".canvasContent").hide();
    clickSound.play();
});
$("#myTipsDiv .borderIsok").on("click",function () {
    $(".myTipsDiv").hide();
    $(".canvasContent").hide();
    clickSound.play();
});
// 游戏23:00~7:00分数不统计温馨提示
$("#myTipsDiv1 .borderClose").on("click",function () {
    $("#myTipsDiv1").hide();
    $("#curtain").hide();
    clickSound.play();
});
$("#myTipsDiv1 .borderIsok").on("click",function () {
    $("#myTipsDiv1").hide();
    $("#curtain").hide();
    clickSound.play();
    // Q.stageScene("level");
    try {
        bgmSound.play();
        gameOverSound.play();
        gameOverSound.stop();
        addScoreSound.play();
        addScoreSound.stop();
        diceSound.play();
        diceSound.stop();
        luckDrawSound.play();
        luckDrawSound.stop();
    }catch (e) {
        console.log(e)
    }
    playerIndex = 0;
    fiboSDK.btnClick("startGameBtn","开始游戏");
    $("#quintus_container").show();
    $(".bodyBg").hide();
});
// 奖品界面
$(".winningPrizeDiv .borderClose").on("click",function () {
    clickSound.play();
    $(".winningPrizeDiv").hide();
    $(".canvasContent").hide();
    setResult(gameResult.score);
});
$(".winningPrizeDiv .borderIsok").on("click",function () {
    $(".winningPrizeDiv").hide();
    $(".canvasContent").hide();
    clickSound.play();
    setResult(gameResult.score);
});
