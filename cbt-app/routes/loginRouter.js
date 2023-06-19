/**
 * ログインのルーティング処理を記述
 * @author Enomoto Kazuki
 */
const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;
const { URL, DATABASE, OPTIONS } = require("../config/dbConfig");
//const auth = require("../crud/auth.js");

router.get("/login", (req, res) => {
  res.render("./login.ejs", { title: "ログイン" });
  //res.render("./login_alter.ejs",{title:"ログイン"});
});

router.post("/login", (req, res) => {
  //メールアドレス、パスワードをリクエストボディから取得
  let mail_address = req.body.mail_address;
  let password = req.body.password;
  console.log(mail_address);
  console.log(password);

  let query = { "mail_address": mail_address, "password": password };

  MongoClient.connect(URL, (err, client) => {
    let db = client.db(DATABASE);
    db.collection("users").find(query).toArray((error, document) => {
      console.log(document);
      res.render("./column_list.ejs");
      db.close();
    })   
    });
  });
module.exports = router;
