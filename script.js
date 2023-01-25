'use strict';
// selecting the Elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const switchPlayer = function () {
	// Reset the current score text content set back to 0;
	document.querySelector(`#current--${activePlayer}`).textContent = 0;
	// change the current score variables to 0;
	currentScore = 0;
	// switch to the next player
	// if the active player is = 0 then below line will change it to 1.if the active player is = 1 then below line will change it to 0.
	activePlayer = activePlayer === 0 ? 1 : 0;
	// change the bg
	player0Element.classList.toggle('player--active');
	player1Element.classList.toggle('player--active');
};
// starting condition
let scores, currentScore, activePlayer, playing;
// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;

// initialiation
const init = function () {
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	playing = true;

	// Reset the current score = 0
	score0Element.textContent = 0;
	score1Element.textContent = 0;
	current0Element.textContent = 0;
	current1Element.textContent = 0;
	diceElement.classList.add('hidden');
	player0Element.classList.remove('player--winner');
	player1Element.classList.remove('player--winner');
	//remove active class
	player0Element.classList.add('player--active');
	player1Element.classList.remove('player--active');
};
// run the init function when the page is load
init();
btnRoll.addEventListener('click', function () {
	if (playing) {
		// 1. Generate a random dice roll
		const dice = Math.trunc(Math.random() * 6) + 1;

		// 2. Remove the hidden class
		diceElement.classList.remove('hidden');
		// 3. Display dice
		diceElement.src = `dice-${dice}.png`;
		// console.log(dice);
		// Note:- Here (dice-) is the class name of the img and dice inside the brackets will change according to the radom number

		// 4. Check for rolled 1: if true, switch to the next player
		if (dice !== 1) {
			currentScore += dice;
			// Dynamically track Both players score
			document.querySelector(`#current--${activePlayer}`).textContent =
				currentScore;
			// Only track 1st player score
			//current0Element.textContent = currentScore;
		} else {
			switchPlayer();
		}
	}
});

// Hold the score
btnHold.addEventListener('click', function () {
	if (playing) {
		// add score to the current player total score

		// change the score
		// scores[0] = scores[0] + currentScore
		// scores[1] = scores[1] + currentScore
		scores[activePlayer] += currentScore;

		// Display the score
		document.querySelector(`#score--${activePlayer}`).textContent =
			scores[activePlayer];

		// Check the score is >= 100
		if (scores[activePlayer] >= 100) {
			//set the playing = false;
			playing = false;
			// add the hidden class
			diceElement.classList.add('hidden');
			// if score >= 100 then active player win and finish the game
			// Finish the game
			// show the current player winner and add winner class. also remove the player active class
			//add winner class
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add('player--winner');
			// remove the player active class
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove('player--active');
		} else {
			// Switch to the next player
			switchPlayer();
		}
	}
});
// Resetting the game
btnNew.addEventListener('click', init);
