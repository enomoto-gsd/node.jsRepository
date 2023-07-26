/**
 * セッションの基本情報の設定
 * @author Kazuki Enomoto
 */

const ses_conf = {
  //cookieに値を設定する際の暗号化キー
  secret:'cbtsecret',

  //セッションの値に変更があった場合のみ保存する
  resave:false,
  
  //初期化されていないセッションを強制的にセッションストアに保存する
  saveUninitialized: false,
  
  //cookieの保持する時間(1時間保持する)
  cookie:{maxAge:60 * 60 * 1000} 
}

module.exports ={
  ses_conf
}