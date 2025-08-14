var ovElemId;
function ov_on(elem_id) {
  ovElemId = elem_id;  
  document.getElementById(ovElemId).style.display = "block";
}

function ov_off() {
  document.getElementById(ovElemId).style.display = "none";
}


function hide_show(elemId) {
  var x = document.getElementById(elemId);
  if (x.style.display === "none" || x.style.display === "") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}