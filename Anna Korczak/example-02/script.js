//console log to know if everything is connected
console.log("Ready!")
//variables
const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let model = null;
isVideo = false;
//setting model parameters
const modelParams = {
    flipHorizontal: true, // flip e.g for video
    //imageScaleFactor: 0.7, // reduce input image size for gains in speed
    maxNumBoxes: 1, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.75, // confidence threshold for predictions.
};
//function, which starts the video with detection
function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        if (status) {
            logOutput("Video started, wait...");
            isVideo = true;
            runDetection();
        } else {
            logOutput("Please enable video.");
        }
    });
};
//button function, which allows to toggle video
function toggleVideo() {
    if (!isVideo) {
        logOutput("Starting video...");
        startVideo();
    } else {
        logOutput("Stopping video...");
        handTrack.stopVideo(video);
        isVideo = false;
        logOutput("Video stopped.");
    }
};
//function, which logs what is happening on the side
function logOutput(txt) {
    document
        .querySelector("#output")
        .appendChild(document.createElement("p")).textContent = txt;
};
//function, which states condition for detecting hand's position on the canvas
function runDetection() {
    model.detect(video).then((predictions) => {
        if (predictions[0]) {
            model.renderPredictions(predictions, canvas, context, video);
            console.log("Predictions: ", predictions[0]);
            let x = predictions[0].bbox[0] + predictions[0].bbox[2] / 2;
            console.log("x: " + x);
            if (x < 300) {
                logOutput("LEFT");
            } else if (x > 300) {
                logOutput("RIGHT");
            } else {
                logOutput("Hand position not recognized");
            }
        };
        //checks predictions and logs output every 2 seconds
        setTimeout(() => {
            runDetection();
        }, 2000);
    });
};
//load the handtrack.js model
handTrack.load(modelParams).then((_model) => {
    model = _model;
    logOutput("Model loaded!");
    console.log("Model loaded!");
    trackButton.disabled = false;
});