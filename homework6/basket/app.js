'use strict';

const buttonsDesc = document.querySelectorAll('.btnDesc');
const buttonBasket = document.querySelector('.btnBasket');
const basketWindow = document.querySelector('.basket');
const buyButtons = document.querySelectorAll('.buyButton');

// отображаем окно корзины по клике на кнопку "Корзина"
buttonBasket.addEventListener('click', () => {
	basketWindow.classList.remove('hidden');
})

// слушатель на кнопку "закрыть" окна корзины
basketWindow.addEventListener('click', (event) => {
	if (event.offsetX > 424 && event.offsetX < 434 && event.offsetY > 6 && event.offsetY < 22) {
		basketWindow.classList.add('hidden');
	}
})

// добавляем слушателей на кнопки "Купить" каждого товара
buyButtons.forEach((button) => {
	button.addEventListener('click', (event) => {
		let id = event.srcElement.dataset.id;
		let price = event.srcElement.dataset.price;
		let name = event.srcElement.dataset.name;
		basket.addProduct({id: id, price: price, name: name });
	})
})

let basket = {
	products: {},

	/**
	 * Отображает в аттрибуте title кнопок "В корзину" количество 
	 * добавленных единиц товара.
	 */
	renderBuyBtnsTitle() {
		let btns = document.querySelectorAll('.buyButton');
		let countObjects = 0;
		for (let i = 0; i < btns.length; i++) {
			let id = btns[i].dataset.id;
			if (this.products[id] != undefined) {
				let count = this.products[id].count;
				btns[i].setAttribute('title', `В корзине ${count} шт.`);
				countObjects++;
			} else { 
				btns[i].setAttribute('title', 'Нет в корзине');
			}
		}
		this.renderBasketBtnText(countObjects);
	},

	/**
	 * Отображает на кнопке "Корзина" количество наименований товаров, 
	 * добавленных в корзину.
	 * @param {number} count 
	 */
	renderBasketBtnText(count) {
		if (count == 0) {
			buttonBasket.innerText = "Корзина";
		} else {
			buttonBasket.innerText = `Корзина(${count})`;
		}
	},

	/**
	 * Метод добавляет продукт в корзину.
	 * @param {{id: string, price: string, name: string}} product 
	 */
	addProduct(product) {
		this.addProductToObject(product);
		this.renderProductInBasket(product);
		this.renderTotalSum();
		this.addRemoveBtnsListeners();
		this.addIncreaseBtnsListeners();
		this.addDecreaseBtnsListeners();
		this.renderBuyBtnsTitle();
	},

	/**
	 * Метод добавляет продукт в объект с продуктами.
	 * @param {{id: string, price: string, name: string}} product 
	 */
	addProductToObject(product) {
		if (this.products[product.id] == undefined) {
			this.products[product.id] = {
				price: product.price,
				name: product.name,
				count: 1,
			}
		} else {
			this.products[product.id].count++;
		}
	},

	/**
	 * Метод отрисовывает продукт в корзине,
	 * если там такой уже есть - просто увеличивает счётчик на 1.
	 * @param {{ id: string, price: string, name: string }} product 
	 */
	renderProductInBasket(product) {
		let productExist = document.querySelector(`.productCount[data-id="${product.id}"]`);
		if (productExist) {
			productExist.textContent++;
			this.renderMinusButtonOnProduct(product.id, +productExist.textContent);
			return;
		}
		let productRow = `
			<tr>
				<th scope="row">${product.id}</th>
				<td>${product.name}</td>
				<td>${product.price} <i class="fa fa-rub"></i></td>
				<td class="btn-minus" data-id="${product.id}">&emsp;</td>
				<td class="productCount" data-id="${product.id}">1</td>
				<td class="btn-plus" data-id="${product.id}"><i class="fa fa-plus-square-o" data-id="${product.id}"></i></td>
				<td><i class="fa fa-trash productRemoveBtn" data-id="${product.id}"></i></td>
			</tr>
		`;
		let tBody = document.querySelector('tbody');
		tBody.insertAdjacentHTML('beforeend', productRow);
	},

	/**
	 * Метод отображает или скрывает кнопку уменьшения количества товаров в корзине.
	 * Если данного товара 1 шт, то кнопка скрывается, и удаление осуществляется
	 * кликом по значку корзины. 
	 * @param {string} id 
	 * @param {number} count 
	 */
	renderMinusButtonOnProduct(id, count) {
		let btnMinusTd = document.querySelector(`.btn-minus[data-id="${id}"]`);
		if (count == 1) {
			btnMinusTd.innerHTML = "&emsp;";
		} else {
			btnMinusTd.innerHTML = `<i class="fa fa-minus-square-o" data-id="${id}"></i>`;
			this.addDecreaseBtnsListeners();
		}
	},

	/**
	 * Метод отображает общую сумму заказов в корзине.
	 */
	renderTotalSum() {
		const sum = this.getTotalSum();
		document.querySelector('.total').textContent = sum;
		this.renderBasketBtnTitle(sum);
	},

	/**
	 * Метод добавляет аттрибут title к кнопке корзины с итоговой суммой заказа.
	 * @param {number} sum 
	 */
	renderBasketBtnTitle(sum) {
		buttonBasket.setAttribute('title', `Сумма: ${sum} руб.`)	
	},

	/**
	 * Метод считает стоимость всех продуктов в корзине.
	 * @returns {number}
	 */
	getTotalSum() {
		let sum = 0;
		for (let key in this.products) {
			sum += this.products[key].price * this.products[key].count;
		}
		return sum;
	},

	/**
	 * Добавляем слушателей события клика по кнопке удалить.
	 */
	addRemoveBtnsListeners() {
		let btns = document.querySelectorAll('.productRemoveBtn');
		for (let i = 0; i < btns.length; i++) {
			btns[i].addEventListener('click', this.removeProductListener);
		}
	},
	
	/**
	 * Добавляем в корзине слушателей события клика по кнопке "плюс".
	 */
	addIncreaseBtnsListeners() {
		let btns = document.querySelectorAll('.fa-plus-square-o');
		for (let i = 0; i < btns.length; i++) {
			btns[i].addEventListener('click', this.increaseProductListener);
		}
	},

	/**
	 * Добавляем в корзине слушателей события клика по кнопке "минус".
	 */
	addDecreaseBtnsListeners() {
		let btns = document.querySelectorAll('.fa-minus-square-o');
		for (let i = 0; i < btns.length; i++) {
			btns[i].addEventListener('click', this.decreaseProductListener);
		}
	},

	/**
	 * Обработчик события клика по кнопке удаления товара.
	 * @param {MouseEvent} event 
	 */
	removeProductListener(event) {
		// используется basket вместо this, потому что контекст вызова не имеет этих методов,
		// и нам надо явно обратиться к нашему объекту корзины.
		basket.removeProduct(event);
		basket.renderTotalSum();
		basket.renderBuyBtnsTitle();
	},
	
	/**
	 * Обработчик события клика по кнопке "плюс".
	 * @param {MouseEvent} event 
	 */
	increaseProductListener(event) {
		basket.increaseProduct(event);
		basket.renderTotalSum();
		basket.renderBuyBtnsTitle();
	},

	/**
	 * Обработчик события клика по кнопке "минус".
	 * @param {MouseEvent} event 
	 */
	decreaseProductListener(event) {
		basket.decreaseProduct(event);
		basket.renderTotalSum();
		basket.renderBuyBtnsTitle();
	},

	/**
	 * Метод полностью удаляет продукт из объекта продуктов, а также из корзины на странице.
	 * @param {MouseEvent} event 
	 */
	removeProduct(event) {
		let id = event.srcElement.dataset.id;
		this.removeProductFromObject(id);
		this.removeProductFromBasket(id);
	},

	/**
	 * Метод увеличивает на 1шт количество продукта в объекте продуктов, 
	 * а также в корзине на странице.
	 * @param {MouseEvent} event 
	 */
	increaseProduct(event) {
		let id = event.srcElement.dataset.id;
		this.increaseProductInObject(id);
		this.increaseProductInBasket(id);
	},

	/**
	 * Метод уменьшает на 1шт количество продукта в объекте продуктов, 
	 * а также в корзине на странице.
	 * @param {MouseEvent} event 
	 */
	decreaseProduct(event) {
		let id = event.srcElement.dataset.id;
		this.decreaseProductInObject(id);
		this.decreaseProductInBasket(id);
	},

	/**
	 * Метод полностью удаляет товар из корзины.
	 * @param {*} id 
	 */
	removeProductFromBasket(id) {
		let countTd = document.querySelector(`.productCount[data-id="${id}"]`);
		countTd.parentNode.remove();
	},

	/**
	 * Метод увеличивает количество продукта в корзине на 1шт.
	 * @param {*} id 
	 */
	increaseProductInBasket(id) {
		let countTd = document.querySelector(`.productCount[data-id="${id}"]`);
		countTd.textContent++;
		this.renderMinusButtonOnProduct(id, +countTd.textContent);
	},

	/**
	 * Метод уменьшает количество продукта в корзине на 1шт.
	 * @param {*} id 
	 */
	decreaseProductInBasket(id) {
		let countTd = document.querySelector(`.productCount[data-id="${id}"]`);
		countTd.textContent--;
		this.renderMinusButtonOnProduct(id, +countTd.textContent);
	},

	/**
	 * Метод увеличивает на 1шт количество продукта в объекте с продуктами.
	 * @param {string} id
	 */
	increaseProductInObject(id) {
		this.products[id].count++;
	},
	
	/**
	 * Метод уменьшает на 1шт количество продукта в объекте с продуктами.
	 * @param {string} id
	 */
	decreaseProductInObject(id) {
		this.products[id].count--;
	},

	/**
	 * Метод полностью удаляет продукт из объекта с продуктами.
	 * @param {string} id
	 */
	removeProductFromObject(id) {
		delete this.products[id];
	},
};

