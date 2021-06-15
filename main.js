'use strict';

const $arenas = document.querySelector(`.arenas`);
const $randomButton = document.querySelector(`.button`);
const $restartButton = document.querySelector(`.restartWrap .button`);
const $formFight = document.querySelector(`.control`);
const $chat = document.querySelector(`.chat`);

const logs = {
	start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
	end: [
		'Результат удара [playerWins]: [playerLose] - труп',
		'[playerLose] погиб от удара бойца [playerWins]',
		'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
	],
	hit: [
		'[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
		'[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
		'[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
		'[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
		'[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
		'[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
		'[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
		'[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
		'[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
		'[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
		'[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
		'[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
		'[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
		'[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
		'[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
		'[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
		'[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
		'[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
	],
	defence: [
		'[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
		'[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
		'[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
		'[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
		'[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
		'[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
		'[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
		'[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
	],
	draw: 'Ничья - это тоже победа!'
};

const HIT = {
	head: 30,
	body: 25,
	foot: 20
}

const ATTACK = [`head`, `body`, `foot`];

const randomNumbers = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const attackMessage = function () {
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
	attackMessage,
	elHP,
	renderHP,
	damage: changeHP,
	player: 1,
	name: `SCORPION`,
	hp: 100,
	img: `http://reactmarathon-api.herokuapp.com/assets/scorpion.gif`,
	weapon: [`knife, spear, strapon, mem`]
};
const { name: playerName } = player1;

const player2 = {
	attackMessage,
	elHP,
	renderHP,
	damage: changeHP,
	player: 2,
	name: `SUB-ZERO`,
	hp: 100,
	img: `http://reactmarathon-api.herokuapp.com/assets/subzero.gif`,
	weapon: [`knife, spear, strapon, mem`]
};

const { name: enemyName } = player2;


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

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

const enemyAttack = () => {
	const hit = ATTACK[randomNumbers(0, 2)];
	const defence = ATTACK[randomNumbers(0, 2)];
	return {
		value: randomNumbers(HIT[hit], HIT[hit]),
		hit,
		defence
	}
};

const playerAttack = () => {
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

	return attack;
}

const generateLogs = (type, player1, player2, damageHP) => {
	const date = new Date();
	const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);
	const time = `${normalize(date.getHours())}:${normalize(date.getMinutes())}:${normalize(date.getSeconds())}`;

	let text = ``;
	let chatText = ``;

	switch (type) {
		case (`start`):
			text = logs[type].replace(`[time]`, time)
				.replace(`[player1]`, playerName)
				.replace(`[player2]`, enemyName);
			const startText = `<p>[${time}] - ${text}</p>`;
			$chat.insertAdjacentHTML(`afterbegin`, startText)
			break;

		case (`end`):
			text = logs[type][randomNumbers(0, logs[type].length - 1)]
				.replace(`[playerLose]`, enemyName)
				.replace(`[playerWins]`, playerName);

			chatText = `<p>[${time}] - ${text}</p>`;
			$chat.insertAdjacentHTML(`afterbegin`, chatText);
			break;

		case (`hit`):
			text = logs[type][randomNumbers(0, logs[type].length - 1)]
				.replace(`[playerDefence]`, player1.name)
				.replace(`[playerKick]`, player2.name)
			chatText = `<p>[${time}] - ${text} - ${damageHP} [${(player1.hp)}/100] </p>`;
			$chat.insertAdjacentHTML(`afterbegin`, chatText);
			break;

		case (`defence`):
			text = logs[type][randomNumbers(0, logs[type].length - 1)]
				.replace(`[playerKick]`, player1.name)
				.replace(`[playerDefence]`, player2.name)
			chatText = `<p>[${time}] - ${text} - ${damageHP} [${player2.hp}/100] </p>`;
			$chat.insertAdjacentHTML(`afterbegin`, chatText);
			break;

		case (`draw`):
			text = logs.draw;
			chatText = `<p>[${time}] - ${text}</p>`;
			$chat.insertAdjacentHTML(`afterbegin`, chatText);
			break;

		default:
			text = `Бой пока не начался`;
			chatText = `<p>[${time}] - ${text}</p>`;
			$chat.insertAdjacentHTML(`afterbegin`, chatText);
	};
};

document.onload = generateLogs(`start`);

const showResult = () => {
	if (player1.hp === 0 || player2.hp === 0) {
		$randomButton.disabled = true;
		$arenas.appendChild(createReloadButton());
	}

	if (player1.hp > player2.hp && player2.hp <= 0) {
		$arenas.appendChild(battleResult(playerName));
		generateLogs(`end`);
	} else if (player2.hp > player1.hp && player1.hp <= 0) {
		$arenas.appendChild(battleResult(enemyName));
		generateLogs(`end`);
	} else if (player2.hp === 0 && player1.hp === 0) {
		$arenas.appendChild(battleResult());
		generateLogs(`draw`);
	}
};

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


