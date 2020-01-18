class Grid{
    constructor(x, y, rows, cols){
        this.pos = createVector(x, y);
        this.rows = rows;
        this.cols = cols;
        this.mat = this.initMatrix(rows, cols);  
    }

    initMatrix(rows, cols){
        this.vertices = [];
        let mat = [];
        for(let i = 0; i < rows; i++){
            mat[i] = new Array(cols);
        }
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < cols; j++){
                let w = 2 * VERTEX_RADIUS;
                let x = this.pos.x + j * w;
                let y = this.pos.y + i * w;
                let vertex = new Vertex(x, y, i, j, VERTEX_RADIUS, '', WHITE, TURQUOISE, 0.3);
                mat[i][j] = vertex;
                this.vertices.push(vertex);
            }
        }
        return mat;
    }

    draw(){
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                this.mat[i][j].draw();
            }
        }
    }

    at(i, j){
        return this.mat[i][j];
    }

    setVertexType(i, j, vertexType){
        this.mat[i][j].setVertexType(vertexType);
    }
}