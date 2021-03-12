//console log to know if everything is connected
console.log("Ready!")
//variables
const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");
let plantVideo = document.getElementById("movement");
let isVideo = false;
let model = null;
//setting model parameters
const modelParams = {
    flipHorizontal: true,   // flip e.g for video  
    maxNumBoxes: 1,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions
};
//function, which starts the video with detection
function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        console.log("video started", status);
        //if the video is started, detection starts
        if (status) {
            updateNote.innerText = "Video started. Now tracking"
            isVideo = true
            runDetection()
            //otherwise, it asks to enable video
        } else {
            updateNote.innerText = "Please enable video"
        }
    });
};
//button function, which allows to toggle video
function toggleVideo() {
    if (!isVideo) {
        updateNote.innerText = "Starting video"
        startVideo();
    } else {
        updateNote.innerText = "Stopping video"
        handTrack.stopVideo(video);
        isVideo = false;
        updateNote.innerText = "Video stopped"
    }
};
//function, which shakes the plant when a hand is detected on the canvas
function runDetection() {
    model.detect(video).then((predictions) => {
        console.log("Predictions: ", predictions);
        model.renderPredictions(predictions, canvas, context, video);
        //run detection when the video is on
        if (isVideo) {
            requestAnimationFrame(runDetection);
        }
        //start shaking the plant when a hand appears on the canvas
        if (predictions.length >= 1) {
            playVideo();
        }
    });
};
//function, which enables the shaking plant video to play
function playVideo() {
    console.log("Shaky shaky")
    plantVideo.play()
};
//load the handtrack.js model
handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel
    updateNote.innerText = "Model loaded!"
    console.log("Model loaded!");
    trackButton.disabled = false
});