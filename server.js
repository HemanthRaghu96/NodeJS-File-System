const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Get current timestamp for file name
let currentTime = new Date();
let year = currentTime.getFullYear();
let month = (currentTime.getMonth() + 1).toString().padStart(2, "0");
let day = currentTime.getDate().toString().padStart(2, "0");
let hours = currentTime.getHours();
let ampm = hours >= 12 ? "PM" : "AM";
hours = (hours % 12).toString().padStart(2, "0");
let minutes = currentTime.getMinutes().toString().padStart(2, "0");
let seconds = currentTime.getSeconds().toString().padStart(2, "0");
let currentTimeStamp = `${hours}-${minutes}-${seconds} ${ampm}`;
let fileName = `${day}-${month}-${year}-${hours}-${minutes}-${seconds}`;

// Route for the homepage
app.get("/", (req, res) => {
  res.send("NodeJS File System");
});

// Route for writing to file
app.get("/write", (req, res) => {
  // Write current timestamp to a text file
  fs.writeFileSync(
    `./TextFiles/${fileName}.txt`,
    `current TimeStamp - ${currentTimeStamp.toString()}`,
    (err) => {
      if (err) {
        console.log("Error Occurred", err);
      } else {
        console.log(`${fileName}.txt Added`);
      }
    }
  );

  // Send response confirming file addition
  res.send(`${fileName}.txt file added successfully`);
});

// Route for reading all file names in the TextFiles directory
app.get("/read", (req, res) => {
  fs.readdir("./TextFiles", (err, files) => {
    res.send(`All file names are ${files}`);
  });
});

// Default route for handling 404 errors
app.get('/*',(req,res)=>{
    res.send(`404 Page not found`)
});

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
