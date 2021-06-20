import { Player } from './player.js';
import { HIT, ATTACK } from './data.js';
import { randomNumbers } from './utils.js';
import { generateLogs } from './log.js';
import { showResult } from './result.js';



export class Game {
	constructor() {
		this.$arenas = document.querySelector(`.arenas`);
		this.$formFight = document.querySelector(`.control`);
		this.$randomButton = document.querySelector(`.button`);
		this.$chat = document.querySelector(`.chat`);

		this.getPlayers = async () => {
			const body = fetch(`https://reactmarathon-api.herokuapp.com/api/mk/players`).then(response => response.json());
			return body;
		}

		this.chooseEnemy = async () => {
			const body = fetch(`https://reactmarathon-api.herokuapp.com/api/mk/player/choose`).then(response => response.json());
			return body;
		}

		this.start = async () => {
			const p1 = JSON.parse(localStorage.getItem(`player1`));
			const p2 = await this.chooseEnemy();
			// players[randomNumbers(0, (players.length - 1))];
			this.player1 = new Player({
				...p1,
				player: 1,
				rootSelector: `arenas`,
			});


			this.player2 = new Player({
				...p2,
				player: 2,
				rootSelector: `arenas`
			});

			this.player1.createPlayer();
			this.player2.createPlayer();

			generateLogs(`start`, this.player1, this.player2);

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

				for (let item of this.$formFight) {
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
			};

			const letsFight = () => {
				const enemy = enemyAttack();
				const player = playerAttack();
				let { value: enemyHit } = enemy;
				let { value: playerHit } = player;

				if (player.defence !== enemy.hit) {
					this.player1.changeHP(enemyHit);
					this.player1.renderHP();
					generateLogs(`hit`, this.player1, this.player2, enemyHit);
				} else {
					enemyHit = 0;
					generateLogs(`defence`, this.player2, this.player1, enemyHit);
				}

				if (enemy.defence !== player.hit) {
					this.player2.changeHP(playerHit);
					this.player2.renderHP();
					generateLogs(`hit`, this.player2, this.player1, playerHit);
				} else {
					playerHit = 0;
					generateLogs(`defence`, this.player1, this.player2, playerHit);
				}

				showResult(this.player1, this.player2);
			};

			this.$formFight.addEventListener(`submit`, function (evt) {
				evt.preventDefault();
				letsFight();
			});
		}
	}
}