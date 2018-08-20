/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores = [0,0],
    currentScore = 0,
    lastTwoDice = [0,0],
    activePlayer = 0,
    dice = 0,
    clearScore = 0,
    gamePlay = true;

var diceCube = document.querySelector('.dice');
var cubes = ['dice-1.png', 'dice-2.png', 'dice-3.png', 'dice-4.png', 'dice-5.png', 'dice-6.png'];

document.querySelector('.dice').style.display = 'none'; // hide dice on start
document.querySelector('#score-0').textContent = 0;
document.querySelector('#score-1').textContent = 0;
document.querySelector('#current-0').textContent = 0;


function roll() {
    if (!gamePlay) return;

    dice = Math.floor(Math.random() * 6) + 1;

    var i = dice - 1;
    diceCube.src = cubes[i];
    diceCube.style.display = 'block';

    if (shouldResetScore()){
        console.log('should resetScore');
    } else if (dice === 1){
        document.querySelector('.dice').style.display = 'none';
        currentScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = currentScore;
        // document.querySelector('#score-' + activePlayer).textContent = clearScore;
        changePlayer();
    } else {
        currentScore += dice;
        lastTwoDice.push(dice);
        lastTwoDice.shift();
        document.querySelector('#current-' + activePlayer).textContent = currentScore;

        console.log('Last two dices ' + lastTwoDice + ' Player number ' + activePlayer + ' current score ' + currentScore);
    }
}

function shouldResetScore() {
    for (var i = 0 ; i < lastTwoDice.length; i++) {
        if(lastTwoDice[i] !== 6)
            return false;
    }
    // currentScore = 0;
    // document.querySelector('#current-' + activePlayer).textContent = currentScore;
    clearScore=0;
    scores[activePlayer]=clearScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    document.querySelector('#current-' + activePlayer).textContent = clearScore;
    changePlayer();
    console.log('reset score ' + scores[activePlayer] + ' clear score is ' + clearScore);
}

document.querySelector('.btn-roll').addEventListener('click', roll); // start function roll on button


function holdDice() {
    if (!gamePlay) return;
    if (shouldResetScore() === true){
        return;
    }
    scores[activePlayer] += currentScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    currentScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = currentScore;
    document.querySelector('.dice').style.display = 'none';


    if (scores[activePlayer] >= 100) {
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlay = false;
    } else {
        changePlayer();
    }
}
document.querySelector('.btn-hold').addEventListener('click', holdDice);


function newGame() {
    gamePlay = true;
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    document.querySelector('#score-0').textContent = scores[0];
    document.querySelector('#score-1').textContent = scores[1];
    document.querySelector('#current-0').textContent = currentScore;
    document.querySelector('#current-1').textContent = currentScore;
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('.btn-new').addEventListener('click', newGame);


/* change player */
function changePlayer() {
    activePlayer = 1 - activePlayer;
    lastTwoDice=[0,0];
    currentScore=0;


    if (document.querySelector('.player-0-panel').classList.contains('active')) {
        document.querySelector('.player-0-panel').classList.remove('active');
    } else {
        document.querySelector('.player-0-panel').classList.add('active');
    }

    if (document.querySelector('.player-1-panel').classList.contains('active')) {
        document.querySelector('.player-1-panel').classList.remove('active');
    } else {
        document.querySelector('.player-1-panel').classList.add('active');
    }
}

//todo
// przy 6,6 od razu wynik ma zostać zresetowany, nie można go móc zapisać
// current ma być skasowany