class Grid {
  constructor(x, y, rows, cols) {
    this.pos = new Vector(x, y);
    this.rows = rows;
    this.cols = cols;
    this.mat = this.initMatrix(rows, cols);
    this.setNeighbors();
  }

  initMatrix(rows, cols) {
    this.vertices = [];
    let mat = [];
    for (let i = 0; i < rows; i++) {
      mat[i] = new Array(cols);
    }
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let w = 2 * VERTEX_RADIUS;
        let x = this.pos.x + j * w;
        let y = this.pos.y + i * w;
        let vertex = new Vertex(
          x,
          y,
          j,
          i,
          VERTEX_RADIUS,
          "",
          WHITE,
          TURQUOISE,
          VERTEX_BORDER_SIZE
        );
        mat[i][j] = vertex;
        this.vertices.push(vertex);
      }
    }
    return mat;
  }

  draw() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.mat[i][j].draw();
      }
    }
  }

  getRows() {
    return this.rows;
  }

  getCols() {
    return this.cols;
  }

  get(i, j) {
    return this.mat[i][j];
  }

  size() {
    return this.rows * this.cols;
  }

  getDist(u, v) {
    return 1;
  }

  setNeighbors() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let vertex = this.mat[i][j];
        for (let a = -1; a <= 1; a++) {
          for (let b = -1; b <= 1; b++) {
            if (
              (a != 0 || b != 0) &&
              i + a >= 0 &&
              i + a < this.rows &&
              j + b >= 0 &&
              j + b < this.cols &&
              Math.abs(a + b) == 1
            ) {
              vertex.addNeighbor(this.mat[i + a][j + b]);

              if (a == 0 && b == -1) {
                vertex.directions["left"] = this.mat[i + a][j + b];
              }
              if (a == 0 && b == 1) {
                vertex.directions["right"] = this.mat[i + a][j + b];
              }
              if (a == -1 && b == 0) {
                vertex.directions["top"] = this.mat[i + a][j + b];
              }
              if (a == 1 && b == 0) {
                vertex.directions["bottom"] = this.mat[i + a][j + b];
              }
            }
          }
        }
      }
    }
  }

  setVertexType(i, j, vertexType) {
    this.mat[i][j].setVertexType(vertexType);
  }

  reset() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.mat[i][j].setVisited(false);
        if (this.mat[i][j].getVertexType() == BLANK_VERTEX) {
          this.mat[i][j].setBackcolor(WHITE);
        }
      }
    }
  }
}
