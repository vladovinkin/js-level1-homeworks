'use strict';

class Settings {
	/**
	/* @param {Object} params - Параметры игры.
	/* @param {number} params.rowsCount - количество строк игрового поля [10; 30]
	/* @param {number} params.colsCount - количество колонок игрового поля [10; 30]
	/* @param {number} params.speed - скорость перемещения змейки [1; 10]
	/* @param {number} params.winLength - длина змейки для окончания уровня [5; 50]
	/* @param {boolean} params.wallOn - признак наличия стены [true, false]
	/* @throw {Error} если переданы не верные настройки, выбрасывается
	/* соответствующая ошибка.
	*/
	init(params) {
		let defaultParams = {rowsCount: 21, colsCount: 21, speed: 2, winLength: 50};
		Object.assign(defaultParams, params);
		
		if (defaultParams.rowsCount < 10 || defaultParams.rowsCount > 30) {
			throw new Error('Неверные настройки, значение RowsCount должно быть в диапазоне [10, 30].');
		}
		this.rowsCount = defaultParams.rowsCount;
		
		if (defaultParams.colsCount < 10 || defaultParams.colsCount > 30) {
			throw new Error('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
		}
		this.colsCount = defaultParams.colsCount;
		
		if (defaultParams.speed < 1 || defaultParams.speed > 10) {
			throw new Error('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
		}
		this.speed = defaultParams.speed;
		
		if (defaultParams.winLength < 5 || defaultParams.winLength > 50) {
			throw new Error('Неверные настройки, значение winLength должно быть в диапазоне [5, 50].');
		}
		this.winLength = defaultParams.winLength;
	}
}