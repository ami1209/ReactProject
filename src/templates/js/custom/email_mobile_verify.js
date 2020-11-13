var $ = jQuery.noConflict();
$(document).ready(function() {

    $("#emailVerify-btn").click(function(event) {

        // return false;
        $("#resend-link-show").css("display", "none");
        $("#email_verify").modal("hide");
        sendVerificationCode('/component/weaver/?task=account.sendVerificationCode', "email", "email_verify", "btn");
    });
    $("#emailVerificationModal-resend-link").click(function() {
        $("#resend-link-show").css("display", "none");
        sendVerificationCode('/component/weaver/?task=account.sendVerificationCode', "email", "email_verify", "resend-link", "#resend-link-show");
    });

    $("#mobileVerify-btn").click(function(event) {
        $("#resend-link-show-mobile").css("display", "none");
        $("#mobile_verify").modal("hide");
        sendVerificationCode('/component/weaver/?task=account.sendVerificationCode', "mobile", "mobile_verify", "btn");
    });
    $("#mobileVerificationModal-resend-link").click(function(event) {
        $("#resend-link-show-mobile").css("display", "none");
        $("#err-div").css("display", "none");
        sendVerificationCode('/component/weaver/?task=account.sendVerificationCode', "mobile", "mobile_verify", "resend-link", "#resend-link-show-mobile");
    });
    $("#register_mobileVerificationModal_resend-link").click(function(event) {
        $("#resend-link-show-mobile").css("display", "none");
        $("#err-div").css("display", "none");
        var reg_form_id = reg_form_id_for_response;
        var params = 'userName=' + $("#" + reg_form_id + " #userName").val() + '&reg_password=' + $("#" + reg_form_id + " #reg_password").val() + '&email=' + $("#" + reg_form_id + " #email").val() + '&mobile=' + $("#" + reg_form_id + " #mobile").val() + '&registrationType=' + $("#" + reg_form_id + " #registrationType").val();
        startAjax('/component/weaver/?task=registration.registrationOTP', params, getResponseOtp, "#" + reg_form_id);
    });

    $("#continue-btn").click(function() {
        $("#resend-link-show-mobile").css("display", "none");

        if ($("#otpcode").val() == "") {
            showToolTipErrorManual('otpcode', "Please enter code received on your mobile.", "bottom", $("#otpcode"), undefined);
            return false;
        } else if ($("#otpcode").val().trim().length != 4) {
            showToolTipErrorManual('otpcode', "Code should be of four digits.", "bottom", $("#otpcode"), undefined);
            return false;
        } else if (isNaN($("#otpcode").val())) {
            showToolTipErrorManual('otpcode', "Code should be numeric.", "bottom", $("#otpcode"), undefined);
            return false;
        }

        verifyPlayer('/component/weaver/?task=account.verifyPlayer', $("#otpcode").val());
    });
    $("#register_continue-btn").click(function() {
        $("#resend-link-show-mobile").css("display", "none");

        if ($("#otpcode").val() == "") {
            showToolTipErrorManual('otpcode', "Please enter code received on your mobile.", "bottom", $("#otpcode"), undefined);
            return false;
        } else if ($("#otpcode").val().trim().length != 4) {
            showToolTipErrorManual('otpcode', "Code should be of four digits.", "bottom", $("#otpcode"), undefined);
            return false;
        } else if (isNaN($("#otpcode").val())) {
            showToolTipErrorManual('otpcode', "Code should be numeric.", "bottom", $("#otpcode"), undefined);
            return false;
        }
        var reg_form_id = reg_form_id_for_response;

        var params = 'userName=' + $("#" + reg_form_id + " #userName").val() + '&reg_password=' + $("#" + reg_form_id + " #reg_password").val() + '&email=' + $("#" + reg_form_id + " #email").val() + '&mobile=' + $("#" + reg_form_id + " #mobile").val() + '&registrationType=' + $("#" + reg_form_id + " #registrationType").val();

        if ($("#" + reg_form_id + " #submiturl").val() != undefined)
            params += "&submiturl=" + $("#" + reg_form_id + " #submiturl").val();

        params += "&otpcode=" + $("#otpcode").val();
        reg_form_id_for_response = reg_form_id;
        params += "&otpenable=" + $("#otp_enable").val();
        var utm_data = location.href.split('?');
        params += "&" + utm_data[1];
        startAjax("/component/weaver/?task=registration.playerRegistrationNew", params, getRegistrationOTPResponse, "#" + reg_form_id);

    });

    $('#otpcode').on("keyup", function(e) {
        if (e.keyCode === 13) {
            $("#register_continue-btn").click();
        }
    });

    $('#verify_OTP').on("keyup", function(e) {
        if (e.keyCode === 13) {
            $("#submitOTP").click();
        }
    });

    $("#email_verify").on("hidden.bs.modal", function(e) {
        $("#resend-link-show").css("display", "none");
    });

    $("#register_mobile_verify").on("hidden.bs.modal", function(e) {
        $("#resend-link-show-mobile").css("display", "none");
    });
});

