let splitNumber = {
	units: 0,
	tens: 0,
	hundreds: 0,
	
	getObject (number) {	
		if (number.length == 0) {
			console.log("Вы ввели пустую строку");
		} else if (isNaN(number)) {
			console.log("Введёное значение не является числом");
		} else if (!Number.isInteger(+number)) {
			console.log("Введёное число дробное");
		} else if ((+number < 0) || (+number > 999)) {
			console.log("Введёное число выходит за допустимые пределы");
		} else {
			number = +number;
			this.units = number % 100 % 10;
			this.tens = (number - this.units) / 10 % 10;
			this.hundreds = Math.floor(number / 100);
			return this;
		}
		return {};			
	},
	
	isEmpty (obj) {
	  	for (let key in obj) {
			// если тело цикла начнет выполняться - значит в объекте есть свойства
			return false;
    	} 
		return true;
	},
}

let myObject = splitNumber.getObject(prompt('Введите целое число от 0 до 999'));
if (!splitNumber.isEmpty(myObject)) {
	console.log(`Сотни: ${myObject.hundreds}, десятки: ${myObject.tens}, единицы: ${myObject.units}.`);
}