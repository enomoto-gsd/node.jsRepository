
'use strict';

let editButton = document.getElementById("editButton");

//削除ボタンと更新ボタンの表示の切り替え
let displayButton = () => {
  $("#deleteButton").toggleClass('show');
  $("#updateButton").toggleClass('show');
}

//詳細画面の入力項目の非活性を解除する
let enableFields = () => {
  //要素の取得
  let formEls = document.querySelectorAll('input[type = "text"],textarea,input[type = "datetime-local"]');

  
    //取得した要素の非活性を全て解除
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
