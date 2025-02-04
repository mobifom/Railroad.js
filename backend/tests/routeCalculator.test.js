const RouteCalculator = require('../services/routeCalculator');
const logger = require('../utils/logger');

jest.mock('../utils/logger');

describe('RouteCalculator', () => {
  let graph;
  let calculator;

  beforeEach(() => {
    graph = {
      getNeighbors: jest.fn(),
    };
    calculator = new RouteCalculator(graph);
  });

  test('should initialize correctly', () => {
    expect(logger.info).toHaveBeenCalledWith('RouteCalculator initialized');
  });

  test('should return error message for invalid input parameters', () => {
    const result = calculator.getRoutesWithMaxStops(null, 'B', 3);
    expect(result).toBe('Invalid input parameters');
    expect(logger.error).toHaveBeenCalledWith('Invalid input parameters');
  });

  test('should calculate routes with max stops correctly', () => {
    graph.getNeighbors.mockReturnValueOnce([{ node: 'B', weight: 5 }]);
    const result = calculator.getRoutesWithMaxStops('A', 'B', 1);
    expect(result.length).toBe(1);
    expect(logger.info).toHaveBeenCalledWith('Found 1 routes');
  });

  test('should calculate routes with exact stops correctly', () => {
    graph.getNeighbors.mockReturnValueOnce([{ node: 'B', weight: 5 }]);
    const result = calculator.getRoutesWithExactStops('A', 'B', 1);
    expect(result.length).toBe(1);
    expect(logger.info).toHaveBeenCalledWith('Found 1 routes');
  });

  test('should calculate all routes with max distance correctly', () => {
    graph.getNeighbors.mockReturnValueOnce([{ node: 'B', weight: 5 }]);
    const result = calculator.getAllRoutesWithMaxDistance('A', 'B', 10);
    expect(result.length).toBe(1);
    expect(logger.info).toHaveBeenCalledWith('Found 1 routes');
  });
});
