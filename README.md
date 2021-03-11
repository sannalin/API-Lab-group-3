# Handtrack.js
Handtrack.js library allows you track a user’s hand (bounding box) from an image in any orientation, in 3 lines of code. It allows developers quickly prototype hand/gesture interactions powered by a trained hand detection model.
> View a live demo in your [browser here](https://victordibia.github.io/handtrack.js/).
> https://victordibia.com/handtrack.js/#/

# What the project does
Our goal is to make it possible to start an interaction with a plant, using hand gesture. The concept is that our special pot has a camera and when the API detects a hand, a plant starts to move, showing its state.

# Why the project is useful
We wanted to explore users' gestures and distance from a plant, which they would naturally use to start an interaction. Since we had only a proximity sensor in mind before, we wanted to explore this area deeper and decide if the hand gestures detection could better contribute to our project.

# How users can get started with the project
### via Script Tag

You can use the library by including it in a javacript script tag.

```html

<!-- Load the handtrackjs model. -->
<script src="https://cdn.jsdelivr.net/npm/handtrackjs/dist/handtrack.min.js"> </script>

<!-- Replace this with your image. Make sure CORS settings allow reading the image! -->
<img id="img" src="hand.jpg"/> 
<canvas id="canvas" class="border"></canvas>

<!-- Place your code in the script tag below. You can also use an external .js file -->
<script>
  // Notice there is no 'import' statement. 'handTrack' and 'tf' is
  // available on the index-page because of the script tag above.

  const img = document.getElementById('img'); 
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  
  // Load the model.
  handTrack.load().then(model => {
    // detect objects in the image.
    model.detect(img).then(predictions => {
      console.log('Predictions: ', predictions); 
    });
  });
</script>
```

### via NPM

```shell
npm install --save handtrackjs
```

```js
import * as handTrack from 'handtrackjs';

const img = document.getElementById('img');

// Load the model.
handTrack.load().then(model => {
  // detect objects in the image.
  console.log("model loaded")
  model.detect(img).then(predictions => {
    console.log('Predictions: ', predictions); 
  });
});
```



## API

####  Loading the model: handTrack.load()
Once you include the js module, it is available as `handTrack`. You can then load a model with optional parameters.

```js

const modelParams = {
  flipHorizontal: true,   // flip e.g for video 
  imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
  maxNumBoxes: 20,        // maximum number of boxes to detect
  iouThreshold: 0.5,      // ioU threshold for non-max suppression
  scoreThreshold: 0.79,    // confidence threshold for predictions.
}

handTrack.load(modelParams).then(model => {

});

```
Returns a `model` object.

#### Detecting hands: model.detect()
`model.detect` takes an input image element (can be an `img`, `video`, `canvas` tag) and returns an array of bounding boxes with class name and confidence level.

```js
model.detect(img).then(predictions => { 
        
});
```

Returns an array of classes and confidence scores that looks like:

```js
[{
  bbox: [x, y, width, height],
  class: "hand",
  score: 0.8380282521247864
}, {
  bbox: [x, y, width, height],
  class: "hand",
  score: 0.74644153267145157
}]
```

# Who maintains and contributes to the project
Handtrack.js is made by Victor Dibia (https://github.com/victordibia/handtrack.js/) and we used his examples as templates for our prototypes. The prototypes are made by Anna Korczak, Carlo Sicanica and Sanna Lindholm.

## License
[MIT](https://choosealicense.com/licenses/mit/)
