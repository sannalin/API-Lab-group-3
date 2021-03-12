# Prototype, for starting a servo motor with hand gesture

Using the API Handtrack.js and johnny-five to be able to start an Arduino servo motor by showing a hand to the camera.

This code was developed for testing the starting interaction and the response movements between a person and a pot that indicates different water states.

## Getting started

1. Make sure you have the StandarFirmata flashed to your Arduino device
2. Adjust the port and pins according to your set up
3. Run the following commands:
   ```sh
   npm install
   node app.js
   ```
4. Open http://localhost:3001

## Contributor

This code was made by Sanna Lindholm based on code from:

- https://github.com/victordibia/handtrack.js/#via-script-tag

- https://medium.com/@larry.sassainsworth/getting-started-with-handtrack-js-ebd7c9d16c0

- Workshop: API 3 with Peter Tolstrup Aagesen 2021-03-02
  https://github.com/helmersson/Arduino-examples/blob/main/public/index.html

- Code Train - https://www.youtube.com/watch?v=Kw5tC5nQMRY

- johnny-five - http://johnny-five.io/examples/
