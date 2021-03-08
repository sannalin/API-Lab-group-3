const { Board, Servo } = require("johnny-five");
const board = new Board({ port: "COM3" });

const express = require("express");

const app = express();

let servoOn = false;

// when the arduino is connected run the function
board.on("ready", () => {
  const servo = new Servo({ pin: 10, range: [45, 135], center: true });

  // servo.sweep();
  //servo.stop();
  //servo.home();

  app.listen(3001, () => {});
  app.use(express.static("public"));
  app.use(express.json());

  // When fetch for "/set-arduino-light" with POST happens run the function.
  app.post("/set-arduino-light", (request, response) => {
    if (servoOn == false) {
      servo.sweep();
    } else {
      servo.stop();
    }
    servoOn = !servoOn;

    response.json({
      status: "success",
    });
  });
});
