const { trafficLights } = require('../src/trafficLights');

describe('Traffic Light', () => {
    test('should return initial state when n is 0', () => {
        const road = "CCC.G...R...";
        expect(trafficLights(road, 0)).toEqual([road]);
    });

    test('should simulate traffic lights and cars correctly', () => {
        const road = "CCC.G...R...";
        const n = 5;
        const expectedStates = [
            "CCC.G...R...",
            ".CCCG...R...",
            "..CCC...R...",
            "..CCGC..R...",
            "...CC.C.R...",
            "...COC.CG...",
        ];
        expect(trafficLights(road, n)).toEqual(expectedStates);
    });

    test('should handle negative time units', () => {
        console.error = jest.fn();
        expect(trafficLights("CCC.G...R...", -1)).toBeUndefined();
        expect(console.error).toHaveBeenCalledWith("The number of time units must be greater than or equal to 0.");
    });
});