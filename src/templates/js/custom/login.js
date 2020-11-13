function addPasswordRules(r) {
    $("#" + r + " #password").rules("add", {
        required: !0,
        pattern: /^([\S]+(\s?)+[\S]+)+$|^((\s?)+[\S]+(\s?)+)+$/,
        rangelength: [6, 30],
        messages: {
            required: "Please enter your Password",
            pattern: "Invalid password format.",
            rangelength: "Please enter 6 to 30 characters."
        }
    })
}

function getLoginResponse(r) {
    if (0 == validateSession(r)) return !1;
    var o = $.parseJSON(r);
    if (0 != o.errorCode) {
        addPasswordRules(login_form_id_for_response), $("#" + login_form_id_for_response + " #submit-btn").removeAttr("disabled"), $("#" + login_form_id_for_response + " #password").val("");
        var e = "left";
        return "undefined" != $("#" + login_form_id_for_response).attr("validation-style") && void 0 != $("#" + login_form_id_for_response).attr("validation-style") && (e = $("#" + login_form_id_for_response).attr("validation-style")), "bootstrap" == $("#" + login_form_id_for_response).attr("tooltip-mode") ? showToolTipError(login_form_id_for_response + " #userName_email", o.respMsg, e, error_callback_login[login_form_id_for_response]) : "manual" == $("#" + login_form_id_for_response).attr("tooltip-mode") && showToolTipErrorManual(login_form_id_for_response + " #userName_email", o.respMsg, e, $("#userName_email"), error_callback_login[login_form_id_for_response]), !1
    }
    "add_cash" == $("#" + login_form_id_for_response).attr("from-title") && (document.cookie = "launchCashierAfterLogin=true"), "play_rummy" == $("#" + login_form_id_for_response).attr("from-title") && (document.cookie = "launchRummyAfterLogin=true"), "open_raf" == $("#" + login_form_id_for_response).attr("from-title") && (document.cookie = "launchReferAFriendAfterLogin=true") ? location.href = o.path : location.href = o.path
}

function topLoginBox(r, o) {
    "left" == r && ($("div.tooltip#" + o.attr("aria-describedby")).addClass("error_" + o.attr("id")), $("div.tooltip#" + o.attr("aria-describedby")).css({
        top: "",
        left: "-" + $("div.tooltip#" + o.attr("aria-describedby")).css("width")
    }))
}

function login_inputGroupElement(r, o, e) {
    "error" == e ? o.parents(".input-group").length > 0 && o.parents(".input-group").addClass("error") : "success" == e && o.parents(".input-group").length > 0 && o.parents(".input-group").removeClass("error")
}
var $ = jQuery.noConflict(),
    login_form_id_for_response = "",
    error_callback_login = {};
$(document).ready(function() {
    $($("form[id^='login-form']")).each(function() {
        var o = $(this).attr("id");
        error_callback_login[o] = $("#" + o).attr("error-callback"), $(this).validate({
            showErrors: function(r, e) {
                var t = "bottom";
                void 0 == $("#" + o).attr("validation-style") ? "ajax" == $("#" + o).attr("submit-type") && (t = "left") : t = $("#" + o).attr("validation-style"), "bootstrap" == $("#" + o).attr("tooltip-mode") ? displayToolTip(this, r, e, t, error_callback_login[o]) : "manual" == $("#" + o).attr("tooltip-mode") && displayToolTipManual(this, r, e, t, error_callback_login[o])
            },
            submitHandler: function() {
                if ("text" == $("#login-form-2  #password").attr("type") && ($("#login-form-2  #password").attr("type", "password"), $("#login-form-2  #showPwd").attr("class", "show_pa")), $("#" + o + " #password").rules("remove", "rangelength"), $("#" + o + " #password").val(MD5(MD5($("#" + o + " #password").val()) + loginToken)), $("#" + o + " #submit-btn").attr("disabled", "disabled"), "ajax" != $("#" + o).attr("submit-type")) $("#" + o + " #loginToken").val(loginToken), document.getElementById(o).submit();
                else {
                    var r = "userName_email=" + $("#" + o + " #userName_email").val() + "&password=" + $("#" + o + " #password").val() + "&loginToken=" + loginToken;
                    if (void 0 != $("#" + o + " #submiturl").val() && (r += "&submiturl=" + $("#" + o + " #submiturl").val()), login_form_id_for_response = o, "/become-a-lakhpati" == location.pathname) r += "&" + location.href.split("?")[1], startAjax("/component/weaver/?task=authorisation.playerLoginNew", r, getLoginResponse, "#" + o);
                    else r += "&" + location.href.split("?")[1], startAjax("/component/weaver/?task=authorisation.playerLoginNew", r, getLoginResponse, "#" + o)
                }
            }
        }), $("#" + o + " #userName_email").rules("add", {
            required: !0,
            pattern: "^[a-zA-Z0-9@._-]*$",
            messages: {
                required: "Please enter Username/Email",
                pattern: "Username has invalid pattern."
            }
        }), addPasswordRules(o)
    })
});

