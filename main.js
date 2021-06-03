'use strict';

const player1 = {
	name: `SCORPION`,
	hp: 10,
	img: `http://reactmarathon-api.herokuapp.com/assets/scorpion.gif`,
	weapon: [`knife, spear, strapon, mem`],
	attak: function () {
		console.log(this.name + ` Fight`);
	}
};

const player2 = {
	name: `SUB-ZERO`,
	hp: 20,
	img: `http://reactmarathon-api.herokuapp.com/assets/subzero.gif`,
	weapon: [`knife, spear, strapon, mem`],
	attak: function () {
		console.log(this.name + ` Fight`);
	}
};

const createPlayer = function (playerClass, player) {

	const $player = document.createElement(`div`);
	$player.classList.add(playerClass);

	const $progressBar = document.createElement(`div`);
	$progressBar.classList.add(`progressbar`);

	const $character = document.createElement(`div`);
	$character.classList.add(`character`);
	$character.innerHTML = `<img src=${player.img}>`;

	const $life = document.createElement(`div`);
	$life.classList.add(`life`);
	$life.style.width = 100 + `%`;


	const $name = document.createElement(`div`);
	$name.classList.add(`name`);
	$name.innerHTML = player.name;

	const $playerImage = document.createElement(`img`);


	const arenas = document.querySelector(`.arenas`);

	$player.appendChild($progressBar);
	$player.appendChild($character);
	$progressBar.appendChild($life);
	$progressBar.appendChild($name);
	$character.appendChild($playerImage);


	return arenas.append($player)
};

createPlayer(`player1`, player1);
createPlayer(`player2`, player2);
