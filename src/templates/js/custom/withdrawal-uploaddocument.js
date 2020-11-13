var $ = jQuery.noConflict();
var docmnt = "";
function validateFile(id, obj)
{
    var delete_id = "#"+id+"-delete";


    removeAllwithdrawalError();
    if(( typeof obj.files == undefined) || !obj.files[0] || obj.files[0]==undefined || obj.files[0]=='undefined') {
        $( delete_id ).trigger( "click" );
        return false;
    }

    var fileSize = obj.files[0].size;
    var fileSize_validate = fileSize;

    var jpeg_regex = new RegExp("(.*?)\.(jpeg)$");
    var jpg_regex = new RegExp("(.*?)\.(jpg)$");
    var png_regex = new RegExp("(.*?)\.(png)$");
    var pdf_regex = new RegExp("(.*?)\.(pdf)$");

    var tiff_regex = new RegExp("(.*?)\.(tiff)$");
    var gif_regex = new RegExp("(.*?)\.(gif)$");
    var bmp_regex = new RegExp("(.*?)\.(bmp)$");
    var exif_regex = new RegExp("(.*?)\.(exif)$");
    var bpg_regex = new RegExp("(.*?)\.(bpg)$");
    var rtf_regex = new RegExp("(.*?)\.(rtf)$");

    if( (jpeg_regex.test(obj.files[0].type) == false) &&
        (jpg_regex.test(obj.files[0].type) == false) &&
        (png_regex.test(obj.files[0].type) == false) &&
        (pdf_regex.test(obj.files[0].type) == false) &&
        (tiff_regex.test(obj.files[0].type) == false) &&
        (gif_regex.test(obj.files[0].type) == false) &&
        (bmp_regex.test(obj.files[0].type) == false) &&
        (exif_regex.test(obj.files[0].type) == false) &&
        (bpg_regex.test(obj.files[0].type) == false) &&
        (rtf_regex.test(obj.files[0].type) == false)) {
        $(delete_id).trigger( "click" );
        showWithdrawalError(id, "You can only upload jpeg/png/pdf/tiff/gif/bmp/exif/bpg/rtf files.");
        return false;
    }

    if(fileSize_validate > 5000000) {
        $( delete_id).trigger( "click" );
        showWithdrawalError(id, "Please upload file less than 5Mbs.");
        return false;
    }
    removeAllwithdrawalError("all");
    return true;
}
//Select pancard to capture image
function checkTakePanCardImage(e) {
    if(e.value != "pancard"){
        $("#pancard-take-image").addClass("disabled");
        showWithdrawalError(e.id,"Please select Tax Document.");

    }else{
        removeWithdrawalError(e.id);
        $("#pancard-take-image").removeClass("disabled");
        $("#pancard-upload").addClass("disabled");
    }

}

//Select Document to capture image
function checkTakeDocumentImage(e) {
    deleteDocument("document_frontside");
    deleteDocument("document_backside");
    if(e.value != ""){
        var docText = $(e).find("option:selected").text();
        $("#docText").text(docText);
        removeWithdrawalError(e.id);
        if($("#document_take_image").length > 0)
            $("#document_take_image").removeClass("disabled");
        if($('#front_side_image').length > 0 && $('#back_side_image').length > 0){
            $('#front_side_image').removeClass("disabled");
            $('#back_side_image').removeClass("disabled");
        }
        document.getElementById("document_backside").removeAttribute("disabled");
        document.getElementById("document_frontside").removeAttribute("disabled");
        $("#document_backside_a,#document_frontside_a").removeClass("disabled");
        $("#document_upload").addClass("disabled");
    }else{
        $("#docText").text("document");
        if($("#document_take_image").length > 0)
            $("#document_take_image").addClass("disabled");
        if($('#front_side_image').length > 0 && $('#back_side_image').length > 0){
            $('#front_side_image').addClass("disabled");
            $('#back_side_image').addClass("disabled");
        }
        document.getElementById("document_backside").setAttribute("disabled","disabled");
        document.getElementById("document_frontside").setAttribute("disabled","disabled");
        $("#document_backside_a,#document_frontside_a").addClass("disabled");
        showWithdrawalError(e.id,"Please select Document.");

    }

}


//Manual upload of pancard trigger
function pancardBrowse(e) {
    removeToolTipError("all");
    if(e.value == "")
        return false;
    if(validateFile(e.id, e) == false){
        $("#"+e.id+"-upload").addClass("disabled");
        return false;
    }


    var fileName = e.files[0].name;
    $("#pancard-displayname").val(fileName);
    $("#pancard-upload").removeClass("disabled");
    $("#pancard-take-image").addClass("disabled");
    $("#pancard-browse").css("display","none");
    $("#pancard-document-action").css("display","block");

}

//Edit Pancard
function editPancard() {
    $("#pancard").trigger( "click" );
}

