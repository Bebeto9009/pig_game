/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- Player who got two 6 in a row lose his GLOBAL score
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores = [0,0],
currentScore = 0,
lastTwoDice = [0,0],
activePlayer = 0,
dice = 0,
clearScore = 0,
topScore = 100,
gamePlay = true;

var diceCube = document.querySelector('.dice');
var cubes = ['dice-1.png', 'dice-2.png', 'dice-3.png', 'dice-4.png', 'dice-5.png', 'dice-6.png'];

newGame();

function newGame() {
    gamePlay = true;
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    topScore = 100;
    document.querySelector('.input-score').disabled = false;
    document.querySelector('.input-score').value = "";
    document.querySelector('.dice').style.display = 'none';
    for (var i = 0; i <= 1; i++) {
        document.querySelector('#score-'+ i ).textContent = scores[i];
        document.querySelector('#current-' + i).textContent = currentScore;
        document.querySelector('#name-' + i).textContent = 'Player ' + (i+1);
        document.querySelector('.player-' + i + '-panel').classList.remove('winner');
        document.querySelector('.player-' + i + '-panel').classList.remove('active');
    }
    document.querySelector('.player-0-panel').classList.add('active');
}

function changePlayer(){
    activePlayer = 1 - activePlayer;
    lastTwoDice = [0,0];
    currentScore = 0;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function shouldResetScore(){
    for (var i = 0 ; i < lastTwoDice.length; i++) {
        if(lastTwoDice[i] !== 6)
            return false;
    }
    clearScore=0;
    scores[activePlayer]=clearScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    document.querySelector('#current-' + activePlayer).textContent = clearScore;
    console.log('reset score ' + scores[activePlayer] + ' clear score is ' + clearScore);
    return true;
}

function roll(){
    if (!gamePlay) return;
    document.querySelector('.input-score').disabled = true;

    dice = Math.floor(Math.random() * 6) + 1;

    var i = dice - 1;
    diceCube.src = cubes[i];
    diceCube.style.display = 'block';

    if (shouldResetScore()){
        changePlayer();
    } else if (dice === 1){
        document.querySelector('.dice').style.display = 'none';
        currentScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = currentScore;
        changePlayer();
    } else {
        currentScore += dice;
        lastTwoDice.push(dice);
        lastTwoDice.shift();
        document.querySelector('#current-' + activePlayer).textContent = currentScore;
        console.log('Last two dices ' + lastTwoDice + ' Player number ' + activePlayer + ' current score ' + currentScore);
    }
}

document.querySelector(".input-score").addEventListener('change', checkInput);

function checkInput() {
    var inputValue = document.querySelector('.input-score').value;
    if ((inputValue === null) || (inputValue === undefined) || (inputValue=== "")){
        topScore = 100;
        console.log('total score is ' + topScore);
    } else {
        topScore = document.querySelector('.input-score').value;
        console.log('total score is po elsie ' + topScore);
    }
}

function holdDice(){
    if (!gamePlay) return;

    scores[activePlayer] += currentScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    currentScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = currentScore;
    document.querySelector('.dice').style.display = 'none';

    if (shouldResetScore()){
        changePlayer();
    } else if (scores[activePlayer] >= topScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlay = false;
    } else {
        changePlayer();
    }
}

/*Button for actions*/
document.querySelector('.btn-new').addEventListener('click', newGame);
document.querySelector('.btn-roll').addEventListener('click', roll);
document.querySelector('.btn-hold').addEventListener('click', holdDice);