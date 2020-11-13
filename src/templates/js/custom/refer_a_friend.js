var $ = jQuery.noConflict();
var minManulRow = 1;
var maxManulRow = 5;
var referalList = [];
var referalListEmail = [];
$(document).ready(function () {
    $(".my_share_link_b").on('click', function() {
        var my_share_link = document.querySelector('.my_share_link_i');
        my_share_link.select();
        document.execCommand('copy');
    });

 $(".referr_code_b").on('click', function() {
        var reffer_code = document.querySelector('.referr_code_i');
        reffer_code .select();
        document.execCommand('copy');
    });

    $(".add_friend").on('click', function() {
        var row_shown = false;
        var shown_rows = 0;
        var last_shown_row_id;
		
		if(!validateReferList())
            return false;
		
        $($("[row-id]")).each(function () {
            if($(this).css('display') == 'none' && row_shown == false) {
                $(this).css('display', '');
                row_shown = true;
            }
            if($(this).css('display') != 'none') {
                last_shown_row_id = $(this).attr("row-id");
                shown_rows++;
                $('[remove-row='+$(this).attr("row-id")+']').css('visibility','');
            }
        });

        $('[add-row]').css('visibility','hidden');
        $('[add-row='+last_shown_row_id+']').css('visibility',"");
		
		if(shown_rows == 5)
        {
            $('[add-row=5]').css('visibility',"hidden");
        }
    });

    $("[remove-row]").on('click', function() {
        var thisRowId = $(this).attr("remove-row");
        var shown_row = 0;
        var last_shown_row_id;
        $("[row-id="+thisRowId+"]").css('display','none');
        resetThisRowData(thisRowId);
        $($("[row-id]")).each(function () {
            if($(this).css('display') != 'none') {
                shown_row++;
                last_shown_row_id = $(this).attr('row-id');
            }
        });

        if(shown_row <= 0) {
            $('[row-id=1]').css('display',"");
            $('[remove-row=1').css('visibility','hidden');
        }
        if(shown_row == 1) {
            $('[remove-row='+last_shown_row_id+']').css('visibility',"hidden");
        }
        $('[add-row]').css('visibility','hidden');
        $('[add-row='+last_shown_row_id+']').css('visibility',"");
    });

   $("#filter").on('keyup', function () {
       if($("#filter").val().length != 0)
       {

       }
       else
       {
           var isAllChecked = true;
		   var cnt=0;
           $.each($("#track-bonus-list tbody input[type='checkbox'], #invite-list tbody input[type='checkbox']"), function( index, value ) {
               if(!$(this).parent().hasClass("checked")) {
                   isAllChecked = false;
                   $("#select-all").iCheck("uncheck");
                   return false;
               }
			   cnt++;
           });
		   if(cnt > 0)
		   {
			   if(isAllChecked)
               $("#select-all").iCheck("check");
				else
               $("#select-all").iCheck("uncheck");
		   }
       }
    });
	
    $("#select-all").on('ifClicked', function (e) {
        if($(this).parent().hasClass("checked")) {
            $("input[type='checkbox']").iCheck("uncheck");
            $("#send-reminder").addClass("disabled");
            $("#inviteFriendNowEmail").addClass("disabled");
        }
        else {
            if($("#filter").val().length != 0)
            {
                // var isAllCheckedIL = true;
                 $.each($("#invite-list tbody tr, #track-bonus-list tbody tr"), function( index, value ) {
                     if($(this).css('display') != "none") {
                         $(this).find("input[type='checkbox']").iCheck("check");
                     }
                 });
                // var isAllCheckedTB = true;
                $("#select-all").iCheck("check") ;
                $("#send-reminder").removeClass("disabled");
                $("#inviteFriendNowEmail").removeClass("disabled");
                e.originalEvent.preventDefault();
                //$("input[type='checkbox']").iCheck("check") ;
            }
            else
            {
                $("input[type='checkbox']").iCheck("check");
            }
            $("#send-reminder").removeClass("disabled");
            $("#inviteFriendNowEmail").removeClass("disabled");
        }
    });


    $("#invite-list tbody input[type='checkbox']").on('ifClicked', function () {
        if($(this).parent().hasClass("checked")) {
            $(this).iCheck("uncheck")
        }
        else {
            $(this).iCheck("check")
        }
        var isAllChecked = true;
        var isAtlestOneChecked = false;
        $.each($("#invite-list tbody input[type='checkbox']"), function( index, value ) {
            if(!$(this).parent().hasClass("checked")) {
                isAllChecked = false;
            }
            else
                isAtlestOneChecked = true;
        });

        if(isAllChecked)
            $("#select-all").iCheck("check");
        else
            $("#select-all").iCheck("uncheck");

	if(isAtlestOneChecked)
            $("#inviteFriendNowEmail").removeClass("disabled");
        else
            $("#inviteFriendNowEmail").addClass("disabled");
    });

    $("#track-bonus-list tbody input[type='checkbox']").live('ifClicked', function () {
        if($(this).parent().hasClass("checked")) {
            $(this).iCheck("uncheck")
        }
        else {
            $(this).iCheck("check")
        }
        var isAllChecked = true;
        var isAtlestOneChecked = false;
        $.each($("#track-bonus-list tbody input[type='checkbox']"), function( index, value ) {
            if(!$(this).parent().hasClass("checked")) {
                isAllChecked = false;
            }
            else
		isAtlestOneChecked = true;
        });

        if(isAllChecked)
            $("#select-all").iCheck("check");
        else
            $("#select-all").iCheck("uncheck");

    		if(isAtlestOneChecked)
        $("#send-reminder").removeClass("disabled");
        else
            $("#send-reminder").addClass("disabled");
    });

    $("[href='#track-status']").on('click', function () {
        if($(this).parent().hasClass("active") == false)
		{
					    if($("#system-message-container").text().trim().length > 0)
                startAjax("/component/weaver/index.php?task=referafriend.trackBonus", "", getTrackBonusResponse, "nottoshow");
            else
			startAjax("/component/weaver/index.php?task=referafriend.trackBonus", "", getTrackBonusResponse, "null");
		}
            
    });

    $("#send-reminder").on('click', function () {
        if($(this).hasClass('disabled'))
	{
			
	}
        else
        {
        var reminderList = [];
        $($("#track-bonus-list tbody input[type='checkbox']")).each(function () {
            if($(this).parent().hasClass("checked")) {
                var arr = {};
                arr["userName"] = $(this).attr("user-name");
                arr["emailId"] = $(this).attr("email-id");
                arr["mobileNo"] = $(this).attr("mobile-no");
                reminderList.push(arr);
            }
        });

        if(reminderList.length == 0) {
            error_message("Please select atleast one checkbox from list.", undefined);
            return false;
        }

        $("#send-reminder-form #reminderList").val(JSON.stringify(reminderList));
        document.getElementById("send-reminder-form").submit();
        }
    });

    $('[href="#refer-now"]').on('click', function () {
        $("#no_invitations").css('display', 'none');
        $("#list_of_invitations").css('display', 'none');
		clearSystemMessage();
    });
});


