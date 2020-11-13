var $ = jQuery.noConflict();
var numeric_regex = /^[0-9]*$/;
$(document).ready(function () {

    var lastPaymentTypeId = $('#lastPaymentTypeId').val();
    var lastPaymentSubTypeId = $('#lastPaymentSubTypeId').val();
    var lastAmount = $('#lastAmount').val();

    var lastpayTypeCode = '';
    if(lastAmount!="" && lastAmount!=undefined)
    {
        if($("[amount="+lastAmount+"]").length > 0)
        {
            $("#amount_10000_div").removeClass("selected");
            $("#amount_5000_div").removeClass("selected");
            $("#amount_2000_div").removeClass("selected");

            $("#amount_1000_div").removeClass("selected");
            $("#amount_500_div").removeClass("selected");
            $("#amount_100_div").removeClass("selected");
            $("#amount_50_div").removeClass("selected");
            $("#amount_other_div").removeClass("selected");
            $(".amount_tab").find("input[type='radio']").iCheck("uncheck");
            $("#amount_"+lastAmount+"_div").addClass("selected");
            $("#amount_"+lastAmount+"_div").iCheck("check");
            // $(".amount_tab").addClass("no_bonus");

            $("#amount_"+lastAmount+"_div").trigger('ifClicked');


        }
        else
        {
            $("#other_amount").val(lastAmount);
            $("#amount_10000_div").removeClass("selected");
            $("#amount_5000_div").removeClass("selected");
            $("#amount_2000_div").removeClass("selected");

            $("#amount_1000_div").removeClass("selected");
            $("#amount_500_div").removeClass("selected");
            $("#amount_100_div").removeClass("selected");
            $("#amount_50_div").removeClass("selected");
            $("#amount_other_div").removeClass("selected");
            $("#amount_other_div").addClass("selected");
            // $(".amount_tab").addClass("no_bonus");

            $(".amount_tab").find("input[type='radio']").iCheck("uncheck");
            $(".amount_tab").removeClass("selected");

            $("#amount_other").iCheck("check");
            $("#amount_other_div").addClass("selected");
        }
    }
    else
    {
        $("#amount_100_div").iCheck("check");
        $("#amount_100_div").addClass("selected");
    }

    $('#other_amount').keypress(function () {
        $(".amount_tab").find("input[type='radio']").iCheck("uncheck");
        $(".amount_tab").removeClass("selected");

        $("#amount_other").iCheck("check");
        $("#amount_other_div").addClass("selected");
        removeToolTipError("other_amount");
    });

    $(document).on("keypress","#other_amount", function(e){
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

    $('#other_amount').blur(function () {
        /*  if($("#amount_other").parent().hasClass("checked")) {
              if($(this).val() == "") {
                  showErrorStrip("Please enter amount.", $(this));
                  return false;
              }

              if(!numeric_regex.test($(this).val())) {
                  showErrorStrip("Amount should be numeric.", $(this));
                  return false;
              }

              if($(this).val() == "" || !( $(this).val() >=50 && $(this).val() <= 10000 ) ) {
                  showErrorStrip("Please enter amount between Rs. 50 to Rs. 10,000.", $(this));
                  return false;
              }

              removeToolTipError(this.id);
          } */
    });

    $('input[name="amount"]').not("#amount_other").on('ifClicked', function (event) {
        $("#other_amount").val("");
        // $("#other_amount").blur();
        $('#others').html('Other Amount');

        removeToolTipError("other_amount");
    });

    $("input[type='radio']").on('ifClicked', function (event) {
        hideErrorStrip();
    });

    $("input[name='bank_logo']").on('ifClicked', function (event) {
        $("select#"+NET_BANKING+"_LIST").val("select");
        $("input[name='bank_logo']").parents("label").removeClass("selected");
        $(this).parents("label").addClass("selected");
    });

    $("select#"+NET_BANKING+"_LIST").on('change', function () {
        $('input[name="bank_logo"]').iCheck('uncheck');
        $("input[name='bank_logo']").parents("label").removeClass("selected");
        hideErrorStrip();
    });

    $("#"+WIRE_TRANS+"_CARD_LIST").on('change', function () {
        if($(this).val() != "select")
            removeToolTipErrorManual("", $("#"+WIRE_TRANS+"_CARD_LIST"));
    });

    $("#"+CASH_CARD+"_CARD_LIST").on('change', function () {
        if($(this).val() != "select")
            removeToolTipErrorManual("", $("#"+CASH_CARD+"_CARD_LIST"));
    });

    $("#confirm_cash_payment_button").click(function () {
        $("[add_cash_button='true']").first().click();
    });

    function resetPaymentOptionsDivs(obj, arg1)
    {
        if(arg1 != 'show_error' && is_show_error == false) {
            hideErrorStrip();
        }


        $(obj).parents('div#cashiertab').find("input[type='radio']").iCheck("uncheck");
        $(obj).parents('div#cashiertab').find("input[type='radio']").parents('label').removeClass('selected');
    }

    $("#cashiertab ul.resp-tabs-list li").not(".resp-tab-active").on("click", function(){
        resetPaymentOptionsDivs($(this));
    });

//wireTrans duplicacy check API
    $("#WIRE_TRANS_REFERENCE_NO").focusout(function ()
    {
        if($("#WIRE_TRANS_REFERENCE_NO").val()!="") {
            var params = 'reffno=' + $("#WIRE_TRANS_REFERENCE_NO").val();
            startAjax("/component/weaver/?task=cashier.checkDuplicate", params, checkDuplicateResponse, '');
        }
    });

    $("#WIRE_TRANS_REFERENCE_NO").keypress(function(e){
        if(e.which == 13){
            $(this).blur();
            return false;
        }
    });

    function checkDuplicateResponse(result)
    {

        if(validateSession(result) == false)
            return false;
        // removeToolTipErrorManual("", $("#WIRE_TRANS_REFERENCE_NO"));
        var res = $.parseJSON(result);
        console.log(res);
        if(res.errorCode != 0) {
            $("#WIRE_TRANS_REFERENCE_NO").val("");
            showToolTipErrorManual("WIRE_TRANS_REFERENCE_NO", res.respMsg, "bottom", $("#WIRE_TRANS_REFERENCE_NO"), undefined);
            return false;
        }
    }

    $(document).on("click", ".resp-accordion", function(){
        resetPaymentOptionsDivs($(this));
    });

    var clickCheck = true;
    $("[add_cash_button='true']").click(function(e) {
        var checked_found = false;
        var checked_found_amount = 0;
        var loop_break_flag = false;
        $(".amount_tab").each(function() {
            if($(this).hasClass("selected")) {
                checked_found = true;

                if(this.id == 'amount_other_div') {
                    if($("#other_amount").val() == "") {
                        showErrorStrip("Please enter amount.", $("#other_amount"));
                        $("#other_amount").focus();
                        loop_break_flag = true;
                        return false;
                    }

                    if(!numeric_regex.test($("#other_amount").val())) {
                        showErrorStrip("Amount should be numeric.", $("#other_amount"));
                        $("#other_amount").focus();
                        loop_break_flag = true;
                        return false;
                    }

                    if($("#other_amount").val() == "" || !( $("#other_amount").val() >=25 && $("#other_amount").val() <= 20000 ) ) {
                        showErrorStrip("Please enter amount between Rs. 25 to Rs. 20,000.", $("#other_amount"));
                        $("#other_amount").focus();
                        loop_break_flag = true;
                        return false;
                    }
                    checked_found_amount = $("#other_amount").val();
                }
                else {
                    checked_found_amount = $(this).attr("amount");
                }
            }
        });

        if(loop_break_flag)
            return false;

        if(checked_found == false ) {
            $("input#amount_other").iCheck("check");
            $("#amount_other_div").addClass("selected");
            showErrorStrip("Please enter amount.");
            $("#other_amount").focus();
            return false;
        }

        var error_found = false;
        var params ='amount='+checked_found_amount+"&hidden_promoCode="+$("#promoCode").val();

        $(".resp-tab-content").each(function () {
            if($(this).hasClass("resp-tab-content-active")) {
                var payTypeCode = $(this).attr('paytypecode');
                var payTypeId = $(this).attr('paytypeid');
                params += "&payTypeCode="+payTypeCode+"&payTypeId="+payTypeId;

                if(payTypeCode == CREDIT_CARD || payTypeCode == DEBIT_CARD) {
                    if($("div[paytypecode='"+payTypeCode+"'][paytypeid='"+payTypeId+"']").find("label.card_tab.selected").length == 0) {
                        var error_str = "";
                        if(payTypeCode == CREDIT_CARD)
                            error_str = "Credit Card";
                        else if(payTypeCode == DEBIT_CARD)
                            error_str = "Debit Card";

                        showErrorStrip("Please select a "+error_str+" from the list");
                        error_found = true;
                        return false;
                    }
                    hideErrorStrip();
                    params += "&subTypeId="+$("div[paytypecode='"+payTypeCode+"'][paytypeid='"+payTypeId+"']").find("label.card_tab.selected").find("input[type='radio']").val();
                }

                if(payTypeCode == PREPAID_WALLET) {
                    if($("div[paytypecode='"+payTypeCode+"'][paytypeid='"+payTypeId+"']").find("label").find("div.checked").length == 0) {
                        showErrorStrip("Please select a Cash Card from the list");
                        error_found = true;
                        return false;
                    }
                    hideErrorStrip();
                    params += "&subTypeId="+$("div[paytypecode='"+payTypeCode+"'][paytypeid='"+payTypeId+"']").find("label").find("div.checked").find("input[type='radio']").val();
                }

                if(payTypeCode == NET_BANKING) {
                    var bank_selected = false;
                    var subTypeId = '';
                    if($("div[paytypecode='"+payTypeCode+"'][paytypeid='"+payTypeId+"']").find("label").find("div.checked").length > 0 || $("select#"+payTypeCode+"_LIST").val() != "select") {
                        bank_selected = true;
                        if($("div[paytypecode='"+payTypeCode+"'][paytypeid='"+payTypeId+"']").find("label").find("div.checked").length > 0) {
                            subTypeId = $("div[paytypecode='"+payTypeCode+"'][paytypeid='"+payTypeId+"']").find("label").find("div.checked").find("input[type='radio']").val();
                        }
                        else {
                            subTypeId = $("select#"+payTypeCode+"_LIST").val();
                        }
                    }

                    if(bank_selected == false) {
                        showErrorStrip("Please select a bank.");
                        error_found = true;
                        return false;
                    }
                    hideErrorStrip();
                    params += "&subTypeId="+subTypeId;
                }

                if(payTypeCode == CHEQUE_TRANS) {
                    var tmp_error_found = false;
                    removeToolTipErrorManual("", $("#"+payTypeCode+"_CHEQUE_NO"));
                    if($("#"+payTypeCode+"_CHEQUE_NO").val() == "") {
                        showToolTipErrorManual(payTypeCode+"_CHEQUE_NO", "Please enter cheque no.", "bottom", $("#"+payTypeCode+"_CHEQUE_NO"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }
                    else if(!numeric_regex.test($("#"+payTypeCode+"_CHEQUE_NO").val())) {
                        showToolTipErrorManual(payTypeCode+"_CHEQUE_NO", "Cheque no. should be numeric", "bottom", $("#"+payTypeCode+"_CHEQUE_NO"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }

                    removeToolTipErrorManual("", $("#"+payTypeCode+"_BANK_NAME"));
                    if($("#"+payTypeCode+"_BANK_NAME").val() == "") {
                        showToolTipErrorManual(payTypeCode+"_BANK_NAME", "Please enter bank name.", "bottom", $("#"+payTypeCode+"_BANK_NAME"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }
                    else if($("#"+payTypeCode+"_BANK_NAME").val() != "" && new RegExp("^[a-zA-Z ]{2,30}[a-zA-Z]{1}$").test($("#"+payTypeCode+"_BANK_NAME").val()) == false) {
                        showToolTipErrorManual(payTypeCode+"_BANK_NAME", "Invalid Bank Name.", "bottom", $("#"+payTypeCode+"_BANK_NAME"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }

                    if(tmp_error_found)
                        return false;
                    params += "&chequeNo="+$("#"+payTypeCode+"_CHEQUE_NO").val()+"&bankName="+$("#"+payTypeCode+"_BANK_NAME").val()+"&chequeDate="+$("#"+payTypeCode+"_CHEQUE_DATE").val();
                }
                if(payTypeCode == WIRE_TRANS) {
                    var tmp_error_found = false;
                    removeToolTipErrorManual("", $("#"+payTypeCode+"_REFERENCE_NO"));
                    if($("#"+payTypeCode+"_REFERENCE_NO").val() == "") {
                        showToolTipErrorManual(payTypeCode+"_REFERENCE_NO", "Please enter reference no.", "bottom", $("#"+payTypeCode+"_REFERENCE_NO"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }
                    else if(!numeric_regex.test($("#"+payTypeCode+"_REFERENCE_NO").val())) {
                        showToolTipErrorManual(payTypeCode+"_REFERENCE_NO", "Reference no. should be numeric", "bottom", $("#"+payTypeCode+"_REFERENCE_NO"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }

                    removeToolTipErrorManual("", $("#"+payTypeCode+"_BANK_NAME"));
                    if($("#"+payTypeCode+"_BANK_NAME").val() == "" || $("#"+payTypeCode+"_BANK_NAME").val() == 'select') {
                        showToolTipErrorManual(payTypeCode+"_BANK_NAME", "Please select an option from the list", "bottom", $("#"+payTypeCode+"_BANK_NAME"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }
                    if(tmp_error_found)
                        return false;
                    params += "&referenceNo="+$("#"+payTypeCode+"_REFERENCE_NO").val()+"&bankName="+$("#"+payTypeCode+"_BANK_NAME").val()+"&date="+$("#"+payTypeCode+"_DATE").val();
                }
                if(payTypeCode == CASH_CARD) {
                    var tmp_error_found = false;
                    removeToolTipErrorManual("", $("#"+payTypeCode+"_CARD_LIST"));
                    if($("#"+payTypeCode+"_CARD_LIST").val() == "" || $("#"+payTypeCode+"_CARD_LIST").val() == 'select') {
                        showToolTipErrorManual(payTypeCode+"_CARD_LIST", "Please select an option from the list", "bottom", $("#"+payTypeCode+"_CARD_LIST"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }

                    removeToolTipErrorManual("", $("#"+payTypeCode+"_PIN_NO"));
                    if($("#"+payTypeCode+"_PIN_NO").val() == "") {
                        showToolTipErrorManual(payTypeCode+"_PIN_NO", "Please enter pin no.", "bottom", $("#"+payTypeCode+"_PIN_NO"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }
                    else if($("#"+payTypeCode+"_PIN_NO").val() != "" && new RegExp("^[0-9]*$").test($("#"+payTypeCode+"_PIN_NO").val()) == false) {
                        showToolTipErrorManual(payTypeCode+"_PIN_NO", "Invalid pin no.", "bottom", $("#"+payTypeCode+"_PIN_NO"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }

                    removeToolTipErrorManual("", $("#"+payTypeCode+"_SERIAL_NO"));
                    if($("#"+payTypeCode+"_SERIAL_NO").val() == "") {
                        showToolTipErrorManual(payTypeCode+"_SERIAL_NO", "Please enter serial no.", "bottom", $("#"+payTypeCode+"_SERIAL_NO"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }
                    else if($("#"+payTypeCode+"_SERIAL_NO").val() != "" && new RegExp("^[0-9]*$").test($("#"+payTypeCode+"_SERIAL_NO").val()) == false) {
                        showToolTipErrorManual(payTypeCode+"_SERIAL_NO", "Invalid serial no.", "bottom", $("#"+payTypeCode+"_SERIAL_NO"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }

                    if(tmp_error_found)
                        return false;
                    params += "&subTypeId="+$("#"+payTypeCode+"_CARD_LIST").val()+"&pinNo="+$("#"+payTypeCode+"_PIN_NO").val()+"&serialNo="+$("#"+payTypeCode+"_SERIAL_NO").val();
                }
                if(payTypeCode == CASH_PAYMENT) {
                    params += "&amount="+$("#"+CASH_PAYMENT+"_AMOUNT").text().trim()+"&requestId="+$("#"+CASH_PAYMENT+"_AMOUNT").attr("request-id").trim();
                }

                if(payTypeCode == MOBILE_WALLET){
                    if($("div[paytypecode='"+payTypeCode+"'][paytypeid='"+payTypeId+"']").find("label").find("div.checked").length == 0) {
                        showErrorStrip("Please select a Mobile Wallet from the list");
                        error_found = true;
                        return false;
                    }
                    hideErrorStrip();
                    params += "&subTypeId="+$("div[paytypecode='"+payTypeCode+"'][paytypeid='"+payTypeId+"']").find("label").find("div.checked").find("input[type='radio']").val();
                }

            }
        });

        if(error_found)
            return false;

        var form_fields = params.split("&");
        for(var i=0; i<form_fields.length; i++) {
            var temp = form_fields[i].split("=");
            $('#payment-request-form').append($('<input>', {
                type: "hidden",
                name: temp[0],
                value: temp[1]
            }));
        }

        if(!clickCheck)
        {
            return false;
        }

        $(this).attr('disabled', 'disabled');
        clickCheck = false;
        document.getElementById("payment-request-form").submit();
    });

    $(document).keypress(function(e) {
        if($("select").is(":focus") ==false && e.which == 13) {
            $("[add_cash_button='true']").first().click();
        }
    });



    if($("#promoCode").val()!='')
    {

        if($("#other_amount").val()!=="")
        {
            otherCalc();
        }

        var inputVal= $("#promoCode").val();
        $.each($('.bonus-addOn'),function (key, val){
            var data=JSON.parse($(this).attr('bonus-data'));
            if(inputVal.toUpperCase()===data.promoCode.toUpperCase()){

                bonusCalc(data);
                $.each($('.amount_tab'),function (key, val) {

                    var amount = parseInt($(this).attr('amount'));
                    if(isNaN(amount))
                    {
                        amount= $('#other_amount').val();
                        amount= parseInt(amount);
                    }
                    if(amount <= data.activityValueMax || amount >= data.activityValueMax) {

                        $("#amount_" + amount + "_div").removeClass("no_bonus");
                        $("#amount_" + amount + "_div").on("ifClicked", function (a) {
                            $("#amount_" + amount + "_div").removeClass("no_bonus");
                        });
                    }

                });
                return false;
            }
            else
            {
                $.each($('.amount_tab'),function (key, val) {

                    var amount = parseInt($(this).attr('amount'));

                    $("#amount_" + amount + "_div").addClass("no_bonus");
                    $("#amount_" + amount + "_div").on("ifClicked", function (a) {
                        $("#amount_" + amount + "_div").addClass("no_bonus");
                    });

                });
                $('#others').html('Other Amount');
            }
        });
    }



    $("#promoCode").focusout(function (e){

        var inputVal= $(this).val();
        $.each($('.bonus-addOn'),function (key, val){
            var data=JSON.parse($(this).attr('bonus-data'));
            if(inputVal.toUpperCase()===data.promoCode.toUpperCase()){

                bonusCalc(data);
                $.each($('.amount_tab'),function (key, val) {

                    var amount = parseInt($(this).attr('amount'));
                    if(isNaN(amount))
                    {
                        amount= $('#other_amount').val();
                        amount= parseInt(amount);
                    }
                    $("#amount_" + amount + "_div").on("ifClicked", function (a) {
                        $("#amount_" + amount + "_div").removeClass("no_bonus");
                    });

                });
                return false;
            }
            else
            {
                var bonusMapVal=$('#bonusMapVal').val();
                $.each($('.amount_tab'),function (key, val) {

                    var amount = parseInt($(this).attr('amount'));
                    if($("#promoCode").val()!=='' && bonusMapVal!=="") {
                        $("#amount_" + amount + "_div").addClass("no_bonus");
                        $("#amount_" + amount + "_div").on("ifClicked", function (a) {
                            $("#amount_" + amount + "_div").addClass("no_bonus");
                        });
                    }
                    else if(bonusMapVal!=="" &&  $("#promoCode").val()===''){
                        defaultBonusVal();
                    }

                });
                $('#others').html('Other Amount');
            }
        });
    });

    $("#other_amount").focusout(function (e){
        otherCalc();
    });



    function otherCalc()
    {
        $.each($('.bonus-addOn'),function (key, val){
            var data=JSON.parse($(this).attr('bonus-data'));
            if($("#promoCode").val()!='' && $("#promoCode").val().toUpperCase() == data.promoCode.toUpperCase())
                bonusCalc(data);

        });
        if($('#other_amount').val()==="")
            $('#others').html('Other Amount');
    }

    $('.bonus-addOn').click(function (e) {

        var data = JSON.parse($(this).attr('bonus-data'));
        console.log(data);
        var code=data.promoCode;

        $(".bonus_details").modal("hide");
        $("#promoCode").val(code);

        bonusCalc(data);
    });

    function defaultBonusVal()
    {
        var bonusMapVal=$('#bonusMapVal').val();
        var bonusMapVal=JSON.parse(bonusMapVal);

        $.each(bonusMapVal, function (key,val) {
            var amount=parseInt(key);
            var bonus="";
            $("#amount_" + amount + "_div").removeClass("no_bonus");
            $("#amount_" + amount + "_div").on("ifClicked", function (a) {
                $("#amount_" + amount + "_div").removeClass("no_bonus");
            });

            if(parseInt(val)=="" &&  $("#promoCode").val()==='')
            {
                $("#amount_" + amount + "_div").addClass("no_bonus");
                $("#amount_" + amount + "_div").on("ifClicked", function (a) {
                    $("#amount_" + amount + "_div").addClass("no_bonus");
                })
            }
            else{
                $('#' + amount + "_amount").html('<span class="rupees-symbol">` </span>' + parseInt(val) + ' Bonus');
            }
        });


    }

    function bonusCalc(data)
    {
        var bonusValue='';

        $.each($('.amount_tab'),function (key, val) {

            var amount = parseInt($(this).attr('amount'));
            if(isNaN(amount))
            {
                amount= $('#other_amount').val();
                amount= parseInt(amount);
            }

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

                $(".selected").removeClass("no_bonus");
                $("#amount_" + amount + "_div").removeClass("no_bonus");
                $("#amount_" + amount + "_div").on("ifClicked", function (a) {
                    $("#amount_" + amount + "_div").removeClass("no_bonus");
                });
                $(this).find('.bonus_strip').html('<span class="rupees-symbol">` </span>'+parseInt(bonusValue)+' Bonus');

            }
            else {
                //No bonus
                if(amount > data.activityValueMax || amount < data.activityValueMax) {
                    $(this).find('.bonus_strip').html('No Bonus');
                    $("#amount_" + amount + "_div").removeClass("no_bonus");

                }
            }

        });
    }


});
/*
$(window).load(function(){
    $( "#amount_10000_div" ).removeClass( "selected" );
    $( "#amount_10000_div > .iradio_square-green" ).removeClass( "checked" );
    $( "#amount_5000_div" ).removeClass( "selected" );
    $( "#amount_5000_div > .iradio_square-green" ).removeClass( "checked" );
    $( "#amount_1000_div" ).removeClass( "selected" );
    $( "#amount_1000_div > .iradio_square-green" ).removeClass( "checked" );
    $( "#amount_500_div" ).removeClass( "selected" );
    $( "#amount_500_div > .iradio_square-green" ).removeClass( "checked" );
    $( "#amount_100_div" ).removeClass( "selected" );
    $( "#amount_100_div > .iradio_square-green" ).removeClass( "checked" );
    $( "#amount_other_div" ).removeClass( "selected" );
    $( "#amount_other_div > .iradio_square-green" ).removeClass( "checked" );
    $( "#amount_500_div" ).addClass( "selected" );
    $( "#amount_500_div" ).find('#amount_500').parent().addClass( "checked" );
}); */

function hideErrorStrip()
{
    $("div.error_strip").removeClass("show_error")
}

function showErrorStrip(errMsg, $element)
{
    $("div.error_strip").find("span").html(errMsg);
    $("div.error_strip").addClass("show_error");
    // $element.focus();
}

function selectPromoCode(code)
{
    $(".bonus_details").modal("hide");
    $("#promoCode").val(code);
}



var $ = jQuery.noConflict();
var numeric_regex = /^[0-9]*$/;
$(document).ready(function () {

    var lastPaymentTypeId = $('#lastPaymentTypeId').val();
    var lastPaymentSubTypeId = $('#lastPaymentSubTypeId').val();
    var lastAmount = $('#lastAmount').val();

    var lastpayTypeCode = '';
    if(lastAmount!="" && lastAmount!=undefined)
    {
        if($("[amount="+lastAmount+"]").length > 0)
        {
            $("#amount_10000_div").removeClass("selected");
            $("#amount_5000_div").removeClass("selected");
            $("#amount_2000_div").removeClass("selected");

            $("#amount_1000_div").removeClass("selected");
            $("#amount_500_div").removeClass("selected");
            $("#amount_100_div").removeClass("selected");
            $("#amount_50_div").removeClass("selected");
            $("#amount_other_div").removeClass("selected");
            $(".amount_tab").find("input[type='radio']").iCheck("uncheck");
            $("#amount_"+lastAmount+"_div").addClass("selected");
            $("#amount_"+lastAmount+"_div").iCheck("check");
            // $(".amount_tab").addClass("no_bonus");

            $("#amount_"+lastAmount+"_div").trigger('ifClicked');


        }
        else
        {
            $("#other_amount").val(lastAmount);
            $("#amount_10000_div").removeClass("selected");
            $("#amount_5000_div").removeClass("selected");
            $("#amount_2000_div").removeClass("selected");

            $("#amount_1000_div").removeClass("selected");
            $("#amount_500_div").removeClass("selected");
            $("#amount_100_div").removeClass("selected");
            $("#amount_50_div").removeClass("selected");
            $("#amount_other_div").removeClass("selected");
            $("#amount_other_div").addClass("selected");
            // $(".amount_tab").addClass("no_bonus");

            $(".amount_tab").find("input[type='radio']").iCheck("uncheck");
            $(".amount_tab").removeClass("selected");

            $("#amount_other").iCheck("check");
            $("#amount_other_div").addClass("selected");
        }
    }
    else
    {
        $("#amount_100_div").iCheck("check");
        $("#amount_100_div").addClass("selected");
    }

    $('#other_amount').keypress(function () {
        $(".amount_tab").find("input[type='radio']").iCheck("uncheck");
        $(".amount_tab").removeClass("selected");

        $("#amount_other").iCheck("check");
        $("#amount_other_div").addClass("selected");
        removeToolTipError("other_amount");
    });

    $(document).on("keypress","#other_amount", function(e){
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

    $('#other_amount').blur(function () {
        /*  if($("#amount_other").parent().hasClass("checked")) {
              if($(this).val() == "") {
                  showErrorStrip("Please enter amount.", $(this));
                  return false;
              }

              if(!numeric_regex.test($(this).val())) {
                  showErrorStrip("Amount should be numeric.", $(this));
                  return false;
              }

              if($(this).val() == "" || !( $(this).val() >=50 && $(this).val() <= 10000 ) ) {
                  showErrorStrip("Please enter amount between Rs. 50 to Rs. 10,000.", $(this));
                  return false;
              }

              removeToolTipError(this.id);
          } */
    });

    $('input[name="amount"]').not("#amount_other").on('ifClicked', function (event) {
        $("#other_amount").val("");
        // $("#other_amount").blur();
        $('#others').html('Other Amount');

        removeToolTipError("other_amount");
    });

    $("input[type='radio']").on('ifClicked', function (event) {
        hideErrorStrip();
    });

    $("input[name='bank_logo']").on('ifClicked', function (event) {
        $("select#"+NET_BANKING+"_LIST").val("select");
        $("input[name='bank_logo']").parents("label").removeClass("selected");
        $(this).parents("label").addClass("selected");
    });

    $("select#"+NET_BANKING+"_LIST").on('change', function () {
        $('input[name="bank_logo"]').iCheck('uncheck');
        $("input[name='bank_logo']").parents("label").removeClass("selected");
        hideErrorStrip();
    });

    $("#"+WIRE_TRANS+"_CARD_LIST").on('change', function () {
        if($(this).val() != "select")
            removeToolTipErrorManual("", $("#"+WIRE_TRANS+"_CARD_LIST"));
    });

    $("#"+CASH_CARD+"_CARD_LIST").on('change', function () {
        if($(this).val() != "select")
            removeToolTipErrorManual("", $("#"+CASH_CARD+"_CARD_LIST"));
    });

    $("#confirm_cash_payment_button").click(function () {
        $("[add_cash_button='true']").first().click();
    });

    function resetPaymentOptionsDivs(obj, arg1)
    {
        if(arg1 != 'show_error' && is_show_error == false) {
            hideErrorStrip();
        }


        $(obj).parents('div#cashiertab').find("input[type='radio']").iCheck("uncheck");
        $(obj).parents('div#cashiertab').find("input[type='radio']").parents('label').removeClass('selected');
    }

    $("#cashiertab ul.resp-tabs-list li").not(".resp-tab-active").on("click", function(event, arg1){

        resetPaymentOptionsDivs($(this), arg1);
    });
    $(document).on("click", ".resp-accordion", function(event, arg1){
        resetPaymentOptionsDivs($(this), arg1);
    });


    $("#WIRE_TRANS_REFERENCE_NO").focusout(function ()
    {
        if($("#WIRE_TRANS_REFERENCE_NO").val()!="") {
            var params = 'reffno=' + $("#WIRE_TRANS_REFERENCE_NO").val();
            startAjax("/component/weaver/?task=cashier.checkDuplicate", params, checkDuplicateResponse, '');
        }
    });

    $("#WIRE_TRANS_REFERENCE_NO").keypress(function(e){
        if(e.which == 13){
            $(this).blur();
            return false;
        }
    });

    function checkDuplicateResponse(result)
    {

        if(validateSession(result) == false)
            return false;
        // removeToolTipErrorManual("", $("#WIRE_TRANS_REFERENCE_NO"));
        var res = $.parseJSON(result);
        console.log(res);
        if(res.errorCode != 0) {
            $("#WIRE_TRANS_REFERENCE_NO").val("");
            showToolTipErrorManual("WIRE_TRANS_REFERENCE_NO", res.respMsg, "bottom", $("#WIRE_TRANS_REFERENCE_NO"), undefined);
            return false;
        }
    }

    var clickCheck = true;
    $("[add_cash_button='true']").click(function(e) {
        var checked_found = false;
        var checked_found_amount = 0;
        var loop_break_flag = false;
        $(".amount_tab").each(function() {
            if($(this).hasClass("selected")) {
                checked_found = true;

                if(this.id == 'amount_other_div') {
                    if($("#other_amount").val() == "") {
                        showErrorStrip("Please enter amount.", $("#other_amount"));
                        $("#other_amount").focus();
                        loop_break_flag = true;
                        return false;
                    }

                    if(!numeric_regex.test($("#other_amount").val())) {
                        showErrorStrip("Amount should be numeric.", $("#other_amount"));
                        $("#other_amount").focus();
                        loop_break_flag = true;
                        return false;
                    }

                    if($("#other_amount").val() == "" || !( $("#other_amount").val() >=1 && $("#other_amount").val() <= 20000 ) ) {
                        showErrorStrip("Please enter amount between Rs. 25 to Rs. 20,000.", $("#other_amount"));
                        $("#other_amount").focus();
                        loop_break_flag = true;
                        return false;
                    }
                    checked_found_amount = $("#other_amount").val();
                }
                else {
                    checked_found_amount = $(this).attr("amount");
                }
            }
        });

        if(loop_break_flag)
            return false;

        if(checked_found == false ) {
            $("input#amount_other").iCheck("check");
            $("#amount_other_div").addClass("selected");
            showErrorStrip("Please enter amount.");
            $("#other_amount").focus();
            return false;
        }

        var error_found = false;
        var params ='amount='+checked_found_amount+"&hidden_promoCode="+$("#promoCode").val();

        $(".resp-tab-content").each(function () {
            if($(this).hasClass("resp-tab-content-active")) {
                var payTypeCode = $(this).attr('paytypecode');
                var payTypeId = $(this).attr('paytypeid');
                params += "&payTypeCode="+payTypeCode+"&payTypeId="+payTypeId;

                if(payTypeCode == CREDIT_CARD || payTypeCode == DEBIT_CARD) {
                    if($("div[paytypecode='"+payTypeCode+"'][paytypeid='"+payTypeId+"']").find("label.card_tab.selected").length == 0) {
                        var error_str = "";
                        if(payTypeCode == CREDIT_CARD)
                            error_str = "Credit Card";
                        else if(payTypeCode == DEBIT_CARD)
                            error_str = "Debit Card";

                        showErrorStrip("Please select a "+error_str+" from the list");
                        error_found = true;
                        return false;
                    }
                    hideErrorStrip();
                    params += "&subTypeId="+$("div[paytypecode='"+payTypeCode+"'][paytypeid='"+payTypeId+"']").find("label.card_tab.selected").find("input[type='radio']").val();
                    params += "&paySubTypeName="+($("div[paytypecode='"+payTypeCode+"'][paytypeid='"+payTypeId+"']").find("label.card_tab.selected").find("input[type='radio']").attr('id')).split('card_')[1];
                }

                if(payTypeCode == PREPAID_WALLET) {
                    if($("div[paytypecode='"+payTypeCode+"'][paytypeid='"+payTypeId+"']").find("label").find("div.checked").length == 0) {
                        showErrorStrip("Please select a Cash Card from the list");
                        error_found = true;
                        return false;
                    }
                    hideErrorStrip();
                    params += "&subTypeId="+$("div[paytypecode='"+payTypeCode+"'][paytypeid='"+payTypeId+"']").find("label").find("div.checked").find("input[type='radio']").val();
                }

                if(payTypeCode == NET_BANKING) {
                    var bank_selected = false;
                    var subTypeId = '';
                    var paySubTypeName = '';
                    if($("div[paytypecode='"+payTypeCode+"'][paytypeid='"+payTypeId+"']").find("label").find("div.checked").length > 0 || $("select#"+payTypeCode+"_LIST").val() != "select") {
                        bank_selected = true;
                        if($("div[paytypecode='"+payTypeCode+"'][paytypeid='"+payTypeId+"']").find("label").find("div.checked").length > 0) {
                            subTypeId = $("div[paytypecode='"+payTypeCode+"'][paytypeid='"+payTypeId+"']").find("label").find("div.checked").find("input[type='radio']").val();
                            paySubTypeName = ($("div[paytypecode='"+payTypeCode+"'][paytypeid='"+payTypeId+"']").find("label").find("div.checked").find("input[type='radio']").attr('id')).split('bank_')[1];
                        }
                        else {
                            subTypeId = $("select#"+payTypeCode+"_LIST").val();
                            paySubTypeName = $("select#"+payTypeCode+"_LIST option:selected").text();
                            paySubTypeName =  paySubTypeName.replace("&",  encodeURIComponent('&'));
                        }
                    }

                    if(bank_selected == false) {
                        showErrorStrip("Please select a bank.");
                        error_found = true;
                        return false;
                    }
                    hideErrorStrip();
                    params += "&subTypeId="+subTypeId;
                    params += "&paySubTypeName="+paySubTypeName;
                }

                if(payTypeCode == CHEQUE_TRANS) {
                    var tmp_error_found = false;
                    removeToolTipErrorManual("", $("#"+payTypeCode+"_CHEQUE_NO"));
                    if($("#"+payTypeCode+"_CHEQUE_NO").val() == "") {
                        showToolTipErrorManual(payTypeCode+"_CHEQUE_NO", "Please enter cheque no.", "bottom", $("#"+payTypeCode+"_CHEQUE_NO"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }
                    else if(!numeric_regex.test($("#"+payTypeCode+"_CHEQUE_NO").val())) {
                        showToolTipErrorManual(payTypeCode+"_CHEQUE_NO", "Cheque no. should be numeric", "bottom", $("#"+payTypeCode+"_CHEQUE_NO"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }

                    removeToolTipErrorManual("", $("#"+payTypeCode+"_BANK_NAME"));
                    if($("#"+payTypeCode+"_BANK_NAME").val() == "") {
                        showToolTipErrorManual(payTypeCode+"_BANK_NAME", "Please enter bank name.", "bottom", $("#"+payTypeCode+"_BANK_NAME"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }
                    else if($("#"+payTypeCode+"_BANK_NAME").val() != "" && new RegExp("^[a-zA-Z ]{2,30}[a-zA-Z]{1}$").test($("#"+payTypeCode+"_BANK_NAME").val()) == false) {
                        showToolTipErrorManual(payTypeCode+"_BANK_NAME", "Invalid Bank Name.", "bottom", $("#"+payTypeCode+"_BANK_NAME"), undefined);
                        error_found = true;
                        tmp_error_found = true;}

                    if(tmp_error_found)
                        return false;
                    params += "&chequeNo="+$("#"+payTypeCode+"_CHEQUE_NO").val()+"&bankName="+$("#"+payTypeCode+"_BANK_NAME").val()+"&chequeDate="+$("#"+payTypeCode+"_CHEQUE_DATE").val();
                }
                if(payTypeCode == WIRE_TRANS) {
                    var tmp_error_found = false;
                    removeToolTipErrorManual("", $("#"+payTypeCode+"_REFERENCE_NO"));
                    if($("#"+payTypeCode+"_REFERENCE_NO").val() == "") {
                        showToolTipErrorManual(payTypeCode+"_REFERENCE_NO", "Please enter reference no.", "bottom", $("#"+payTypeCode+"_REFERENCE_NO"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }
                    else if(!numeric_regex.test($("#"+payTypeCode+"_REFERENCE_NO").val())) {
                        showToolTipErrorManual(payTypeCode+"_REFERENCE_NO", "Reference no. should be numeric", "bottom", $("#"+payTypeCode+"_REFERENCE_NO"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }

                    removeToolTipErrorManual("", $("#"+payTypeCode+"_BANK_NAME"));
                    if($("#"+payTypeCode+"_BANK_NAME").val() == "" || $("#"+payTypeCode+"_BANK_NAME").val() == 'select') {
                        showToolTipErrorManual(payTypeCode+"_BANK_NAME", "Please select an option from the list", "bottom", $("#"+payTypeCode+"_BANK_NAME"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }
                    if(tmp_error_found)
                        return false;
                    params += "&referenceNo="+$("#"+payTypeCode+"_REFERENCE_NO").val()+"&bankName="+$("#"+payTypeCode+"_BANK_NAME").val()+"&date="+$("#"+payTypeCode+"_DATE").val();
                }
                if(payTypeCode == CASH_CARD) {
                    var tmp_error_found = false;
                    removeToolTipErrorManual("", $("#"+payTypeCode+"_CARD_LIST"));
                    if($("#"+payTypeCode+"_CARD_LIST").val() == "" || $("#"+payTypeCode+"_CARD_LIST").val() == 'select') {
                        showToolTipErrorManual(payTypeCode+"_CARD_LIST", "Please select an option from the list", "bottom", $("#"+payTypeCode+"_CARD_LIST"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }

                    removeToolTipErrorManual("", $("#"+payTypeCode+"_PIN_NO"));
                    if($("#"+payTypeCode+"_PIN_NO").val() == "") {
                        showToolTipErrorManual(payTypeCode+"_PIN_NO", "Please enter pin no.", "bottom", $("#"+payTypeCode+"_PIN_NO"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }
                    else if($("#"+payTypeCode+"_PIN_NO").val() != "" && new RegExp("^[0-9]*$").test($("#"+payTypeCode+"_PIN_NO").val()) == false) {
                        showToolTipErrorManual(payTypeCode+"_PIN_NO", "Invalid pin no.", "bottom", $("#"+payTypeCode+"_PIN_NO"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }

                    removeToolTipErrorManual("", $("#"+payTypeCode+"_SERIAL_NO"));
                    if($("#"+payTypeCode+"_SERIAL_NO").val() == "") {
                        showToolTipErrorManual(payTypeCode+"_SERIAL_NO", "Please enter serial no.", "bottom", $("#"+payTypeCode+"_SERIAL_NO"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }
                    else if($("#"+payTypeCode+"_SERIAL_NO").val() != "" && new RegExp("^[0-9]*$").test($("#"+payTypeCode+"_SERIAL_NO").val()) == false) {
                        showToolTipErrorManual(payTypeCode+"_SERIAL_NO", "Invalid serial no.", "bottom", $("#"+payTypeCode+"_SERIAL_NO"), undefined);
                        error_found = true;
                        tmp_error_found = true;
                    }

                    if(tmp_error_found)
                        return false;
                    params += "&subTypeId="+$("#"+payTypeCode+"_CARD_LIST").val()+"&pinNo="+$("#"+payTypeCode+"_PIN_NO").val()+"&serialNo="+$("#"+payTypeCode+"_SERIAL_NO").val();
                }
                if(payTypeCode == CASH_PAYMENT) {
                    params += "&amount="+$("#"+CASH_PAYMENT+"_AMOUNT").text().trim()+"&requestId="+$("#"+CASH_PAYMENT+"_AMOUNT").attr("request-id").trim();
                }

                if(payTypeCode == MOBILE_WALLET){
                    if($("div[paytypecode='"+payTypeCode+"'][paytypeid='"+payTypeId+"']").find("label").find("div.checked").length == 0) {
                        showErrorStrip("Please select a Mobile Wallet from the list");
                        error_found = true;
                        return false;
                    }
                    hideErrorStrip();
                    params += "&subTypeId="+$("div[paytypecode='"+payTypeCode+"'][paytypeid='"+payTypeId+"']").find("label").find("div.checked").find("input[type='radio']").val();
                    params += "&paySubTypeName="+($("div[paytypecode='"+payTypeCode+"'][paytypeid='"+payTypeId+"']").find("label").find("div.checked").find("input[type='radio']").attr('id')).split('card_')[1];
                }
                if(payTypeCode == PAYTM_WALLET){

                    hideErrorStrip();
                    params += "&paySubTypeName=PAYTM";
                }
                if(payTypeCode == FREECHARGE_WALLET){

                    hideErrorStrip();
                    params += "&paySubTypeName=FREECHARGE";
                }
                if(payTypeCode == UPI_PAYMENT){

                    hideErrorStrip();
                    params += "&paySubTypeName=UPI";
                }
            }
        });

        if(error_found)
            return false;

        var form_fields = params.split("&");
        for(var i=0; i<form_fields.length; i++) {
            var temp = form_fields[i].split("=");
            $('#payment-request-form').append($('<input>', {
                type: "hidden",
                name: temp[0],
                value: temp[1]
            }));
        }

        if(!clickCheck)
        {
            return false;
        }

        $(this).attr('disabled', 'disabled');
        clickCheck = false;
        document.getElementById("payment-request-form").submit();
    });

    $(document).keypress(function(e) {
        if($("select").is(":focus") ==false && e.which == 13) {
            $("[add_cash_button='true']").first().click();
        }
    });



    if($("#promoCode").val()!='')
    {

        if($("#other_amount").val()!=="")
        {
            otherCalc();
        }

        var inputVal= $("#promoCode").val();
        $.each($('.bonus-addOn'),function (key, val){
            var data=JSON.parse($(this).attr('bonus-data'));
            if(inputVal.toUpperCase()===data.promoCode.toUpperCase()){

                bonusCalc(data);
                $.each($('.amount_tab'),function (key, val) {

                    var amount = parseInt($(this).attr('amount'));
                    if(isNaN(amount))
                    {
                        amount= $('#other_amount').val();
                        amount= parseInt(amount);
                    }
                    if(amount <= data.activityValueMax || amount >= data.activityValueMax) {

                        $("#amount_" + amount + "_div").removeClass("no_bonus");
                        $("#amount_" + amount + "_div").on("ifClicked", function (a) {
                            $("#amount_" + amount + "_div").removeClass("no_bonus");
                        });
                    }

                });
                return false;
            }
            else
            {
                $.each($('.amount_tab'),function (key, val) {

                    var amount = parseInt($(this).attr('amount'));

                    $("#amount_" + amount + "_div").addClass("no_bonus");
                    $("#amount_" + amount + "_div").on("ifClicked", function (a) {
                        $("#amount_" + amount + "_div").addClass("no_bonus");
                    });

                });
                $('#others').html('Other Amount');
            }
        });
    }



    $("#promoCode").focusout(function (e){

        var inputVal= $(this).val();
        $.each($('.bonus-addOn'),function (key, val){
            var data=JSON.parse($(this).attr('bonus-data'));
            if(inputVal.toUpperCase()===data.promoCode.toUpperCase()){

                bonusCalc(data);
                $.each($('.amount_tab'),function (key, val) {

                    var amount = parseInt($(this).attr('amount'));
                    if(isNaN(amount))
                    {
                        amount= $('#other_amount').val();
                        amount= parseInt(amount);
                    }
                    $("#amount_" + amount + "_div").on("ifClicked", function (a) {
                        $("#amount_" + amount + "_div").removeClass("no_bonus");
                    });

                });
                return false;
            }
            else
            {
                var bonusMapVal=$('#bonusMapVal').val();
                $.each($('.amount_tab'),function (key, val) {

                    var amount = parseInt($(this).attr('amount'));
                    if($("#promoCode").val()!=='' && bonusMapVal!=="") {
                        $("#amount_" + amount + "_div").addClass("no_bonus");
                        $("#amount_" + amount + "_div").on("ifClicked", function (a) {
                            $("#amount_" + amount + "_div").addClass("no_bonus");
                        });
                    }
                    else if(bonusMapVal!=="" &&  $("#promoCode").val()===''){
                        defaultBonusVal();
                    }

                });
                $('#others').html('Other Amount');
            }
        });
    });

    $("#other_amount").focusout(function (e){
        otherCalc();
    });



    function otherCalc()
    {
        $.each($('.bonus-addOn'),function (key, val){
            var data=JSON.parse($(this).attr('bonus-data'));
            if($("#promoCode").val()!='' && $("#promoCode").val().toUpperCase() == data.promoCode.toUpperCase())
                bonusCalc(data);

        });
        if($('#other_amount').val()==="")
            $('#others').html('Other Amount');
    }

    $('.bonus-addOn').click(function (e) {

        var data = JSON.parse($(this).attr('bonus-data'));
        console.log(data);
        var code=data.promoCode;

        $(".bonus_details").modal("hide");
        $("#promoCode").val(code);

        bonusCalc(data);
    });

    function defaultBonusVal()
    {
        var bonusMapVal=$('#bonusMapVal').val();
        var bonusMapVal=JSON.parse(bonusMapVal);

        $.each(bonusMapVal, function (key,val) {
            var amount=parseInt(key);
            var bonus="";
            $("#amount_" + amount + "_div").removeClass("no_bonus");
            $("#amount_" + amount + "_div").on("ifClicked", function (a) {
                $("#amount_" + amount + "_div").removeClass("no_bonus");
            });

            if(parseInt(val)=="" &&  $("#promoCode").val()==='')
            {
                $("#amount_" + amount + "_div").addClass("no_bonus");
                $("#amount_" + amount + "_div").on("ifClicked", function (a) {
                    $("#amount_" + amount + "_div").addClass("no_bonus");
                })
            }
            else{
                $('#' + amount + "_amount").html('<span class="rupees-symbol">` </span>' + parseInt(val) + ' Bonus');
            }
        });


    }

    function bonusCalc(data)
    {
        var bonusValue='';

        $.each($('.amount_tab'),function (key, val) {

            var amount = parseInt($(this).attr('amount'));
            if(isNaN(amount))
            {
                amount= $('#other_amount').val();
                amount= parseInt(amount);
            }

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

                $(".selected").removeClass("no_bonus");
                $("#amount_" + amount + "_div").removeClass("no_bonus");
                $("#amount_" + amount + "_div").on("ifClicked", function (a) {
                    $("#amount_" + amount + "_div").removeClass("no_bonus");
                });
                $(this).find('.bonus_strip').html('<span class="rupees-symbol">` </span>'+parseInt(bonusValue)+' Bonus');

            }
            else {
                //No bonus
                if(amount > data.activityValueMax || amount < data.activityValueMax) {
                    $(this).find('.bonus_strip').html('No Bonus');
                    $("#amount_" + amount + "_div").removeClass("no_bonus");

                }
            }

        });
    }


});
/*
$(window).load(function(){
    $( "#amount_10000_div" ).removeClass( "selected" );
    $( "#amount_10000_div > .iradio_square-green" ).removeClass( "checked" );
    $( "#amount_5000_div" ).removeClass( "selected" );
    $( "#amount_5000_div > .iradio_square-green" ).removeClass( "checked" );
    $( "#amount_1000_div" ).removeClass( "selected" );
    $( "#amount_1000_div > .iradio_square-green" ).removeClass( "checked" );
    $( "#amount_500_div" ).removeClass( "selected" );
    $( "#amount_500_div > .iradio_square-green" ).removeClass( "checked" );
    $( "#amount_100_div" ).removeClass( "selected" );
    $( "#amount_100_div > .iradio_square-green" ).removeClass( "checked" );
    $( "#amount_other_div" ).removeClass( "selected" );
    $( "#amount_other_div > .iradio_square-green" ).removeClass( "checked" );
    $( "#amount_500_div" ).addClass( "selected" );
    $( "#amount_500_div" ).find('#amount_500').parent().addClass( "checked" );
}); */

function hideErrorStrip()
{
    $("div.error_strip").removeClass("show_error")
}

function showErrorStrip(errMsg, $element)
{
    $("div.error_strip").find("span").html(errMsg);
    $("div.error_strip").addClass("show_error");
    // $element.focus();
}

function selectPromoCode(code)
{
    $(".bonus_details").modal("hide");
    $("#promoCode").val(code);
}

//this function is also defined in cashier-select-amount-new.js
function processDepReq(e)
{

    var subTypeId= $(e).data('subtypeid'); // need to define in lower case
    var paySubTypeName=$(e).data('paysubtypename');
    var payTypeId=$(e).data('paytypeid');
    var payTypeCode=$(e).data('paytypecode');

    $('#subTypeId').val(subTypeId);
    $('#paySubTypeName').val(paySubTypeName);
    $('#payTypeId').val(payTypeId);
    $('#payTypeCode').val(payTypeCode);

    document.getElementById("payment-request-form").submit();

}

