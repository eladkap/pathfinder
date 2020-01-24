class Grid{
    constructor(x, y, rows, cols){
        this.pos = createVector(x, y);
        this.rows = rows;
        this.cols = cols;
        this.mat = this.initMatrix(rows, cols);
        this.setNeighbors();
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

    setNeighbors(){
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                let vertex = this.mat[i][j];
                for (let a = -1; a <= 1; a++){
                    for (let b = -1; b <= 1; b++){
                        if ((a != 0 || b != 0) && (i + a >= 0 && i + a < this.rows && j + b >= 0 && j + b < this.cols) && abs(a + b) == 1){
                            vertex.addNeighbor(this.mat[i + a][j + b]);
                        }
                    }
                }
            }
        }
    }

    setVertexType(i, j, vertexType){
        this.mat[i][j].setVertexType(vertexType);
    }
}