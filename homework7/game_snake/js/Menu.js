'use strict';

class Menu {
	constructor() {
		this.startBtnEl = document.getElementById('startBtn');
		this.pauseBtnEl = document.getElementById('pauseBtn');
	}
	
	/**
	* Метод назначает переданные функции в качестве обработчиков
	* событий клика на кнопки "Старт" и "Пауза"
	* @param {Function} startBtnClickHandler
	* @param {Function} pauseBtnClickHandler
	*/
	addButtonClickListeners(startBtnClickHandler, pauseBtnClickHandler) {
		this.startBtnEl.addEventListener('click', startBtnClickHandler);
		this.pauseBtnEl.addEventListener('click', pauseBtnClickHandler);
	}
}