'use strict';

window.addEventListener('load', () => {
    const status = new Status();
    const board = new Board();
    const game = new Game();

    board.init(status, game);
    board.renderBoard();
    game.init(status, board);

    game.run();
});