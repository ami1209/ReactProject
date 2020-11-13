$(document).ready(function() {
    $.validator.addMethod("selectoption", function(r) {
        return "select" != r
    }), $.validator.addMethod("exactlength", function(r, e, o) {
        return this.optional(e) || r.length == o
    }, "Please enter exactly {0} characters."), $.validator.addMethod("onlynum", function(r, e) {
        return this.optional(e) || /^[0-9]*$/.test(r)
    }),
        $.validator.addMethod("notEqual", function(r, e, o) {
            return this.optional(e) || r.toLowerCase() !== ($(o).val()).toLowerCase();
        });
});

function sendPartialRegistrationCall() {
    var r = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        e = /^[5-9]{1}[0-9]{9}$/;
    $($("form[id^='registration-form']")).each(function() {
        var o = $(this).attr("id");
        if (r.test($("#" + o + " #email").val()) || e.test($("#" + o + " #mobile").val())) {
            var s = "userName=" + $("#" + o + " #userName").val() + "&email=" + $("#" + o + " #email").val() + "&mobile=" + $("#" + o + " #mobile").val() + "&registrationType=PARTIAL";
            startAjax("/component/weaver/?task=registration.partialRegistration", s, noFunction, "#registration-form-1")
        }
    })
}

function getRegistrationResponse(r) {
    if (0 == validateSession(r)) return !1;
    var e = $.parseJSON(r);
    if (0 != e.errorCode) {
        $("#" + reg_form_id_for_response + " [type=submit]").removeClass("in-progress"), $("#" + reg_form_id_for_response + " #submit-btn").removeAttr("disabled"), $("#" + reg_form_id_for_response + " [type=submit]").removeAttr("disabled");
        var o = "left";
        return "undefined" != $("#" + reg_form_id_for_response).attr("validation-style") && null != $("#" + reg_form_id_for_response).attr("validation-style") && (o = $("#" + reg_form_id_for_response).attr("validation-style")),
        "bootstrap" == $("#" + reg_form_id_for_response).attr("tooltip-mode") ? 501 == e.errorCode ? showToolTipError(reg_form_id_for_response + " #userName", e.respMsg, o, error_callback_registration[reg_form_id_for_response]) : 422 == e.errorCode ? showToolTipError(reg_form_id_for_response + " #refercode", e.respMsg, o, error_callback_registration[reg_form_id_for_response]) : 502 == e.errorCode ? (showToolTipError(reg_form_id_for_response + " #email", e.respMsg, o, error_callback_registration[reg_form_id_for_response]),
        showToolTipError(reg_form_id_for_response + " #userInfo", e.respMsg, o, error_callback_registration[reg_form_id_for_response])) : 503 == e.errorCode ? (showToolTipError(reg_form_id_for_response + " #mobile", e.respMsg, o, error_callback_registration[reg_form_id_for_response]),
        showToolTipError(reg_form_id_for_response + " #userInfo", e.respMsg, o, error_callback_registration[reg_form_id_for_response])) : 510 == e.errorCode ? (showToolTipError(reg_form_id_for_response + " #email", "Email already exists.", o, error_callback_registration[reg_form_id_for_response]),
        showToolTipError(reg_form_id_for_response + " #mobile", "Mobile already exists.", o, error_callback_registration[reg_form_id_for_response]),
        showToolTipError(reg_form_id_for_response + " #userInfo", "Email already exists.", o, error_callback_registration[reg_form_id_for_response])) : 511 == e.errorCode ? (showToolTipError(reg_form_id_for_response + " #userName", "Username already exists.", o, error_callback_registration[reg_form_id_for_response]),
        showToolTipError(reg_form_id_for_response + " #mobile", "Mobile already exists.", o, error_callback_registration[reg_form_id_for_response])) : 512 == e.errorCode ? (showToolTipError(reg_form_id_for_response + " #userName", "Username already exists.", o, error_callback_registration[reg_form_id_for_response]),
        showToolTipError(reg_form_id_for_response + " #email", "Email already exists.", o, error_callback_registration[reg_form_id_for_response])) : 513 == e.errorCode ? (showToolTipError(reg_form_id_for_response + " #userName", "Username already exists.", o, error_callback_registration[reg_form_id_for_response]),
        showToolTipError(reg_form_id_for_response + " #email", "Email already exists.", o, error_callback_registration[reg_form_id_for_response]),
        showToolTipError(reg_form_id_for_response + " #mobile", "Mobile already exists.", o, error_callback_registration[reg_form_id_for_response])) : 610 == e.errorCode ? (showToolTipError(reg_form_id_for_response + " #email", "Please Enter your Email.", o, error_callback_registration[reg_form_id_for_response]),
        showToolTipError(reg_form_id_for_response + " #mobile", "Please Enter your Mobile.", o, error_callback_registration[reg_form_id_for_response])) : 611 == e.errorCode ? (showToolTipError(reg_form_id_for_response + " #userName", "Please Enter your Username.", o, error_callback_registration[reg_form_id_for_response]),
        showToolTipError(reg_form_id_for_response + " #mobile", "Please Enter your Mobile.", o, error_callback_registration[reg_form_id_for_response])) : 612 == e.errorCode ? (showToolTipError(reg_form_id_for_response + " #userName", "Please Enter your Username.", o, error_callback_registration[reg_form_id_for_response]),
        showToolTipError(reg_form_id_for_response + " #email", "Please Enter your Email.", o, error_callback_registration[reg_form_id_for_response])) : 613 == e.errorCode ? (showToolTipError(reg_form_id_for_response + " #userName", "Please Enter your Username.", o, error_callback_registration[reg_form_id_for_response]),
        showToolTipError(reg_form_id_for_response + " #email", "Please Enter your Email.", o, error_callback_registration[reg_form_id_for_response]),
        showToolTipError(reg_form_id_for_response + " #mobile", "Please Enter your Mobile.", o, error_callback_registration[reg_form_id_for_response])) : showToolTipError(reg_form_id_for_response + " #userName", e.respMsg, o, error_callback_registration[reg_form_id_for_response]) : "manual" == $("#" + reg_form_id_for_response).attr("tooltip-mode") && (501 == e.errorCode ? showToolTipErrorManual(reg_form_id_for_response + " #userName", e.respMsg, o, $("#userName"), error_callback_registration[reg_form_id_for_response]) : 422 == e.errorCode ? showToolTipError(reg_form_id_for_response + " #refercode", e.respMsg, o, error_callback_registration[reg_form_id_for_response]) : 502 == e.errorCode ? (showToolTipErrorManual(reg_form_id_for_response + " #email", e.respMsg, o, $("#email"), error_callback_registration[reg_form_id_for_response]),
        showToolTipErrorManual(reg_form_id_for_response + " #userInfo", e.respMsg, o, $("#email"), error_callback_registration[reg_form_id_for_response])) : 503 == e.errorCode ? (showToolTipErrorManual(reg_form_id_for_response + " #mobile", e.respMsg, o, $("#mobile"), error_callback_registration[reg_form_id_for_response]),
        showToolTipErrorManual(reg_form_id_for_response + " #userInfo", e.respMsg, o, $("#mobile"), error_callback_registration[reg_form_id_for_response])) : 510 == e.errorCode ? (showToolTipErrorManual(reg_form_id_for_response + " #email", "Email already exists.", o, $("#email"), error_callback_registration[reg_form_id_for_response]),
        showToolTipErrorManual(reg_form_id_for_response + " #mobile", "Mobile already exists.", o, $("#mobile"), error_callback_registration[reg_form_id_for_response]),
        showToolTipErrorManual(reg_form_id_for_response + " #userInfo", "Mobile already exists.", o, $("#mobile"), error_callback_registration[reg_form_id_for_response]),
        showToolTipErrorManual(reg_form_id_for_response + " #userInfo", "Email Id already exists.", o, $("#mobile"), error_callback_registration[reg_form_id_for_response])) : 511 == e.errorCode ? (showToolTipErrorManual(reg_form_id_for_response + " #userName", "Username already exists.", o, $("#userName"), error_callback_registration[reg_form_id_for_response]),
        showToolTipErrorManual(reg_form_id_for_response + " #mobile", "Mobile already exists.", o, $("#mobile"), error_callback_registration[reg_form_id_for_response])) : 512 == e.errorCode ? (showToolTipErrorManual(reg_form_id_for_response + " #userName", "Username already exists.", o, $("#userName"), error_callback_registration[reg_form_id_for_response]),
        showToolTipErrorManual(reg_form_id_for_response + " #email", "Email already exists.", o, $("#email"), error_callback_registration[reg_form_id_for_response])) : 513 == e.errorCode ? (showToolTipErrorManual(reg_form_id_for_response + " #userName", "Username already exists.", o, $("#userName"), error_callback_registration[reg_form_id_for_response]),
        showToolTipErrorManual(reg_form_id_for_response + " #email", "Email already exists.", o, $("#email"), error_callback_registration[reg_form_id_for_response]),
        showToolTipErrorManual(reg_form_id_for_response + " #mobile", "Mobile already exists.", o, $("#mobile"), error_callback_registration[reg_form_id_for_response])) : 610 == e.errorCode ? (showToolTipErrorManual(reg_form_id_for_response + " #email", "Please Enter your Email.", o, $("#email"), error_callback_registration[reg_form_id_for_response]),
        showToolTipErrorManual(reg_form_id_for_response + " #mobile", "Please Enter your Mobile.", o, $("#mobile"), error_callback_registration[reg_form_id_for_response])) : 611 == e.errorCode ? (showToolTipErrorManual(reg_form_id_for_response + " #userName", "Please Enter your Username.", o, $("#userName"), error_callback_registration[reg_form_id_for_response]),
        showToolTipErrorManual(reg_form_id_for_response + " #mobile", "Please Enter your Mobile.", o, $("#mobile"), error_callback_registration[reg_form_id_for_response])) : 612 == e.errorCode ? (showToolTipErrorManual(reg_form_id_for_response + " #userName", "Please Enter your Username.", o, $("#userName"), error_callback_registration[reg_form_id_for_response]),
        showToolTipErrorManual(reg_form_id_for_response + " #email", "Please Enter your Email.", o, $("#email"), error_callback_registration[reg_form_id_for_response])) : 613 == e.errorCode ? (showToolTipErrorManual(reg_form_id_for_response + " #userName", "Please Enter your Username.", o, $("#userName"), error_callback_registration[reg_form_id_for_response]),
        showToolTipErrorManual(reg_form_id_for_response + " #email", "Please Enter your Email.", o, $("#email"), error_callback_registration[reg_form_id_for_response]),
        showToolTipErrorManual(reg_form_id_for_response + " #mobile", "Please Enter your Mobile.", o, $("#mobile"), error_callback_registration[reg_form_id_for_response])) : showToolTipErrorManual(reg_form_id_for_response + " #userName", e.respMsg, o, $("#userName"), error_callback_registration[reg_form_id_for_response])),
        !1
    }
       "add_cash" == $("#" + reg_form_id_for_response).attr("from-title") && (document.cookie = "launchCashierAfterRegister=true"), "play_rummy" == $("#" + reg_form_id_for_response).attr("from-title") && (document.cookie = "launchRummyAfterRegister=true"), "open_raf" == $("#" + reg_form_id_for_response).attr("from-title") && (document.cookie = "launchReferAFriendAfterRegister=true") ? location.href = e.path : location.href = e.path
}

