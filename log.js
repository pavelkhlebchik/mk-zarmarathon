import { randomNumbers, getDate } from './utils.js';
import { logs } from './data.js';
import { playerName, enemyName } from './main.js';

const $chat = document.querySelector(`.chat`);

export const generateLogs = (type, player1, player2, damageHP) => {
	let text = ``;
	let chatText = ``;

	switch (type) {
		case (`start`):
			text = logs[type].replace(`[time]`, getDate())
				.replace(`[player1]`, playerName)
				.replace(`[player2]`, enemyName);
			const startText = `<p>[${getDate()}] - ${text}</p>`;
			$chat.insertAdjacentHTML(`afterbegin`, startText)
			break;

		case (`end`):
			text = logs[type][randomNumbers(0, logs[type].length - 1)]
				.replace(`[playerLose]`, enemyName)
				.replace(`[playerWins]`, playerName);

			chatText = `<p>[${getDate()}] - ${text}</p>`;
			$chat.insertAdjacentHTML(`afterbegin`, chatText);
			break;

		case (`hit`):
			text = logs[type][randomNumbers(0, logs[type].length - 1)]
				.replace(`[playerDefence]`, player1.name)
				.replace(`[playerKick]`, player2.name)
			chatText = `<p>[${getDate()}] - ${text} - ${damageHP} [${(player1.hp)}/100] </p>`;
			$chat.insertAdjacentHTML(`afterbegin`, chatText);
			break;

		case (`defence`):
			text = logs[type][randomNumbers(0, logs[type].length - 1)]
				.replace(`[playerKick]`, player1.name)
				.replace(`[playerDefence]`, player2.name)
			chatText = `<p>[${getDate()}] - ${text} - ${damageHP} [${player2.hp}/100] </p>`;
			$chat.insertAdjacentHTML(`afterbegin`, chatText);
			break;

		case (`draw`):
			text = logs.draw;
			chatText = `<p>[${getDate()}] - ${text}</p>`;
			$chat.insertAdjacentHTML(`afterbegin`, chatText);
			break;

		default:
			text = `Бой пока не начался`;
			chatText = `<p>[${getDate()}] - ${text}</p>`;
			$chat.insertAdjacentHTML(`afterbegin`, chatText);
	};
};