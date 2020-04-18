class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cells = new Array(this.width * this.height);
    for (let i = 0; i < this.cells.length; ++i) {
      this.cells[i] = new Cell();
    }
  }

  at(i, j) {
    return this.cells[i * this.height + j];
  }

  setType(i, j, t) {
    this.cells[i * this.height + j].type = t;
  }

  set(i, j, c) {
    this.cells[i * this.height + j] = c;
  }

  update() {
    for (let i = 0; i < this.width; ++i) {
      for (let j = 0; j < this.height; ++j) {
        this._updateNeighborCounts(i, j);
      }
    }
    for (let i = 0; i < this.width; ++i) {
      for (let j = 0; j < this.height; ++j) {
        this.cells[i * this.height + j].update();
      }
    }
  }

  _updateNeighborCounts(i, j) {
    this.cells[i * this.height + j].lastRoundNeighborCount = -this.at(i, j).on;
    for (let ii = Math.max(0, i - 1); ii <= Math.min(this.width - 1, i + 1);
         ++ii) {
      for (let jj = Math.max(0, j - 1); jj <= Math.min(this.height - 1, j + 1);
           ++jj) {
        if (this.at(ii, jj).on) {
          ++this.cells[i * this.height + j].lastRoundNeighborCount;
        }
      }
    }
  }

  draw(ctx) {
    ctx.canvas.strokeStyle = '#e1e1e1';

    for (let i = 0; i < this.width; ++i) {
      for (let j = 0; j < this.height; ++j) {
        const cell = this.at(i, j);

        ctx.canvas.fillStyle = getFill(cell.type);
        ctx.canvas.beginPath();
        ctx.canvas.rect(
            i * ctx.cellSize, j * ctx.cellSize, ctx.cellSize, ctx.cellSize);
        if (cell.on || cell.type == CellType.DITCH) {
          ctx.canvas.fill();
        } else {
          ctx.canvas.stroke();
        }
      }
    }
  }
}