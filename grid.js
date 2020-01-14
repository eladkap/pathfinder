class Grid{
    constructor(x, y, rows, cols){
        this.pos = createVector(x, y);
        this.rows = rows;
        this.cols = cols;
        this.mat = this.initMatrix(rows, cols);
    }

    initMatrix(rows, cols){
        let mat = [];
        for(let i = 0; i < rows; i++){
            mat[i] = new Array(cols);
        }
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < cols; j++){
                let w = 2 * VERTEX_RADIUS ;
                let x = this.pos.x + j * w;
                let y = this.pos.y + i * w;
                mat[i][j] = new Vertex(x, y, i, j, VERTEX_RADIUS, '', WHITE, TURQUOISE, 0.3);
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
}