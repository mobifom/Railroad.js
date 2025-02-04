const logger = require("../utils/logger");

/**
 * Class representing a Short Route Calculator for a graph.
 */
class ShortRouteCalculator {

  /**
  * Creates an instance of ShortRouteCalculator.
  * @param {Object} graph - The graph object which contains the nodes and edges.
  */
  constructor(graph) {
    this.graph = graph;
    logger.info("ShortRouteCalculator initialized");
  }

  /**
    * Calculates the shortest route from start to end.
    * @param {string} start - The starting node.
    * @param {string} end - The destination node.
    * @returns {(number|string)} The shortest distance or an error message if no route exists.
    */
  getShortestRoute(start, end) {
    try {
      if (!start || !end) {
        throw new Error("Invalid start or end point");
      }
      logger.info(`Calculating shortest route from ${start} to ${end}`);
      const { distances, checkedNodes, priorityQueue } =
        this.initializeShortestRouteSearch(start);

      while (priorityQueue.length > 0) {
        const { node: currentNode, distance: currentDistance } =
          priorityQueue.pop();

        if (this.shouldSkipNode(checkedNodes, currentNode, end)) continue;
        checkedNodes.add(currentNode);

        this.updateDistance(distances, currentNode, currentDistance);

        if (this.isEndNodeReached(currentNode, start, end, currentDistance)) {
          logger.info(`Shortest route distance: ${currentDistance}`);
          return currentDistance;
        }

        this.addNeighborsToPriorityQueue(currentNode,currentDistance,priorityQueue,checkedNodes,end);
      }

      throw new Error("NO SUCH ROUTE");
    } catch (error) {
      logger.error(error.message);
      return error.message;
    }
  }

  /**
    * Initializes the search for the shortest route.
    * @param {string} start - The starting node.
    * @returns {Object} An object containing the distances map, checked nodes set, and priority queue.
    */
  initializeShortestRouteSearch(start) {
    const distances = new Map();
    const checkedNodes = new Set();
    const priorityQueue = [{ node: start, distance: 0 }];
    return { distances, checkedNodes, priorityQueue };
  }

  /**
   * Determines if the current node should be skipped during the search.
   * @param {Set.<string>} checkedNodes - The set of already checked nodes.
   * @param {string} currentNode - The current node being visited.
   * @param {string} end - The destination node.
   * @returns {boolean} True if the node should be skipped, false otherwise.
   */
  shouldSkipNode(checkedNodes, currentNode, end) {
    return checkedNodes.has(currentNode) && currentNode !== end;
  }

  /**
   * Updates the distance of a node in the distances map.
   * @param {Map.<string, number>} distances - The map of distances from the start node.
   * @param {string} currentNode - The current node being visited.
   * @param {number} currentDistance - The current distance from the start node.
   */
  updateDistance(distances, currentNode, currentDistance) {
    if (
      !distances.has(currentNode) ||
      currentDistance < distances.get(currentNode)
    ) {
      distances.set(currentNode, currentDistance);
    }
  }

  /**
   * Checks if the end node has been reached.
   * @param {string} currentNode - The current node being visited.
   * @param {string} start - The starting node.
   * @param {string} end - The destination node.
   * @param {number} currentDistance - The current distance from the start node.
   * @returns {boolean} True if the end node is reached, false otherwise.
   */
  isEndNodeReached(currentNode, start, end, currentDistance) {
    return (
      (currentNode === end && currentNode !== start) ||
      (currentNode === start && currentDistance !== 0)
    );
  }

  /**
  * Adds the neighbors of the current node to the priority queue.
  * @param {string} currentNode - The current node being visited.
  * @param {number} currentDistance - The current distance from the start node.
  * @param {Array.<Object>} priorityQueue - The priority queue of nodes to be visited.
  * @param {Set.<string>} checkedNodes - The set of already checked nodes.
  * @param {string} end - The destination node.
  */
  addNeighborsToPriorityQueue(currentNode,currentDistance,priorityQueue,checkedNodes,end) {
    this.graph.getNeighbors(currentNode).forEach((neighbor) => {
      if (!checkedNodes.has(neighbor.node) || neighbor.node === end) {
        priorityQueue.push({
          node: neighbor.node,
          distance: currentDistance + neighbor.weight,
        });
      }
    });
    priorityQueue.sort((a, b) => b.distance - a.distance);
  }
}

module.exports = ShortRouteCalculator;
