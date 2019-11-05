'use strict';

class Status {

    constructor() {
        this.stepsPerformed = 0;
        this.setPlaying();
    }

    /** 
     * Ставит статус игры в "игра в процессе".
     */    
    setPlaying() {
        this.condition = 'playing';
    }

    /** 
     * Ставит статус игры в "остановлена".
     */
    setStopped() {
        this.condition = 'stopped';
    }

    /**
     * Проверка, в процессе ли игра.
     * @returns {boolean} Вернёт true, если игра в процессе, и false - если игра остановлена.
     */
    isPlaying() {
        return this.condition === 'playing';
    }

    /**
     * Увеличивает счётчик сделанных шагов в игре на единицу.
     */
    stepsCount() {
        this.stepsPerformed++;
    }
}