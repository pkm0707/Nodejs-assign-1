const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 5000;
// home page
app.get("/", (req, res) => {
  res.send("Hi Everyone, Its Batman 🦇!");
});

//API-Call-1
app.get("/createfile", (req, res) => {
  const currentDate = new Date();
  const formatedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
  const formatedTime = `(${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()})`
  console.log(formatedDate, formatedTime);
  //file name as date-time.text
  const fileName = `${formatedDate}_${formatedTime}.txt`;
  const timestamp = currentDate;
  const content = `TimeStamp: ${timestamp}`;
  fs.writeFile(`./createfilefolder/${fileName}`, content, (err) => {
    if (err) console.log(err);
    console.log(`File: ${fileName} is created successfully`);
  });
  res.send({ TimeStamp: fileName });
});

//API-Call-2
app.get("/retrievefile", (req, res) => {
    var output = [];
    //read directory
    fs.readdir("./createfilefolder", (err, data) => {
      data.forEach((fileName) => {
        output.push({ file_in_Available: fileName });
      });
      res.send(output);
    });
});

app.listen(PORT, () => console.log("Successfull 😊", PORT)); //port number to listen
