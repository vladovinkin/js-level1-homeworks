'use strict';

class Board {

    constructor() {
        this.boardEl = document.getElementById('game');
        this.msgEl = document.getElementById('message');
        this.btnRun = document.getElementById('runAgain');
    }

    init(status, game) {
        this.status = status;
        this.game = game;
    }

    /**
     * Вывод ячеек в HTML.
     */
    renderBoard() {
        this.msgEl.innerText = '';
        this.btnRun.classList.add('displaynone');
        this.boardEl.innerHTML = '';
        for (let row = 0; row < 3; row++) {
            const tr = document.createElement('tr');
            this.boardEl.appendChild(tr);

            for (let col = 0; col < 3; col++) {
                const td = document.createElement('td');
                td.dataset.row = row.toString();
                td.dataset.col = col.toString();
                tr.appendChild(td);
            }
        }
    }

    /**
     * Проверка, был ли коррректный клик, что описан в событии event.
     * @param {Event} event
     * @returns {boolean} Вернёт true в случае, если статус игры "играем", клик что описан в объекте event был
     * по ячейке и ячейка куда был произведён клик был по пустой ячейке.
     */ 
    isCorrectClick(event) {
        return this.status.isPlaying() && this.isClickByCell(event) && this.isCellEmpty(event);
    }

    /**
     * Проверка, что клик был по ячейке.
     * @param {Event} event 
     * @param {HTMLElement} event.target
     * @returns {boolean} Вернёт true, если клик был по ячейке, иначе false.
     */
    isClickByCell(event) {
        return event.target.tagName === 'TD';
    }

    /**
     * Проверка, что ячейка ещё не занята.
     * @param {Event} event
     * @param {HTMLElement} event.target
     * @returns {boolean} Вернёт true, если ячейка пуста, иначе false.
     */
    isCellEmpty(event) {
        // Получаем строку и колонку области клика.
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        return this.game.mapValues[row][col] === '';
    }

     /**
     * Заполняет ячейку в которую кликнул пользователь в событии event.
     * @param {Event} event
     * @param {HTMLElement} event.target
     */
    fillCell(event) {
        // Получаем строку и колонку куда кликнули
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        // Заполняем ячейку и ставим значение в массиве, в свойстве mapValues.
        this.game.mapValues[row][col] = this.game.phase;
        event.target.textContent = this.game.phase;
    }

    /**
     * Выводит сообщение в документ.
     * @param {string} message 
     */
    showMessage(message) {
        this.msgEl.innerText = message;
    }

    /**
     * Показывает кнопку "Начать заново"
     */
    showButton() {
        this.btnRun.classList.remove('displaynone');
        // Ставим обработчик - при клике на кнопку вызовется функция this.runAgain
        this.btnRun.addEventListener('click', this.runAgain);
    }

    /**
     * Подстветка выигравшей комбинации.
     * @param {{x: int, y: int}} a 1-ая ячейка.
     * @param {{x: int, y: int}} b 2-ая ячейка.
     * @param {{x: int, y: int}} c 3-я ячейка.
     */
    highlightWinLine(a, b ,c) {
        this.boardEl.querySelector(`tr:nth-child(${a.y+1}) td:nth-child(${a.x+1})`).classList.add('td-win');
        this.boardEl.querySelector(`tr:nth-child(${b.y+1}) td:nth-child(${b.x+1})`).classList.add('td-win');
        this.boardEl.querySelector(`tr:nth-child(${c.y+1}) td:nth-child(${c.x+1})`).classList.add('td-win');
    }

    /**
     * Перезапуск игры.
     */
    runAgain() {
        const status = new Status();
        const board = new Board();
        const game = new Game();
    
        board.init(status, game);
        board.renderBoard();
        game.init(status, board);
    
        game.run();
    }
}