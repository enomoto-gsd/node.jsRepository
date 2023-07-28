
let checkSignupValidationMethod = (body)=>{
  const mailPattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
  const passwordPattern =/^[a-z\d]{4,10}$/i;
  
  if(body.user_name === "" || body.mail_address === "" || body.password === ""){
    return "ユーザー名,メールアドレス,パスワードを入力してください";
  }
  
  if(body.user_name.length < 1 || body.user_name.length > 20){
    return "ユーザー名は1文字以上,20文字以下で入力してください";
  }
  
  if(!mailPattern.test(body.mail_address) && !passwordPattern.test(body.password)){
    return "メールアドレス・パスワードの記述に誤りがあります。パスワードは半角英数字4文字以上8文字以下にしてください"
  };

  if(!mailPattern.test(body.mail_address)){
    return "メールアドレスの形式で入力してください";
  };

  if(!passwordPattern.test(body.password)){
    return "パスワードは半角英数字4文字以上8文字以下にしてください" ;
  };

  if(mailPattern.test(body.mail_address) && passwordPattern.test(body.password)){
    return null;
  };

}

module.exports = {
   checkSignupValidationMethod
}

