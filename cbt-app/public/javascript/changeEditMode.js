
'use strict';

let editButton = document.getElementById("editButton");

let displayButton = () => {
  $("#deleteButton").toggleClass('show');
  $("#updateButton").toggleClass('show');
}

//詳細画面の入力項目の非活性を解除する
let enableFields = () => {
 
  let flag = true;
  let formNames = document.querySelectorAll("[name]");
  
  if (flag === true) {
    //name属性がついている要素を全て取得する
    formNames.forEach((formItems) => {
      formItems.disabled = false;
    });
    flag = false;
  }

  displayButton();
 }


editButton.addEventListener("click", enableFields);
