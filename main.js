'use strict';

const $arenas = document.querySelector(`.arenas`);
// const $randomButton = document.querySelector(`.button`);
// const $restartButton = document.querySelector(`.restartWrap .button`);
const $formFight = document.querySelector(`.control`);
const HIT = {
	head: 30,
	body: 25,
	foot: 20
}

const ATTACK = [`head`, `body`, `foot`];

const randomNumbers = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const attak = function () {
	console.log(console.log(this.name + ` Fight`));
}
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
	this.elHP().style.width = this.hp + `%`;
};

const player1 = {
	player: 1,
	name: `SCORPION`,
	hp: 100,
	img: `http://reactmarathon-api.herokuapp.com/assets/scorpion.gif`,
	weapon: [`knife, spear, strapon, mem`],
	attak,
	damage: changeHP,
	elHP,
	renderHP
};

const player2 = {
	player: 2,
	name: `SUB-ZERO`,
	hp: 100,
	img: `http://reactmarathon-api.herokuapp.com/assets/subzero.gif`,
	weapon: [`knife, spear, strapon, mem`],
	attak,
	damage: changeHP,
	elHP,
	renderHP
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

const battleResult = function (playerName) {
	const $title = createElement(`div`, `winTitle`);
	if (playerName) {
		$title.innerText = playerName + ` win`;
	} else {
		$title.innerText = `Draw`;
	}

	return $title;
}

const createReloadButton = function () {
	const $reloadWrap = createElement(`div`, `reloadWrap`);
	const $reloadButton = createElement(`button`, `button`);

	$reloadButton.innerText = `restart`;
	$reloadWrap.appendChild($reloadButton);

	$reloadButton.addEventListener(`click`, function () {
		window.location.reload()
	});

	return $reloadWrap;
};

// $randomButton.addEventListener(`click`, function () {
// 	player1.damage(randomNumbers(1, 20));
// 	player2.damage(randomNumbers(1, 20));
// 	player1.renderHP();
// 	player2.renderHP();

// 	if (player1.hp === 0 || player2.hp === 0) {
// 		$randomButton.disabled = true;
// 		$arenas.appendChild(createReloadButton());
// 	}

// 	if (player1.hp > player2.hp && player2.hp <= 0) {
// 		$arenas.appendChild(battleResult(player1.name));
// 	} else if (player2.hp > player1.hp && player1.hp <= 0) {
// 		$arenas.appendChild(battleResult(player2.name));
// 	} else if (player2.hp === 0 && player1.hp === 0) {
// 		$arenas.appendChild(battleResult());
// 	}

// });

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

const enemyAttack = function () {
	const hit = ATTACK[randomNumbers(0, 2)];
	const defence = ATTACK[randomNumbers(0, 2)];

	return {
		value: randomNumbers(HIT[hit], HIT[hit]),
		hit,
		defence
	}
};

$formFight.addEventListener(`submit`, function (evt) {
	evt.preventDefault();
	const enemy = enemyAttack();
	const attack = {};

	for (let item of $formFight) {
		if (item.checked && item.name === `hit`) {
			attack.value = randomNumbers(HIT[item.value], HIT[item.value]);
			attack.hit = item.value;
		}

		if (item.checked && item.name === `defence`) {
			attack.defence = item.value;
		}

		item.checked = false;
	}
	console.log(`####, a`, attack);
	console.log(`####, e`, enemy);
});