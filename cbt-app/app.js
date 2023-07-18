/** 
 * エントリーポイント。アプリ全体に共通する処理を記載。
 * @author Enomoto kazuki
 */

const PORT = 3000;
const express = require("express");
const bodyParser = require("body-parser");
const {ses_conf} = require("./config/sessionConfig.js")
const session = require("express-session");
const flash = require("connect-flash"); 
const cookieParaser = require("cookie-parser");
const app = express();
//routerのインポート
const loginRouter = require("./routes/loginRouter.js");
const logoutRouter = require("./routes/logoutRouter.js");
const listRouter = require("./routes/listRouter.js");
const registRouter = require("./routes/registRouter.js");



//テンプレートエンジンの指定
app.set("view engine","ejs");

//セッションの使用
app.use(session(ses_conf));

//クッキーの使用
app.use(cookieParaser());

//フラッシュメッセージの使用
app.use(flash());

//静的ファイルの使用
app.use(express.static(__dirname+"/public"));

//body-parserの使用
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



//ルーティング
app.use(loginRouter);
app.use(logoutRouter);
app.use(listRouter);
app.use(registRouter);

//listen開始
app.listen(PORT,()=>{
  console.log("server start");
});