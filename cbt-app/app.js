const express = require("express");
const app = express();
const ejs = require("ejs");

let loginRouter = require("./routes/loginRouter.js");

app.use("view engine","ejs");
app.use("/login",loginRouter);

//listen開始
app.listen(3000);