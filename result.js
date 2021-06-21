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
		window.location.pathname = `index.html`;
	});

	return $reloadWrap;
};

export const showResult = (player1, player2) => {
	if (player1.hp === 0 || player2.hp === 0) {
		$randomButton.disabled = true;
		$arenas.appendChild(createReloadButton());
	}

	if (player1.hp > player2.hp && player2.hp <= 0) {
		$arenas.appendChild(battleResult(player1.name));
		player1.img = `https://media1.tenor.com/images/9e37018bf6260d7ccf43c3116e284123/tenor.gif?itemid=13993543`;
		generateLogs(`end`, player1, player2);
	} else if (player2.hp > player1.hp && player1.hp <= 0) {
		$arenas.appendChild(battleResult(player2.name));
		generateLogs(`end`, player2, player1);
	} else if (player2.hp === 0 && player1.hp === 0) {
		$arenas.appendChild(battleResult());
		generateLogs(`draw`);
	}
};