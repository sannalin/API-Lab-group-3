const { Board, Servo } = require("johnny-five");
const board = new Board({ port: "COM9" });

const express = require("express");

const app = express();

let servoOn = false;

// when the arduino is connected run the function
board.on("ready", () => {
  // set the servo to pin 10 and also set the starting position to center by default 90 degrees
  const servo = new Servo({ pin: 10, startAt: 180 });

  // listen to local port 3001 using the express API to read the
  app.listen(3002, () => {});
  app.use(express.static("public"));
  app.use(express.json());

  // functions for setting the different movements for indicating soil moisture

  // soil moisture are very low
  function angrySweep() {
    // the servo will sweep between 85 and 95 degrees in 75 ms after 5000ms the servo will stop and return to a position of 90 degrees
    servo.sweep({
      range: [180, 155],
      interval: 60,
    });
    setTimeout(function stop() {
      servo.stop();
      servo.home(180);
      servoOn = false;
    }, 4000);
  }

  // the servo will sweep between 83 and 97 degrees in 300 ms after 5000ms the servo will stop and return to a position of 90 degrees
  // soil moisture starts to get low, needs water
  function waterSweep() {
    servo.sweep({
      range: [180, 160],
      interval: 150,
    });
    setTimeout(function stop() {
      servo.stop();
      servo.home(180);
      servoOn = false;
    }, 5000);
  }

  // the servo will sweep between 80 and 100 degrees in 1500 ms after 8000ms the servo will stop and return to a position of 90 degrees
  // sufficient soil moisture
  function happySweep() {
    servo.sweep({
      range: [180, 150],
      interval: 600,
    });
    setTimeout(function stop() {
      servo.stop();
      servo.home(180);
      servoOn = false;
    }, 8000);
  }

  // When fetch for "/plantMove" with POST happens run the function that will run teh function for movement.
  app.post("/plantMove", (request, response) => {
    if (servoOn === false) {
      servoOn = true;
      //happySweep();
      waterSweep();
       //angrySweep();
    }
    response.json({
      status: "success",
    });
  });
});