function resetThisRowData(rowId) {
    $("[row-id="+rowId+"] input").val("");
    $($("[row-id="+rowId+"] input")).each(function () {
        removeToolTipErrorManual("", $(this));
    });
}

function inviteFriendNow(type)
{
    removeToolTipError("all");
    var referalList = [];
    var form = "";
    if(type == "EMAIL") {
        if(!validateReferList())
            return false;
        var thisRowId=0;
        $($("[row-id]")).each(function () {
            if($(this).css('display') != 'none') {
                var arr = {};
                thisRowId = $(this).attr('row-id');
                arr["firstName"] = $("#name-"+thisRowId).val().trim();
                arr["lastName"] = "";
                arr["emailId"] = $("#email-"+thisRowId).val().trim();
                arr["mobileNo"] = "";
                referalList.push(arr);
            }
        });
        form = "invite-friend-form";
    }
    else {

        var row_count_check = 1;
        var filledArr  = [];
        $($("form#invite-friend-mobile-form div.form-group .row")).each(function () {

            var name = $(this).find("input#fname_"+row_count_check).val();
            var mobile = $(this).find("input#mobile_"+row_count_check).val();

            if(name.trim().length > 0 || mobile.trim().length > 0)
            {
                filledArr.push(row_count_check);
            }
            row_count_check++;
        });
        if(filledArr.length == 0 ) {

            validateName("fname_1", "", "manual");
            validateMobile("mobile_1", "", "manual");
            return false;
        }
        else
        {
            var div_filled_found = false;
            var row_count = 1;
            var counter=1;
            var name_valid = false;
            var mobile_valid = false;
            filledArr.forEach(function(id)
            {
                var name = $("#fname_" + id).val();
                var mobile = $("#mobile_" + id).val();

                if (div_filled_found == false) {
                    name_valid = validateName("fname_" + id, name, "manual");
                    mobile_valid = validateMobile("mobile_" + id, mobile, "manual");
                }
                else {
                    if (name.trim().length == 0 || name.trim()!= "") {
                        name_valid = validateName("fname_" + id, name, "manual");
                    }
                    if (mobile.trim().length == 0 || mobile.trim()!= "") {
                        mobile_valid = validateMobile("mobile_" + id, mobile, "manual");
                    }

                }
                if (name_valid == false || mobile_valid == false) {
                    div_filled_found = false;
                    counter++;
                }
                else {
                    if(counter == 1) {
                        div_filled_found = true;
                    }
                }

                var arr = {};
                arr["firstName"] = name;
                arr["lastName"] = "";
                arr["emailId"] = "";
                arr["mobileNo"] = mobile;
                referalList.push(arr);
                row_count++;


            });

            if (div_filled_found == false)
                return false;
        }
        form = "invite-friend-mobile-form";
    }

    $('#'+form).append($('<input>', {
        type: "hidden",
        name: "referalList",
        value: JSON.stringify(referalList)
    }));

    $('#'+form).append($('<input>', {
        type: "hidden",
        name: "referType",
        value: "manualRefer"
    }));

    $('#'+form).append($('<input>', {
        type: "hidden",
        name: "inviteMode",
        value: type
    }));

    document.getElementById(form).submit();
}
function validateReferList() {
    var thisRowId=0;
    var isErrorName=false;
    var isErrorEmail=false;
    $($("[row-id]")).each(function () {
        if($(this).css('display') != 'none') {
            thisRowId = $(this).attr('row-id');
            var name = $("#name-"+thisRowId).val().trim();
            var email = $("#email-"+thisRowId).val().trim();
            validateName("name-"+thisRowId,name, "manual") ? isErrorName = false : isErrorName = true;
            validateEmail("email-"+thisRowId,email, "manual") ? isErrorEmail = false : isErrorEmail = true;
			
			if(isErrorName || isErrorEmail)
            {
                return false;
            }
        }
    });

    if(isErrorName || isErrorEmail)
    {
        return false;
    }

    return true;
}