//delete previous selected File
function deletePancard() {
    removeAllwithdrawalError();
    $("#pancard").val("");
    $("#pancard-displayname").val("");
    $("#pancard-upload").addClass("disabled");
    $("#pancard-document-action").css("display","none");
    $("#pancard-browse").css("display","block");

}

//delete previous selected File
function deleteDocument(id) {
    removeAllwithdrawalError();
    $("#"+id).val("");
    $("#"+id+"_displayname").val("");
    $("#document_upload").addClass("disabled");
    $("#"+id+"_document_action").css("display","none");
    $("#"+id+"_browse").css("display","block");
    var front = $("#document_frontside").val();
    var back = $("#document_backside").val();
    var document = $("#document_select").val();
    if(front == "" && back == "" && document!="") {
        if ($("#document_take_image").length > 0)
            $("#document_take_image").removeClass("disabled");
        if ($('#front_side_image').length > 0 && $('#back_side_image').length > 0) {
            $('#front_side_image').removeClass("disabled");
            $('#back_side_image').removeClass("disabled");
        }
    }else{
        if ($("#document_take_image").length > 0)
            $("#document_take_image").addClass("disabled");
        if ($('#front_side_image').length > 0 && $('#back_side_image').length > 0) {
            $('#front_side_image').addClass("disabled");
            $('#back_side_image').addClass("disabled");
        }
    }


}

//Edit Pancard
function editDocument(id) {
    $("#"+id).trigger( "click" );
}

//Add error for new withdrawal flow
function showWithdrawalError(id,msq) {
    if($('#error_'+id).length){
        $('#error_'+id).text(msq);
        $('#error_'+id).css("display","block");
    }
}

//Remove Error for new withdrawal flow
function removeWithdrawalError(id) {
    if($('#error_'+id).length){
        $('#error_'+id).text("");
        $('#error_'+id).css("display","none");
    }
}

// Remove all Errors at once
function removeAllwithdrawalError() {
    $(".error_tooltip").each(function () {
        $(this).text("");
        $(this).css("display","none");
    })
}

function uploadPancard() {
    $("#pancard-upload").addClass("disabled");
    var ekycPancardUploadURL = "withdrawal?task=withdrawal.uploadEkycDocuments";
    var pancard = $("#pancard")[0];
    if(pancard.value == "")
        return false;
    if(validateFile(pancard.id, pancard) == false){
        $("#"+pancard.id+"-upload").addClass("disabled");
        return false;
    }

    var formData = new FormData();
    formData.append('files1', pancard.files[0]);
    formData.append('doctype1', 'PAN_CARD');
    formData.append('document', 'PAN_CARD');
    formData.append('isAjax', 'true');
    var params = formData;
    startAjaxFileUpload(ekycPancardUploadURL, params, getPancardUploadResponse, 'null',function () {
        loader(true)
    },function () {
        loader(false)
    });
}

function getPancardUploadResponse(result) {
    if(validateSession(result) == false)
        return false;

    var res = $.parseJSON(result);
    if(res.errorCode != 0) {
        alertModal(res.respMsg);
        $("#pancard-upload").removeClass("disabled");
        return false;
    }
    $("#pancard-upload").removeClass("disabled");
    docmnt = res.document;
    kycModal("verify_pancard");

}

//Manual upload of document trigger
function documentBrowse(e) {
    var doc = $("#document_select").val();
    if(doc == ""){
        showWithdrawalError("document_select","Please select document");
        $("#"+e.id).val("");
        return false;
    }
    removeToolTipError("all");
    if(e.value == "")
        return false;
    if(validateFile(e.id, e) == false){
        $("#document_upload").addClass("disabled");
        return false;
    }

    var front = $("#document_frontside").val();
    var back = $("#document_backside").val();
    var fileName = e.files[0].name;
    $("#"+e.id+"_displayname").val(fileName);
    if(front != "" && back != "" ){
            $("#document_upload").removeClass("disabled");
        if($('#document_take_image').length>0)
            $("#document_take_image").addClass("disabled");
        if($('#front_side_image').length > 0 && $('#back_side_image').length > 0){
            $('#front_side_image').addClass("disabled");
            $('#back_side_image').addClass("disabled");
        }
    }
    $("#"+e.id+"_browse").css("display","none");
    $("#"+e.id+"_document_action").css("display","block");

}

function uploadDocument() {
    $("#document_upload").addClass("disabled");
    var ekycPancardUploadURL = "withdrawal?task=withdrawal.uploadEkycDocuments";
    var frontside = $("#document_frontside")[0];
    var backside = $("#document_backside")[0];
    if(frontside.value == "" && backside.value == ""){
        alertModal("Please select both front side and back side image.");return false;
    }

    if(validateFile(frontside.id, frontside) == false){
        $("#document_upload").addClass("disabled");
        return false;
    }

    if(validateFile(backside.id, backside) == false){
        $("#document_upload").addClass("disabled");
        return false;
    }
    var docmnt = $("#document_select").val();
    var formData = new FormData();
    formData.append('files1', frontside.files[0]);
    formData.append('doctype1', docmnt);
    formData.append('files2', backside.files[0]);
    formData.append('doctype2', docmnt+'_BACKSIDE');
    formData.append('document', docmnt);
    formData.append('isAjax', 'true');
    var params = formData;
    startAjaxFileUpload(ekycPancardUploadURL, params, getDocumentUploadResponse, 'null',function () {
        loader(true);
    },function () {
        loader(false);
    });
}

