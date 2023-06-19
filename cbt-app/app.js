/** 
 * エントリーポイント。アプリ全体に共通する処理を記載。
 * @author Enomoto kazuki
 */
const PORT = 3000;
const express = require("express");
const app = express();
const loginRouter = require("./routes/loginRouter.js");
const bodyParser = require("body-parser");


//静的ファイルの使用
app.use(express.static(__dirname+"/public"));

//テンプレートエンジンの指定
app.set("view engine","ejs");

//body-parserの使用
app.use(bodyParser.urlencoded({ extended: true }));
//ルーティング
app.use(loginRouter);

//listen開始
app.listen(PORT,()=>{
  console.log("server start");
});