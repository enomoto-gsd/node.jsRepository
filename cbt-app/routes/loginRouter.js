/**
 * ログインのルーティング処理を記述
 * @author Enomoto Kazuki
 */
const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;
const { URL, DATABASE, OPTIONS } = require("../config/dbConfig");

let validteCheckMethod = (body)=>{
  let validatedMessage =  "";
  if(body.mail_address === null || body.password === null){

    return "メールアドレス、またはパスワードを入力してください";
  }
}

//フラッシュメッセージを使用するためのミドルウェア
 router.use((req, res, next) => {
   res.locals.flashMessages = req.flash();
   next();
 });

router.get("/login", (req, res) => {
  res.render("./login.ejs");
  //res.render("./login_alter.ejs",{title:"ログイン"});
});

router.post("/login", (req, res) => {
  //メールアドレス、パスワードをリクエストボディから取得
  let mail_address = req.body.mail_address;
  let password = req.body.password;

  //DB接続、ユーザー情報取得処理
  MongoClient.connect(URL, OPTIONS, (err, client) => {
    let db = client.db(DATABASE);
    db.collection("users").findOne({
      mail_address: mail_address
    }, (err, userData) => {
      if (err) {
        //DB接続でエラーがあった場合,、ログイン画面にリダイレクト
        res.redirect("/login");
        client.close();
        return;
      }
      //バリデーション処理
      let validate = validteCheckMethod(req.body);

      if (userData !== null && password === userData.password) {
        req.session.login = userData.user_name;
        res.render("./column_list.ejs",{loginUser: req.session.login});
      } else {
        res.locals.flashMessages = req.flash();
        req.flash('error','ユーザーIDまたはパスワードが不正です。');
        res.redirect('/login');
      }
      client.close();
    })
  })
});

module.exports = router;
