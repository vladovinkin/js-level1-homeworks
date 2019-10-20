'use strict';

class Food {
	constructor() {
		this.x = null;
		this.y = null;
	}
	
	/**
	* Метод получает другие игровые объекты, которые
	* нужны ему для работы.
	* @param {Settings} settings объект настроек
	* @param {Snake} snake объект змейки
	* @param {Board} board объект игрового поля
	*/
	init(settings, snake, board) {
		this.settings = settings;
		this.snake = snake;
		this.board = board;
	}
	
	/**
	* Метод устанавливает новое случайное положение еды
	* на игровом поле.
	*/
	setNewFood() {
		const foodCoords = this.generateRandomCoords();
		this.board.renderFood(foodCoords);
	}
	
	/**
	* Метод устанавливает на игровом поле еду
	* по текущим координатам.
	*/
	setFood() {
		let cell = this.board.getCellEl(this.x, this.y);
		this.board.renderFood(cell);
	}
	
	/**
	* Метод получает ссылку на ячейку таблицы - тег td
	* где будет находиться еда.
	* @returns {HTMLTableCellElement} тег td
	*/
	generateRandomCoords() {
		while (true) {
			this.x = Math.floor(Math.random() * this.settings.colsCount) + 1;
			this.y = Math.floor(Math.random() * this.settings.rowsCount) + 1;
			
			let cell = this.board.getCellEl(this.x, this.y);
			
			if (cell.classList.contains('snakeBody')) {
				continue;
			}
			return cell;
		}
	}
	
	
}