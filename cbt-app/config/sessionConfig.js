/**セッションの基本情報の設定
 * @author Kazuki Enomoto
 */

const ses_conf = {
  secret:'cbtsecret',
  //sessionに変更があった場合のみ保存
  resave:false,
  saveUninitialized: false,
  //cookieの保持する時間(1時間保持する)
  cookie:{maxAge:60 * 60 * 1000} 
}

module.exports ={
  ses_conf
}