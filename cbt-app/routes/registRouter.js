/**
 * ログインのルーティング処理を記述
 * @author Enomoto Kazuki
 */
const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;
const { URL, DATABASE, OPTIONS } = require("../config/dbConfig");

router.get("/column_regist",(req,res)=>{
  //セッション情報の取得
  let userName = req.session['userName'];
  let userId = req.session['userId'];
  //セッション情報の確認
  if (userName === undefined && userId === undefined) {
    //セッションに情報がない場合,ログインにリダイレクト
    res.redirect("/login");
    return;
  }


  res.render("./column_register.ejs", {userName: userName} )
})

module.exports = router;