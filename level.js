class Text {
  constructor(x, y, text) {
    this.x = x;
    this.y = y;
    this.text = text;
  }

  draw(ctx) {
    const fontSize = 30;
    ctx.canvas.font = fontSize.toString() + 'px Arial';
    ctx.canvas.textAlign = 'left';
    ctx.canvas.fillStyle = 'black';
    ctx.canvas.fillText(
        this.text, this.x * ctx.cellSize, this.y * ctx.cellSize);
  }
}

class Level {
  constructor(map, textArray = [], updateInterval = 40) {
    this.map = map;
    this.player = {x: -1, y: -1};
    this.textArray = textArray;
    this.updateInterval = updateInterval;
  }

  makeBoard() {
    const board = new Board(this.map[0].length, this.map.length);
    for (let j = 0; j < this.map.length; ++j) {
      for (let i = 0; i < this.map[0].length; ++i) {
        switch (this.map[j][i]) {
          case ' ':
            continue;
          case 'W':
            board.set(i, j, new Cell(true, CellType.WALL));
            break;
          case 'E':
            board.set(i, j, new Cell(true, CellType.END));
            break;
          case '*':
            board.set(i, j, new Cell(true, CellType.DITCH));
            break;
          case 'P':
            board.set(i, j, new Cell(true, CellType.PLAYER));
            this.player = {x: i, y: j};
            break;
          case '.':
            board.set(i, j, new Cell(true));
            break;
          case 'A':
            board.set(i, j, new Cell(true, CellType.STAY_ALIVE))
        }
      }
    }
    return board;
  }

  getPlayer() {
    return this.player;
  }
}

const shapes = [
  // Spaceship going right
  [
    ' .....',
    '.    .',
    '     .',
    '.   . ',
    '  .   ',
  ],
  // Spaceship going left
  [
    '..... ',
    '.    .',
    '.     ',
    ' .   .',
    '   .  ',
  ],
];

const levels = [
  new Level(
      [
        '**************************************',
        '*                                    *',
        '* **                                 *',
        '* **                                 *',
        '*                                    *',
        '*                                    *',
        '* WW                                 *',
        '* WW                                 *',
        '*                                    *',
        '*                                    *',
        '* ..                                 *',
        '* ..                                 *',
        '*                                    *',
        '*                                    *',
        '* EE                                 *',
        '* EE                                 *',
        '*                                    *',
        '*                                    *',
        '* AA                                 *',
        '* AA                                 *',
        '*                                    *',
        '**********************************   *',
        '*                                    *',
        '*  P                                 *',
        '*                                    *',
        '**************************************',
      ],
      [
        new Text(5, 3.3, 'Ditch - Always dead.'),
        new Text(5, 7.3, 'Wall - Always alive.'),
        new Text(5, 11.3, 'Alive cells.'),
        new Text(5, 15.3, 'Exit - Get to here.'),
        new Text(5, 19.3, 'Keep it alive.'),
      ]),
  new Level([
    '**************************************************',
    '*EE                                              *',
    '*EE                                              *',
    '**************************************           *',
    '*                        .           *           *',
    '*                      . .           *           *',
    '*            ..      ..            .A*           *',
    '*           .   .    ..            .A*           *',
    '*A.        .     .   ..              *           *',
    '*A.        .   . ..    . .           *           *',
    '*          .     .       .           *           *',
    '*           .   .                    *           *',
    '*            ..                      *           *',
    '*                                    *           *',
    '**********************      **********           *',
    '* WWWWWWWWWWWWWWWWW                  *           *',
    '* . . . . . . . . .                  *           *',
    '*                                    *           *',
    '*                                    *           *',
    '*                                    *           *',
    '*                                    *           *',
    '*                       .A.          *           *',
    '*                                                *',
    '*                                                *',
    '*                          .A.                   *',
    '*                                                *',
    '*                                                *',
    '*                             .A.                *',
    '*   P                                            *',
    '*                                                *',
    '*                                .A.             *',
    '*                                                *',
    '*                                 ****************',
    '*                                                *',
    '*                                                *',
    '*                                                *',
    '*                                                *',
    '*                                                *',
    '*                                                *',
    '**************************************************',
  ]),
  new Level([
    '***********************',
    '*                 *   *',
    '*  ************** * * *',
    '*  EE   *         * * *',
    '*  EE   * ********* * *',
    '*       * *   *   * * *',
    '*     AA* * * * * * * *',
    '*     AA*   * * * * * *',
    '****  ******* * * * * *',
    '*           * * * * * *',
    '*   P       * * * * * *',
    '*           *   *   * *',
    '*           ********* *',
    '*                     *',
    '***********************',
  ]),
  new Level([
    '**************************************************************************',
    '*AA                                                                      *',
    '*AA                                                                      *',
    '*EE                                                                      *',
    '*EE                                                                 P    *',
    '*EE                                                                      *',
    '*AA                                                                      *',
    '*AA                                                                      *',
    '*                                                                        *',
    '*AA                                             .....                    *',
    '*AA                                             .    .                   *',
    '*                                               .                        *',
    '*AA                                              .   .                   *',
    '*AA                                                .                     *',
    '**************************************************************************',
  ]),
  new Level([
    '**************************************************************************',
    '*AA                                                                     E*',
    '*AA                                                                     E*',
    '*                                                                       E*',
    '*      *******************************************************************',
    '*AA    *                                                                 *',
    '*AA    *                                                                 *',
    '***    *                                                                 *',
    '***    *                                                            P    *',
    '***    *                                                                 *',
    '*AA    *                                                                 *',
    '*AA    *                                                                 *',
    '*                                                                        *',
    '*AA                                                           .....      *',
    '*AA                                                           .    .     *',
    '*                                                             .          *',
    '*AA                                                            .   .     *',
    '*AA                                                              .       *',
    '**************************************************************************',
  ]),
  new Level(
      [
        '*****************',
        '* .           . *',
        '* A           A *',
        '* .     .     . *',
        '*       A       *',
        '*       .       *',
        '*P             E*',
        '*****************',
      ],
      [], 300),
  new Level([
    '***************************************************************',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*        WW    WW   W   W   WWW  WWW     W  WWWWW  WWW        *',
    '*       W  W  W  W  WW  W  W   W W  W   W W   W   W   W       *',
    '*       W    W AA W W W W W    W W W   W   W  W   W           *',
    '*       W    W    W W W W W      WW    WWWWW  W    WWW        *',
    '*       W    W AA W W W W W  WWW W W   W   W  W       W       *',
    '*       W  W  W  W  W  WW  W   W W  W  W   W  W   W   W       *',
    '*        WW    WW   W   W   WWW  W   W W   W  W    WWW        *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '*                                                             *',
    '***************************************************************',
  ]),
];
