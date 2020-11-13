const videoPlayer = document.querySelector("#player");
const canvasElement = document.querySelector("#canvas");
const captureButton = document.querySelector("#capture-btn");
const confirmButton = document.querySelector("#confirm-btn");
const cancelButton = document.querySelector("#cancel-btn");
// Image dimensions
const width = 320;
const height = 240;
var file1="";file2="";

captureButton.textContent = "Capture "+window.name;


const startMedia = () => {
    if (!("mediaDevices" in navigator)) {
        navigator.mediaDevices = {};
    }

    if (!("getUserMedia" in navigator.mediaDevices)) {
        navigator.mediaDevices.getUserMedia = constraints => {
            const getUserMedia =
                navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            if (!getUserMedia) {
                return Promise.reject(new Error("getUserMedia is not supported"));
            } else {
                return new Promise((resolve, reject) =>
                    getUserMedia.call(navigator, constraints, resolve, reject)
                );
            }
        };
    }

    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
            videoPlayer.srcObject = stream;
            videoPlayer.style.display = "block";
            loader(false);
        })
        .catch(err => {
            alert("Video is not supported. Please use Mobile to proceed.");window.close();
        });
};

// Capture the image, save it and then paste it to the DOM
captureButton.addEventListener("click", event => {
    // Draw the image from the video player on the canvas
    canvasElement.style.display = "block";
    const context = canvasElement.getContext("2d");
    context.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);

    videoPlayer.srcObject.getVideoTracks().forEach(track => {
        // track.stop();
    });

    // Convert the data so it can be saved as a file
    let picture = canvasElement.toDataURL();
    if(window.name == "PAN_CARD" || window.name == "SELFIE"){
        if(picture == ""){
            alert("Please capture "+window.name);return false;
        }
        file1 = picture;
        captureButton.style.display = "none";
        confirmButton.style.display = "initial";
        cancelButton.style.display = "initial";
    }else{
        if(file1 == ""){
            file1 = picture;
        }else{
            file2 = picture;

        }
        captureButton.style.display = "none";
        confirmButton.style.display = "initial";
        cancelButton.style.display = "initial";
    }


});

function confirm(){
    if(window.name == "PAN_CARD" || window.name == "SELFIE"){
        var data = JSON.stringify({ files1: file1,doctype1:window.name,document:window.name,isAjax:true })
        confirmImage(data);
    }else{
        if(file2 == ""){
	    captureButton.textContent = "Capture Backside";
            captureButton.style.display = "initial";
            confirmButton.style.display = "none";
            cancelButton.style.display = "none";
	    const contxt = canvasElement.getContext("2d");
    	    contxt.clearRect(0,0,canvasElement.width,canvasElement.height);
        }else{
            var data = JSON.stringify({ files1: file1,doctype1:window.name,files2: file2,doctype2:window.name+"_BACKSIDE",document:window.name,isAjax:true })
            confirmImage(data);
        }

    }
}

function cancelImage(){
    if(file2 != ""){
        file2 = "";
    }else{
        file1 = "";
    }
    captureButton.style.display = "initial";
    cancelButton.style.display = "none";
    confirmButton.style.display = "none";
    const contxt = canvasElement.getContext("2d");
    contxt.clearRect(0,0,canvasElement.width,canvasElement.height);
}

window.addEventListener("load", event => startMedia());

function confirmImage(data) {
    var ekycPancardUploadURL = "withdrawal?task=withdrawal.uploadImage";
    startAjaxFileUpload(ekycPancardUploadURL, data, getPCImageResponse, 'null',function () {
        loader(true);
    },function () {
        loader(false);
    });
}

function getPCImageResponse(result) {
    if(validateSession(result) == false)
        return false;

    var res = $.parseJSON(result);
    if(res.errorCode != 0) {
        alertModal(res.respMsg);
        return false;
    }
    window.opener.docmnt = res.document;
    if(res.document == "SELFIE"){
        if(window.opener) {
            window.opener.location.reload();
            window.close();
        }else
            location.href = "/withdrawal";
    }else if(res.document == "PAN_CARD"){
        window.opener.kycModal("verify_pancard");window.close();
    }else{
        window.opener.kycModal("verify_document");window.close();
    }

}

$(document).ready(function () {
    loader(true);
})