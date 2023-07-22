let column_form = document.getElementById("column_form");
let flag;
column_form.addEventListener("submit", (e)=>{
  e.preventDefault();
  let options = {backdrop:false,keyboard:false,focus:false};
  
  //optionsを引数に渡し、モーダルウィンドウのオブジェクトを生成
  let myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"),options);
  
  let registerOk = document.getElementById("registerOk");
  
  //モーダルウィンドウの表示
  myModal.show();
  
  registerOk.addEventListener("click",(e)=>{
    //checkColumnvalidationメソッドを呼び出し、必須事項の入力チェックを行い、真偽値が返される。
    let validationResult = checkColumnValidation(flag);
    if(validationResult === false){
      //バリデーションの結果がfalseの場合,モーダルウィンドウを隠す
      myModal.hide();
      return;
    }
    //バリデーションの結果がtrueの場合、submitでサーバー側に情報を送信する
    column_form.submit();
  })
})