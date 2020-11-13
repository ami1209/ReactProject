var $ = jQuery.noConflict();
var avatar_data_tmp="";
$(document).ready(function(){
    $("#upload_btn").on('click', function () {
        $("input#user_avatar").trigger("click");
    });

    $("ul#avatar_list input").on("ifClicked", function () {
        $("ul#avatar_list label").removeClass("selected");
        $(this).parents("label").addClass("selected");
        $("div.user_avtar").find("img").attr("src", $(this).parents("label").find("img").attr("src"));
        $("input#selected_avatar").val($(this).attr("id"));
        $("#save_button").css("display", "");
        $("#avatar_saved_btn").css("display", "none");
        $("#user_avatar").val("");

        $("div.upload_pic_actbtn").css('display', "block");
    });

    $("#user_avatar").change(function(event){
        var avatar_file = document.getElementById("user_avatar");
        if(avatar_file.files.length !== 0)
        {
            avatar_data_tmp = avatar_file.files[0];
        }
        else
        {
            document.getElementById('user_avatar').files[0] = avatar_data_tmp;
            avatar_file = document.getElementById("user_avatar");
        }

        $("#save_button").css("display", "none");
        $("#avatar_saved_btn").css("display", "none");
        $("div.upload_pic_actbtn").css('display', "none");

        var jpeg_regex = new RegExp("(.*?)\.(jpeg)$");
        var jpg_regex = new RegExp("(.*?)\.(jpg)$");
        var png_regex = new RegExp("(.*?)\.(png)$");
        var gif_regex = new RegExp("(.*?)\.(gif)$");

        if( (jpeg_regex.test(avatar_file.files[0].type) == false) && (jpg_regex.test(avatar_file.files[0].type) == false) && (png_regex.test(avatar_file.files[0].type) == false) && (gif_regex.test(avatar_file.files[0].type) == false)) {
            error_message("Only JPGs,PNGs and GIFs supported", "");
            return false;
        }

        var fileSize = avatar_file.files[0].size;
        var fileSize_validate = fileSize;

        if(fileSize_validate > 2000000) {
            error_message("Please upload image having size less than 2 MB.", "");
            return false;
        }
        clearSystemMessage();

        previewImage();
        $("#save_button").css("display", "");
        $("div.upload_pic_actbtn").css('display', "block");
    });

    $("#save_button").on('click', function (e) {
        e.preventDefault();
        $("#save_button").css("display", "none");
        $("#avatar_saved_btn").css("display", "none");
        $("div.upload_pic_actbtn").css('display', "none");
		clearSystemMessage();
        var avatar_file = document.getElementById("user_avatar");
        if((typeof avatar_file.files == undefined) || (!avatar_file.files[0] || avatar_file.files[0]==undefined || avatar_file.files[0]=="undefined") && $("#selected_avatar").val() == "") {
            return false;
        }
        else if($("#selected_avatar").val() == ""){
            var jpeg_regex = new RegExp("(.*?)\.(jpeg)$");
            var jpg_regex = new RegExp("(.*?)\.(jpg)$");
            var png_regex = new RegExp("(.*?)\.(png)$");
            var gif_regex = new RegExp("(.*?)\.(gif)$");

            if( (jpeg_regex.test(avatar_file.files[0].type) == false) && (jpg_regex.test(avatar_file.files[0].type) == false) && (png_regex.test(avatar_file.files[0].type) == false) && (gif_regex.test(avatar_file.files[0].type) == false)) {
                error_message("Only JPGs,PNGs and GIFs supported", "");
                return false;
            }

            var fileSize = avatar_file.files[0].size;
            var fileSize_validate = fileSize;

            if(fileSize_validate > 2000000) {
                error_message("Please upload image having size less than 2 MB.", "");
                return false;
            }
        }


        // document.getElementById("player-avatar-form").submit();
        var formData = new FormData();
        formData.append('selected_avatar', $("#selected_avatar").val());
        formData.append('user_avatar', $('#user_avatar')[0].files[0]);
        var params = formData;

        $("#avatar_saving_btn").css("display", "");
        $("div.upload_pic_actbtn").css('display', "block");

        startAjaxFileUpload("/component/weaver/?task=account.uploadPlayerAvatar", params, getAvatarUploadResponse, 'null');
    });
});

function previewImage()
{
    var preview = document.getElementById('preview_img');
    var file    = document.getElementById('user_avatar').files[0];
    var reader  = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    };

    if (file) {
        reader.readAsDataURL(file);
        $('#preview_img').css('display', 'inline-block');
        $('#user_pic_img').css('display', 'none');
    }
    else {
        preview.src = "";
        $('#preview_img').css('display', 'none');
        $('#user_pic_img').css('display', 'inline-block');
    }
}

function getAvatarUploadResponse(result)
{
    $("#avatar_saving_btn").css("display", "none");
    if(validateSession(result) == false)
        return false;

    var res = $.parseJSON(result);
    if(res.errorCode != 0) {
        showToolTipErrorManual("upload-single-doc", res.respMsg, "bottom", $("#upload-single-doc"), undefined);
        return false;
    }

    $("div.upload_pic_actbtn").css('display', "block");
    $("#avatar_saved_btn").css("display", "");
    $("div.selected_avtar>.user_avtar img").attr('src', res.avatarPath);
    $("div.myaccount_topsection div.user_pic img").attr('src', res.avatarPath);
    $("#user_avatar").val("");
}

$(window).load(function () {
    if($('.user_avtar a').length > 0)
        $('.user_avtar a').attr('href','javascript:void(0)');
})
