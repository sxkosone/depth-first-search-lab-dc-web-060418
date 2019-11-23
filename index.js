const depthFirstSearch = (rootNode, vertices, edges) => {
  const explored = [];
  rootNode = { ...rootNode, discovered: true };
  let stack = [rootNode];
  vertices = markDiscovered(vertices, stack)
  let nodeToExplore = stack.pop()

  while(nodeToExplore) {
    const adjacentNodes = findAllAdjacentNodes(nodeToExplore, vertices, edges);
    vertices = markDiscovered(vertices, adjacentNodes);
    stack = stack.concat(adjacentNodes);
    explored.push({ ...nodeToExplore, discovered: true });
    nodeToExplore = stack.pop();
  }

  return explored;
}

const findAllAdjacentNodes = (nodeToExplore, vertices) => {
  return vertices.filter(vertice => {
    return !vertice.discovered && vertice['name'] !== nodeToExplore['name'] && adjacent(nodeToExplore, vertice, edges);
  });
};


const adjacent = (nodeToExplore, vertice, edges) => {
  return edges.some(edge => {
    return edge.includes(nodeToExplore['name']) && edge.includes(vertice['name'])
  });
};

const markDiscovered = (vertices, discoveredNodes) => {
  return vertices.map(vertice => {
    if(discoveredNodes.includes(vertice)) {
      return { ...vertice, discovered: true };
    }

    return vertice;
  })
};
