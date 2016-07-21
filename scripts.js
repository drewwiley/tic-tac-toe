var whosTurn = 1; // start off on player 1's turn
//button array
var buttonArr = document.getElementsByClassName('box');

var winners = [
    ["A1", "A2", "A3"], // row 1
    ["B1", "B2", "B3"], // row 2
    ["C1", "C2", "C3"], // row 3
    ["A1", "B2", "C3"], // diag 1
    ["A1", "B1", "C1"], // col 1
    ["A2", "B2", "C2"], // col 2
    ["A3", "B3", "C3"], // col 3
    ["A3", "B2", "C1"] // diag 2
];

var player1 = []; // array where we will stash the squares player1 has checked
var player2 = []; // array for player2
var someoneWon = false;





function markSquare(square){
	if(someoneWon) {
		console.log("Someone all ready won");
	}
    // check to see if this square is in either player array. if so, goodbye
    else if ((player1.indexOf(square.id) == -1) // look in player1 array for this square
        && (player2.indexOf(square.id) == -1)){ // look in player2 array for this square
        // if both are -1, then it's in neither array
        if (whosTurn == 1){
            square.innerHTML = 'X';
            whosTurn = 2;
            player1.push(square.id);
            checkWin(player1, 1);
        }else{
            square.innerHTML = 'O';
            whosTurn = 1;
            player2.push(square.id);
             checkWin(player2, 2);
        }
        console.dir(player1);
    }else{
        console.log("Something's already there!! No cheating!!")
    }

}

function checkWin(currentPlayersSquares, whoJustMarked){
    // loop through the outer array
    for(var i = 0; i < winners.length; i++){
        //loop through each inner array
        rowCount = 0;
        for(var j = 0; j < winners[i].length; j++){
            if(currentPlayersSquares.indexOf(winners[i][j]) > -1) {
            	//Hit!
            	rowCount++;
            }
            if (rowCount == 3) {
            	//BINGO!!!
            	gameOver(whoJustMarked, winners[i]);
            }
        }

    }
}
function gameOver(whoWon, winningCombo) {
	var message = document.getElementById('message');
	message.innerHTML = "Congratulations, player" + whoWon + " you won with " + winningCombo.join('  ') + 
	' !';
	for (var i = 0; i<winningCombo.length; i++) {
		document.getElementById(winningCombo[i]).className += ' winner';
	}
	someoneWon= true; 
}
	function reset(){
		whosTurn = 1;
		player1 = [];
        player2 = [];
    someoneWon = false;
    document.getElementById('message').innerHTML = "";
    for (var i = 0; i < buttonArr.length; i++){
        if ((buttonArr[i].textContent == 'X') || (buttonArr[i].textContent == 'O')){
            buttonArr[i].innerHTML = "-";
            buttonArr[i].className = 'box';
    }
}

	
}

function compTurn(square) {

	var randNum = Math.floor(((Math.random() * 9) + 1));
	var compChoice = buttonArr[randNum];
	markSquare(compChoice(square.id));
	
}
