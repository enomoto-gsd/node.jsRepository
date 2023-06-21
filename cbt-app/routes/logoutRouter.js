/**ログアウトの処理を実行
 * @author Kazuki Enomoto
 */
const router = require("express").Router();

//ログアウトの処理
router.post("/logout", (req, res) => {
  if(req.session.login !== null){
    delete req.session.user;
    res.render("./login.ejs");
  }
});

module.exports = router;