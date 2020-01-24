function bfs(grid, startVertex, endVertex){
    let queue = new Queue();
    queue.enqueue(startVertex);
    startVertex.setVisited(true);
    while (!queue.isEmpty()){
        let vertex = queue.dequeue();
        for (let neighbor of vertex.getNeighbors()){
            if (!neighbor.isVisited()){
                neighbor.setVisited(true);
                queue.enqueue(neighbor);
                neighbor.setParent(vertex);
            }
        }
    }
}