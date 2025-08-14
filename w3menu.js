function w3menu(elem_id) {
  var x = document.getElementById(elem_id);
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}