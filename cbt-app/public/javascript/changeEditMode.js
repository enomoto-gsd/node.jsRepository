
'use strict';

let editButton = document.getElementById("editButton");

//詳細画面のフォーム要素を全て
let enableFields = () => {
 
  let flag = true;
  let formNames = document.querySelectorAll("[name]");
  
  if (flag === true) {
    //name属性がついている要素を全て取得する
    formNames.forEach((formItems) => {
      formItems.disabled = false;
    });
    flag = false;
    return;
  }

  formNames.forEach((formItems) => {
    formItems.disabled = false;
  });
  flag = false;

 }


editButton.addEventListener("click", enableFields);
