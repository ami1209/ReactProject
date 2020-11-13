var $ = jQuery.noConflict();
var min_limit = 200;
var max_limit = 10000;

$(document).ready(function(){
    $.validator.addMethod("onlynum", function(value, element) {
        return this.optional(element) || /^[0-9]*$/.test(value);
    });

    $.validator.addMethod("notGreater", function(value, element) {
        if(value > withdrawabalBalance)
            return false;
        return true;
    });

    $.validator.addMethod('selectoption', function (value) {
        return (value != 'select');
    });

    $("#selectAccount").on("change", function () {
        if(this.options[this.selectedIndex].getAttribute('acc_status') == "NEW") {
            showToolTipErrorManual('selectAccount', "The account you have selected is not approved.", "bottom", $("#selectAccount"), undefined);
            $( "#selectAccount" ).focus();
            return false;
        }
        else {
            removeToolTipErrorManual("", $("selectAccount"));
        }
    });

    if(withdrawabalBalance < max_limit) {
        max_limit = withdrawabalBalance;
    }

    $("#submit-without-add").on('click', function () {
        $("#bank-withdrawal-form").submit();
    });

    $("#submit-with-add").on('click', function () {
        $("#add-new-form").submit();
    });

    $("#cash-withdrawal-form").validate({

        showErrors: function(errorMap, errorList) {
            displayToolTipManual(this, errorMap, errorList, "bottom", undefined);
        },

        rules: {
            cashAmount: {
                required: true,
                number: true,
                notGreater: true,
                range: [min_limit, max_limit]
            }
        },

        messages: {
            cashAmount: {
                required: 'Please enter amount to be withdrawn.',
                number: 'Withdrawable amount should be numeric.',
                notGreater: 'Entered amount should be less than your withdrawable balance.',
                range: "Amount should be between "+min_limit+" to "+max_limit+"."
            }
        },

        submitHandler: function() {
            document.getElementById('cash-withdrawal-form').submit();
            $("#cash-withdrawal-submit-btn").attr('disabled', 'disabled');
        }
    });

    $("#cheque-withdrawal-form").validate({

        showErrors: function(errorMap, errorList) {
            displayToolTipManual(this, errorMap, errorList, "bottom", undefined);
        },

        rules: {
            chequeAmount: {
                required: true,
                number: true,
                notGreater: true,
                range: [min_limit, max_limit]
            }
        },

        messages: {
            chequeAmount: {
                required: 'Please enter amount to be withdrawn.',
                number: 'Withdrawable amount should be numeric.',
                notGreater: 'Entered amount should be less than your withdrawable balance.',
                range: "Amount should be between "+min_limit+" to "+max_limit+"."
            }
        },

        submitHandler: function() {
            document.getElementById('cheque-withdrawal-form').submit();
            $("#cheque-withdrawal-submit-btn").attr('disabled', 'disabled');
        }
    });

    $("#bank-withdrawal-form").validate({

        showErrors: function(errorMap, errorList) {
            displayToolTipManual(this, errorMap, errorList, "bottom", undefined);
        },

        rules: {
            bankAmount: {
                required: true,
                number: true,
                notGreater: true,
                range: [min_limit, max_limit]
            }
        },

        messages: {
            bankAmount: {
                required: 'Please enter amount to be withdrawn.',
                number: 'Withdrawable amount should be numeric.',
                notGreater: 'Entered amount should be less than your withdrawable balance.',
                range: "Amount should be between "+min_limit+" to "+max_limit+"."
            }
        },

        submitHandler: function() {
            var select_tag = document.getElementById('selectAccount');

            if(select_tag == null || $("#add_account").css("display") == "block")
            {
                $("#submit-with-add").trigger('click');
                return false;
            }

            if(select_tag.options[select_tag.selectedIndex].getAttribute('acc_status') == "NEW") {
                showToolTipErrorManual('selectAccount', "The account you have selected is not approved.", "bottom", $("#selectAccount"), undefined);
                $( "#selectAccount" ).focus();
                return false;
            }
            removeToolTipErrorManual("", $("selectAccount"));
            submitWithoutAdd();
            return false;
        }
    });

    if(REDEEMACCOUNTLIST != "1") {
        addRules();
    }

    $("#add-new-form").validate({

        showErrors: function(errorMap, errorList) {
            displayToolTipManual(this, errorMap, errorList, "bottom", undefined);
        },

        rules: {
            accNo: {
                required: true,
                onlynum: true
            },
            retypeAccNo: {
                required: true,
                equalTo: "#accNo"
            },
            bankName: {
                required: true,
                selectoption: true
            },
            branchCity: {
	         required: true,
	         pattern: /^[a-zA-Z- ]*$/
            },
            ifsc: {
                required: true
            }
        },

        messages: {
            accNo: {
                required: "Please enter account number.",
                onlynum: "A/c no. should be numeric."
            },
            retypeAccNo: {
                required: "Please confirm your account number.",
                equalTo: "A/c no. and confirm A/c no. should be same."
            },
            bankName: {
                required: "Please select Bank name.",
                selectoption: "Please select Bank name."
            },
            branchCity: {
                required: "Please enter branch city.",
		pattern: "Invalid branch city"
            },
            ifsc: {
                required: "please enter ifsc code."
            }
        },

        submitHandler: function() {
            if($("#bank-withdrawal-form #bankAmount").val() == "") {
                showToolTipErrorManual("bank-withdrawal-form #bankAmount", "Please enter amount to be withdrawn.", "bottom", $("#bankAmount"), undefined);
                $( "#bank-withdrawal-form #bankAmount" ).focus();
                return false;
            }
            if(isNaN($("#bank-withdrawal-form #bankAmount").val())) {
                showToolTipErrorManual("bank-withdrawal-form #bankAmount", "Withdrawable amount should be numeric.", "bottom", $("#bankAmount"), undefined);
                $( "#bank-withdrawal-form #bankAmount" ).focus();
                return false;
            }
            if($("#bank-withdrawal-form #bankAmount").val() > withdrawabalBalance) {
                showToolTipErrorManual("bank-withdrawal-form #bankAmount", "Entered amount should be less than your withdrawable balance.", "bottom", $("#bankAmount"), undefined);
                $( "#bank-withdrawal-form #bankAmount" ).focus();
                return false;
            }
            if($("#bank-withdrawal-form #bankAmount").val() < min_limit || $("#bank-withdrawal-form #bankAmount").val() > max_limit) {
                showToolTipErrorManual("bank-withdrawal-form #bankAmount", "Amount should be between "+min_limit+" to "+max_limit+".", "bottom", $("#bankAmount"), undefined);
                $( "#bank-withdrawal-form #bankAmount" ).focus();
                return false;
            }

            removeToolTipErrorManual("", $("#bank-withdrawal-form #bankAmount"));

            //var select_tag = document.getElementById('selectAccount');
            //if(select_tag.options[select_tag.selectedIndex].getAttribute('acc_status') == "NEW") {
            //    showToolTipError("selectAccount", "The account you have selected is not approved.", "top");
            //    $( "#selectAccount" ).focus();
            //    return false;
            //}
            //removeToolTipError("selectAccount");

            $('#add-new-form').append($('<input>', {
                type: "hidden",
                name: "isNewRedeemAcc",
                value: "Y"
            }));

            $('#add-new-form').append($('<input>', {
                type: "hidden",
                name: "bankAmount",
                value: $("#bank-withdrawal-form #bankAmount").val()
            }));

            var selected_bank = document.getElementById('bankName');
            $('#add-new-form').append($('<input>', {
                type: "hidden",
                name: "subTypeName",
                value: selected_bank.options[selected_bank.selectedIndex].innerHTML
            }));

            document.getElementById("add-new-form").submit();
            $("#submit-with-add").attr('disabled', 'disabled');
        }
    });

    $('#add-new-btn').click(function() {
        $("#bank-withdrawal-form #selectAccount").val("select");
        $("#selectAccount-div").css("display", "none");
        $('#add_account').css("display", 'block');
        $('#add-new-div').css("display", 'none');
        removeToolTipErrorManual("all");
        removeRules();
    });

    $('#cancel-add').click(function() {
        $("#bank-withdrawal-form #selectAccount").val("select");
        $("#selectAccount-div").css("display", "block");
        $('#add_account').css("display", 'none');
        $('#add-new-div').css("display", 'block');
        addRules();
    });
});

