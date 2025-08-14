var ovElemId;
function ov_on(elem_id) {
  ovElemId = elem_id;  
  document.getElementById(ovElemId).style.display = "block";
}

function ov_off() {
  document.getElementById(ovElemId).style.display = "none";
}