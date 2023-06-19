/**ログイン処理を行う処理 */

const MongoClient = require("mongodb").Client;
const {URL,DATABASE,OPTIONS} = require("../config/dbConfig");

MongoClient.connect(URL,(err,client)=>{
  let db = client.db(DATABASE);
  db.collection("users").findOne({

  }).toArray(function(err,result)=>{

  })
});
