import { player1, player2 } from './player.js';
import { enemyAttack, playerAttack } from './attack.js';
import { showResult } from './result.js';
import { generateLogs } from './log.js';

const $arenas = document.querySelector(`.arenas`);
const $formFight = document.querySelector(`.control`);

const createElement = (tag, className) => {
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}

	return $tag;
};

const createPlayer = (player) => {
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

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

document.onload = generateLogs(`start`);


$formFight.addEventListener(`submit`, function (evt) {
	evt.preventDefault();
	const enemy = enemyAttack();
	const player = playerAttack();
	let { value: enemyHit } = enemy;
	let { value: playerHit } = player;

	if (player.defence !== enemy.hit) {
		player1.damage(enemyHit);
		player1.renderHP();
		generateLogs(`hit`, player1, player2, enemyHit);
	} else {
		enemyHit = 0;
		generateLogs(`defence`, player2, player1, enemyHit);
	}

	if (enemy.defence !== player.hit) {
		player2.damage(playerHit);
		player2.renderHP();
		generateLogs(`hit`, player2, player1, playerHit);
	} else {
		playerHit = 0;
		generateLogs(`defence`, player1, player2, playerHit);
	}

	showResult();
});


