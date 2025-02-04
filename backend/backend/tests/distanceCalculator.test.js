
const DistanceCalculator = require('../services/distanceCalculator');
const logger = require('../utils/logger');

jest.mock('../utils/logger');

describe('DistanceCalculator', () => {
  let graph;
  let calculator;

  beforeEach(() => {
    graph = {
      getNeighbors: jest.fn(),
    };
    calculator = new DistanceCalculator(graph);
  });

  test('should initialize correctly', () => {
    expect(logger.info).toHaveBeenCalledWith('DistanceCalculator initialized');
  });

  test('should return error message for invalid path', () => {
    const result = calculator.getDistance([]);
    expect(result).toBe('Invalid path: Path should not be empty array');
    expect(logger.error).toHaveBeenCalledWith('Invalid path: Path should not be empty array');
  });

  test('should calculate distance correctly', () => {
    graph.getNeighbors.mockReturnValueOnce([{ node: 'B', weight: 5 }]);
    const result = calculator.getDistance(['A', 'B']);
    expect(result).toBe(5);
    expect(logger.info).toHaveBeenCalledWith('Total distance: 5');
  });

  test('should return error message for no route found', () => {
    graph.getNeighbors.mockReturnValueOnce([]);
    const result = calculator.getDistance(['A', 'B']);
    expect(result).toBe('NO SUCH ROUTE');
    expect(logger.error).toHaveBeenCalledWith('Invalid path: Path should not be empty array');
  });
});