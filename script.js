// initialise function is created to initialise the starting configuration
// it will clear all the X and O 
// make new game button disappear
// start player as X 
let boxes=document.querySelectorAll('.box');
let newBtn=document.querySelector('.btn');
let game_info=document.querySelector('.game_info');
let currentPlayer; // who is the current player X or O
let gameGrid; // stores the current situation of grid , 2d array
function init(){
    currentPlayer='X';
    gameGrid=["","","","","","","","",""]
    for(let i =0 ; i<boxes.length; i++){
        let box=boxes[i];
        box.textContent="";
    }
    newBtn.classList.remove('active');
    game_info.innerText=`Current Player ${currentPlayer}`;
    for(let box of boxes){
        box.style.pointerEvents="auto";
    }
}
init();

const winningPositions=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
for (let box of boxes) {
    box.addEventListener("click",handleClick);
}
function handleClick(event){
    const element = event.target; // event.target means the exact dom element that was clicked 
    const boxIndex = Array.from(boxes).indexOf(element); // boxes is a nodeList
    if(currentPlayer=='X' && element.textContent==""){
        element.textContent='X';
        currentPlayer='O';
        game_info.innerText=`Current Player ${currentPlayer}`;
        gameGrid[boxIndex]=currentPlayer;
    }
    else if(currentPlayer=='O' && element.textContent==""){
        element.textContent='O';
        currentPlayer='X';
        game_info.innerText=`Current Player ${currentPlayer}`;
        gameGrid[boxIndex]=currentPlayer;
    }
    boxes[boxIndex].style.pointerEvents="none";
    let ans=checkGameOver();
    if(ans.length!=0){
        handleWin(ans);
        for(let box of boxes){
            box.style.pointerEvents="none";
        }
    }
    let allFill=checkAllFill();
    if(allFill==true){
        game_info.textContent='Game tied';
        newBtn.classList.add('active');
    }
}
newBtn.addEventListener("click",initialiseTheGame);
function initialiseTheGame(){
    init();
}
function checkGameOver(){
    // iterate on all the winning positions in o(n^2) and check if all three of them have a same value
    // all X or all O
    for(let position of winningPositions){
        if(gameGrid[position[0]]!="" && gameGrid[position[1]]!="" && gameGrid[position[2]]!=""){
            if(gameGrid[position[0]]=='X' && gameGrid[position[1]]=='X' && gameGrid[position[2]]=='X'){
                return position;
            }
            else if(gameGrid[position[0]]=='O' && gameGrid[position[1]]=='O' && gameGrid[position[2]]=='O'){
                return position;
            }
        }
    }
    return [];
}
function handleWin(ans){
    // ans holds the winning indices 
    // add class win to them
    let boxArray=Array.from(boxes);
    for(let index of ans){
        boxArray[index].classList.add('win');
        setTimeout(()=>{
            boxArray[index].classList.remove('win');
        },1000);
    }
    newBtn.classList.add("active");
    displayWin();
}
function checkAllFill(){
    for(let i of gameGrid){
        if(i=="") return false;
    }
    return true;
}
function displayWin(){
    let newPara = document.createElement('p');
    if(currentPlayer=='X'){
        game_info.textContent=`Winner is O`;
    }
    else game_info.textContent='Winner is X';
}