var $ = jQuery.noConflict()
  , forgot_password_form_id_for_response = ""
  , error_callback_forgot_password = {};
function getForgotPasswordResponse(o) {
    if (0 == validateSession(o))
        return !1;
    var r = $.parseJSON(o);
    if (0 != r.errorCode) {
        var a = "left";
        return "undefined" != $("#" + forgot_password_form_id_for_response).attr("validation-style") && void 0 != $("#" + forgot_password_form_id_for_response).attr("validation-style") && (a = $("#" + forgot_password_form_id_for_response).attr("validation-style")),
        "bootstrap" == $("#" + forgot_password_form_id_for_response).attr("tooltip-mode") ? showToolTipError(forgot_password_form_id_for_response + " #forgot_email", r.respMsg, a, error_callback_forgot_password[forgot_password_form_id_for_response]) : "manual" == $("#" + forgot_password_form_id_for_response).attr("tooltip-mode") && showToolTipErrorManual(forgot_password_form_id_for_response + " #forgot_email", r.respMsg, a, $("#forgot_email"), error_callback_forgot_password[forgot_password_form_id_for_response]),
        !1
    }
    "true" == $("#" + forgot_password_form_id_for_response).attr("home-forgot-modal") ? ($("#" + forgot_password_form_id_for_response).parents("div.modal").modal("hide"),
    ("" != r.mobileEmail || r.mobileEmail.length > 0) && $("#forgotMobEmail").val(r.mobileEmail),
    $("#home_forgot_thank").modal("show")) : location.href = r.path
}
function fp_inputGroup(o, r, a) {
    "error" == a ? r.parents(".input-group").length > 0 && r.parents(".input-group").addClass("error") : "success" == a && r.parents(".input-group").length > 0 && r.parents(".input-group").removeClass("error")
}
function processForgotOTP(o, r) {
    var e = $("#" + o).val()
      , a = $("#" + r).val();
    if (!e.match("[0-9]{4}"))
        return showToolTipErrorManual(o, "Please enter valid OTP", "bottom", $("#forgot_OTP"), void 0),
        !1;
    var t = "verificationCode=" + e + "&verificationType=RESET_PWD";
    10 != a.length || isNaN(a) ? isNaN(a) && (t += "&emailId=" + a + "&verificationField=email") : t += "&mobileNo=" + a + "&verificationField=mobile",
    startAjax("/component/weaver/?task=account.verifyPlayer", t, processForgotOTPResponse)
}
function processForgotOTPResponse(o) {
    if (0 == validateSession(o))
        return !1;
    var r = $.parseJSON(o);
    if (0 != r.errorCode)
        return showToolTipErrorManual("forgot_OTP", r.respMsg, "bottom", $("#forgot_OTP"), void 0),
        !1;
    "" !== r.verificationCode ? location.href = "/reset-password?data=" + r.verificationCode + "&verificationField=" + r.verificationField : location.href = "/login"
}
$(document).ready(function() {
    $($("form[id^='forgot-password']")).each(function() {
        var o = $(this).attr("id");
        error_callback_forgot_password[o] = $("#" + o).attr("error-callback"),
        $(this).validate({
            showErrors: function(r, a) {
                var s = "bottom";
                void 0 == $("#" + o).attr("validation-style") ? "ajax" == $("#" + o).attr("submit-type") && (s = "left") : s = $("#" + o).attr("validation-style"),
                "bootstrap" == $("#" + o).attr("tooltip-mode") ? displayToolTip(this, r, a, s, error_callback_forgot_password[o]) : "manual" == $("#" + o).attr("tooltip-mode") && displayToolTipManual(this, r, a, s, error_callback_forgot_password[o])
            },
            submitHandler: function() {
                var r = !1;
                if ("undefined" != $("#forgotLandingPageCall").val() && (r = !0),
                "ajax" != $("#" + o).attr("submit-type"))
                    document.getElementById(o).submit();
                else {
                    var a = "forgot_email=" + $("#" + o + " #forgot_email").val() + "&forgotLandingPageCall=" + r;
                    void 0 != $("#" + o + " #success-url").val() && (a += "success-url=" + $("#" + o + " #success-url").val()),
                    forgot_password_form_id_for_response = o,
                    startAjax("/component/weaver/?task=forgotpassword.forgotPassword", a, getForgotPasswordResponse, "#" + o)
                }
            }
        }),
        $("#" + o + " #forgot_email").length > 0 && $($("#" + o + " #forgot_email")).rules("add", {
            pattern: "^[a-zA-Z0-9@._-]*$",
            required: !0,
            rangelength: [3, 50],
            messages: {
                required: "Please enter your Email/Mobile.",
                email: "Email/Mobile Address is invalid",
                rangelength: "Email/Mobile Address should be between 3 to 50 characters.",
                pattern: "Please enter valid Email/Mobile."
            }
        })
    })
});




