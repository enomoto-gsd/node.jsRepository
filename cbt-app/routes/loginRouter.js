/**
 * ログインのルーティング処理を記述
 * @author Enomoto Kazuki
 */
const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;
const { URL, DATABASE, OPTIONS } = require("../config/dbConfig");
const checkValidation = require("../public/javascript/checkValidation")


//フラッシュメッセージを使用するためのミドルウェア
router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

router.get("/login", (req, res) => {
  if(req.cookies.mail_address === null ){
    let cookieMailAddress = req.cookies.mail_address;
    res.render("./login.ejs",{"mail_address":cookieMailAddress});
    return;
  }
  res.render("./login.ejs");
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

      //バリデーション処理。メッセージが返った場合、ログイン画面にリダイレクトし、フラッシュメッセージを表示
      let validate = checkValidation.checkValidationMethod(req.body);
      if (validate !== null) {
        res.locals.flashMessages = req.flash();
        req.flash('error', validate);
        res.redirect('/login');
        return;
      }

      //ユーザー情報取得確認の処理
      if (userData !== null && password === userData.password) {
        req.session.login = userData.user_name;
        res.render("./column_list.ejs", { loginUser: req.session.login });
        return;
      }
      res.cookie('mail_address',mail_address);
      res.locals.flashMessages = req.flash();
      req.flash('error', 'ユーザーIDまたはパスワードが不正です。');
      res.redirect("/login");
      client.close();
    });
  });
});




module.exports = router;