buttonsDesc.forEach(function(button) {
	button.addEventListener('click', function() {
		let parent = button.parentNode;
		let productName = parent.querySelector('.productName');
		let image = parent.querySelector('img');
		if (button.innerText == "Подробнее") {
			let desc = document.createElement('div');
			desc.innerText = getDescription(productName.innerText);
			parent.insertBefore(desc, image);
			image.style.display = "none";
			desc.classList.add('description');
			button.innerText = "Изображение";
		} else {
			image.style.display = "inherit";
			parent.removeChild(parent.querySelector('.description'));
			button.innerText = "Подробнее";
		}
	});
});

function getDescription(name) {
	switch(name) {
		case "Сибирская тройка":
			return("Новый высокоурожайный сорт сибирской селекции для открытого грунта и пленочных укрытий. Сорт среднеранний, с компактным штамбовым типом куста высотой до 60 см. Плоды яркие, красные, правильной перцевидной формы, крупные. Первые плоды длиной до 15 см, весом до 350 г. Вкус и сладость мясистых плодов, даже не требующих соли при употреблении в свежем виде, можно назвать 'изюминкой' данного сорта. К достоинствам сорта относятся также его высокая урожажйность (до 5 кг с растения) в сочетании с низкорослым типом куста и высокая устойчивость к заболеваниям. Сорт практически не требует пасынкования.");
		case "Видимо-невидимо":
			return("Отличный розовоплодный урожайный сорт для открытого грунта и пленочных теплиц, способный порадовать очень хорошим урожаем крупных и вкусных плодов. Сорт раннеспелый, низкорослый. Даже в открытом грунте на основном стебле формируется до 15-16 плодов массой около 300 граммов. Плоды розовые, округлые, гладкие и плотные, не растрескиваются. Сорт характеризуется повышенной устойчивостью к грибковым заболеваниям. Урожайность при хорошем уходе достигает 5 кг с растения.");
		case "Японский краб":
			return("Оригинальный сорт томатов с крупными вкусными плодами. Томат Японский краб - достаточно непривередливый сорт, хотя без должного ухода и он не даст хорошего урожая. Это среднеспелый индетерминантный вид, одинаково растущий и в теплице, и на открытом участке. Некоторые экземпляры достигают полутораметрового роста. Это мощное, очень эффектное растение, имеющее темно-зеленую листву. Выращивать томат Японский краб нужно в один, иногда в два стебля с пасынкованием и подвязыванием. Плоды у этого оригинального сорта, недавно выведенного селекционерами, мясистые и вкусные. Помидоры Японский краб имеют слегка приплюснутую округлую форму, они среднеребристые и многокамерные. Масса их доходит до 350 граммов.");
		default:
			alert(`Значение ${name} не добавлено!`);
			return("");
	}
};