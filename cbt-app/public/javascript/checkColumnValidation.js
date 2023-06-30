
let column_form = document.getElementById("column_form");
let register_dateForm = document.getElementById("register_date");
let eventForm = document.getElementById("event");
let registerError = document.getElementById("registerError")
let eventError = document.getElementById("eventError")

column_form.addEventListener("submit",(e)=>{
  console.log(registerError);
  if(registerError || eventError){
    registerError.textContent = "";
    eventError.textContent = "";
  }

  let date_validation_message = "登録日時は必須項目です";
  let event_validation_message = "出来事は必須項目です";
  
  if(eventForm.value === "" && register_dateForm.value === ""){
    registerError.innerHTML = date_validation_message;
    eventError.innerHTML = event_validation_message;
    e.preventDefault();
  };

  if(eventForm.value === ""){
    eventError.innerHTML = event_validation_message;
    e.preventDefault();
  };

  if(register_dateForm.value === ""){
    registerError.innerHTML = date_validation_message;
    e.preventDefault();
  };


})

