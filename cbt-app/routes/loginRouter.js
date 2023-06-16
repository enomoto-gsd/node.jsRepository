/**
 * ログインのルーティング処理を記述
 * @author Enomoto Kazuki
 */
const router = require("express").Router();

router.get("/login",(req,res)=>{
  res.render("./login.ejs",{title:"ログイン"});
});

module.exports= router;
