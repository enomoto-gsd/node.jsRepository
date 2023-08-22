const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;
const { DATABASE, URL, OPTIONS, } = require("../config/dbConfig");
const ObjectId = require('mongodb').ObjectID;


router.get("/detail/:id", (req, res) => {
  //セッション情報の取得
  let userName = req.session['userName'];
  let userId = req.session['userId'];
  //セッション情報の確認
  if (userName === undefined && userId === undefined) {
    //セッションに情報がない場合,ログインにリダイレクト
    res.redirect("/login");
    return;
  }

  //パスパラメーター取得
  let columnId = req.params.id;

  MongoClient.connect(URL, OPTIONS, (err, client) => {
    if (err) {
      res.redirect("/login");
      client.close();
      return;
    }

    let db = client.db(DATABASE);


    db.collection("column_list").findOne({
      "_id": ObjectId(columnId), user_id: userId
    }, (err, result) => {
      if (err) {
        //DB接続でエラーがあった場合,、ログイン画面にリダイレクト
        res.redirect("/login");
        client.close();
        return;
      }

      //DBから取得した登録日時データをクライアント側のdatetime-localでも表示できるよう加工
      let parsedDate = result.register_date.toISOString();
      slicedDate = parsedDate.slice(0, -5);

      //連想配列を作成、検索結果の格納
      let registerForm = {};
      registerForm._id = result._id;
      registerForm.register_date = slicedDate;
      registerForm.event = result.event;
      registerForm.automa_thoughts = result.automa_thoughts;
      registerForm.emotion = result.emotion;
      registerForm.thoughts_proof = result.thoughts_proof;
      registerForm.thoughts_disproof = result.thoughts_disproof;
      registerForm.adapt_thinks = result.adapt_thinks;
      registerForm.next_action = result.next_action;

      //モードの指定
      let mode = "readOnly"

      client.close();
      res.render("./column_register.ejs", { userName: userName, registerForm: registerForm, mode: mode });
    });

  });
});




router.post("/detail", (req, res) => {
  let userName = req.session['userName'];
  let userId = req.session['userId'];
  let mode = req.body.mode;
  let columnId = req.body.columnId;
  console.log(mode);
  console.log(columnId);

  if (userName === undefined && userId === undefined) {
    //セッションに情報がない場合,ログインにリダイレクト
    res.redirect("/login");
    return;
  }


  if (mode === "delete") {
    MongoClient.connect(URL, OPTIONS, (err, client) => {
      if (err) {
        res.redirect("/login");
        client.close();
        return;
      }
      let db = client.db(DATABASE);

      db.collection("column_list").deleteOne({
        "_id": ObjectId(columnId), user_id: userId
      }, (err) => {
        if (err) {
          //DB接続でエラーがあった場合,、ログイン画面にリダイレクト
          res.redirect("/login");
          client.close();
          return;
        }
        client.close();
        res.redirect("/login");
        return;
      })
    })
  }

  if (mode === "update") {

  }

});

module.exports = router;