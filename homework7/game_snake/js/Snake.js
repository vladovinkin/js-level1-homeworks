'use strict';

class Snake {
	constructor() {
		// возможные направления движения (расположены по часовой стрелке)
		this.possibleDirections = ['down', 'left', 'up', 'right'];
		// возможные изменения направлений движения змейки
		// влево: против часовой стрелки
		// вправо: по часовой стрелке
		this.possibleDirectionChangeKeys = ['left', 'right'];
		// счёттчик шагов по текущему направлению движения (для исключения движения 
		// в противоположном направлении)
		this.directionStepsCount = 0;
		
		/**
		* body[body.length-1] - последние координаты хвоста (не отображаются
		* и в длину змейки не входят)
		* так реализовано для корректного отображения змейки после поедания корма
		* (в прошлой версии был лишний шаг со старой длиной)
		*/
		this.body = [{
			x: 1,
			y: 1,
		}, {
			x: 1,
			y: 1,
		}];
		
		this.direction = 'down';
	}
	
	/**
	* Меняем направление движения.
	* @param {string} turnDirection изменение направления может быть left или right
	* @throws {Error} при передаче не корректного направления выбрасывается ошибка.
	*/
	changeDirection(turnDirection) {
		if (!this.possibleDirectionChangeKeys.includes(turnDirection)) {
			throw new Error('Передано неверное направление. Вы передали: ' + newDirection);
		}

		let dirs = this.possibleDirections;
		switch(turnDirection) {
			case 'left':
				dirs.unshift(dirs.pop());
				break;
			case 'right':
				dirs.push(dirs.shift());
				break;		
		}

		this.direction = dirs[0];
		this.directionStepsCount = 0;
	}
	
	/**
	* Метод осуществляет шаг змейки. Добавляет ячейку перед существующим
	* положением головы и удаляет одну ячейку в хвосте.
	*/
	performStep() {
		let currentHeadCoords = this.body[0];
		let newHeadCoords = {
			x: currentHeadCoords.x,
			y: currentHeadCoords.y,
		};
		switch (this.direction) {
			case "down":
				newHeadCoords.y++;
				break;
			case "up":
				newHeadCoords.y--;
				break;
			case "left":
				newHeadCoords.x--;
				break;
			case "right":
				newHeadCoords.x++; 
				break;
		}
		this.body.unshift(newHeadCoords);
		this.body.pop();
		this.directionStepsCount++;
	}
	
	/**
	* Метод дублирует в массиве объектов, представляющих тело змейки,
	* последнюю ячейку, т.е. в массивев конце оказываются два
	* одинаковых объекта. Когда метод performStep в самом конце
	* удаляет последний элемент массива, он удаляет сдублированный
	* объект, таким образом тело змейки вырастает.
	*/
	increaseBody() {
		let bodyLastCell = this.body[this.body.length - 1];
		let newBodyLastCell = {
			x: bodyLastCell.x,
			y: bodyLastCell.y,
		};
		this.body.push(newBodyLastCell);
	}

	/**
	 * Метод проверяет, ест ли змейка сама себя.
	 * @returns {boolean} Если голова "наступила" на тело - true, иначе - false
	 */
	isSnakeEatSelf() {
		let isEat = false;
		if (this.body.length > 5) {
			this.body.forEach(function(item, index, array) {
				if ((index > 3) && (index < array.length) && (item.x == array[0].x) && (item.y == array[0].y)) {
					isEat = true;
				}
			});
		}
		return isEat;
	}
}