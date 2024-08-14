let input = document.getElementById("inputBox");//selecting dispay box
let btn = document.querySelectorAll("button");//selecting buttons

let string = "";
//evaluating calculation result from = button.
let arr = Array.from(btn).forEach(button => {
  button.addEventListener('click', (e) => {
    if (e.target.innerHTML == "=") {
      string = eval(string);
      input.value = string;
    }
    //for clearing the display
    else if(e.target.innerHTML == "AC") {
      string = "";
      input.value = string;
    }
    //for deleting the last element from display
    else if (e.target.innerHTML == "DEL") {
      string = string.substring(0, string.length-1);
      input.value = string;
    }
    //displaying the numbers & signs in display
    else {
      string += e.target.innerHTML;
      input.value = string;
    }
  })
})