import { Game } from './game.js'
// import { Player } from './player.js';
// import { enemyAttack, playerAttack } from './attack.js';
// import { showResult } from './result.js';
// import { generateLogs } from './log.js';

// const $arenas = document.querySelector(`.arenas`);
// const $formFight = document.querySelector(`.control`);

const game = new Game();
game.start();
console.log(game.start);