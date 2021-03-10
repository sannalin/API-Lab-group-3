console.log("Ready!")

const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");
let plantVideo = document.getElementById("movement");

let isVideo = false;
let model = null;

const modelParams = {
    flipHorizontal: true,   // flip e.g for video  
    maxNumBoxes: 1,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions.
}

function startVideo() {
    handTrack.startVideo(video).then(function(status) {
        console.log("video started", status);
        if (status) {
            updateNote.innerText = "Video started. Now tracking"
            isVideo = true
            runDetection()
        } else {
            updateNote.innerText = "Please enable video"
        }
    });
}

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
}

function runDetection() {
    model.detect(video).then(predictions => {
        console.log("Predictions: ", predictions);
        model.renderPredictions(predictions, canvas, context, video);
        if (isVideo) {
            requestAnimationFrame(runDetection);
        }
    });
}

function movePlant() {
       model.detect(video).then((predictions) => {
        if (predictions[0]) {
            model.renderPredictions(predictions, canvas, context, video);
            /* console.log("Predictions: ", predictions[0]); */
            let x = predictions[0].bbox[0] + predictions[0].bbox[2] / 2;
            console.log("x: " + x);
            if (x < 300) {
                playVideo();
            } 
            /* else if (x > 500) {
                movePlant();
            }*/
        }
        setTimeout(() => {
            runDetection();
        }, 1000);
        });
    }

function playVideo() {
    console.log("Shaking plant");
    $('#movement').trigger('play');
    }

handTrack.load(modelParams).then(lmodel => {
        // detect objects in the image.
    model = lmodel
    updateNote.innerText = "Model loaded!"
    console.log("Model loaded!");
    trackButton.disabled = false
});