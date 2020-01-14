class Vertex{
    constructor(x, y, row, col, r, label, backColor, borderColor, borderWeight){
        this.pos = createVector(x, y);
        this.cpos = createVector(x + r, y + r);
        this.row = row;
        this.col = col;
        this.r = r;
        this.label = label;
        this.backColor = backColor;
        this.borderColor = borderColor;
        this.borderWeight = borderWeight;
        this.visited = false;
    }

    draw(){
        strokeWeight(this.borderWeight);
        stroke(this.borderColor);
        fill(this.backColor);
        rect(this.pos.x, this.pos.y, 2 * this.r, 2 * this.r);
    }

    setVisited(value){
        this.visited = value;
    }
}