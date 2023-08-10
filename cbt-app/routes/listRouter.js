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
      res.render("column_list.ejs", { userName: userName, results: results });
    });
  });

});

router.post("/column_list", (req, res) => {
  let userName = req.session['userName'];
  let userId = req.session['userId'];
  //セッション情報の確認
  if (userName === undefined && userId === undefined) {
    //セッションに情報がない場合,ログインにリダイレクト
    res.redirect("/login");
    return;
  }

  //フォームから受け取った情報を変数に格納
  let event = req.body.event || "";
  let automa_thoughts = req.body.automa_thoughts || "";
  let emotion = req.body.emotion || "";
  let radio = req.body.search_radio_button;

  let eventRegex  = new RegExp(`.*${event}.*`);
  let automaRegex  = new RegExp(`.*${automa_thoughts}.*`);
  let emotionRegex  = new RegExp(`.*${emotion}.*`);
  
  if (radio === "AND") {
    //AND検索時のクエリ
    let andQuery = { $and: [{ event: new RegExp(event, 'i') }, { automa_thoughts: new RegExp(automa_thoughts, 'i') }, { emotion: new RegExp(emotion, 'i') }, { user_id: userId }] };
    MongoClient.connect(URL, OPTIONS, (err, client) => {
      if (err) {
        //DB接続でエラーがあった場合,、ログイン画面にリダイレクト
        res.redirect("/login");
        client.close();
        return;
      }
      let db = client.db(DATABASE);
      db.collection("column_list").find(
        andQuery,
        { sort: { register_date: -1, _id: -1 } }
      ).toArray((err, results) => {
        if (err) {
          //DB接続でエラーがあった場合,、ログイン画面にリダイレクト
          res.redirect("/login");
          client.close();
          return;
        }

        for (let item of results) {
          //取得した登録日付をyyyy-mm-dd形式に変換する
          let date = item.register_date.toISOString().split('T')[0];
          item.register_date = date;
        }
        client.close();
        res.render("column_list.ejs", { userName: userName, results: results });
      });
    });

  } else {
    //OR検索時のクエリを作成
    //let orQuery = { $and: [ { user_id: userId }, { $or : [{ event: new RegExp(event, 'i') }, { automa_thoughts: new RegExp(automa_thoughts, 'i') }, { emotion: new RegExp(emotion, 'i') }] }] }; 
    //let orQuery = { $and: [{ user_id: userId }, { $or: [{ event: new RegExp(event, 'xi') }, { automa_thoughts: new RegExp(automa_thoughts, 'xi') },{ emotion: new RegExp(emotion, 'xi') }] },{}] };
    let orQuery = { $and :
       [{ user_id : userId }, 
      { $or: [
        { event : eventRegex },
        { automa_thoughts : automaRegex},
        { emotion : emotionRegex}
      ]} 
    ]};

    // let orQuery = { $and :
    //     [{ user_id : userId },
    //       {event:{ $in:event}}, 
    //       {automa_thoughts:{ $in:automa_thoughts}}, 
    //       {emotion:{ $in:emotion}}] 
    //   };

    
    MongoClient.connect(URL, OPTIONS, (err, client) => {
      if (err) {
        throw err;
        //DB接続でエラーがあった場合,、ログイン画面にリダイレクト
        res.redirect("/login");
        client.close();
        return;
      }
      let db = client.db(DATABASE);
      db.collection("column_list").find(
        orQuery,
        { sort: { register_date: -1, _id: -1 } }
      ).toArray((err, results) => {
        if (err) {
          throw err;
          //DB接続でエラーがあった場合,、ログイン画面にリダイレクト
          res.redirect("/login");
          client.close();
          return;
        }

        for (let item of results) {
          //取得した登録日付をyyyy-mm-dd形式に変換する
          let date = item.register_date.toISOString().split('T')[0];
          item.register_date = date;
        }
        client.close();
        res.render("column_list.ejs", { userName: userName, results: results });
      });
    });
  }
});



module.exports = router;