const ses_conf = {
  secret:'cbtsecret',
  //sessionに変更があった場合のみ保存
  resave:false,
  saveUninitialized: false,
  //cookieの維持する時間
  cookie:{maxAge:60 * 60 * 1000} //cookieの維持する時間(1時間)
}

module.exports ={
  ses_conf
}