const RailroadService = require('../services/railroadService');
const RailroadGraph = require('../models/railroadGraph');

// Define edges of the railroad graph
const routeEdges = [
    ['A', 'D', 5],
    ['A', 'E', 7],
    ['A', 'B', 5],
    ['D', 'E', 8],
    ['D', 'C', 8],
    ['B', 'C', 4],
    ['C', 'E', 2],
    ['C', 'D', 8],
    ['E', 'B', 3]
];
const graph = new RailroadGraph(routeEdges);

let railroadService;

beforeEach(() => {
    railroadService = new RailroadService(graph);
});

test('Find distance of path A,B,C', () => {
    expect(railroadService.getDistance(['A', 'B', 'C'])).toBe(9);
});

test('Find distance of path A,D', () => {
    expect(railroadService.getDistance(['A', 'D'])).toBe(5);
});

test('Find distance of path A,D,C', () => {
    expect(railroadService.getDistance(['A', 'D', 'C'])).toBe(13);
});

test('Find distance of path A,E,B,C,D', () => {
    expect(railroadService.getDistance(['A', 'E', 'B', 'C', 'D'])).toBe(22);
});

test('Find distance of path A,E,D', () => {
    expect(railroadService.getDistance(['A', 'E', 'D'])).toBe('NO SUCH ROUTE');
});

test('Find distance of path A,E,K', () => {
    expect(railroadService.getDistance(['A', 'E', 'K'])).toBe('NO SUCH ROUTE');
});

test('Find routes from C to C with no more than 3 stops', () => {
    expect(railroadService.getRoutesWithMaxStops('C', 'C', 3).length).toBe(2);
});

test('Find routes from A to C in exactly 4 stops', () => {
    expect(railroadService.getRoutesWithExactStops('A', 'C', 4).length).toBe(1);
});

test('Find shortest route between A and C', () => {
    expect(railroadService.getShortestRoute('A', 'C')).toBe(9);
});

test('Find shortest routes between B and B', () => {
    expect(railroadService.getShortestRoute('B', 'B')).toBe(9);
});

test('Find shortest routes between B and K', () => {
    expect(railroadService.getShortestRoute('B', 'K')).toBe('NO SUCH ROUTE');
});

test('Find all routes between C and C that are less than 30 in distance', () => {
    expect(railroadService.getAllRoutesWithMaxDistance('C', 'C', 30).length).toBe(3);
});