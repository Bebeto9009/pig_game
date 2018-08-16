/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gamePlay;

scores = [0,0];
roundScore = 0;
activePlayer = 0;
dice = 0;
gamePlay = true;

var diceCube = document.querySelector('.dice');
var cubes = ['dice-1.png', 'dice-2.png', 'dice-3.png', 'dice-4.png', 'dice-5.png', 'dice-6.png'];

console.log(dice);

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

        console.log('dice is: ' + dice); // result of draw

        if (dice > 1) {
            roundScore += dice;
            console.log('round score:' + roundScore);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            roundScore = 0;
            console.log('round score:' + roundScore);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            document.querySelector('.dice').style.display = 'none';

            changePlayer();
        }
    }

    document.querySelector('.btn-roll').addEventListener('click', roll); // start function roll on button


    function holdDice() {
        if (!gamePlay) return;

        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        document.querySelector('#current-' + activePlayer).textContent = 0;
        roundScore = 0;
        console.log('roundScore is: ' + roundScore);
        console.log('active player scores: ' + scores[activePlayer]);

        if (scores[activePlayer] >= 10) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlay = false;
        } else {
            changePlayer();
        }
        // whoWin();
    }
    document.querySelector('.btn-hold').addEventListener('click', holdDice);


function newGame() {
    gamePlay = true;
    scores = [0,0];
    roundScore = 0;   
    activePlayer = 0;
    document.querySelector('#score-0').textContent = scores[0];
    document.querySelector('#score-1').textContent = scores[1];
    document.querySelector('#current-0').textContent = roundScore;
    document.querySelector('#current-1').textContent = roundScore;
    console.log('new game score: ' + scores);
    console.log('new game current: ' + roundScore);
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
    console.log('aktywny gracz ' +activePlayer);

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

