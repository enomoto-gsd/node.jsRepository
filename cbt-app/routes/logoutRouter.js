/**ログアウトの処理を実行
 * @author Kazuki Enomoto
 */
const router = require("express").Router();

router.post("/logout", (req, res) => {
  if(req.session.login !== null){
    delete req.session.user;
    res.redirect("./login");
  }
});

module.exports = router;