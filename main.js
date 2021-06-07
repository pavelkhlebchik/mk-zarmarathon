'use strict';

const $arenas = document.querySelector(`.arenas`);
const $randomButton = document.querySelector(`.button`);

const randomNumbers = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const player1 = {
	player: 1,
	name: `SCORPION`,
	hp: 100,
	img: `http://reactmarathon-api.herokuapp.com/assets/scorpion.gif`,
	weapon: [`knife, spear, strapon, mem`],
	attak: function () {
		console.log(this.name + ` Fight`);
	}
};

const player2 = {
	player: 2,
	name: `SUB-ZERO`,
	hp: 100,
	img: `http://reactmarathon-api.herokuapp.com/assets/subzero.gif`,
	weapon: [`knife, spear, strapon, mem`],
	attak: function () {
		console.log(this.name + ` Fight`);
	}
};

const createElement = function (tag, className) {
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}

	return $tag;
};

const createPlayer = function (player) {
	const $player = createElement(`div`, `player` + player.player);
	const $progressBar = createElement(`div`, `progressbar`);
	const $character = createElement(`div`, `character`);
	const $life = createElement(`div`, `life`);
	const $name = createElement(`div`, `name`);
	const $playerImage = createElement(`img`);

	$life.style.width = player.hp + `%`;
	$name.innerText = player.name;
	$playerImage.src = player.img;



	$progressBar.appendChild($name);
	$progressBar.appendChild($life);

	$character.appendChild($playerImage);

	$player.appendChild($progressBar);
	$player.appendChild($character);


	return $player;
};

const changeHP = function (player) {
	const $playerLife = document.querySelector(`.player` + player.player + ` .life`);

	if (player1.hp > player2.hp && player2.hp <= 0) {
		$arenas.appendChild(playerWin(player1.name))
		$randomButton.disabled = true
	} else if (player2.hp > player1.hp && player1.hp <= 0) {
		$arenas.appendChild(playerWin(player2.name))
		$randomButton.disabled = true
	}

	player.hp -= randomNumbers(1, 20)
	$playerLife.style.width = player.hp + `%`;
};

const playerLose = function (playerName) {
	const $loseTitle = createElement(`div`, `loseTitle`);
	$loseTitle.innerText = playerName + ` lose`;

	return $loseTitle;
}

const playerWin = function (playerName) {
	const $winTitle = createElement(`div`, `winTitle`);
	$winTitle.innerText = playerName + ` win`;

	return $winTitle;
}

$randomButton.addEventListener(`click`, function () {
	changeHP(player1);
	changeHP(player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));