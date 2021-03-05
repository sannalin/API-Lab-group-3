const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");



let imgindex = 1
let isVideo = false;
let model = null;

// video.width = 500
// video.height = 400

const modelParams = {
    flipHorizontal: true,   // flip e.g for video  
    maxNumBoxes: 1,        // maximum number of boxes to detect
    iouThreshold: 1,      // ioU threshold for non-max suppression
    scoreThreshold: 0.75,    // confidence threshold for predictions.
}

function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        console.log("video started", status);
        if (status) {
            isVideo = true
            runDetection()
        }
    });
}

startVideo();

let lastMov = 0;
let actualMov = 0;
let frame = 0;
let frameMax = 2;

function runDetection() {
    frame++;
    model.detect(video).then(predictions => {
        console.log("Predictions: ", predictions);
        model.renderPredictions(predictions, canvas, context, video);
        actualMov = predictions.length > 0 ? predictions[0].bbox[0] : 0;
        
        if(frame==frameMax) mousemovemethod(actualMov)
        if (isVideo) {
            requestAnimationFrame(runDetection);
        }
    });
}

var direction = ""
const error = 4;
const ok = 20;
var mousemovemethod = function () {
    frame = 0
    lastMov = Math.round(lastMov)
    actualMov = Math.round(actualMov)
    if(lastMov!=0 && actualMov!=0){
        if(actualMov < lastMov + error && actualMov > lastMov - error){
            direction = 'center'
        }else if (actualMov < lastMov+ok) {
            direction = "left"
            document.getElementById("direction").classList.add('left');
            document.getElementById("direction").classList.remove('rigth');
        } else if (actualMov + ok > lastMov) {
            direction = "right"
            document.getElementById("direction").classList.add('rigth');
            document.getElementById("direction").classList.remove('left');
        }
    }

    if(actualMov==0 && lastMov==0) direction='center'

    lastMov = actualMov;

    console.log(direction)
}

// Load the model.
handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel
});
