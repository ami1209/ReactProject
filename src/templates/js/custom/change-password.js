var $ = jQuery.noConflict();
var change_password_form_submitted = false;
var error_callback_cp = {};
$(document).ready(function () {
    error_callback_cp["change-password-form"] = $("#change-password-form").attr('error-callback');
    $("#change-password-form").validate({
        showErrors: function(errorMap, errorList) {
            var style = 'bottom';
            if($("#change-password-form").attr('validation-style') == undefined) {
                if ($("#change-password-form").attr('submit-type') == "ajax") {
                    style = 'left';
                }
            }
            else
                style = $("#change-password-form").attr('validation-style');

            if($("#change-password-form").attr('tooltip-mode') == "bootstrap") {
                displayToolTip(this, errorMap, errorList, style, error_callback_cp["change-password-form"]);
            }
            else if($("#change-password-form").attr('tooltip-mode') == "manual") {
                displayToolTipManual(this, errorMap, errorList, style, error_callback_cp["change-password-form"]);
            }
	//Username and pwd can't be same
            $.validator.addMethod("notEqual", function(value, element, param) {
                return this.optional(element) || value.toLowerCase() !== ($(param).val()).toLowerCase();
            });
        },
        rules: {
            currentPassword: {
                required: true,
                pattern : /^[^ ]+$/
            },
            newPassword: {
                required: true,
                pattern : /^[^ ]+$/,
                minlength: 6,
                maxlength: 30,
		notEqual:"#userName",
            },
            retypePassword: {
                required: true,
                pattern : /^[^ ]+$/,
                equalTo: "#newPassword"
            }
        },

        messages: {
            currentPassword: {
                required: 'Please enter your current password.',
                pattern: "Invalid password format."
            },
            newPassword: {
                required: 'Please enter your new password.',
                minlength: 'Your password must be at least 6 characters long.',
                maxlength: 'Your password length must be less than 30 characters.',
                pattern: "Invalid password format.",
		notEqual:"Your Username and New Password must be different."
            },
            retypePassword: {
                required: 'Please retype your new password here.',
                pattern: "Invalid password format.",
                equalTo: 'This should be same as your new password.'
            }
        },
        submitHandler: function() {
            if(change_password_form_submitted == true)
                return false;
            else {
                change_password_form_submitted = true;
                $("#change-password-form #submit").attr('disabled', 'disabled');
                return true;
            }
        }
    });

    $("#currentPassword, #newPassword, #retypePassword").keypress(function(e) {
        if(e.which == 13) {
            $("#change-password-form #submit").trigger('click');
        }
    });
});
