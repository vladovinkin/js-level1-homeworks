let mover = {
	
	getDirection() {
		const availableDirections = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10];
		while (true) {
			let direction = parseInt(prompt('Введите число (1, 2, 3, 4, 6, 7, 8 или 9), куда вы хотите переместиться, 0 для выхода.'));
			
			if(isNaN(direction) || !availableDirections.includes(direction)) {
				alert('Для перемещения необходимо ввести одно из чисел 1, 2, 3, 4, 6, 7, 8 или 9. Для выхода - 0.');
				continue;
			}
			if (direction === 0) {
				return null;
			}
			return direction;
		}
	},
	
	getNextPosition(direction) {
		
		const nextPosition = {
			x: player.x,
			y: player.y,
		};
		
		let isWall = false;
		
		switch(direction) {
			case 1:
				nextPosition.x--;
				nextPosition.y++;
				break;
			case 2:
				nextPosition.y++;
				break;
			case 3:
				nextPosition.x++;
				nextPosition.y++;
				break;
			case 4:
				nextPosition.x--;
				break;
			case 5:
				config.changePacmanMode();
				break;
			case 6:
				nextPosition.x++;
				break;
			case 7:
				nextPosition.x--;
				nextPosition.y--;
				break;
			case 8:
				nextPosition.y--;
				break;
			case 9:
				nextPosition.x++;
				nextPosition.y--;
				break;
			case 10:
				config.changeTargetMode();
				break;
		}
		
		if (config.pacmanModeOn) {
			if ((nextPosition.x) === -1) {
				nextPosition.x += config.colsCount;
			}
			if ((nextPosition.x) === config.colsCount) {
				nextPosition.x -= config.colsCount;
			}
			if ((nextPosition.y) === -1) {
				nextPosition.y += config.rowsCount;
			}
			if ((nextPosition.y) === config.rowsCount) {
				nextPosition.y -= config.rowsCount;
			}
		} else {
			if ((nextPosition.y == -1) || (nextPosition.y == config.rowsCount) || (nextPosition.x == -1) || (nextPosition.x == config.colsCount)) {
				isWall = true;
			}
		}
		
		if (isWall) {
			nextPosition.x = player.x;
			nextPosition.y = player.y;
			alert ("Стенка!");
		}
		
		return(nextPosition);
	},
};