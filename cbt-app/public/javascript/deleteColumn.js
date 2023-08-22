
'use strict';

let deleteColumn = () =>{
  let mode = "delete";
  $.ajax({
    data:{mode,columnId},
    url:"/detail",
    type: "POST",
    dataType:"text"
  }).done(()=>{
    alert("通信成功");
  }).fail(()=>{
    alert("通信失敗");
  });
  return;
}

let deleteEl = document.getElementById("deleteButton");
let columnId = deleteEl.value;
deleteEl.addEventListener("click",deleteColumn);