/** 
 * モーダルウィンドウの操作、バリデーション機能の呼び出し処理
 *　@author Kazuki Enomoto
 */

 'use strict';


let column_form = document.getElementById("column_form");

//バリデーション判定の引数として宣言
let flag;


column_form.addEventListener("submit", (e)=>{
  //submitイベントを無効にする
  e.preventDefault();

  //モーダルの背景、ESCキーの挙動,モーダル初期化時のfocus有無の設定
  let options = {backdrop:false,keyboard:false,focus:false};

  //optionsを第二引数に渡し、モーダルウィンドウのオブジェクトを生成
  let myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"),options);
  
  let registerOk = document.getElementById("registerOk");
  
  //モーダルウィンドウの表示
  myModal.show();
  
  //モーダルウィンドウのOKが押下された際の処理
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