/**
 * コラム登録画面のルーティング処理を記述
 * @author Enomoto Kazuki
 */
const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;
const { URL, DATABASE, OPTIONS } = require("../config/dbConfig");

router.get("/column_regist", (req, res) => {
  //セッション情報の取得
  let userName = req.session['userName'];
  let userId = req.session['userId'];
  //セッション情報の確認
  if (userName === undefined && userId === undefined) {
    //セッションに情報がない場合,ログインにリダイレクト
    res.redirect("/login");
    return;
  }

  //配列を作成し、空のデータを代入する
  let registerForm = {};
  registerForm.register_date;
  registerForm.event = "";
  registerForm.automa_thoughts = "";
  registerForm.emotion = "";
  registerForm.thoughts_proof = "";
  registerForm.thoughts_disproof = "";
  registerForm.adapt_thinks = "";
  registerForm.next_action = "";

  //モードの指定
  let mode = "register";

  res.render("./column_register.ejs", { userName: userName, registerForm: registerForm, mode : mode })
});

router.post("/column_regist", (req, res) => {
  //セッション情報の取得
  let userId = req.session['userId'];
  let userName = req.session['userName'];
  if (userName === undefined && userId === undefined) {
    //セッションに情報がない場合,ログインにリダイレクト
    res.redirect("/login");
    return;
  }

  //bodyの登録日時をISODateに変換する
  let register_date = req.body.register_date;
  let ISOregister_date = new Date(register_date);

  //DB接続を行い、column_listドキュメントに登録処理を行う
  MongoClient.connect(URL, OPTIONS, (err, client) => {
    if (err) {
      res.redirect("/login");
      client.close();
      return;
    }
    let db = client.db(DATABASE);
    db.collection("column_list").insert({
      register_date: ISOregister_date,
      event: req.body.event,
      automa_thoughts: req.body.automa_thoughts,
      emotion: req.body.emotion,
      thoughts_proof: req.body.thoughts_proof,
      thoughts_disproof: req.body.thoughts_disproof,
      adapt_thinks: req.body.adapt_thinks,
      user_id: userId,
      next_action: req.body.next_action
    }, (err) => {
      if (err) throw err;
      client.close();
      res.redirect("/column_list");
      return;
    })
  })
})
module.exports = router;