function addRules()
{
    $( "#bank-withdrawal-form #selectAccount" ).rules( "add", {
        required: true,
        selectoption: true,
        messages: {
            required: "please select account",
            selectoption: "Please select account"
        }
    });
}

function removeRules()
{
    $( "#bank-withdrawal-form #selectAccount" ).rules( "remove" );
}

function submitWithoutAdd()
{
    $('#bank-withdrawal-form').append($('<input>', {
        type: "hidden",
        name: "isNewRedeemAcc",
        value: "N"
    }));

    document.getElementById("bank-withdrawal-form").submit();
    $("#submit-without-add").attr('disabled', 'disabled');
}

$(document).keypress(function(e) {
    if(e.which == 13) {
        $(".withdrawal").each(function () {
            if($(this).parent().css('display') == "block") {

                if($(this).attr("paytype") == CASH_PAYMENT) {
                    $("#cash-withdrawal-submit-btn").trigger('click');
                }

                else if($(this).attr("paytype") == CHEQUE_TRANS) {
                    $("#cheque-withdrawal-submit-btn").trigger('click');
                }
                else if($(this).attr("paytype") == BANK_TRANS) {
                    if($("#add_account").css("display")== "none") {
			//$("#bank-withdrawal-form").submit();
                        $("#submit-without-add").trigger('click');
                    }
                    else {
                        $("#submit-with-add").trigger('click');
                    }
                }
            }
        });
    }
});

$(document).ready(function () {
   $(".resp-tabs-list>li").click(function () {
       removeToolTipErrorManual("all");
   });
});
