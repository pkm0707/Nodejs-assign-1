const express = require("express"); //inbuilt package
const fs = require("fs");
const app = express();
const PORT = 5000;
// home page
app.get("/", (req, res) => {
  res.send("Hi Everyone !");
});

//API 1
app.get("/createfile", (req, res) => {
  const currentDate = new Date();
  //padStart - restricting the result to 2 digits and 0 will be added to prefix to make it 2 digits
  const formatedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
  const formatedTime = currentDate.getHours();
  console.log(formatedDate, formatedTime);
  //file name as date-time.text
  const fileName = `${formatedDate}_${formatedTime}.txt`;
  console.log(fileName);
  const timestamp = currentDate.toISOString();
  const content = `TimeStamp: ${timestamp}`;
  console.log(content);

  fs.writeFile(`./createfilefolder/${fileName}`, content, (err) => {
    if (err) console.log(err);
    console.log(`File: ${fileName} is created successfully`);
  });
  res.send({ TimeStamp: fileName });
});

// //API 2
// app.get("/retrivefile", (req, res) => {
//   var output = [];
//   //read directory
//   fs.readdir("./retrivefolder", (files) => {
//     files.forEach((fileName) => {
//       output.push({ files_updated: fileName });
//     });
//     res.send(output);
//     console.log(output)
//   });
// });

app.listen(PORT, () => console.log("Successfull 😊", PORT)); //port number to listen

// fs.readdir("./backup",(err,data)=>{
//     data.forEach(fileName =>{
//         fs.unlink("./backup",()=>{console.log("Deleted Succesfully",fileName)})
//     })
// })