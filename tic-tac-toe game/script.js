let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".resetbtn");
let msg = document.querySelector("#msg");
let newGameBtn = document.querySelector("#new-btn");
let winnerAlert = document.querySelector(".winner-alert");

const winPattern = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

let turn0 = true;

const disableBtn = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}
const enableBtn = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulation! Winner is ${winner}.`
    winnerAlert.classList.remove("hide");
    disableBtn();
}

const resetGame = () => {
    turn0 = true;
    enableBtn();
    winnerAlert.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "0";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
    })
})

const checkWinner = () => {
    for(pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val); 
                disableBtn();
            }     
        }
    }
}
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);