'use strict';

const $arenas = document.querySelector(`.arenas`);
const $randomButton = document.querySelector(`.button`);

const randomNumbers = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};


const changeHP = function (damage) {
	this.hp -= damage;

	if (this.hp <= 0) {
		this.hp = 0;
	}
};

const elHP = function () {
	const $playerLife = document.querySelector(`.player` + this.player + ` .life`);

	return $playerLife;
};

const renderHP = function () {
	return elHP().style.width = this.hp + `%`;
};

const player1 = {
	player: 1,
	name: `SCORPION`,
	hp: 100,
	img: `http://reactmarathon-api.herokuapp.com/assets/scorpion.gif`,
	weapon: [`knife, spear, strapon, mem`],
	attak: function () {
		console.log(this.name + ` Fight`);
	},
	damage: changeHP,
	elHP: elHP,
	render: renderHP
};

const player2 = {
	player: 2,
	name: `SUB-ZERO`,
	hp: 100,
	img: `http://reactmarathon-api.herokuapp.com/assets/subzero.gif`,
	weapon: [`knife, spear, strapon, mem`],
	attak: function () {
		console.log(this.name + ` Fight`);
	},
	damage: changeHP,
	elHP: elHP,
	render: renderHP
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

const changeHP1 = function (player) {
	// const $playerLife = document.querySelector(`.player` + player.player + ` .life`);
	// player.hp -= randomNumbers(1, 20);

	// if (player.hp <= 0) {
	// 	player.hp = 0;
	// }

	// $playerLife.style.width = this.hp + `%`;
};

const battleResult = function (playerName) {
	const $title = createElement(`div`, `winTitle`);
	if (playerName) {
		$title.innerText = playerName + ` win`;
	} else {
		$title.innerText = `Draw`;
	}

	return $title;
}

$randomButton.addEventListener(`click`, function () {
	player1.damage(randomNumbers(1, 20));
	player2.damage(randomNumbers(1, 20));
	player1.render();
	player2.render();
	if (player1.hp === 0 || player2.hp === 0) {
		$randomButton.disabled = true;
	}

	if (player1.hp > player2.hp && player2.hp <= 0) {
		$arenas.appendChild(battleResult(player1.name));
	} else if (player2.hp > player1.hp && player1.hp <= 0) {
		$arenas.appendChild(battleResult(player2.name));
	} else if (player2.hp === 0 && player1.hp === 0) {
		$arenas.appendChild(battleResult());
	}

});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));