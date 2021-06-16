import { randomNumbers } from './utils.js';
import { logs } from './data.js';
import { playerName, enemyName } from './player.js';

const $chat = document.querySelector(`.chat`);

export const generateLogs = (type, player1, player2, damageHP) => {
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