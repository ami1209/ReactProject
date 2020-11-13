var $ = jQuery.noConflict();
var city_list = {};
var error_callback_profile = {};
$.validator.addMethod('selectoption', function (value) {
    return (value != 'select');
});

$.validator.addMethod("exactlength", function(value, element, param) {
    return this.optional(element) || value.length == param;
},"Please enter exactly {0} characters.");

$.validator.addMethod("onlynum", function(value, element) {
    return this.optional(element) || /^[0-9]*$/.test(value);
});

$.validator.addMethod("alphabets", function(value, element) {
    return this.optional(element) || /^[A-Za-z]*$/.test(value);
});

$(document).ready(function(){
    $('input[name="gender"]').on('ifClicked', function (event) {
        removeToolTipError("gender_m");
        removeToolTipError("gender_f")
    });
});


$.validator.addMethod("check_date_of_birth", function (value, element) {
    var dateOfBirth = value;
    var arr_dateText = dateOfBirth.split("/");
    day = arr_dateText[0];
    month = arr_dateText[1];
    year = arr_dateText[2];

    var mydate = new Date();
    mydate.setFullYear(year, month - 1, day);

    var maxDate = new Date();
    maxDate.setYear(maxDate.getFullYear() - 18);

    if (maxDate < mydate) {
        $.validator.messages.check_date_of_birth = "You must be atleast 18 years of age.";
        return false;
    }
    return true;
});

$(document).ready(function () {
    error_callback_profile[$("#player-profile-form").attr('id')] = $("#player-profile-form").attr('error-callback');

    $("#player-profile-form").validate({
        showErrors: function(errorMap, errorList) {
            var style = 'bottom';
            if($("#player-profile-form").attr('validation-style') == undefined) {
                if ($("#player-profile-form").attr('submit-type') == "ajax") {
                    style = 'left';
                }
            }
            else
                style = $("#player-profile-form").attr('validation-style');

            if($("#player-profile-form").attr('tooltip-mode') == "bootstrap") {
                displayToolTip(this, errorMap, errorList, style, error_callback_profile[$("#player-profile-form").attr('id')]);
            }
            else if($("#player-profile-form").attr('tooltip-mode') == "manual") {
                displayToolTipManual(this, errorMap, errorList, style, error_callback_profile[$("#player-profile-form").attr('id')]);
            }
        },
        rules: {
            fname: {
                required: true,
                alphabets: true,
                maxlength: 25
            },
            lname: {
                required: true,
                alphabets: true,
                maxlength: 25
            },
            email: {
                required: true,
                email: true,
                rangelength: [3, 50]
            },
            mobile : {
                required: true,
                onlynum: true,
                exactlength: 10,
            },
            dob: {
                required: true,
                maxlength: 10,
                check_date_of_birth : true
            },
            address: {
                required: true,
                rangelength: [1, 197]
            },
            state: {
                required: true,
                selectoption: true
            },
            city: {
                required: true,
                pattern: /^[a-zA-Z-.,()\[\] ]{2,56}$/,
                rangelength: [3, 50]
            },
            pincode: {
                required: true,
                onlynum: true,
                exactlength: 6
            }
        },
        messages : {
            fname: {
                required: "Please enter First Name",
                alphabets: "First name should contain alphabets only",
                maxlength: "Maximum 25 characters allowed"
            },
            lname: {
                required: "Please enter Last Name",
                alphabets: "Last name should contain alphabets only",
                maxlength: "Maximum 25 characters allowed"
            },
            email: {
                required: "Please enter Email Address",
                email: "Email Address is invalid",
                rangelength: "Email-id can contaion 3 to 50 characters"
            },
            mobile : {
                required: "Please enter Mobile No.",
                onlynum: "Only numbers are allowed",
                exactlength: "Mobile No. should be of 10 digits",
            },
            dob: {
                required: "Please enter Date of birth",
            },
            address: {
                required: "Please Enter Address",
                rangelength: "Address can contain 1 to 197 characters"
            },
            state: {
                selectoption: "Please select State"
            },
            city: {
                required: "Please enter City",
                pattern : "City can contain only alphabets.",
                rangelength: "City can contain 3 to 50 characters"
            },
            pincode: {
                required: "Please enter Pincode",
                onlynum: "Pin code should contain only digits",
                exactlength: "Pin code should be of 6 digits"
            }
        },
        submitHandler: function() {
            if(ask_for_validation == true) {
                var tooltip_placement = 'left';
                if($("#player-profile-form").attr("validation-style") != 'undefined' && $("#player-profile-form").attr("validation-style") != undefined) {
                    tooltip_placement = $("#player-profile-form").attr("validation-style");
                }

                var error_found = false;
                if($("#mobile_div").hasClass("verify") == false) {
                    error_found = true;
                    if($("#player-profile-form").attr('tooltip-mode') == "bootstrap") {
                        showToolTipError($("#player-profile-form").attr('id')+ ' #mobile', "Please verify your mobile number.", tooltip_placement, error_callback_profile[$("#player-profile-form").attr('id')]);
                    }
                    else if($("#player-profile-form").attr('tooltip-mode') == "manual") {
                        showToolTipErrorManual($("#player-profile-form").attr('id')+ ' #mobile', "Please verify your mobile number.", tooltip_placement, $("#mobile"), error_callback_profile[$("#player-profile-form").attr('id')]);
                    }
                }
                if($("#email_div").hasClass("verify") == false) {
                    error_found = true;
                    if($("#player-profile-form").attr('tooltip-mode') == "bootstrap") {
                        showToolTipError($("#player-profile-form").attr('id')+ ' #email', "Please verify your email-id.", tooltip_placement, error_callback_profile[$("#player-profile-form").attr('id')]);
                    }
                    else if($("#player-profile-form").attr('tooltip-mode') == "manual") {
                        showToolTipErrorManual($("#player-profile-form").attr('id')+ ' #email', "Please verify your email-id.", tooltip_placement, $("#email"), error_callback_profile[$("#player-profile-form").attr('id')]);
                    }
                }

                if(error_found)
                    return false;
            }
            document.getElementById("player-profile-form").submit();
            $("#profile-form-submit").attr('disabled', 'disabled');
        }
    });

    $( "input[name='gender']" ).rules( "add", {
        required: true,
        messages: {
            required: "Please select Gender"
        }
    });
});

