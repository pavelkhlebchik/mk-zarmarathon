
// const $formFight = document.querySelector(`.control`);

// const enemyAttack = () => {
// 	const hit = ATTACK[randomNumbers(0, 2)];
// 	const defence = ATTACK[randomNumbers(0, 2)];
// 	return {
// 		value: randomNumbers(HIT[hit], HIT[hit]),
// 		hit,
// 		defence
// 	}
// };

// const playerAttack = () => {
// 	const attack = {};

// 	for (let item of $formFight) {
// 		if (item.checked && item.name === `hit`) {
// 			attack.value = randomNumbers(HIT[item.value], HIT[item.value]);
// 			attack.hit = item.value;
// 		}

// 		if (item.checked && item.name === `defence`) {
// 			attack.defence = item.value;
// 		}
// 		item.checked = false;
// 	}

// 	return attack;
// };

// export { enemyAttack, playerAttack };