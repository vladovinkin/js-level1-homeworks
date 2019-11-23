'use strict';

class Game {
	constructor() {
		this.tickIndentifier = null;
		this.scoreEl = document.getElementById('score');
		this.outcomeEl = document.getElementById('outcome');
		this.startBtnEl = document.getElementById('startBtn');
		this.gameOverReason = 'wall';
	}
	
	/**
	* Метод получает другие игровые объекты,
	* которые нужны ему для работы.
	* @param {Settings} settings
	* @param {Status} status
	* @param {Board} board
	* @param {Snake} snake
	* @param {Menu} menu
	* @param {Food} food
	*/
	init(settings, status, board, snake, menu, food) {
		this.settings = settings;
		this.status = status;
		this.board = board;
		this.snake = snake;
		this.menu = menu;
		this.food = food;
	}
	
	/**
	* Метод назначает обработчики на события клика на кнопки "Старт",
	* "Пауза, а также на стрелки на клавиатуре
	*/
	run() {
		this.menu.addButtonClickListeners(this.start.bind(this), this.pause.bind(this));
		document.addEventListener('keydown', this.pressKeyHandler.bind(this));
	}
	
	/**
	* Метод запускает игру.
	*/
	start() {
		if (this.status.isPaused()) {
			this.status.setPlaying();
			this.tickIndentifier = setInterval(this.doTick.bind(this),550 - (50 * this.settings.speed));
		}
	} 
	
	/**
	* Метод ставит игру на паузу.
	*/
	pause() {
		if (this.status.isPlaying()) {
			this.status.setPaused();
			clearInterval(this.tickIndentifier);
		}
	}
	
	/**
	* Этот метод запускается каждый соответствующий текущему уровню игры
	* интервал времени и осуществляет:
	* 1. перемещение змейки;
	* 2. проверяет, проиграна/выиграна ли игра;
	* 3. увеличивает размер змейки, если она ест еду;
	* 4. заново отрисовывает положение объектов на игровом поле (змейка/еда/etc.).
	*/
	doTick() {
		this.snake.performStep();
		if (this.isGameLost()) {
			this.board.boardEl.classList.add('shake');
			clearInterval(this.tickIndentifier);
			this.outcomeEl.style.color = 'red';
			this.setOutcome(`Вы проиграли: ${this.getGameOverReasonInString(this.gameOverReason)}`);
			return;
		}
		if (!this.settings.wallOn) {
			// если стенок нет, пересчёт координат - переброс головы на противоположную сторону
			this.board.calcCoordsThroughWalls(this.snake.body[0]);
		}
		this.board.renderSnake(); // для метода board.isHeadOnFood()
		if (this.board.isHeadOnFood()) {
			this.snake.increaseBody();
			this.board.renderSnake();
			this.food.setNewFood();
			this.setScore(`Длина змейки: ${this.snake.body.length-1} / ${this.settings.winLength}`);
		}
		if (this.isGameWon()) {
			this.board.renderSnake();
			clearInterval(this.tickIndentifier);
			this.outcomeEl.style.color = 'green';
			this.setOutcome('Вы выиграли!');
			return;
		}
		this.board.clearBoard();
		this.food.setFood();
		this.board.renderSnake();
	}

	/**
	* Метод проверяет, выиграна ли игра.
	* @returns {boolean} если длина змейки достигла длины,
	* заданной в параметрах для выигрыша, тогда true, иначе false.
	*/
	isGameWon() {
		return this.snake.body.length-1 == this.settings.winLength;
	}
	
	/**
	* Метод проверяет, проиграна ли игра.
	* @returns {boolean} если мы шагнули в стену (при наличии стены), или съели себя - тогда true,
	* иначе - false.
	*/
	isGameLost() {
		if (this.snake.isSnakeEatSelf()) {
			this.gameOverReason = 'eatself';
			return true;
		}
		if (this.settings.wallOn) {
			return this.board.isNextStepToWall(this.snake.body[0]);
		}
		return false;
	}
	
	/**
	* В зависимости от нажатой кнопки (влево, вправо)
	* будет вызываться соответствующий метод.
	* @param {KeyboardEvent} event
	*/
	pressKeyHandler(event) {
		if (this.snake.directionStepsCount > 0 ) {
			switch (event.key) {
				case "ArrowLeft":
					this.snake.changeDirection('left');
					break;
				case "ArrowRight":
					this.snake.changeDirection('right');
					break;
			}
		}
	}
	
	/**
	* Метод выводит текущий счёт на странице.
	* @param {string} text
	*/
	setScore(text) {
		this.scoreEl.innerText = text;
	}
	
	/**
	* Метод выводит итог игры на странице.
	* @param {string} text
	*/
	setOutcome(text) {
		this.outcomeEl.innerText = text;
	}

	/**
	 * Выдаёт подробную причину окончания игры.
	 * @param {string} reason 
	 */
	getGameOverReasonInString(reason) {
		switch(reason) {
			case 'wall':
				return 'врезались в стену.';
			case 'eatself':
				return 'укусили за бочок.';
			default:
				return 'причина неизвестна. Обратитесь к разработчику.';
		}
	}
}