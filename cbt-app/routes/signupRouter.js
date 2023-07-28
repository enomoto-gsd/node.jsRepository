/**
 * ユーザー登録のルーティング処理を記述
 * @author Kazuki Enomoto
 */

const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;

const { URL, OPTIONS, DATABASE } = require("../config/dbConfig");
const checkSignupValidation = require("../public/javascript/checkSignupValidation");

router.get("/signup", (req, res) => {
  //リクエストヘッダーに設定されたCookieを読み取る
  let cookieMailAddress = req.cookies.signup_mail_address;
  let cookieUserName = req.cookies.signup_user_name;

  res.render("./signup.ejs", { "signup_mail_address": cookieMailAddress, "signup_user_name": cookieUserName });
});

router.post("/signup", (req, res) => {
  let user_name = req.body.user_name;
  let mail_address = req.body.mail_address;
  let password = req.body.password;

  //バリデーション処理。メッセージが返った場合、ログイン画面にリダイレクトし、フラッシュメッセージを表示
  let validate = checkSignupValidation.checkSignupValidationMethod(req.body);
  if (validate !== null) {
    //cookieにメールアドレスを格納する。有効期限は10秒間
    res.cookie('signup_mail_address', mail_address, { maxAge: 1000 });
    res.cookie('signup_user_name', user_name, { maxAge: 1000 });
    res.locals.flashMessages = req.flash();
    req.flash('error', validate);
    res.redirect('/signup');
    return;
  }

  //ユーザー情報の新規登録
  MongoClient.connect(URL, OPTIONS, (err, client) => {
    if (err) {
      res.redirect("/login");
      client.close();
      return;
    }
    let db = client.db(DATABASE);

    //既存ユーザーチェック処理
    db.collection("users").findOne({ mail_address: mail_address }, (err, userData) => {
      if (userData === null) {
        //ユーザーが存在しない場合、新規登録を行う
        db.collection("users").insert({
          mail_address: mail_address,
          user_name: user_name,
          password: password
        }, (err) => {
          if (err) throw err;
          client.close();
          res.redirect("/login");
          return;
        })
        return;
      }
      //ユーザーが既に存在している場合、フラッシュメッセージを返す
      req.flash('error', 'そのメールアドレスは既に登録済みです');
      res.redirect("/signup");
      client.close();
    })
    client.close();
    res.redirect("/login");
  });
})


module.exports = router;