import { player1, player2, playerName, enemyName } from './main.js';
import { createElement } from './utils.js';
import { generateLogs } from './log.js';

const $randomButton = document.querySelector(`.button`);
const $arenas = document.querySelector(`.arenas`);


const battleResult = (playerName) => {
	const $title = createElement(`div`, `winTitle`);
	if (playerName) {
		$title.innerText = playerName + ` win`;
	} else {
		$title.innerText = `Draw`;
	}

	return $title;
}

const createReloadButton = () => {
	const $reloadWrap = createElement(`div`, `reloadWrap`);
	const $reloadButton = createElement(`button`, `button`);

	$reloadButton.innerText = `restart`;
	$reloadWrap.appendChild($reloadButton);

	$reloadButton.addEventListener(`click`, function () {
		window.location.reload()
	});

	return $reloadWrap;
};

export const showResult = () => {
	if (player1.hp === 0 || player2.hp === 0) {
		$randomButton.disabled = true;
		$arenas.appendChild(createReloadButton());
	}

	if (player1.hp > player2.hp && player2.hp <= 0) {
		$arenas.appendChild(battleResult(playerName));
		player1.img = `https://media1.tenor.com/images/9e37018bf6260d7ccf43c3116e284123/tenor.gif?itemid=13993543`;
		generateLogs(`end`);
	} else if (player2.hp > player1.hp && player1.hp <= 0) {
		$arenas.appendChild(battleResult(enemyName));
		generateLogs(`end`);
	} else if (player2.hp === 0 && player1.hp === 0) {
		$arenas.appendChild(battleResult());
		generateLogs(`draw`);
	}
};