async function dfs(grid, startVertex, endVertex) {
  console.log("DFS");
  let stack = new Stack();
  stack.push(startVertex);
  while (!stack.isEmpty()) {
    let v = stack.pop();
    if (v == endVertex) {
      console.log("End.");
      return true;
    }

    await Utils.sleep(DELAY_IN_MILLISEC);

    if (v.getVertexType() != WALL_VERTEX && !v.isVisited()) {
      v.setVisited(true);
      if (v != endVertex && v != startVertex) {
        v.setBackcolor(BLUE);
      }

      for (let neighbor of v.getNeighbors()) {
        if (!neighbor.isVisited()) {
          neighbor.setParent(v);
          if (neighbor == endVertex) {
            console.log("End");
            return true;
          }
          stack.push(neighbor);
        }
      }
    }
  }
  return false;
}
