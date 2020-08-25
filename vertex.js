class Vertex {
  constructor(x, y, row, col, r, label, backColor, borderColor, borderWeight) {
    this.pos = createVector(x, y);
    this.cpos = createVector(x + r, y + r);
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
    this.shapeType = "Square";
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
    strokeWeight(borderWei);
    stroke(borderClr);
    fill(this.backColor);
    if (this.shapeType == "Square") {
      rect(this.pos.x, this.pos.y, 2 * this.r, 2 * this.r);
    } else if (this.shapeType == "Hexagon") {
      beginShape();
      vertex(this.cpos.x - this.r, this.cpos.y);
      vertex(
        this.cpos.x - int(0.5 * this.r),
        int(this.cpos.y - (sqrt(3) / 2) * this.r)
      );
      vertex(
        this.cpos.x + int(0.5 * this.r),
        int(this.cpos.y - (sqrt(3) / 2) * this.r)
      );
      vertex(this.cpos.x + this.r, this.cpos.y);
      vertex(
        this.cpos.x + int(0.5 * this.r),
        int(this.cpos.y + (sqrt(3) / 2) * this.r)
      );
      vertex(
        this.cpos.x - int(0.5 * this.r),
        int(this.cpos.y + (sqrt(3) / 2) * this.r)
      );
      endShape(CLOSE);
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

  setShapeType(shapeType) {
    this.shapeType = shapeType;
  }
}
