'use strict';

window.addEventListener('load', () => {
	const settings = new Settings();
	const status = new Status();
	const snake = new Snake();
	const menu = new Menu();
	const food = new Food();
	const board = new Board();
	const game = new Game();
	
	settings.init({speed: 5, winLength: 15, wallOn: false});
	board.init(settings, snake);
	food.init(settings, snake, board);
	game.init(settings, status, board, snake, menu, food);
	
	board.renderBoard();
	board.renderSnake();
	food.setNewFood();
	game.setMessage(`Длина змейки: ${snake.body.length-1}`);
	
	game.run();
});