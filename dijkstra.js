async function getVertexWithMinDistance(S) {
  let minDist = Infinity;
  let vertex = S.values().next().value;
  for (let v of S) {
    if (v.getDistance() < minDist) {
      minDist = vertex.getDistance();
      vertex = v;
    }
  }
  return vertex;
}

async function dijkstra(grid, startVertex, endVertex) {
  let S = new Set();

  for (let i = 0; i < grid.rows; i++) {
    for (let j = 0; j < grid.cols; j++) {
      let v = grid.at(i, j);
      v.setDistance(Infinity);
      v.setParent(undefined);
      S.add(v);
    }
  }

  startVertex.setDistance(0);
  while (S.size > 0) {
    let u = await getVertexWithMinDistance(S);

    if (u == undefined) {
      return false;
    }

    if (u == endVertex) {
      console.log("End");
      return true;
    }

    S.delete(u);
    await sleep(DELAY_IN_MILLISEC);
    u.setBackcolor(BLUE);

    for (let neighbor of u.getNeighbors()) {
      if (
        neighbor.getVertexType() != WALL_VERTEX &&
        neighbor != startVertex &&
        S.has(neighbor)
      ) {
        let alt = u.getDistance() + grid.getDist(u, neighbor);
        if (alt < neighbor.getDistance()) {
          neighbor.setDistance(alt);
          neighbor.setParent(u);
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
/*
 function Dijkstra(Graph, source):
 2
 3      create vertex set Q
 4
 5      for each vertex v in Graph:             
 6          dist[v] ← INFINITY                  
 7          prev[v] ← UNDEFINED                 
 8          add v to Q                      
10      dist[source] ← 0                        
11      
12      while Q is not empty:
13          u ← vertex in Q with min dist[u]    
14                                              
15          remove u from Q 
16          
17          for each neighbor v of u:           // only v that are still in Q
18              alt ← dist[u] + length(u, v)
19              if alt < dist[v]:               
20                  dist[v] ← alt 
21                  prev[v] ← u 
22
23      return dist[], prev[]
*/
