class Vertex{
    constructor(x, y, row, col, r, label, backColor, borderColor, borderWeight){
        this.pos = createVector(x, y);
        this.cpos = createVector(x + r, y + r);
        this.row = row;
        this.col = col;
        this.r = r;
        this.w = 2 * r;
        this.label = label;
        this.type = 'blank';
        this.backColor = backColor;
        this.borderColor = borderColor;
        this.borderWeight = borderWeight;
        this.visited = false;
        this.focused = false;
        this.vertexType = BLANK_VERTEX;
        this.parent = null;
        this.neighbors = [];
    }

    draw(){
        strokeWeight(this.borderWeight);
        stroke(this.borderColor);
        fill(this.backColor);
        rect(this.pos.x, this.pos.y, 2 * this.r, 2 * this.r);
    }

    isVisited(){
        return this.visited;
    }

    isFocused(){
        return this.focused;
    }

    setVisited(value){
        this.visited = value;
    }

    setFocus(value){
        this.focused = value;
    }

    isClicked(mouseX, mouseY){
        let xAxis = mouseX > this.pos.x &&  mouseX < this.pos.x + this.w;
        let yAxis = mouseY > this.pos.y &&  mouseY < this.pos.y + this.w;
        return xAxis && yAxis;
    }

    setParent(parent){
        this.parent = parent;
    }

    getParent(){
        return this.parenet;
    }

    getNeighbor(n){
        return this.neighbors[n];
    }

    setBackcolor(backColor){
        this.backColor = backColor;
    }

    setVertexType(vertexType){
        this.vertexType = vertexType;
        if (vertexType == BLANK_VERTEX){
            this.setBackcolor(WHITE);
        }
        else if (vertexType == START_VERTEX){
            this.setBackcolor(RED);
        }
        else if (vertexType == END_VERTEX){
            this.setBackcolor(GREEN);
        }
        else if (vertexType == WALL_VERTEX){
            this.setBackcolor(GRAY1);
        }
        else if (this.isVisited()){
            this.setBackcolor(YELLOW);
        }
    }
}