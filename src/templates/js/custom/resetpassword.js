var $ = jQuery.noConflict();
var error_callback_rp = {};
$(document).ready(function () {
    error_callback_rp["reset-password-form"] = $("#reset-password-form").attr('error-callback');
    $("#reset-password-form").validate({
        showErrors: function(errorMap, errorList) {
            var style = 'bottom';
            if($("#reset-password-form").attr('validation-style') == undefined) {
                if ($("#reset-password-form").attr('submit-type') == "ajax") {
                    style = 'left';
                }
            }
            else
                style = $("#reset-password-form").attr('validation-style');

            if($("#reset-password-form").attr('tooltip-mode') == "bootstrap") {
                displayToolTip(this, errorMap, errorList, style, error_callback_rp["reset-password-form"]);
            }
            else if($("#reset-password-form").attr('tooltip-mode') == "manual") {
                displayToolTipManual(this, errorMap, errorList, style, error_callback_rp["reset-password-form"]);
            }
        },
        rules: {
            newPassword: {
                required: true,
                pattern : /^([\S]+(\s?)+[\S]+)+$|^((\s?)+[\S]+(\s?)+)+$/,
                rangelength: [6, 30]
            },
            retypePassword: {
                required: true,
                pattern : /^([\S]+(\s?)+[\S]+)+$|^((\s?)+[\S]+(\s?)+)+$/,
                rangelength: [6, 30],
                equalTo: "#newPassword"
            }
        },

        messages: {
            newPassword: {
                required: 'New Password Can Not Be Blank.',
                rangelength: "New password must be between 6-30 characters.",
                pattern: "Invalid password format."
            },
            retypePassword: {
                required: 'Please retype your new password here.',
                rangelength: "Re-enter password must be between 6-30 characters.",
                pattern: "Invalid password format.",
                equalTo: 'This should be same as your new password.'
            }
        },
        submitHandler: function() {
            if($("#reset-password-form").attr('submit-type') != 'ajax') {
                document.getElementById("reset-password-form").submit();
            }
            else {
                var params = 'newPassword='+$("#reset-password-form #newPassword").val()+'&retypePassword='+$("#reset-password-form #retypePassword").val();
                startAjax("/component/weaver/?task=authorisation.resetPassword", params, getResetPasswordResponse,"#reset-password-form");
            }
        }
    });
});

function getResetPasswordResponse(result)
{
    if(validateSession(result) == false)
        return false;

    var res = $.parseJSON(result);

    if(res.errorCode != 0) {
        $("#reset-password-form #newPassword").val('');
        $("#reset-password-form #retypePassword").val('');

        var tooltip_placement = 'left';
        if($("#reset-password-form").attr("validation-style") != 'undefined' && $("#reset-password-form").attr("validation-style") != undefined) {
            tooltip_placement = $("#reset-password-form").attr("validation-style");
        }

        if($("#reset-password-form").attr('tooltip-mode') == "bootstrap") {
            showToolTipError('reset-password-form #newPassword', res.respMsg, tooltip_placement, error_callback_rp["reset-password-form"]);
        }
        else if($("#reset-password-form").attr('tooltip-mode') == "manual") {
            showToolTipErrorManual('reset-password-form #newPassword', res.respMsg, tooltip_placement, $("#newPassword"), error_callback_rp["reset-password-form"]);
        }
        return false;
    }
    else {
        location.href = res.path;
    }
}
function rp_inputGroupElement(placement, $element, type)
{
    if(type == "error") {
        if($element.parents('.input-group').length > 0) {
            $element.parents('.input-group').addClass("error");
        }
    }
    else if(type == "success") {
        if($element.parents('.input-group').length > 0) {
            $element.parents('.input-group').removeClass("error");
        }
    }
}
