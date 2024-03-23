class Application {
    constructor() {
        this.canvas = document.getElementById('my-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.grid = null;
        this.startVertex = null;
        this.endVertex = null;

        this.draggedVertex = null;

        this.btnGenerateWalls = null;
        this.btnClearWalls = null;
        this.btnSearch = null;
        this.btnStop = null;
        this.searchAlgoSelector = null;
        this.searchAlgo = null;
    }

    setGrid() {
        let canvasRect = this.canvas.getBoundingClientRect();
        let gridRows = Math.floor(canvasRect.height / VERTEX_WIDTH) - 6;
        let gridCols = Math.floor(canvasRect.width / VERTEX_WIDTH) - 2;
        this.grid = new Grid(
            canvasRect.x + VERTEX_WIDTH,
            canvasRect.y - VERTEX_WIDTH * 4,
            gridRows,
            gridCols
        );
        this.setStartVertex();
        this.setEndVertex();
    }

    setStartVertex() {
        let startVertexRowIndex = Math.floor(this.grid.getRows() / 2);
        let startVertexColIndex = Math.floor(this.grid.getCols() * 0.25);
        this.grid.setVertexType(startVertexRowIndex, startVertexColIndex, START_VERTEX);
        this.startVertex = this.grid.get(startVertexRowIndex, startVertexColIndex);
    }

    setEndVertex() {
        let endVertexRowIndex = Math.floor(this.grid.getRows() / 2);
        let endVertexColIndex = Math.floor(this.grid.getCols() * 0.75);
        this.grid.setVertexType(endVertexRowIndex, endVertexColIndex, END_VERTEX);
        this.endVertex = this.grid.get(endVertexRowIndex, endVertexColIndex);
    }

    draw() {
        this.grid.draw();
    }

    reset() {
        this.setGrid();
        this.updateCanvas();
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setButtons() {
        this.btnGenerateWalls = document.getElementById('btn-generate-walls');
        this.btnClearWalls = document.getElementById('btn-clear-walls');
        this.btnSearch = document.getElementById('btn-search');
        this.btnStop = document.getElementById('btn-stop');
    }

    setEnabled(control, value) {
        control.disabled = !value;
        let color = value ? 'var(--btn-backcolor)' : 'var(--btn-backcolor-disabled)';
        control.style.background = color;
    }

    setSearchAlgoSelector() {
        this.searchAlgoSelector = document.getElementById('search-algo-selector');
    }

    setSearchAlgo() {
        this.searchAlgo = this.setSearchAlgoSelector.value;
    }

    chooseSearchAlgoOption(event) {
        this.searchAlgo = event.target.value;
        console.log(`Search algo chosen: ${this.searchAlgo}`);
    }

    stopSearch() {
        location.reload();
    }

    chooseVertex(mouseX, mouseY) {
        this.draggedVertex = null;
        for (let vertex of this.grid.vertices) {
          if (vertex.isClicked(mouseX, mouseY)) {
            this.draggedVertex = vertex;
            if (vertex == this.startVertex || vertex == this.endVertex) {
              vertex.setChosen(!vertex.isChosen());
            } else if (vertex.vertexType == WALL_VERTEX) {
              vertex.setVertexType(BLANK_VERTEX);
            } else {
              if (this.startVertex.isChosen()) {
                this.startVertex.setChosen(false);
                vertex.setVertexType(START_VERTEX);
                this.startVertex.setVertexType(BLANK_VERTEX);
                this.startVertex = vertex;
              } else if (this.endVertex.isChosen()) {
                this.endVertex.setChosen(false);
                vertex.setVertexType(END_VERTEX);
                this.endVertex.setVertexType(BLANK_VERTEX);
                this.endVertex = vertex;
              } else {
                vertex.setVertexType(WALL_VERTEX);
              }
            }
          }
        }
    }

    onMouseDragged(event) {
        console.log('mouse drag');
        let canvasRect = this.canvas.getBoundingClientRect();
        let mousePos = Utils.translateMouseToCanvasPosition(event.clientX, event.clientY, this.canvas, canvasRect);      
        if (draggedVertex != null) {
            if (draggedVertex != startVertex && draggedVertex != endVertex) {
                for (let vertex of grid.vertices) {
                    if (
                        vertex.isClicked(mousePos.x, mousePos.y) &&
                        vertex != startVertex &&
                        vertex != endVertex
                    ) {
                        vertex.setVertexType(draggedVertex.vertexType);
                    }
                }
            }
        }
    }

    onMouseClicked(event) {
        let canvasRect = this.canvas.getBoundingClientRect();
        let mousePos = Utils.translateMouseToCanvasPosition(event.clientX, event.clientY, this.canvas, canvasRect); 
        this.chooseVertex(mousePos.x, mousePos.y);
        this.updateCanvas();
    }
      
    onMouseReleased() {
        // prevVertex = null;
        draggedVertex = null;
    }

    updateCanvas() {
        this.clearCanvas();
        this.draw();
    }

    clearWalls() {
        for (let vertex of this.grid.vertices) {
            if (vertex.vertexType == WALL_VERTEX) {
                vertex.setVertexType(BLANK_VERTEX);
            }
        }
        this.updateCanvas();
    }
      
    generateWalls() {
        for (let vertex of this.grid.vertices) {
            if (
                vertex.getVertexType() != START_VERTEX &&
                vertex.getVertexType() != END_VERTEX
            ) {
            if (Math.random() < WALL_DENSITY) {
                vertex.setVertexType(WALL_VERTEX);
            } else {
                vertex.setVertexType(BLANK_VERTEX);
            }
          }
        }
        this.updateCanvas();
    }

    async runSearch() {
        console.log('Run search');
        let result = await this.startSearch();
        console.log('Search finished');
        if (result) {
          console.log('Path found.');
          this.showPath();
        } else {
          console.log('No path found.');
          window.alert('No path found.');
        }
    }

    async startSearch() {
        if (this.searchAlgoSelector.value == "BFS") {
            return await bfs(this.grid, this.startVertex, this.endVertex);
        } else if (this.searchAlgoSelector.value == "DFS") {
            return await dfs(this.grid, this.startVertex, this.endVertex);
        } else if (this.searchAlgoSelector.value == "A-star") {
            return await astar(this.grid, this.startVertex, this.endVertex);
        }
    }

    async showPath() {
        console.log("Show path...");
        let path = [];
        let v = this.endVertex;
        while (v != this.startVertex) {
            path.push(v);
            v = v.getParent();
        }
        for (let i = path.length - 1; i >= 0; i--) {
            let v = path[i];
            if (v != this.endVertex && v != this.startVertex) {
                await Utils.sleep(DELAY_IN_MILLISEC * 10);
                v.setBackcolor(YELLOW);
            }
        }
    }

    setup() {
        this.setGrid();
        this.setButtons();
        this.setSearchAlgoSelector();
        this.setSearchAlgo();
        

        this.draw();
    }

    update() {
        this.clearCanvas();
        this.draw();
        requestAnimationFrame(update);
    }
}