/**
 * コラム一覧画面のルーティング処理を記述
 * @author Enomoto Kazuki
 */

const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;
const { URL, DATABASE, OPTIONS } = require("../config/dbConfig");

router.get("/column_list", (req, res) => {
  //セッション情報の取得
  let userName = req.session['userName'];
  let userId = req.session['userId'];
  //セッション情報の確認
  if (userName === undefined && userId === undefined) {
    //セッションに情報がない場合,ログインにリダイレクト
    res.redirect("/login");
    return;
  }

  //ユーザーIDに紐づいたコラム一覧を取得
  MongoClient.connect(URL, OPTIONS, (err, client) => {
    if (err) {
       //DB接続でエラーがあった場合,、ログイン画面にリダイレクト
      res.redirect("/login");
      client.close();
      return;
    }
    let db = client.db(DATABASE);
    db.collection("column_list").find({
      user_id: userId
    }, { sort: { register_date: -1, _id: -1 } }
    ).toArray((error, results) => {
      if (err) {
        //DB接続でエラーがあった場合,、ログイン画面にリダイレクト
        res.redirect("/login");
        client.close();
        return;
      }

      for (let item of results) {
        //yyyy-mm-dd形式に変換する
        let date = item.register_date.toISOString().split('T')[0];
        item.register_date = date;
      }
      client.close();
      res.render("column_list.ejs", { userName : userName, results: results});
    });
  });

})

module.exports = router;