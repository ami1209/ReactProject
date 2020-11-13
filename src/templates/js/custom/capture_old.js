const videoPlayer = document.querySelector("#player");
const canvasElement = document.querySelector("#canvas");
const captureButton = document.querySelector("#capture-btn");
const imagePicker = document.querySelector("#image-picker");
const imagePickerArea = document.querySelector("#pick-image");
const newImages = document.querySelector("#newImages");

// Image dimensions
const width = 320;
const height = 240;




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
        })
        .catch(err => {
            imagePickerArea.style.display = "block";
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
    
    // Save the file by posting it to the server
    fetch("withdrawal?task=withdrawal.uploadImage", {
        method: "post",
        body: JSON.stringify({ files1: picture,doctype1:window.name,document:window.name,isAjax:true })
    })
        .then(res => res.json())
        .then(data => {
            if (data.respMsg) {
                alert(data.respMsg);

            }
        })
        .catch(error => console.log(error));
});

window.addEventListener("load", event => startMedia());
