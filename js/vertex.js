class Vertex {
  constructor(x, y, row, col, r, label, backColor, borderColor, borderWeight) {
    this.pos = new Vector(x, y);
    this.cpos = new Vector(x + r, y + r);
    this.row = row;
    this.col = col;
    this.r = r;
    this.w = 2 * r;
    this.label = label;
    this.backColor = backColor;
    this.borderColor = borderColor;
    this.borderWeight = borderWeight;
    this.visited = false;
    this.focused = false;
    this.chosen = false;
    this.fValue = 0; // A-star algo - f value
    this.gValue = 0; // A-star algo - g value
    this.hValue = 0; // A-strt algo - h value (Heuristics value - euclidean distance to target)
    this.vertexType = BLANK_VERTEX;
    this.parent = null;
    this.distance = 0;
    this.neighbors = [];
    this.directions = { right: null, left: null, top: null, bottom: null };
  }

  draw() {
    let borderClr = this.borderColor;
    let borderWei = this.borderWeight;
    if (this.chosen) {
      borderClr = BLACK;
      borderWei = 3;
    }
    app.ctx.beginPath();
    app.ctx.lineWidth = borderWei;
    app.ctx.strokeStyle = borderClr;
    app.ctx.fillStyle = this.backColor;
    app.ctx.rect(this.pos.x, this.pos.y, 2 * this.r, 2 * this.r);
    app.ctx.stroke();
    app.ctx.fill();

    if (this.chosen) {
      app.ctx.textAlign = 'center';
      app.ctx.fillStyle = 'white';
      app.ctx.fillText('*', this.pos.x + this.width / 2, this.pos.y);
    }

  }

  isVisited() {
    return this.visited;
  }

  isFocused() {
    return this.focused;
  }

  isChosen() {
    return this.chosen;
  }

  setVisited(value) {
    this.visited = value;
  }

  setFocus(value) {
    this.focused = value;
  }

  setChosen(value) {
    this.chosen = value;
  }

  getFValue() {
    return this.fValue;
  }

  setFValue(f) {
    this.fValue = f;
  }

  getGValue() {
    return this.fValue;
  }

  setGValue(g) {
    this.fValue = g;
  }

  getHValue() {
    return this.hValue;
  }

  setHValue(h) {
    this.hValue = h;
  }

  isClicked(mouseX, mouseY) {
    let xAxis = mouseX > this.pos.x && mouseX < this.pos.x + this.w;
    let yAxis = mouseY > this.pos.y && mouseY < this.pos.y + this.w;
    return xAxis && yAxis;
  }

  setParent(parent) {
    this.parent = parent;
  }

  getParent() {
    return this.parent;
  }

  getDistance() {
    return this.distance;
  }

  setDistance(d) {
    this.distance = d;
  }

  addNeighbor(neighbor) {
    this.neighbors.push(neighbor);
  }

  getNeighbor(i) {
    return this.neighbors[i];
  }

  getNeighbors() {
    return this.neighbors;
  }

  setBackcolor(backColor) {
    this.backColor = backColor;
  }

  getVertexType() {
    return this.vertexType;
  }

  setVertexType(vertexType) {
    this.vertexType = vertexType;
    if (vertexType == BLANK_VERTEX) {
      this.setBackcolor(WHITE);
    } else if (vertexType == START_VERTEX) {
      this.setBackcolor(RED);
    } else if (vertexType == END_VERTEX) {
      this.setBackcolor(GREEN);
    } else if (vertexType == WALL_VERTEX) {
      this.setBackcolor(GRAY1);
    } else if (this.isVisited()) {
      this.setBackcolor(YELLOW);
    }
  }
}
