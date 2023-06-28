/**ログアウトの処理を実行
 * @author Kazuki Enomoto
 */
const router = require("express").Router();

router.post("/logout", (req, res) => {
  if(req.session.userName !== null && req.session.userId !== null){
    //セッションを削除
    delete req.session.userName;
    delete req.session.userId;
    res.redirect("./login");
  }
});

module.exports = router;