function validateName(id,name, errType)
{

    if(name.length == 0) {
        if(errType == "manual")
            showToolTipErrorManual(id, "Enter Friend's Name", "bottom", $("#"+id), undefined);
        else
            showToolTipError(id, "Enter Friend's Name", "bottom", undefined);
        return false;
    }

    var myRegEx  = /^[-\w\s]+$/;
    if(!myRegEx.test(name)) {
        if(errType == "manual")
            showToolTipErrorManual(id, "Invalid Name", "bottom", $("#"+id), undefined);
        else
            showToolTipError(id, "Invalid Name", "bottom", undefined);
        return false;
    }

	removeToolTipErrorManual("", $("#"+id));
    return true;
}

function validateEmail(id,email, errType)
{
    if(email.length == 0) {
        if(errType == "manual")
            showToolTipErrorManual(id, "Enter Friend's Email", "bottom", $("#"+id), undefined);
        else
            showToolTipError(id, "Enter Friend's Email", "bottom", undefined);
        return false;
    }

    var myRegEx  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!myRegEx.test(email)) {
        if(errType == "manual")
            showToolTipErrorManual(id, "Invalid Email", "bottom", $("#"+id), undefined);
        else
            showToolTipError(id, "Invalid Email", "bottom", undefined);
        return false;
    }

	removeToolTipErrorManual("", $("#"+id));
    return true;
}

function inviteFriendNowEmail() {
      	var param = document.getElementById("inviteFriendNowEmail");
	if(param.classList.contains('disabled'))
	{
		
	}
        else
        {
    referalListEmail = [];
    $($("#invite-list tbody tr")).each(function () {
        if($(this).find("td input").parent().hasClass("checked"))
        {
            var arr = {};
            arr["firstName"] = $(this).find("[referName=name]").text().trim();
            arr["lastName"] = "";
            arr["emailId"] = $(this).find("[referEmail=email]").text().trim();
            arr["mobileNo"] = "";
            referalListEmail.push(arr);
        }
    });

    $('#invite-friend-form-email').append($('<input>', {
        type: "hidden",
        name: "referalList",
        value: JSON.stringify(referalListEmail)
    }));

    $('#invite-friend-form-email').append($('<input>', {
        type: "hidden",
        name: "referType",
        value: "mailRefer"
    }));

    $('#invite-friend-form-email').append($('<input>', {
        type: "hidden",
        name: "inviteMode",
        value: "EMAIL"
    }));

    document.getElementById("invite-friend-form-email").submit();
      } 
}

