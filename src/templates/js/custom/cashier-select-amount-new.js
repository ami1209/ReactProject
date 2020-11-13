var $ = jQuery.noConflict();
var minAmount=2;var maxAmount=49000;
//New Cashier Functions
$(document).ready(function () {
    var deviceType=($('#deviceType').length > 0)?$('#deviceType').val():null;
    if(deviceType!="PC")
        location.href = "#chooseAmount";
})
$(window).on('load',function () {
    let loginFrom=($('#loginFrom').length > 0)?$('#loginFrom').val():null;
    if (loginFrom == 'app') {
        setTimeout(hideUnwantedDiv,300);
    }
})

//this function is also defined in cashier-select-amount-new.js
function processDepReq(e)
{
    if(checkAmount()==false){return false;}
    $(e).parent('li').addClass('active');
    var subTypeId= $(e).data('subtypeid'); // need to define in lower case
    var paySubTypeName=$(e).data('paysubtypename');
    var payTypeId=$(e).data('paytypeid');
    var payTypeCode=$(e).data('paytypecode');
    var bonusValue=$('#appliedbonus_hidden').data('bonusvalue');

    var amount=$('#depamount').val();
    if($('#'+amount+"_bonus").length>0)
    var autobonus=$('#'+amount+"_bonus").text();

    if(bonusValue=="" && (autobonus!="" || autobonus!=undefined))
        bonusValue=autobonus;

    $('#subTypeId').val(subTypeId);
    $('#paySubTypeName').val(paySubTypeName);
    $('#payTypeId').val(payTypeId);
    $('#payTypeCode').val(payTypeCode);
    $('#onDepositBonusValue').val(bonusValue);
    addloader();
    document.getElementById("payment-request-form").submit();
    removeloader();

}

//show div according to id. specially done for cashier
function showdiv(id) {
    searchBank(true);
    messageOnOffline();
    if(checkAmount()==false){return false;}
    if(pageNoforCvv==1){id="chooseAmount";pageNobyCvv(0);}
    if(pageNoforCvv==2){id="paymentOptions";pageNobyCvv(0);}
    if(id=='paymentOptions')
    {
        var amount=amountenteredOrselected();
        var playerStatus=($('#playerStatus').val()).toUpperCase();


        var appliedBonus=($('#appliedbonus_selectamount').text()).trim();
        var amount=amountenteredOrselected();
        if(appliedBonus=="")
        {
            if($('#'+amount+"_bonus").length>0)
            var autobonus=$('#'+amount+"_bonus").text();

            if(autobonus!="" && autobonus!=undefined)
                $('#appliedBonus_paymentOptions').html(" + <span class='rupees-symbol'>`</span>"+autobonus+ " Bonus")
        }
    }

    if(id=='chooseAmount')
    {
        var deviceType=$('#deviceType').val();
        if(deviceType=="PC")
            $('#fix_to_top_div-sticky-wrapper').css('height',"50px");
        else
            $('#fix_to_top_div-sticky-wrapper').css('height',"90px");

        //$('#fix_to_top_div-sticky-wrapper').addClass('is-sticky');
    }
    var deviceType=($('#deviceType').length > 0)?$('#deviceType').val():null;
    if(deviceType!="PC")
    location.href="#"+id;

    let loginFrom=($('#loginFrom').length > 0)?$('#loginFrom').val():null;
    if(loginFrom == 'app')
    {
        setTimeout(hideUnwantedDiv,500);
    }
    $('#'+id).show();
}

function hideUnwantedDiv()
{
    var divs=$('body div');
    for(var i=divs.length-1;i>0;i--){if(divs[i].className=="" && divs[i].textContent==""){divs[i].style.display="none";}else{break;}}
}

var callbackid;
//hide div according to id. specially done for cashier
function hidediv(id) {
    searchBank(true);	
    var amount=amountenteredOrselected();
    callbackid=id;
    var playerStatus=($('#playerStatus').val()).toUpperCase();
    var emailVerified=$('#emailVerified').val();
    var phoneVerified=$('#phoneVerified').val();
    if(checkAmount()==false){return false;}
    if((id=="chooseAmount") && (playerStatus=="MINI" || emailVerified!='Y' || phoneVerified!='Y')) {
        checkDepositAmount(amount);

    }else{
        callback(id);
    }


}