$(document).ready(function(){

    var modalVal=$("#isDepositProcessableVal").val();

    if(modalVal==="1") {
        $("#alert-modal").modal({
            show: true,
            keyboard: false,
            backdrop: 'static'
        });
    }
    else if(modalVal==="")
    {
        $('.btn_do_verify').prop('disabled',true).css('opacity',0.5);
    }

    function loadCities()
    {
        var state = $("#state").val();
        if(city_list[state] == undefined) {
            if($("#state").val() != "select"){
                startAjax(fetchCityList, "stateId="+$("#state").val(), appendCities, "nottoshow");
            }
        }
    }

    loadCities();

    $("#state").on("change", function () {
        if($(this).val() != 'select')
            loadCities();
    });

    $( "#city" ).autoComplete({
        minChars: 1,
        cache: false,
        source: function(term, suggest){
            term = term.toLowerCase();
            var matches = [];
            if(city_list[$("#state").val()] == 'undefined' || $("#state").val() == 'select')
                return;
            var choices = city_list[$("#state").val()];
            for (i=0; i<choices.length; i++)
                if (~choices[i].toLowerCase().indexOf(term))
                    matches.push(choices[i]);
            suggest(matches);
        }
    });
});

function appendCities(result)
{
    if(validateSession(result) == false)
        return false;
    var res = JSON.parse(result);
    if(res.errorCode == 0)
    {
        var stateCode;
        var tmp_cities = [];
        for(var i=0; i<res.cityList.length; i++) {
            tmp_cities.push(res.cityList[i].value);
            stateCode = res.cityList[i].stateCode;
        }

        if(res.cityList.length > 0) {
            city_list[stateCode] = tmp_cities;
        }
    }
}

$(document).keypress(function(e) {
    if($("#mobile_verify").length > 0 && $("#mobile_verify").css("display") != "none" && e.which == 13) {
        $("#continue-btn").trigger("click");
    }
    else if($('#state').is(':focus') == false && $('#city').is(':focus') == false && e.which == 13) {
        $("#profile-form-submit").trigger('click');
    }
});