function getTrackBonusResponse(result)
{
    $('#track-bonus-list tbody > tr').remove();
    if(validateSession(result) == false)
        return false;

    var res = $.parseJSON(result);

    if(res.errorCode != 0) {
        $('[href="#refer-now"]').trigger('click');
        error_message(res.respMsg, undefined);
        return false;
    }
	$("input[type='checkbox']").iCheck("uncheck");
    $("#no_invitations").css('display', 'none');
    $("#list_of_invitations").css('display', 'none');
    if(res.plrTrackBonusList == undefined || res.plrTrackBonusList.length == 0) {
        $("#no_invitations").css('display', 'block');
        $("#list_of_invitations").css('display', 'none');
        return false;
    }

    $('#track-bonus-list').attr('data-page-size',res.plrTrackBonusList.length);

    for(var i = 0; i < res.plrTrackBonusList.length; i++) {
        var footable = $('#track-bonus-list').data('footable');

        var tr = "<tr><td>";

        var username_td = "";
        if(!(res.plrTrackBonusList[i].register == true && res.plrTrackBonusList[i].depositor == true)) {
            var username_td = "";
            if(res.plrTrackBonusList[i].userName != "null" && res.plrTrackBonusList[i].userName != null && res.plrTrackBonusList[i].userName.trim().length > 0 ) {
                username_td = res.plrTrackBonusList[i].userName;
            }
            else if(res.plrTrackBonusList[i].emailId != "null" && res.plrTrackBonusList[i].emailId != null && res.plrTrackBonusList[i].emailId.trim().length > 0 ) {
                username_td = res.plrTrackBonusList[i].emailId;
            }
            else if(res.plrTrackBonusList[i].mobileNum != "null" && res.plrTrackBonusList[i].mobileNum != null && res.plrTrackBonusList[i].mobileNum.trim().length > 0) {
                username_td = res.plrTrackBonusList[i].mobileNum;
            }

            if(username_td == "")
                continue;

            tr += '<input type="checkbox" user-name="'+res.plrTrackBonusList[i].userName+'" email-id="'+res.plrTrackBonusList[i].emailId+'" mobile-no="'+res.plrTrackBonusList[i].mobileNum+'">';
        }
        else
        {
            username_td = "";
            if(res.plrTrackBonusList[i].userName != "null" && res.plrTrackBonusList[i].userName != null && res.plrTrackBonusList[i].userName.trim().length > 0 ) {
                username_td = res.plrTrackBonusList[i].userName;
            }
            else if(res.plrTrackBonusList[i].emailId != "null" && res.plrTrackBonusList[i].emailId != null && res.plrTrackBonusList[i].emailId.trim().length > 0 ) {
                username_td = res.plrTrackBonusList[i].emailId;
            }
            /*else if(res.plrTrackBonusList[i].mobileNum != "null" && res.plrTrackBonusList[i].mobileNum != null && res.plrTrackBonusList[i].mobileNum.trim().length > 0) {
             username_td = res.plrTrackBonusList[i].mobileNum;
             }*/ 
        }
        tr += "</td><td>"+username_td+"</td>";

        var referralDate = res.plrTrackBonusList[i].referralDate.toString().split(" ")[0];
        var referralTime = res.plrTrackBonusList[i].referralDate.toString().split(" ")[1];

        var finalDate = new Date(referralDate.split("/")[2], (parseInt(referralDate.split("/")[1])-1), referralDate.split("/")[0], referralTime.split(":")[0], referralTime.split(":")[1], referralTime.split(":")[2]);
        tr += '<td>'+finalDate.getDate()+' '+finalDate.getMonthName()+', '+finalDate.getFullYear()+' '+( (finalDate.getHours().toString().length == 1) ? "0"+finalDate.getHours() : finalDate.getHours())+':'+( (finalDate.getMinutes().toString().length == 1) ? "0"+finalDate.getMinutes() : finalDate.getMinutes() )+'</td>';

        res.plrTrackBonusList[i].register = (res.plrTrackBonusList[i].register == true) ? "register" : "remove";
        res.plrTrackBonusList[i].depositor = (res.plrTrackBonusList[i].depositor == true) ? "register" : "remove";

        tr += '<td><img src="'+base_href+'/templates/shaper_helix3/images/my_account/refer_friend/'+res.plrTrackBonusList[i].register+'_friend.png"></td><td><img src="'+base_href+'/templates/shaper_helix3/images/my_account/refer_friend/'+res.plrTrackBonusList[i].depositor+'_friend.png"></td></tr>';

        footable.appendRow(tr);
    }
    $('input').not("#select-all").iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
        increaseArea: '20%'
    });

    $("#no_invitations").css('display', 'none');
    $("#list_of_invitations").css('display', 'block');
    $('#track-bonus-list').trigger('footable_redraw');
    $('#track-bonus-list').trigger('footable_initialize');
	
	if($('#track-bonus-list tbody > tr').length == 0) {
        $("#no_invitations").css('display', 'block');
        $("#list_of_invitations").css('display', 'none');
        return false;
    }
}