var modal_id = "";
var calFrom = "";
var linkId = '';
function sendVerificationCode(url, verificationField, id, call_from, link_id) {
    modal_id = id;
    calFrom = call_from;
    linkId = link_id;
    var params = "verificationField=" + verificationField.toUpperCase();
    if (verificationField.toUpperCase() == "MOBILE") {
        if ($("#mobile").val().length == 0) {
            showToolTipErrorManual('mobile', "Please enter mobile no.", "bottom", $("#mobile"), undefined);
            return false;
        }
        if ($("#mobile").val().length != 10) {
            showToolTipErrorManual('mobile', "Mobile no. length should be of 10 digits.", "bottom", $("#mobile"), undefined);
            return false;
        }
        if (isNaN($("#mobile").val())) {
            showToolTipErrorManual('mobile', "Mobile no. should be numeric.", "bottom", $("#mobile"), undefined);
            return false;
        }

        var pattern_regex = /^[5-9]{1}[0-9]{9}$/;
        if (pattern_regex.test($("#mobile").val()) == false) {
            showToolTipErrorManual('mobile', "Mobile no. is invalid.", "bottom", $("#mobile"), undefined);
            return false;
        }

        params += "&mobileNo=" + $("#mobile").val();
        $("#modal-mobileNo").html('+91-' + $("#mobile").val());
    } else if (verificationField.toUpperCase() == "EMAIL") {
        if ($("#email").val().length == 0) {
            showToolTipErrorManual('email', "Please enter email Id.", "bottom", $("#email"), undefined);
            return false;
        }
        if ($("#email").val().length < 6 || $("#email").val().length > 50) {
            showToolTipErrorManual('email', "Email Id should be between 6 to 50 characters.", "bottom", $("#email"), undefined);
            return false;
        }

        var pattern_regex = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+){0,1})\.([A-Za-z]{2,})$/;
        if (pattern_regex.test($("#email").val()) == false) {
            showToolTipErrorManual('email', "Email Id. is invalid.", "bottom", $("#email"), undefined);
            return false;
        }

        params += "&emailId=" + $("#email").val();
        //resend work FUTURE
        $("#modalEmail").val($("#email").val());

    }
    startAjax(url, params, getResponse, "null")
}

function processVerifyOTP(otpId, mobEmailId) {
    var otpIdVal = $('#' + otpId).val();
    var mobEmailIdVal = $('#' + mobEmailId).val();
    if (!otpIdVal.match('[0-9]{4}')) {
        showToolTipErrorManual(otpId, "Please enter valid OTP", "bottom", $("#verify_OTP"), undefined);
        return false;
    }
    var params = "verificationCode=" + otpIdVal + "&verificationType=PROFILE&emailId=" + mobEmailIdVal + "&verificationField=email";
    startAjax("/component/weaver/?task=account.verifyPlayer", params, processVerifyOTPResponse);
}

function processVerifyOTPResponse(result) {
    if (validateSession(result) == false)
        return false;
    var res = $.parseJSON(result);
    if (res.errorCode != 0) {
        showToolTipErrorManual('verify_OTP', res.respMsg, "bottom", $("#verify_OTP"), undefined);
        return false;
    }

    $('#email_verify').modal('hide');
    $('#email_div').removeClass('do_verify');
    $('#email_div').addClass('verify');
    $('#email').attr('readonly', 'readonly');

}

function getResponse(result) {
    if (validateSession(result) == false)
        return false;

    var res = JSON.parse(result);
    if (res.errorCode != 0) {
        $('#' + modal_id).modal('hide');
        $('#alert-modal .modal-body .text-center').html(res.respMsg);
        $('#alert-modal').modal('show');
        error_message(res.respMsg, null);
        return false;
    }
    $('#' + modal_id).modal({
        show: true,
        keyboard: false,
        backdrop: "static"
    });
    if (calFrom == 'resend-link') {
        $(linkId).html(res.respMsg);
        $(linkId).css("display", "");
    }

    $('#' + modal_id).modal({
        show: true,
        // keyboard: false,
        // backdrop: 'static'
    });
}

function getResponseOtp(result) {
    modal_id = "register_mobile_verify";
    calFrom = "resend-link";
    linkId = "#resend-link-show-mobile";
    var res = JSON.parse(result);
    if (res.errorCode != 0) {
        $('#' + modal_id).modal('hide');
        error_message(res.respMsg, null);
        return false;
    }
    if (calFrom == 'resend-link') {
        $(linkId).html("OTP has been sent successfully");
        $(linkId).css("display", "");
    }

    $('#' + modal_id).modal({
        show: true,
        // keyboard: false,
        // backdrop: 'static'
    });
}

