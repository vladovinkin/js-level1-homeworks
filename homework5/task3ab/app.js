'use strict';

const modal = document.querySelector('.modal');
const buttonYes = document.querySelector('.btn-yes');
const buttonNo = document.querySelector('.btn-no');
const buttonBuy = document.querySelector('.btn-buy-alco');
let timeInterval = null;

buttonBuy.addEventListener('click', function() {
	modal.classList.remove('zoomOut');
	modal.classList.remove('hidden');
	modal.classList.add('flipInX');
});

buttonYes.addEventListener('click', function() {
	modal.classList.add('zoomOut');
	timeInterval = setInterval(closeModalYes, 500);
});

function closeModalYes() {
	clearInterval(timeInterval);
	modal.classList.add('hidden');
	alert('Выбранный алкоголь успешно добавлен!');
}

buttonNo.addEventListener('click', function() {
	modal.classList.add('hinge');
	timeInterval = setInterval(closeModalNo, 2000);
});

function closeModalNo() {
	clearInterval(timeInterval);
	modal.classList.add('hidden');
	alert('Извините, но алкоголь Вам пока рано...');
	buttonBuy.classList.add('lightSpeedOut');
	timeInterval = setInterval(removeBuyButton, 1000);
}

function removeBuyButton () {
	clearInterval(timeInterval);
	buttonBuy.classList.add('hidden'); // кнопку тоже уберём
}