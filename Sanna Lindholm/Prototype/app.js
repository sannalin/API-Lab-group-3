const { Board, Led } = require("johnny-five");
const board = new Board({ port: "COM3" });

const express = require("express");

const app = express();

let isLightOn = false;

// when the arduino is connected run the function
board.on("ready", () => {
  const led = new Led(2);

  app.listen(3001, () => {});
  app.use(express.static("public"));
  app.use(express.json());

  // When fetch for "/set-arduino-light" with POST happens run the function.
  app.post("/set-arduino-light", (request, response) => {
    if (isLightOn == false) {
      led.on();
    } else {
      led.stop().off();
    }
    isLightOn = !isLightOn;

    response.json({
      status: "success",
    });
  });
});
