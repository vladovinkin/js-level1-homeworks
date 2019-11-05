'use strict';

class Game {
    
    constructor() {
        this.mapValues = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
        this.phase = 'X';
    }

    /**
     * Инициализация игры.
     */
    init(status, board) {
        this.status = status;
        this.board = board;
    }

    /**
     * Запуск игры.
     */
    run() {
        // Ставим обработчик - при клике на таблицу вызовется функция this.cellClickHandler
        this.board.boardEl.addEventListener('click', event => this.cellClickHandler(event));
    }

    /**
     * Обработчик события клика.
     * @param {MouseEvent} event 
     */
    cellClickHandler(event) {
        // Если клик не нужно обрабатывать, уходим из функции.
        if(!this.board.isCorrectClick(event)) {
            return;
        }

        // Заполняем ячейку.
        this.board.fillCell(event);

        // считаем количество сделанных шагов в игре
        this.status.stepsCount();

        // Если кто-то выиграл, заходим в if.
        if (this.hasWon()) {
            // Ставим статус в 'остановлено'.
            this.status.setStopped();
            // Сообщаем о победе пользователя.
            this.sayWonPhrase();
            // Показываем кнопку для запуска игры сначала.
            this.board.showButton();
        } else if(this.isDrawGame()) {
            // Ставим статус в 'остановлено'.
            this.status.setStopped();
            // Сообщаем пользователю о ничье.
            this.sayDrawPhrase();
            // Показываем кнопку для запуска игры сначала.
            this.board.showButton(); 
        }

        // Меняем фигуру (крестик или нолик).
        this.togglePhase();
    }

    /**
    * Проверка, есть ли выигрышная ситуация на карте.
    * @returns {boolean} Вернёт true, если игра выиграна, иначе false.
    */
   hasWon() {
    return this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }) ||
        this.isLineWon({ x: 0 , y: 1 }, {x: 1 , y: 1 }, {x: 2 , y: 1 }) ||
        this.isLineWon({ x: 0 , y: 2 }, {x: 1 , y: 2 }, {x: 2 , y: 2 }) ||

        this.isLineWon({ x: 0 , y: 0 }, {x: 0 , y: 1 }, {x: 0 , y: 2 }) ||
        this.isLineWon({ x: 1 , y: 0 }, {x: 1 , y: 1 }, {x: 1 , y: 2 }) ||
        this.isLineWon({ x: 2 , y: 0 }, {x: 2 , y: 1 }, {x: 2 , y: 2 }) ||

        this.isLineWon({ x: 0 , y: 0 }, {x: 1 , y: 1 }, {x: 2 , y: 2 }) ||
        this.isLineWon({ x: 0 , y: 2 }, {x: 1 , y: 1 }, {x: 2 , y: 0 });
    }

    /**
     * Проверка, не получилась ли ничья.
     * @returns {boolean} Вернёт true, если игра привела к ничьей, иначе false.
     */
    isDrawGame() {
        return this.status.stepsPerformed === 9;
    }

    /**
     * Проверка, есть ли выигрышная ситуация на линии.
     * @param {{x: int, y: int}} a 1-ая ячейка.
     * @param {{x: int, y: int}} b 2-ая ячейка.
     * @param {{x: int, y: int}} c 3-я ячейка.
     * @returns {boolean} Вернёт true, если линия выиграна, иначе false.
     */
    isLineWon(a, b, c) {
        let value = this.mapValues[a.y][a.x] + this.mapValues[b.y][b.x] + this.mapValues[c.y][c.x];

        if (value === 'XXX' || value === '000') {
            // Подсветка выигравшей комбинации.
            this.board.highlightWinLine(a, b, c);
            return true;
        }
        return false;
    }

    /**
     * Сообщает о победе.
     */
    sayWonPhrase() {
        let figure = this.phase === 'X' ? 'Крестики' : 'Нолики';
        this.board.showMessage(`${figure} выиграли!`);
    }

    /**
     * Сообщает о ничейном результате.
     */
    sayDrawPhrase() {
        this.board.showMessage("Победила дружба!");
    }

    /**
     * Меняет фигуру (крестик или нолик).
     */
    togglePhase() {
        this.phase = this.phase === 'X' ? '0' : 'X';
    }
}