function getDocumentUploadResponse(result) {
    if(validateSession(result) == false)
        return false;

    var res = $.parseJSON(result);
    if(res.errorCode != 0) {
        alertModal(res.respMsg);
        $("#document_upload").removeClass("disabled");
        return false;
    }
    $("#document_upload").removeClass("disabled");
    docmnt = res.document;
    kycModal("verify_document");

}



function loader(show = true) {
    if(show){
        $("#loadingImage").remove();
        $("body").append('<div id="loadingImage"><img src="https://d7hf0c5vwwy8u.cloudfront.net/images/kpr/loading3.gif" /></div>');
        $("#loadingImage").css("display", "block");
        $("#loadingImage").focus();
    }else{
        $("#loadingImage").remove();
    }
}

function verifyeKYC(isEkyc = true) {

    if(isEkyc) {
        if (docmnt != "") {
            $("#verify_pancard_btn").attr("disabled","disabled");
            var params = 'isAjax=true&document=' + docmnt;
	startAjaxVerify("/withdrawal?task=withdrawal.verifyEkyc", params, getVerifyEkycResponse,"null");
        } else {
            alertModal("Invalid Document Type.");
            return false;
        }
    }else{
        if(docmnt == "PAN_CARD")
        {
            location.href = "/ekyc";
        }else{
            location.href = "/my-profile";
        }

    }

}

function getVerifyEkycResponse(result) {
    if(validateSession(result) == false)
        return false;
    $("#verify_pancard_btn").css("pointer-events","auto");
    var res = $.parseJSON(result);
    if(res.errorCode != 0) {
        if(res.document == "PAN_CARD"){
            alertModal(res.respMsg);return false;
        }else{
            location.href = "/my-profile";return false;
        }

    }
    if(res.document != "PAN_CARD")
        location.href="/my-profile";
    else
        location.href="/ekyc";
}

function sendPic(e) {
    var document = $('#'+e.id).attr("data-document");
    if(document == "DOCS"){
        if(e.id == "myFileInput2"){
            uploadTakeImage(document);
        }
    }else{
        uploadTakeImage(document);
    }
}

function uploadTakeImage(type) {
    var ekycPancardUploadURL = "withdrawal?task=withdrawal.uploadEkycDocuments";
    if(type == "SELFIE" || type == "PAN_CARD"){
        docmnt = type;
        var file = $("#myFileInput1")[0];
        var formData = new FormData();
        formData.append('files1', file.files[0]);
        formData.append('doctype1', type);
        formData.append('document', type);
        formData.append('isAjax', 'true');
    }else{

        var frontside = $("#myFileInput1")[0];
        var backside = $("#myFileInput2")[0];
        if(frontside.value == "" && backside.value == ""){
            alertModal("Please select both front side and back side image.");return false;
        }
        docmnt = $("#document_select").val();
        if(docmnt == ""){
            showWithdrawalError("document_select","Please select Document");
        }
        var formData = new FormData();
        formData.append('files1', frontside.files[0]);
        formData.append('doctype1', docmnt);
        formData.append('files2', backside.files[0]);
        formData.append('doctype2', docmnt+'_BACKSIDE');
        formData.append('document', docmnt);
        formData.append('isAjax', 'true');

    }
    var params = formData;
    startAjaxFileUpload(ekycPancardUploadURL, params, getTakeImageResponse, 'null',function () {
        loader(true);
    },function () {
        loader(false);
    });
}

function getTakeImageResponse(result) {
    if(validateSession(result) == false)
        return false;

    var res = $.parseJSON(result);
    if(res.errorCode != 0) {
        alertModal(res.respMsg);
        $("#document_upload").removeClass("disabled");
        return false;
    }
    $("#document_upload").removeClass("disabled");
    docmnt = res.document;
    if(docmnt == "SELFIE"){
        location.href = "/ekyc";
    }else if(docmnt == "PAN_CARD"){
        kycModal("verify_pancard");
    }else{
        kycModal("verify_document");
    }

}

function uploadPCImage(data) {
    var ekycPancardUploadURL = "withdrawal?task=withdrawal.uploadEkycDocuments";
    var type ="SELFIE";
    var formData = new FormData();
    formData.append('files1', file);
    formData.append('doctype1', type);
    formData.append('document', type);
    formData.append('isAjax', 'true');
    var params = formData;
    startAjaxFileUpload(ekycPancardUploadURL, params, getTakeImageResponse, 'null',function () {
        loader(true);
    },function () {
        loader(false);
    });
}