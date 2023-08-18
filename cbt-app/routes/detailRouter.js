const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;
const {DATABASE,URL,OPTIONS,} = require("../config/dbConfig");
const ObjectId = require('mongodb').ObjectID; 


router.get("/detail/:id",(req,res)=>{
  //セッション情報の取得
  let userName = req.session['userName'];
  let userId = req.session['userId'];
  //セッション情報の確認
  if (userName === undefined && userId === undefined) {
    //セッションに情報がない場合,ログインにリダイレクト
    res.redirect("/login");
    return;
  }
  
  let columnId = req.params.id ;

  
  MongoClient.connect(URL, OPTIONS, (err, client) => {
    if (err) {
      res.redirect("/login");
      client.close();
      return;
    }

    let db = client.db(DATABASE);
    

    db.collection("column_list").findOne({
      "_id": ObjectId(columnId),user_id: userId
    },(err, result) => {
      if (err) {
        //DB接続でエラーがあった場合,、ログイン画面にリダイレクト
        res.redirect("/login");
        client.close();
        return;
      }
    
      let registerForm = {};
      registerForm.register_date = result.register_date;
      registerForm.event = result.event;
      registerForm.automa_thoughts = result.automa_thoughts;
      registerForm.emotion = result.emotion ;
      registerForm.thoughts_proof = result.thoughts_proof;
      registerForm.thoughts_disproof = result.thoughts_disproof;
      registerForm.adapt_thinks = result.adapt_thinks;
      registerForm.next_action = result.next_action;

      client.close();
      res.render("./column_register.ejs", {userName: userName,registerForm:registerForm} )
    });
    
  });  
});




router.post("/detail",(req,res)=>{

})

module.exports = router;