/** 
 * エントリーポイント。アプリ全体に共通する処理を記載します。
 * @author Enomoto kazuki
 */
const PORT = 3000;
const express = require("express");
const app = express();
const loginRouter = require("./routes/loginRouter.js");

//静的ファイルの使用
app.use(express.static(__dirname+"/public"));

//テンプレートエンジンの指定
app.set("view engine","ejs");

//ルーティング
app.use(loginRouter);

//listen開始
app.listen(PORT,()=>{
  console.log("server start");
});