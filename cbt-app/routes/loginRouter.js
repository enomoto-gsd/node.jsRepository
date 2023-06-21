/**
 * ログインのルーティング処理を記述
 * @author Enomoto Kazuki
 */
const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;
const { URL, DATABASE, OPTIONS } = require("../config/dbConfig");


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
        res.render("./login.ejs");
        client.close();
        return;
      }

      if (userData !== null && password === userData.password) {
        req.session.login = userData.user_name;
        console.log(req.session.login);
        res.render("./column_list.ejs",{loginUser: req.session.login});
      } else {
        req.flash('err', '入力内容に一致したないようがありません。');
        res.redirect('/login');
      }
      client.close();
    })
  })
});

module.exports = router;
