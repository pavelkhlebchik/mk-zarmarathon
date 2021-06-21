import { createElement } from './utils.js';


class Player {
	constructor(props) {
		this.player = props.player;
		this.name = props.name;
		this.hp = props.hp;
		this.img = props.img;
		this.weapon = props.weapon;
		this.selector = `player${this.player}`;
		this.rootSelector = props.rootSelector;
	}

	attackMessage = () => {
		console.log(console.log(this.name + ` Fight`));
	}

	elHP = () => {
		return document.querySelector(`.player${this.player} .life`);
	};

	changeHP = (damage) => {
		this.hp -= damage;

		if (this.hp <= 0) {
			this.hp = 0;
		}
	};

	renderHP = () => {
		this.elHP().style.width = this.hp + `%`;
	};

	createPlayer = () => {
		const $player = createElement(`div`, this.selector);
		const $progressBar = createElement(`div`, `progressbar`);
		const $character = createElement(`div`, `character`);
		const $life = createElement(`div`, `life`);
		const $name = createElement(`div`, `name`);
		const $playerImage = createElement(`img`);

		$life.style.width = this.hp + `%`;
		$name.innerText = this.name;
		$playerImage.src = this.img;



		$progressBar.appendChild($name);
		$progressBar.appendChild($life);

		$character.appendChild($playerImage);

		$player.appendChild($progressBar);
		$player.appendChild($character);

		const $root = document.querySelector(`.${this.rootSelector}`);
		$root.appendChild($player);

		return $player;
	};
}

export { Player };