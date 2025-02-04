const ShortRouteCalculator = require('../services/shortRouteCalculator');
const logger = require('../utils/logger');

jest.mock('../utils/logger');

describe('ShortRouteCalculator', () => {
  let graph;
  let calculator;

  beforeEach(() => {
    graph = {
      getNeighbors: jest.fn(),
    };
    calculator = new ShortRouteCalculator(graph);
  });

  test('should initialize correctly', () => {
    expect(logger.info).toHaveBeenCalledWith('ShortRouteCalculator initialized');
  });

  test('should return error message for invalid start or end point', () => {
    const result = calculator.getShortestRoute(null, 'B');
    expect(result).toBe('Invalid start or end point');
    expect(logger.error).toHaveBeenCalledWith('Invalid start or end point');
  });

  test('should calculate shortest route correctly', () => {
    graph.getNeighbors.mockReturnValueOnce([{ node: 'B', weight: 5 }]);
    const result = calculator.getShortestRoute('A', 'B');
    expect(result).toBe(5);
    expect(logger.info).toHaveBeenCalledWith('Shortest route distance: 5');
  });

  test('should return error message for no route found', () => {
    graph.getNeighbors.mockReturnValueOnce([]);
    const result = calculator.getShortestRoute('A', 'B');
    expect(result).toBe('NO SUCH ROUTE');
    expect(logger.error).toHaveBeenCalledWith('NO SUCH ROUTE');
  });
});
