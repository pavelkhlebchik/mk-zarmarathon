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

const { name: playerName } = player1;

const { name: enemyName } = player2;

export { player1, player2, playerName, enemyName };