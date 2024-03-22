async function bfs(grid, startVertex, endVertex) {
  console.log("BFS");
  let queue = new Queue();
  queue.enqueue(startVertex);
  startVertex.setVisited(true);
  while (!queue.isEmpty()) {
    let v = queue.dequeue();
    if (v == endVertex) {
      console.log("End.");
      return true;
    }
    await Utils.sleep(DELAY_IN_MILLISEC);
    for (let neighbor of v.getNeighbors()) {
      if (neighbor.getVertexType() != WALL_VERTEX && !neighbor.isVisited()) {
        neighbor.setVisited(true);
        queue.enqueue(neighbor);
        neighbor.setParent(v);
        if (neighbor != endVertex) {
          neighbor.setBackcolor(BLUE);
        }

        if (neighbor == endVertex) {
          console.log("End");
          return true;
        }
      }
    }
  }
  return false;
}