function callback(id)
{
    if(id=='cvvcardpay')
        $('#cvv_security_code_div').html('');

    if(id=='juspaycard')
        emptyJuspayCard();

    $('#'+id).hide();
}


//hide modal according to id. specially done for cashier
function hideModal(id) {
    $('#'+id).hide();
}
//show modal according to id. specially done for cashier
function showModal(id) {
    if(id=='more_bonus')
    {
        $('#enter_bonus').val("");
        $('#bonus_error').html("");
    }

    $('#'+id).show();
}

//this is copy from old one
function searchBank(emptySearch) {
    if(emptySearch==true)
        document.getElementById("search").value="";
    var input, filter, ul, li, a, i;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    ul = document.getElementById("bankList");

    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

//function to make cvv div and process it according to card selected
function processCVV(e) {
    if(checkAmount()==false){return false;}
    addloader();
    var cardType= $(e).data('cardtype'); // need to define in lower case
    var cardNumber=$(e).data('cardnumber');
    var cardToken=$(e).data('cardtoken');
    var cardExpYear=$(e).data('cardexpyear');
    var cardExpMonth=$(e).data('cardexpmonth');
    var cardBrand=$(e).data('cardbrand');
    var nameOnCard=$(e).data('nameoncard');
    var paymentTypeId=$(e).data('paymenttypeid');
    var subTypeId=$(e).data('subtypeid');
    var cardIsIn=$(e).data('cardisin');


    $('#cvv_card_name').text(cardType);
    $('#cvv_card_number').text(cardNumber);
    $('#cvv_expire').text(cardExpMonth+"/"+cardExpYear);
    $('#cvv_card_type').removeClass().addClass(cardBrand.toLowerCase());
    $('#cvv_card_token').val(cardToken);
    $('#cvv_card_isin').val(cardIsIn);

    cvvValidation();
    removeloader();
}

//fill amount to entered amount on select of amount provided
function selectAmount(element)
{
    var selected_amount=$(element).val();
    $('.amount_li').removeClass('active');
    $(element).parent('div').parent('li').addClass('active');
    $('#enter_amount_top').val("");
    $('#checkbonus').hide();
    $('#error_amount').text("");
    unselectBonus();
    removeShowBonus();
    fillallamount(selected_amount,true);
}

//entered amount
function enterAmount(amount)
{
    var decimal=amount.indexOf(".");
    if(decimal >0)
    {
        $('#enter_amount_top').val(amount.substring(0,decimal));
        return false;
    }

    if(isNaN(amount)==true)
    {
        $('#enter_amount_top').val("");
        return false;
    }else{
        $('.amount_li').removeClass('active');
    }
    if(amount=="")
    {
        $('.amount_li').each(function(index){if(index==0){$(this).addClass('active')}});
        $('#error_amount').text('');
        $('#checkbonus').hide();
    }
    if(amount==0)
    {
        $('#enter_amount_top').val("");
    }

    removeShowBonus();
    unselectBonus();
    // //first check amount and bonus then use default amount to fill amount
    // var bonusid=$('#hidden_promoCode').val();
    // if(bonusid!="" && amount!="")
    // {
    //     bonusCalc(bonusid);
    // }
    //if entered amount is blank thank set it as default amount
    var appliedbonus=$('#hidden_promoCode').val();
    if(amount!="" && appliedbonus!="")
    {
        $('#checkbonus').show();
    }

    if(amount=="")
        amount=100;//default amount

    $('#error_amount').text("");
    fillallamount(amount,false);

}

// It will check whether amount selected or entered
function amountenteredOrselected()
{
    var enter_amount=$('#enter_amount_top').val();
    var amount="";
    var selected_amount=selectedamount();
    if(enter_amount=="")
        amount=selected_amount;
    else
        amount=enter_amount;

    return amount;
}

//return selected amount
function selectedamount() {
    var amount="";
    $('.amount_li').each(function(){
        if($(this).hasClass('active')==true){
            amount=$(this).find('button').val()
        }
    });
    return amount;

}

//amount validation
function checkAmount()
{
    var selected_amount=$('.amount_li').hasClass('active');
    var enter_amount=$('#enter_amount_top').val();

    if(selected_amount==false && enter_amount=="")
    {
        $('#error_amount').text("Please enter amount");
        return false;
    }else if((enter_amount < minAmount || enter_amount >maxAmount) && selected_amount==false)
    {
        $('#error_amount').text("Please enter amount between Rs. "+minAmount+" to Rs. "+maxAmount+".");
        return false;
    }




}

//amount selected or entered is filled on all required places
function fillallamount(amount,isfilled)
{
    if(amount!="") {

        $('#depamount').val(amount);
        $('#cvv_amount').val(amount);
        $('#newcard_amount').val(amount);
        $('#selectedAmountOnTop').text(amount);
        if(isfilled==true)
        $('#enter_amount_top').val(amount);
    }
}



//check Deposit Amount
function checkDepositAmount(amount) {
    if(amount!="")
    {
        var bonus=$('#hidden_promoCode').val();
        var params="amount="+amount+"&isAjax=true";
        if(bonus!="")
        {
            params+="&bonus="+bonus;
        }
        startAjax("/component/weaver/?task=cashier.checkDepositAmount", params, getCheckDepositAmount);
    }else{
        showerror('error_amount',"Please enter amount between Rs. "+minAmount+" to Rs. "+maxAmount+".");
        return false;
    }
}

//callback function of checkDepositAmount function
function getCheckDepositAmount(result)
{
    addloader();
    if(validateSession(result) == false)
        return false;

    var res = $.parseJSON(result);
    if(res.errorCode != 0) {
        appEvent('addcash', $('#clientType').val());
        return false;
    }
    callback(callbackid);
    removeloader();

}

//remove saved juspay card
function removeCard(card_token) {
    if(card_token!="")
    {
        var params="cardToken="+card_token+"&isAjax=true";
        startAjax("/component/weaver/?task=cashier.deleteCard", params, getRemoveCardresponse);
    }else{
        alert("Please select card");
    }
}

//callback function of removeCard function
function getRemoveCardresponse(result)
{
    if(validateSession(result) == false)
        return false;

    var res = $.parseJSON(result);
    if(res.errorCode != 0) {
        alert("Error Occurred! Please try again");
        return false;
    }else{
        hideModal('remove_card');
        location.reload();
    }

}


function validatePromo(amount,promoCode) {

    if(amount=="" || !(amount >=minAmount && amount <= maxAmount ) )
    {
        showerror('bonus_error',"Please enter amount between Rs. "+minAmount+" to Rs. "+maxAmount+".");
        return false;
    }

    if(promoCode=='')
    {
        showerror('Bonus Code cannot be blank!!','bonus_error');
        return false;
    }
    else
        hideerror('bonus_error');

    var params = "amount="+amount+"&promoCode="+promoCode;
    startAjax("/component/weaver/?task=cashier.validatePromoCode",params,processvalidatePromo);
}

function processvalidatePromo(result)
{
    if(validateSession(result) == false)
        return false;

    var res = $.parseJSON(result);

    if(res.errorCode != 0) {
        showerror('bonus_error',res.respMsg);
        return false;
    }

    hideModal('more_bonus');
    // showsuccessMsq('bonus_error',"Bonus Applied successfully");
}

function showerror(id,error) {
    $('#'+id).html(error);
}

function hideerror(id) {
    $('#'+id).html("");
}

function showsuccessMsq(id,msg) {
    $('#'+id).text(msg);
}

function hidesuccessMsq(id) {
    $('#'+id).text("");
}

//apply bonus
function applyBonus(bonusName,bonusVal) {

    var amount=amountenteredOrselected();
    if(validatePromo(amount,bonusName)==false){return false;}
    if(bonusVal!="" && bonusVal > 0) {
        $('#appliedbonus_hidden').data('bonusname', bonusName);
        $('#appliedbonus_hidden').data('bonusvalue', bonusVal);
        $('#appliedbonus_selectamount').text(bonusName).parent('div').show();
        $('#appliedBonus_paymentOptions').html(" + <span class='rupees-symbol'>`</span>" + bonusVal + " Bonus");
        $('#hidden_promoCode').val(bonusName);
        $('#' + bonusName.toLowerCase()).parents('li').addClass('active');
    }
    var enteramount=$('#enter_amount_top').val();
    if(enteramount!="")
    $('#checkbonus').show();

    if($('#entered_amount_bonus').hasClass('checkautoBonus')==true)
    {
        checkautoBonus(amount);
    }

}

function bonusCalc(bonusid)
{

    var data;
    var bonusValue=0;
    var amount=amountenteredOrselected();

    bonusid=bonusid.toUpperCase();
    bonusid=bonusid.trim();
    if($('#'+bonusid.toLowerCase()).length>0) {
        var bonusVal = $('#' + bonusid.toLowerCase()).attr('bonus-data');
    }else{
        showerror('bonus_error','Please enter valid Bonus');
    }
    if(!bonusid || bonusid=='' || bonusVal==undefined)
    {
        validatePromo(amount,bonusid);
        return false;
    }

    unselectBonus();
    $('#'+bonusid).closest('li').addClass('selected');

    data=JSON.parse(bonusVal);
    if(data.activityValueMin <= amount && amount <= data.activityValueMax)
    {
        if(data.bonusValueType ==='PERCENT')
            bonusValue=(amount*data.bonusValue)/100;
        else if(data.bonusValueType ==='FIXED')
            bonusValue=data.bonusValue;
        if(data.bonusValueType ==='PERCENT' && bonusValue > data.bonusValueMax)
            bonusValue=data.bonusValueMax;

        //cappingValueMax
        var AvailableBonus = data.availableAmount;
        if(AvailableBonus < bonusValue)
            bonusValue = AvailableBonus;
    }
    if(bonusValue==0 && AvailableBonus!=0)
    {

        showerror("bonus_error",'Bonus Code is applicable between <span class="rupee">`</span>'+data.activityValueMin +' to <span class="rupee">`</span>'+data.activityValueMax);
        return false;
    }
    else if(bonusValue==0 && AvailableBonus==0)
    {
        showerror('bonus_error','Bonus usage limit exceeded!');
        return false;
    }else if(amount=="" || !(amount >=minAmount && amount <= maxAmount ) )
    {
        showerror('error_amount',"Please enter amount between Rs. "+minAmount+" to Rs. "+maxAmount+".");
        return false;
    }
    otherAmountsbonusCalc(bonusid);
    applyBonus(data.promoCode,parseInt(bonusValue));

}

function otherAmountsbonusCalc(bonusid)
{

    var data;
    var bonusValue=0;
    var amountArr=$('.amount_li').find('button');
    for (var i=0;i<amountArr.length;i++) {
        amount=amountArr[i].value;
        bonusid = bonusid.toUpperCase();
        bonusid = bonusid.trim();
        if ($('#' + bonusid.toLowerCase()).length > 0) {
            var bonusVal = $('#' + bonusid.toLowerCase()).attr('bonus-data');
        }

        data = JSON.parse(bonusVal);
        if (data.activityValueMin <= amount && amount <= data.activityValueMax) {
            if (data.bonusValueType === 'PERCENT')
                bonusValue = (amount * data.bonusValue) / 100;
            else if (data.bonusValueType === 'FIXED')
                bonusValue = data.bonusValue;
            if (data.bonusValueType === 'PERCENT' && bonusValue > data.bonusValueMax)
                bonusValue = data.bonusValueMax;

            //cappingValueMax
            var AvailableBonus = data.availableAmount;
            if (AvailableBonus < bonusValue)
                bonusValue = AvailableBonus;
        }

        if(bonusValue!="" &&  bonusValue!=undefined && amount >= data.activityValueMin && amount <= data.activityValueMax){
            if($("#"+amount+"_bonus").length>0)
            {
                $("#"+amount+"_bonus").text(bonusValue);
                $("#"+amount+"_bonus").parent('div').show();
            }else{
                var bonushtml='<div class="bonus_strip"><span class="rupee">`</span><span id="'+amount+'_bonus">'+bonusValue+'</span> Bonus</div>';
                $(bonushtml).insertAfter(amountArr[i]);

            }

        }else{
                if($("#"+amount+"_bonus").length>0){
                    $("#"+amount+"_bonus").parent().hide();
                }
        }


    }


}

//replace bonus from everywhere it appends
function unselectBonus() {

    $('.bonus_li').removeClass('active');
    $('#appliedbonus_hidden').data('bonusname',"");
    $('#appliedbonus_hidden').data('bonusvalue',"");
    $('#appliedbonus_selectamount').text("").parent('div').hide();;
    $('#appliedBonus_paymentOptions').html("");
    $('#hidden_promoCode').val("");
    $('#entered_amount_bonus').html("").hide();
    $('#entered_amount_bonus').removeClass('checkautoBonus');
    showAutoBonus();


}

//Empty already entered bonus if any
function emptyEntredBonus()
{
    $('#enter_bonus').val("");
}

function checkautoBonus(amount)
{
    if(amount>0 && amount!="")
    {
        var appliedbonus=$('#hidden_promoCode').val();
        if(appliedbonus!="")
        {
            var bonusValue=$('#appliedbonus_hidden').data('bonusvalue');
            if(bonusValue!="")
            $('#entered_amount_bonus').html("<span class='rupee'>`</span>"+bonusValue+" Bonus").show();
            $('#entered_amount_bonus').addClass('checkautoBonus');
        }
    }else{
        $('#entered_amount_bonus').html("").hide();
        $('#entered_amount_bonus').removeClass('checkautoBonus');
    }
}

function removeShowBonus() {
    $('#entered_amount_bonus').html('').hide();
    $('#entered_amount_bonus').removeClass('checkautoBonus');

}

function  emptyJuspayCard() {
    $('#card_number').value="";
    $('#card_exp_month').value="";
    $('#card_exp_year').value="";
    $('#security_code').value="";
    $('#name_on_card').value="";
    $('.error_div').text('');
    $('.error').removeClass('error');
}


function showAutoBonus() {
    // bonusMap contains autobonus array
    var bonusMapObj=JSON.parse(bonusMap);
    var amountArr=$('.amount_li').find('button');
    for (var i=0;i<amountArr.length;i++) {
        amount = parseInt(amountArr[i].value);
        amountOnjson = amount.toFixed(1);
        bonus=bonusMapObj[amountOnjson];
        if(bonus!="" && bonus>0) {
            $("#" + amount + "_bonus").text(bonus);
            $("#"+amount+"_bonus").parent().show();
        }else {
            $("#" + amount + "_bonus").text("");
            $("#" + amount + "_bonus").parent('div').hide();
        }
    }
}

function removeApplyBonus() {
    $('#checkbonus').hide();
}

function SetCaretAtEnd(elem) {
    var elemLen = elem.value.length;
    // For IE Only
    if (document.selection) {
        // Set focus
        elem.focus();
        // Use IE Ranges
        var oSel = document.selection.createRange();
        // Reset position to 0 & then set at end
        oSel.moveStart('character', -elemLen);
        oSel.moveStart('character', elemLen);
        oSel.moveEnd('character', 0);
        oSel.select();
    }
    else if (elem.selectionStart || elem.selectionStart == '0') {
        // Firefox/Chrome
        elem.selectionStart = elemLen;
        elem.selectionEnd = elemLen;
        elem.focus();
    } // if
}


$(document).ready(function () {
    var elem=document.getElementById('enter_amount_top');
    SetCaretAtEnd(elem);
    // Initial execution if needed

    var deviceType=$('#deviceType').val();
    var clientType=$('#clientType').val();
    if(deviceType!="PC" && clientType!='iOS')
    doOnOrientationChange();
})

function doOnOrientationChange() {

    if(screen.orientation.type === "landscape-primary") {
        //  cc.screen.requestFullScreen();
        $('#orientation_image').css('display','block');
    }
    else
    {
        $('#orientation_image').css('display','none');
    }
}

window.addEventListener('orientationchange', doOnOrientationChange);
window.addEventListener('orientationchange', function() {
    if (window.orientation & 2) {
        $('#orientation_image').css('display','block');
    } else {
        $('#orientation_image').css('display','none');
    }
}, false);

function addloader()
{
    $("#loadingImage").remove();
    $("body").append('<div id="loadingImage"><img src="https://d7hf0c5vwwy8u.cloudfront.net/images/kpr/loading3.gif" /></div>');
    $("#loadingImage").css("display","block");
    $("#loadingImage").focus();
}

function removeloader() {
    $("#loadingImage").remove();
}

var pageNoforCvv=0;
function pageNobyCvv(id) {
    pageNoforCvv=id;
}

window.addEventListener("hashchange", function(e) {
    let deviceType=($('#deviceType').length > 0)?$('#deviceType').val():null;
    let loginFrom=($('#loginFrom').length > 0)?$('#loginFrom').val():null;
    if(e.oldURL != e.newURL && loginFrom!='app' && deviceType!="PC")
    {
        var arrData=[];
        arrData['chooseAmount']=1;
        arrData['paymentOptions']=2;
        arrData['cvvcardpay']=3;
        arrData['deletecards']=4;
        arrData['juspaycard']=5;
        arrData['morebanks']=6;
        arrData['morewallets']=7;
        arrData[1]='chooseAmount';
        arrData[2]='paymentOptions';
        arrData[3]='cvvcardpay';
        arrData[4]='deletecards';
        arrData[5]='juspaycard';
        arrData[6]='morebanks';
        arrData[7]='morewallets';

        var oldhashIndex=e.oldURL.lastIndexOf('#');
        var newhashIndex=e.newURL.lastIndexOf('#');

        var oldId=e.oldURL.substr(oldhashIndex+1);
        var newId=e.newURL.substr(newhashIndex+1);

        if(newhashIndex==-1)
            window.close();

        if(arrData[newId] > arrData[oldId])
        {
            // console.log("forward");
            showdiv(newId);hidediv(oldId);

        }else{
            // console.log("backward");
            if((oldId=="morewallets" || oldId=="morebanks" || oldId=="juspaycard" || oldId=="deletecards" || oldId=="cvvcardpay"))
            {
                showdiv("paymentOptions");hidediv(oldId);
            }else if(oldId=="paymentOptions" && newId=="chooseAmount")
            {
                showdiv(newId);hidediv(oldId);
            }else if(oldId=="cvvcardpay"){

                if(pageNoforCvv==1){
                    showdiv('chooseAmount');hidediv('cvvcardpay');
                }else if(pageNoforCvv==2){
                    showdiv('paymentOptions');hidediv('cvvcardpay');
                }

            }else{
                showdiv(newId);hidediv(oldId);
            }
        }

    }

});

window.mobileBack=function mobileBack() {
    var chooseAmount=$('#chooseAmount').is(':visible');
    var paymentOptions=$('#paymentOptions').is(':visible');
    var cvvcardpay=$('#cvvcardpay').is(':visible');
    var deletecards=$('#deletecards').is(':visible');
    var juspaycard=$('#juspaycard').is(':visible');
    var morebanks=$('#morebanks').is(':visible');
    var morewallets=$('#morewallets').is(':visible');

    if(chooseAmount){
        appEvent('close',$('#clientType').val());
    }else if(paymentOptions){
        showdiv('chooseAmount');hidediv('paymentOptions');
    }else if(cvvcardpay)
    {
        if(pageNoforCvv==1){
            showdiv('chooseAmount');hidediv('cvvcardpay');
        }else if(pageNoforCvv==2){
            showdiv('paymentOptions');hidediv('cvvcardpay');
        }

    }else if(deletecards)
    {
        showdiv('paymentOptions');hidediv('deletecards');
    }else if(juspaycard){
        showdiv('chooseAmount');hidediv('juspaycard');
    }else if(morebanks){
        showdiv('paymentOptions');hidediv('morebanks');
    }else if(morewallets){
        showdiv('paymentOptions');hidediv('morewallets');
    }else{
        appEvent('close',$('#clientType').val());
    }
    return true;
}

function offline() {
    var network=navigator.onLine;
    return network;
}

function messageOnOffline() {
    var network =offline();
    if (!network)
    {
        alert("You are not connected to the internet. Please check your connection.");
        appEvent('close',$('#clientType').val());

    }
}
