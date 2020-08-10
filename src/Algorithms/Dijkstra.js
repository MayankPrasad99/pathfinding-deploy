export function dijkstra(grid, startNode, endNode, edges){
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            node.distance = Infinity;
            node.visited = false;
            node.previousNode = startNode;
            nodes.push(node);
        }
    }
    const  visitedNodesInOrder = [];
    startNode.distance = 0;
    for(let k = 0;k < nodes.length ;k++){
        const [minNode,minIdx] = getMin(nodes);
        if(minNode.distance === Infinity){
            alert("NO Path Possible!");
            return visitedNodesInOrder;
        }
        minNode.visited= true;
        visitedNodesInOrder.push(minNode);
        if(minNode === endNode){
            return visitedNodesInOrder;
        }
        for(let j = 0; j < nodes.length; j++){
            const node = nodes[j];
            if(edges[minIdx][j] !== 0){
                if(!node.visited && (node.distance > minNode.distance + edges[minIdx][j])){
                    node.distance = minNode.distance + edges[minIdx][j];
                    node.previousNode = minNode;
                }
            }
        }
    }

}


export function getShortestPathNodes(startNode,endNode) {
    const visitedNodes = [];
    let currentNode = endNode;
    while(currentNode !== startNode){
        visitedNodes.push(currentNode);
        currentNode = currentNode.previousNode;
    }
    visitedNodes.push(currentNode);
    return visitedNodes;
}


function getMin(nodes){
    let minNode = undefined;
    let minIdx = -1;
    let i = 0;
    for(const node of nodes){
        if(!node.visited && !node.isWall && (minNode === undefined || minNode.distance > node.distance)){
            minNode = node;
            minIdx = i;
        }
        i++;
    }
    return [minNode,minIdx];
}