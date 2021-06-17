import { Player } from './player.js';
import { enemyAttack, playerAttack } from './attack.js';
import { showResult } from './result.js';
import { generateLogs } from './log.js';

const $arenas = document.querySelector(`.arenas`);
const $formFight = document.querySelector(`.control`);


const player1 = new Player({
	player: 1,
	name: `SCORPION`,
	hp: 100,
	img: `http://reactmarathon-api.herokuapp.com/assets/scorpion.gif`,
	weapon: [`knife, spear, strapon, mem`],
	rootSelector: `arenas`
});

const player2 = new Player({
	player: 2,
	name: `SUB-ZERO`,
	hp: 100,
	img: `http://reactmarathon-api.herokuapp.com/assets/subzero.gif`,
	weapon: [`knife, spear, strapon, mem`],
	rootSelector: `arenas`
});

const { name: playerName } = player1;

const { name: enemyName } = player2;

const init = () => {
	player1.createPlayer();
	player2.createPlayer();

	generateLogs(`start`);
};

$formFight.addEventListener(`submit`, function (evt) {
	evt.preventDefault();
	const enemy = enemyAttack();
	const player = playerAttack();
	let { value: enemyHit } = enemy;
	let { value: playerHit } = player;

	if (player.defence !== enemy.hit) {
		player1.changeHP(enemyHit);
		player1.renderHP();
		generateLogs(`hit`, player1, player2, enemyHit);
	} else {
		enemyHit = 0;
		generateLogs(`defence`, player2, player1, enemyHit);
	}

	if (enemy.defence !== player.hit) {
		player2.changeHP(playerHit);
		player2.renderHP();
		generateLogs(`hit`, player2, player1, playerHit);
	} else {
		playerHit = 0;
		generateLogs(`defence`, player1, player2, playerHit);
	}

	showResult();
});

init();


export { player1, player2, playerName, enemyName };