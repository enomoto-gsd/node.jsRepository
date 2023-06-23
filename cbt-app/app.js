/** 
 * エントリーポイント。アプリ全体に共通する処理を記載。
 * @author Enomoto kazuki
 */
const PORT = 3000;
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {ses_conf} = require("./config/sessionConfig.js")
const session = require("express-session");
let flash = require("connect-flash"); 
const app = express();
const loginRouter = require("./routes/loginRouter.js");
const logoutRouter = require("./routes/logoutRouter.js")



//テンプレートエンジンの指定
app.set("view engine","ejs");

//セッションの使用
app.use(session(ses_conf));

//クッキーの使用(flashメッセージ使用のために必要)
app.use(cookieParser());
app.use(flash());

//静的ファイルの使用
app.use(express.static(__dirname+"/public"));

//body-parserの使用
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser('keyboard cat'));

//ルーティング
app.use(loginRouter);
app.use(logoutRouter);

//listen開始
app.listen(PORT,()=>{
  console.log("server start");
});