function verifyPlayer(url, verificationCode) {
    $("#err-div").html('');
    $("#err-div").css('display', 'none');
    var param = "verificationField=mobile&verificationCode=" + verificationCode + "&verificationType=PROFILE";
    startAjax(url, param, getResponseA, "null")
}

function getResponseA(result) {
    if (validateSession(result) == false)
        return false;

    var res = JSON.parse(result);
    if (res.errorCode != 0) {
        showToolTipErrorManual('otpcode', res.respMsg, "bottom", $("#otpcode"), undefined);
        return false;
    }
    $('#' + modal_id).modal('hide');
    $('#mobile_div').removeClass('do_verify');
    $('#mobile_div').addClass('verify');
    $('#mobile').attr('readonly', 'readonly');
}

function getRegistrationOTPResponse(result) {
    var res = $.parseJSON(result);
    if (result == "false") {
        showToolTipErrorManual('otpcode', "Please enter valid code.", "bottom", $("#otpcode"), undefined);
        return false;
    } else {
        if (res.errorCode != 0) {
            var tooltip_placement = 'left';

            if ($("#" + reg_form_id_for_response).attr("validation-style") != 'undefined' && $("#" + reg_form_id_for_response).attr("validation-style") != undefined) {
                tooltip_placement = $("#" + reg_form_id_for_response).attr("validation-style");
            }

            $('#register_mobile_verify').modal('hide');

            if ($("#" + reg_form_id_for_response).attr('tooltip-mode') == "bootstrap") {
                if (res.errorCode == 501) {
                    showToolTipError(reg_form_id_for_response + ' #userName', res.respMsg, tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                } else if (res.errorCode == 422) {
                    showToolTipError(reg_form_id_for_response + ' #refercode', res.respMsg, tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                } else if (res.errorCode == 502) {
                    showToolTipError(reg_form_id_for_response + ' #email', res.respMsg, tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                } else if (res.errorCode == 503) {
                    showToolTipError(reg_form_id_for_response + ' #mobile', res.respMsg, tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                } else if (res.errorCode == 510) {
                    showToolTipError(reg_form_id_for_response + ' #email', "Email already exists.", tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                    showToolTipError(reg_form_id_for_response + ' #mobile', "Mobile already exists.", tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                } else if (res.errorCode == 511) {
                    showToolTipError(reg_form_id_for_response + ' #userName', "Username already exists.", tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                    showToolTipError(reg_form_id_for_response + ' #mobile', "Mobile already exists.", tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                } else if (res.errorCode == 512) {
                    showToolTipError(reg_form_id_for_response + ' #userName', "Username already exists.", tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                    showToolTipError(reg_form_id_for_response + ' #email', "Email already exists.", tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                } else if (res.errorCode == 513) {
                    showToolTipError(reg_form_id_for_response + ' #userName', "Username already exists.", tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                    showToolTipError(reg_form_id_for_response + ' #email', "Email already exists.", tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                    showToolTipError(reg_form_id_for_response + ' #mobile', "Mobile already exists.", tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                } else if (res.errorCode == 610) {
                    showToolTipError(reg_form_id_for_response + ' #email', "Please Enter your Email.", tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                    showToolTipError(reg_form_id_for_response + ' #mobile', "Please Enter your Mobile.", tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                } else if (res.errorCode == 611) {
                    showToolTipError(reg_form_id_for_response + ' #userName', "Please Enter your Username.", tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                    showToolTipError(reg_form_id_for_response + ' #mobile', "Please Enter your Mobile.", tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                } else if (res.errorCode == 612) {
                    showToolTipError(reg_form_id_for_response + ' #userName', "Please Enter your Username.", tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                    showToolTipError(reg_form_id_for_response + ' #email', "Please Enter your Email.", tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                } else if (res.errorCode == 613) {
                    showToolTipError(reg_form_id_for_response + ' #userName', "Please Enter your Username.", tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                    showToolTipError(reg_form_id_for_response + ' #email', "Please Enter your Email.", tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                    showToolTipError(reg_form_id_for_response + ' #mobile', "Please Enter your Mobile.", tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                } else {
                    showToolTipError(reg_form_id_for_response + ' #userName', res.respMsg, tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                }
            } else if ($("#" + reg_form_id_for_response).attr('tooltip-mode') == "manual") {
                if (res.errorCode == 501) {
                    showToolTipErrorManual(reg_form_id_for_response + ' #userName', res.respMsg, tooltip_placement, $("#userName"), error_callback_registration[reg_form_id_for_response]);
                } else if (res.errorCode == 422) {
                    showToolTipError(reg_form_id_for_response + ' #refercode', res.respMsg, tooltip_placement, error_callback_registration[reg_form_id_for_response]);
                } else if (res.errorCode == 502) {
                    showToolTipErrorManual(reg_form_id_for_response + ' #email', res.respMsg, tooltip_placement, $("#email"), error_callback_registration[reg_form_id_for_response]);
                } else if (res.errorCode == 503) {
                    showToolTipErrorManual(reg_form_id_for_response + ' #mobile', res.respMsg, tooltip_placement, $("#mobile"), error_callback_registration[reg_form_id_for_response]);
                } else if (res.errorCode == 510) {
                    showToolTipErrorManual(reg_form_id_for_response + ' #email', "Email already exists.", tooltip_placement, $("#email"), error_callback_registration[reg_form_id_for_response]);
                    showToolTipErrorManual(reg_form_id_for_response + ' #mobile', "Mobile already exists.", tooltip_placement, $("#mobile"), error_callback_registration[reg_form_id_for_response]);
                } else if (res.errorCode == 511) {
                    showToolTipErrorManual(reg_form_id_for_response + ' #userName', "Username already exists.", tooltip_placement, $("#userName"), error_callback_registration[reg_form_id_for_response]);
                    showToolTipErrorManual(reg_form_id_for_response + ' #mobile', "Mobile already exists.", tooltip_placement, $("#mobile"), error_callback_registration[reg_form_id_for_response]);
                } else if (res.errorCode == 512) {
                    showToolTipErrorManual(reg_form_id_for_response + ' #userName', "Username already exists.", tooltip_placement, $("#userName"), error_callback_registration[reg_form_id_for_response]);
                    showToolTipErrorManual(reg_form_id_for_response + ' #email', "Email already exists.", tooltip_placement, $("#email"), error_callback_registration[reg_form_id_for_response]);
                } else if (res.errorCode == 513) {
                    showToolTipErrorManual(reg_form_id_for_response + ' #userName', "Username already exists.", tooltip_placement, $("#userName"), error_callback_registration[reg_form_id_for_response]);
                    showToolTipErrorManual(reg_form_id_for_response + ' #email', "Email already exists.", tooltip_placement, $("#email"), error_callback_registration[reg_form_id_for_response]);
                    showToolTipErrorManual(reg_form_id_for_response + ' #mobile', "Mobile already exists.", tooltip_placement, $("#mobile"), error_callback_registration[reg_form_id_for_response]);
                } else if (res.errorCode == 610) {
                    showToolTipErrorManual(reg_form_id_for_response + ' #email', "Please Enter your Email.", tooltip_placement, $("#email"), error_callback_registration[reg_form_id_for_response]);
                    showToolTipErrorManual(reg_form_id_for_response + ' #mobile', "Please Enter your Mobile.", tooltip_placement, $("#mobile"), error_callback_registration[reg_form_id_for_response]);
                } else if (res.errorCode == 611) {
                    showToolTipErrorManual(reg_form_id_for_response + ' #userName', "Please Enter your Username.", tooltip_placement, $("#userName"), error_callback_registration[reg_form_id_for_response]);
                    showToolTipErrorManual(reg_form_id_for_response + ' #mobile', "Please Enter your Mobile.", tooltip_placement, $("#mobile"), error_callback_registration[reg_form_id_for_response]);
                } else if (res.errorCode == 612) {
                    showToolTipErrorManual(reg_form_id_for_response + ' #userName', "Please Enter your Username.", tooltip_placement, $("#userName"), error_callback_registration[reg_form_id_for_response]);
                    showToolTipErrorManual(reg_form_id_for_response + ' #email', "Please Enter your Email.", tooltip_placement, $("#email"), error_callback_registration[reg_form_id_for_response]);
                } else if (res.errorCode == 613) {
                    showToolTipErrorManual(reg_form_id_for_response + ' #userName', "Please Enter your Username.", tooltip_placement, $("#userName"), error_callback_registration[reg_form_id_for_response]);
                    showToolTipErrorManual(reg_form_id_for_response + ' #email', "Please Enter your Email.", tooltip_placement, $("#email"), error_callback_registration[reg_form_id_for_response]);
                    showToolTipErrorManual(reg_form_id_for_response + ' #mobile', "Please Enter your Mobile.", tooltip_placement, $("#mobile"), error_callback_registration[reg_form_id_for_response]);
                }
                else {
                    showToolTipErrorManual(reg_form_id_for_response + ' #userName', res.respMsg, tooltip_placement, $("#userName"), error_callback_registration[reg_form_id_for_response]);
                }
            }
            return false;
        }
        location.href = res.path;
    }

}


