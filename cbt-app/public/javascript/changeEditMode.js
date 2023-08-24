/**
 * 編集ボタン押下時のイベント処理(各入力フィールドの活性・非活性切り替え,削除ボタン、更新ボタンの表示、非表示)について記載
 * @author Kazuki Enomoto
 */

'use strict';

let editButton = document.getElementById("editButton");

//削除ボタンと更新ボタンの表示・非表示の切り替え処理
let displayButton = () => {
  $("#deleteButton").toggleClass('show');
  $("#updateButton").toggleClass('show');
}

//詳細画面の入力項目の非活性を解除する
let enableFields = () => {
  //詳細画面の各フィールド要素の取得
  let formEls = document.querySelectorAll('input[type = "text"],textarea,input[type = "datetime-local"]');

    //取得した要素の活性、非活性化処理
    formEls.forEach((formItem) => {
      if(formItem.disabled){
        formItem.disabled = false;
      }else{
        formItem.disabled = true;
      }
    });
  displayButton();
}


editButton.addEventListener("click", enableFields);