function reg_inputGroupElement(r, e, o) {
    "error" == o ? e.parents(".input-group").length > 0 && e.parents(".input-group").addClass("error") : "success" == o && e.parents(".input-group").length > 0 && e.parents(".input-group").removeClass("error")
}
var $ = jQuery.noConflict(),
    error_callback_registration = {};

var reg_form_id_for_response = "";

function getOtpResponse(r) {
    if (0 == validateSession(r)) return !1;
    var e = $.parseJSON(r);
    if (0 != e.errorCode) {
        $("#" + reg_form_id_for_response + " #submit-btn").removeAttr("disabled"), $("#" + reg_form_id_for_response + " [type=submit]").removeAttr("disabled");
        var o = "left";
        return "undefined" != $("#" + reg_form_id_for_response).attr("validation-style") && void 0 != $("#" + reg_form_id_for_response).attr("validation-style") && (o = $("#" + reg_form_id_for_response).attr("validation-style")),
	 "bootstrap" == $("#" + reg_form_id_for_response).attr("tooltip-mode") ? 501 == e.errorCode ? showToolTipError(reg_form_id_for_response + " #userName", e.errorMsg, o, error_callback_registration[reg_form_id_for_response]) : 422 == e.errorCode ? showToolTipError(reg_form_id_for_response + " #refercode", e.errorMsg, o, error_callback_registration[reg_form_id_for_response]) : 502 == e.errorCode ? showToolTipError(reg_form_id_for_response + " #email", e.errorMsg, o, error_callback_registration[reg_form_id_for_response]) : 503 == e.errorCode ? showToolTipError(reg_form_id_for_response + " #mobile", e.errorMsg, o, error_callback_registration[reg_form_id_for_response]) : 510 == e.errorCode ? (showToolTipError(reg_form_id_for_response + " #email", "Email already exists.", o, error_callback_registration[reg_form_id_for_response]),
showToolTipError(reg_form_id_for_response + " #userInfo", "Mobile / Email already exists.", o, error_callback_registration[reg_form_id_for_response]),
	  showToolTipError(reg_form_id_for_response + " #mobile", "Mobile already exists.", o, error_callback_registration[reg_form_id_for_response])) : 511 == e.errorCode ? (showToolTipError(reg_form_id_for_response + " #userName", "Username already exists.", o, error_callback_registration[reg_form_id_for_response]),
	  showToolTipError(reg_form_id_for_response + " #mobile", "Mobile already exists.", o, error_callback_registration[reg_form_id_for_response])) : 512 == e.errorCode ? (showToolTipError(reg_form_id_for_response + " #userName", "Username already exists.", o, error_callback_registration[reg_form_id_for_response]),
	  showToolTipError(reg_form_id_for_response + " #email", "Email already exists.", o, error_callback_registration[reg_form_id_for_response])) : 513 == e.errorCode ? (showToolTipError(reg_form_id_for_response + " #userName", "Username already exists.", o, error_callback_registration[reg_form_id_for_response]), 
	  showToolTipError(reg_form_id_for_response + " #email", "Email already exists.", o, error_callback_registration[reg_form_id_for_response]),
	  showToolTipError(reg_form_id_for_response + " #mobile", "Mobile already exists.", o, error_callback_registration[reg_form_id_for_response])) : 610 == e.errorCode ? (showToolTipError(reg_form_id_for_response + " #email", "Please Enter your Email.", o, error_callback_registration[reg_form_id_for_response]),
	  showToolTipError(reg_form_id_for_response + " #mobile", "Please Enter your Mobile.", o, error_callback_registration[reg_form_id_for_response])) : 611 == e.errorCode ? (showToolTipError(reg_form_id_for_response + " #userName", "Please Enter your Username.", o, error_callback_registration[reg_form_id_for_response]),
	  showToolTipError(reg_form_id_for_response + " #mobile", "Please Enter your Mobile.", o, error_callback_registration[reg_form_id_for_response])) : 612 == e.errorCode ? (showToolTipError(reg_form_id_for_response + " #userName", "Please Enter your Username.", o, error_callback_registration[reg_form_id_for_response]),
	  showToolTipError(reg_form_id_for_response + " #email", "Please Enter your Email.", o, error_callback_registration[reg_form_id_for_response])) : 613 == e.errorCode ? (showToolTipError(reg_form_id_for_response + " #userName", "Please Enter your Username.", o, error_callback_registration[reg_form_id_for_response]), showToolTipError(reg_form_id_for_response + " #email", "Please Enter your Email.", o, error_callback_registration[reg_form_id_for_response]), showToolTipError(reg_form_id_for_response + " #mobile", "Please Enter your Mobile.", o, error_callback_registration[reg_form_id_for_response])) : showToolTipError(reg_form_id_for_response + " #userName", e.respMsg, o, error_callback_registration[reg_form_id_for_response]) : "manual" == $("#" + reg_form_id_for_response).attr("tooltip-mode") && (501 == e.errorCode ? showToolTipErrorManual(reg_form_id_for_response + " #userName", e.errorMsg, o, $("#userName"), error_callback_registration[reg_form_id_for_response]) : 422 == e.errorCode ? showToolTipError(reg_form_id_for_response + " #refercode", e.errorMsg, o, error_callback_registration[reg_form_id_for_response]) : 502 == e.errorCode ? showToolTipErrorManual(reg_form_id_for_response + " #email", e.errorMsg, o, $("#email"), error_callback_registration[reg_form_id_for_response]) : 503 == e.errorCode ? showToolTipErrorManual(reg_form_id_for_response + " #mobile", e.errorMsg, o, $("#mobile"), error_callback_registration[reg_form_id_for_response]) : 510 == e.errorCode ? (showToolTipErrorManual(reg_form_id_for_response + " #email", "Email already exists.", o, $("#email"), error_callback_registration[reg_form_id_for_response]), showToolTipErrorManual(reg_form_id_for_response + " #mobile", "Mobile already exists.", o, $("#mobile"), error_callback_registration[reg_form_id_for_response])) : 511 == e.errorCode ? (showToolTipErrorManual(reg_form_id_for_response + " #userName", "Username already exists.", o, $("#userName"), error_callback_registration[reg_form_id_for_response]), showToolTipErrorManual(reg_form_id_for_response + " #mobile", "Mobile already exists.", o, $("#mobile"), error_callback_registration[reg_form_id_for_response])) : 512 == e.errorCode ? (showToolTipErrorManual(reg_form_id_for_response + " #userName", "Username already exists.", o, $("#userName"), error_callback_registration[reg_form_id_for_response]), showToolTipErrorManual(reg_form_id_for_response + " #email", "Email already exists.", o, $("#email"), error_callback_registration[reg_form_id_for_response])) : 513 == e.errorCode ? (showToolTipErrorManual(reg_form_id_for_response + " #userName", "Username already exists.", o, $("#userName"), error_callback_registration[reg_form_id_for_response]), showToolTipErrorManual(reg_form_id_for_response + " #email", "Email already exists.", o, $("#email"), error_callback_registration[reg_form_id_for_response]), showToolTipErrorManual(reg_form_id_for_response + " #mobile", "Mobile already exists.", o, $("#mobile"), error_callback_registration[reg_form_id_for_response])) : 610 == e.errorCode ? (showToolTipErrorManual(reg_form_id_for_response + " #email", "Please Enter your Email.", o, $("#email"), error_callback_registration[reg_form_id_for_response]), showToolTipErrorManual(reg_form_id_for_response + " #mobile", "Please Enter your Mobile.", o, $("#mobile"), error_callback_registration[reg_form_id_for_response])) : 611 == e.errorCode ? (showToolTipErrorManual(reg_form_id_for_response + " #userName", "Please Enter your Username.", o, $("#userName"), error_callback_registration[reg_form_id_for_response]), showToolTipErrorManual(reg_form_id_for_response + " #mobile", "Please Enter your Mobile.", o, $("#mobile"), error_callback_registration[reg_form_id_for_response])) : 612 == e.errorCode ? (showToolTipErrorManual(reg_form_id_for_response + " #userName", "Please Enter your Username.", o, $("#userName"), error_callback_registration[reg_form_id_for_response]), showToolTipErrorManual(reg_form_id_for_response + " #email", "Please Enter your Email.", o, $("#email"), error_callback_registration[reg_form_id_for_response])) : 613 == e.errorCode ? (showToolTipErrorManual(reg_form_id_for_response + " #userName", "Please Enter your Username.", o, $("#userName"), error_callback_registration[reg_form_id_for_response]), showToolTipErrorManual(reg_form_id_for_response + " #email", "Please Enter your Email.", o, $("#email"), error_callback_registration[reg_form_id_for_response]), showToolTipErrorManual(reg_form_id_for_response + " #mobile", "Please Enter your Mobile.", o, $("#mobile"), error_callback_registration[reg_form_id_for_response])) : showToolTipErrorManual(reg_form_id_for_response + " #userName", e.errorMsg, o, $("#userName"), error_callback_registration[reg_form_id_for_response])), !1
    }
    $(" #register_mobile_verify").modal({        
	show: !0,
        keyboard: !1,
        backdrop: "static"
    }), $("#modal-mobileNo").html("+91-" + $("#mobile").val()), setTimeout(function() {
        $("#register_mobile_verify").modal("hide")
    }, 6e5)
}
$(document).ready(function() {
    $($("form[id^='registration-form']")).each(function() {
        var r = $(this).attr("id");
        reg_form_id_for_response = r, error_callback_registration[r] = $("#" + r).attr("error-callback"), $(this).validate({
            showErrors: function(e, o) {
                var s = "bottom";
                void 0 == $("#" + r).attr("validation-style") ? "ajax" == $("#" + r).attr("submit-type") && (s = "left") : s = $("#" + r).attr("validation-style"), "bootstrap" == $("#" + r).attr("tooltip-mode") ? displayToolTip(this, e, o, s, error_callback_registration[r]) : "manual" == $("#" + r).attr("tooltip-mode") && displayToolTipManual(this, e, o, s, error_callback_registration[r])
            },
            submitHandler: function() {
                if ($("#" + r + " #submit-btn").attr("disabled", "disabled"), $("#" + r + " [type=submit]").attr("disabled", "disabled"), "ajax" != $("#" + r).attr("submit-type")) document.getElementById(r).submit();

else {
                    var o = "userName=" + $("#" + r + " #userName").val() + "&reg_password=" + $("#" + r + " #reg_password").val() + "&email=" + $("#" + r + " #email").val() + "&mobile=" + $("#" + r + " #mobile").val() + "&registrationType=" + $("#" + r + " #registrationType").val();
					if($("#" + r + " #widgetType").length > 0 && (o += "&widgetType=" + $("#" + r + " #widgetType").val()));
					if($("#" + r + " #userInfo").length > 0 && (o += "&userInfo=" + $("#" + r + " #userInfo").val()));
                    if ($("#" + r + " #refercode").length > 0 && (o += "&refercode=" + $("#" + r + " #refercode").val()), $("#" + r + " #state").length > 0 && (o += "&state=" + $("#" + r + " #state").val()), "FULL" == e && (o += "&fname=" + $("#" + r + " #fname").val() + "&lname=" + $("#" + r + " #lname").val() + "&gender=" + $('input[name="gender"]:checked', "#" + r).val() + "&address=" + $("#" + r + " #address").val() + "&city=" + $("#" + r + " #city").val() + "&dob=" + $("#" + r + " #dob").val() + "&pincode=" + $("#" + r + " #pincode").val()), void 0 != $("#" + r + " #submiturl").val() && (o += "&submiturl=" + $("#" + r + " #submiturl").val()), reg_form_id_for_response = r, $("#" + r + " [type=submit]").addClass("in-progress"), "1" == $("#" + r + " #otp_enable").val()) startAjax("/component/weaver/?task=registration.registrationOTP", o, getOtpResponse, "#" + r);
                    else  o += "&" + location.href.split("?")[1], startAjax("/component/weaver/?task=registration.playerRegistrationNew", o, getRegistrationResponse, "#" + r);
                }
            }
        }), $("#" + r + " #userName").attr("pattern", "^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)$"), $($("#" + r + " #userName")).rules("add", {
            required: !0,
            alphanumeric: !0,
            rangelength: [5, 21],
            messages: {
                required: "Please enter Username",
                alphanumeric: "Username can only contain alphabets, numbers and underscores.",
                rangelength: "Username should be 5 to 21 characters."
            }
        }),
        $("#" + r + " #userInfo").length > 0 && $($("#" + r + " #userInfo")).rules("add", {
            required: !0,
            pattern: "^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})|([5-9]{1}[0-9]{9})+$",
            messages: {
                required: "Please enter Email/Mobile",
                pattern: "Please enter valid Email/Mobile."
            }
        }),
	 $($("#" + r + " #reg_password")).rules("add", {
            required: !0,
            pattern: /^([\S]+(\s?)+[\S]+)+$|^((\s?)+[\S]+(\s?)+)+$/,
            rangelength: [6, 30],
            notEqual:'#' + r + ' #userName',
            messages: {
                required: "Please enter your Password",
                pattern: "Invalid password format.",
                rangelength: "Password can only contain 6 to 30 characters.",
                notEqual:"Username and Password cannot be same."
            }
        });
        var e = $("#" + r + " #registrationType").val();
        "FULL" == e && ($("#" + r + " #fname").rules("add", {
            required: !0,
            alphanumeric: !0,
            rangelength: [3, 50],
            messages: {
                required: "Please Enter First Name.",
                alphanumeric: "First Name can only contain alphabets, numbers and underscores.",
                rangelength: "First Name should be between contain 3 to 50 characters."
            }
        }), $("#" + r + " #lname").rules("add", {
            required: !0,
            alphanumeric: !0,
            rangelength: [3, 50],
            messages: {
                required: "Please enter Last Name.",
                alphanumeric: "Last Name can only contain alphabets, numbers and underscores.",
                rangelength: "Last Name should be between 3 to 50 characters."
            }
	    })),
	    $("#" + r + " #email").length > 0 && ($("#" + r + " #email").attr("pattern", "^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\\.\\-]?[a-zA-Z0-9]+){0,1})\\.([A-Za-z]{2,})$"),
	     $("#" + r + " #email").rules("add", {
            required: !0,
            email: !0,
            rangelength: [3, 50],
            messages: {
                required: "Please enter your Email Address.",
                email: "Email Address is invalid",
                rangelength: "Email Address should be between 3 to 50 characters."
            }
	    })),
	     $("#" + r + " #mobile").length > 0 && ($("#" + r + " #mobile").attr("pattern", "^[5-9]{1}[0-9]{9}$"),
	     $("#" + r + " #mobile").attr("maxlength", "10"), 
	     $("#" + r + " #mobile").rules("add", {
            required: !0,
            number: !0,
            onlynum: !0,
            exactlength: 10,
            pattern: /^[5-9]{1}[0-9]{9}$/,
            messages: {
                required: "Please enter your Mobile No.",
                number: "Mobile No. should be numeric.",
                onlynum: "Mobile No. should be numeric.",
                exactlength: "Mobile No should be of 10 digits.",
                pattern: "Please enter valid 10 digit Mobile No."
            }
	    })),
	     $("#" + r + " #refercode").length > 0 && ($("#" + r + " #refercode").attr("maxlength", "7"), $("#" + r + " #refercode").rules("add", {
            required: !0,
            alphanumeric: !0,
            messages: {
                required: "Please enter refer code ",
                alphanumeric: "Refer Code can only contain alphabets, numbers and underscores."
            }
        })), "FULL" == e && ($("#" + r + " input[name='gender']").rules("add", {
            required: !0,
            messages: {
                required: "Please select gender."
            }
        }), $("#" + r + " #address").rules("add", {
            required: !0,
            rangelength: [5, 500],
            messages: {
                required: "Please Enter address.",
                rangelength: "Address should be between 5 to 500 characters"
            }
        })), $("#" + r + " #state").length > 0 && $("#" + r + " #state").rules("add", {
            required: !0,
            selectoption: !0,
            messages: {
                selectoption: "Please select State."
            }
        }), "FULL" == e && ($("#" + r + " #city").rules("add", {
            required: !0,
            alphanumeric: !0,
            rangelength: [3, 50],
            messages: {
                required: "Please enter city.",
                alphanumeric: "City can only contain alphabets, numbers and underscores.",
                rangelength: "City should be between 3 to 50 characters."
            }
        }), $("#" + r + " #dob").rules("add", {
            required: !0,
            maxlength: 10,
            messages: {
                required: "Please enter Date of birth"
            }
        }), $("#" + r + " #pincode").rules("add", {
            required: !0,
            onlynum: !0,
            exactlength: 6,
            messages: {
                required: "Please enter pin code.",
                onlynum: "Pin code can only contain digits.",
                exactlength: "Pin code should be of 6 digits"
            }
        }))
    });
    for (var r = document.cookie.split(";"), e = "", o = 0; o < r.length; o++) {
        var s = r[o].split("=");
        try {
            "GSP_uname" == s[0].trim() && $("#" + reg_form_id_for_response + " #userName").val(decodeURIComponent(s[1]).replace(/\+/g, " ")), "GSP_pwd" == s[0].trim() && $("#" + reg_form_id_for_response + " #reg_password").val(decodeURIComponent(s[1])), "GSP_mob" == s[0].trim() && $("#" + reg_form_id_for_response + " #mobile").val(decodeURIComponent(s[1])), "GSP_mail" == s[0].trim() && $("#" + reg_form_id_for_response + " #email").val(decodeURIComponent(s[1])), "GSP_res" == s[0].trim() && (e = decodeURIComponent(s[1]).replace(/\+/g, " "))
        } catch (r) {}
    }
    document.cookie = "GSP_uname=;expires=Thu, 01 Jan 1970 00:00:00 GMT", document.cookie = "GSP_pwd=;expires=Thu, 01 Jan 1970 00:00:00 GMT", document.cookie = "GSP_mob=;expires=Thu, 01 Jan 1970 00:00:00 GMT", document.cookie = "GSP_mail=;expires=Thu, 01 Jan 1970 00:00:00 GMT", document.cookie = "GSP_res=;expires=Thu, 01 Jan 1970 00:00:00 GMT", "" != e && getRegistrationResponse(e), $("#home_register").on("hidden.bs.modal", function(r) {
        sendPartialRegistrationCall()
    }), window.onbeforeunload = function() {
        sendPartialRegistrationCall()
    }, $($("form[id^='registration-form']")).each(function() {
        var r = $(this).attr("id");
        "true" == $("#" + r + " #email").attr("emailsuggestion") && $(function() {
            setTimeout(function(){
                $(".info"), $("#" + r + " #email").mailtip({
                    onselected: function(e) {
                        $("#" + r + " #mobile").focus()
                    }
                })
            }, 300);
        })
    })
});




