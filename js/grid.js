class Grid {
  /**
   * C'tor
   * 
   * @param {number} x - left-top x position
   * @param {number} y - left-top y position
   * @param {number} rows - rows dimension
   * @param {number} cols - columns dimension
   * @param {number} vertexRadius - vertex radius
   */
  constructor(x, y, rows, cols, vertexRadius) {
    this.pos = new Vector(x, y);
    this.rows = rows;
    this.cols = cols;
    this.mat = this.initMatrix(rows, cols, vertexRadius);
    this.setNeighbors();
  }

  /**
   * Initialize grid matrix
   * 
   * @param {number} rows - rows
   * @param {number} cols - columns
   * @param {number} vertexRadius - vertex radius
   * @returns matrix
   */
  initMatrix(rows, cols, vertexRadius) {
    this.vertices = [];
    let mat = [];
    for (let i = 0; i < rows; i++) {
      mat[i] = new Array(cols);
    }
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let w = 2 * vertexRadius;
        let x = this.pos.x + j * w;
        let y = this.pos.y + i * w;
        let vertex = new Vertex(
          x,
          y,
          j,
          i,
          vertexRadius,
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

  /**
   * Draw grid
   */
  draw() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.mat[i][j].draw();
      }
    }
  }

  /**
   * 
   * @returns grid rows number
   */
  getRows() {
    return this.rows;
  }

  /**
   * 
   * @returns grid columns number
   */
  getCols() {
    return this.cols;
  }

  /**
   * 
   * @param {number} i - i row
   * @param {number} j - j column
   * @returns {Vertex} vertex in (i, j) position
   */
  get(i, j) {
    return this.mat[i][j];
  }

  /**
   * Set vertex type
   * 
   * @param {number} i - i row
   * @param {number} j - j column
   * @param {string} vertexType - vertex type (WALL, START, END, BLANK)
   */
  setVertexType(i, j, vertexType) {
    this.mat[i][j].setVertexType(vertexType);
  }

  /**
   * 
   * @returns grid size
   */
  size() {
    return this.rows * this.cols;
  }

  /**
   * Set vertex neihbors (left, right, top, bottom)
   */
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

  /**
   * Clear walls
   */
  clearWalls() {
    for (let vertex of this.vertices) {
      if (vertex.vertexType == WALL_VERTEX) {
          vertex.setVertexType(BLANK_VERTEX);
      }
    }
  }

  /**
   * Reset grid
   */
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
