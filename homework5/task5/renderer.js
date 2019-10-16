'use strict';

let renderer = {
	renderBoard () {
		let result = this.generateBoard();
		document.body.insertAdjacentHTML('afterbegin', result);
	},
	
	// скелет доски без закраски
	generateBoard() {
		let board = '';
		let isWhite = true;
		for (let y = 8; y >= 0; y--) {
			board += '<tr>';
			for (let x = 0; x <= 8; x++) {
				if (y > 0 || x > 0) {
					if (x > 0) {
						let char = String.fromCharCode(x+64);
						if (y > 0) {
							board += `<td data-x="${char}" data-y="${y}" data-c="${this.getSquareColor(isWhite)}"></td>`;
							isWhite = !isWhite;	
						} else {
							board += `<td>${char}</td>`;
						}
					} else {
						if (y > 0) {
							board += `<td>${y}</td>`;
						} else {
							board += `<td>${char}</td>`;
						}
					}
				} else if (x+y == 0) {
					board += `<td></td>`;
				}
			}
			board += '</tr>';
			isWhite = !isWhite;
		}
		return`<table><tbody>${board}</tbody></table>`;
	},
	
	// белое/черное
	getSquareColor(isWhite) {
		if (isWhite) {
			return("white");
		} else {
			return("black");
		}
	},
	
	// закрашиваем клетки добавлением нужных стилей нужным клеткам
	colourBoard() {
		// чёрные клетки
		let squares = document.querySelectorAll(`[data-c="black"]`);
		squares.forEach(function(square) {
			square.classList.add('bg-black');
		});
		
		// белые клетки
		squares = document.querySelectorAll(`[data-c="white"]`);
		squares.forEach(function(square) {
			square.classList.add('bg-white');
		});
	},
	
	// добавляем нужные стили ячейкам координат
	sizingCoordSquares() {
		let tdCells = null;
		let trCells = document.querySelector('table').querySelectorAll('tr');
		trCells.forEach(function(trCell) {
			tdCells = trCell.querySelectorAll('td');
			tdCells[0].classList.add('vCoord');
		});
		tdCells.forEach(function(tdCell) {
			tdCell.classList.add('hCoord');
		});
	},
};