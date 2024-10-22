/*
    Traffic Lights - multiple cars
    Legend:
        . = Road
        C = Car
        G = GREEN traffic light
        O = ORANGE traffic light
        R = RED traffic light
    Input
        road = the road array
        n = how many time units to simulate (n >= 0)
*/

const lightRules = { 'G': 5, 'O': 1, 'R': 5 };
const lights = Object.keys(lightRules);

/**
 * Get the next color of the traffic light.
 * @param {string} color - Current color of the traffic light.
 * @returns {string} - Next color of the traffic light.
 */
function getNextColor(color) {
    if (color === 'G') return 'O';
    if (color === 'O') return 'R';
    if (color === 'R') return 'G';
}

/**
 * @param {string} road - The initial state of the road.
 * @param {number} n - The number of time units to simulate.
 * @returns {Array<string>} - Array of road states after each time unit.
 */
function trafficLights(road, n) {
    if (n < 0) {
        console.error("The number of time units must be greater than or equal to 0.");
        return;
    }
    if (n === 0) return [road];

    const states = [road]; // Initial state
    const roadLength = road.length;

    // Store the positions and colors of the traffic lights
    let lightPositions = [];
    for (let i = 0; i < road.length; i++) {
        if (lights.includes(road[i])) {
            lightPositions.push({ position: i, time: 1, color: road[i] });
        }
    }

    for (let time = 0; time < n; time++) {
        let currentState = [...states[states.length - 1]]; // Copy the last state
        
        // Update the traffic lights
        for (const light of lightPositions) {
            if (light.time === lightRules[light.color]) {
                light.color = getNextColor(light.color); // Reset timer for the light
                light.time = 1;
            } else {
                light.time++;
            }
            if (currentState[light.position] !== 'C') {
                // Update the current state with the light's color if it's not a car
                currentState[light.position] = light.color;
            }
        }

        // Read the current state to update car movements
        for (let i = currentState.length - 1; i >= 0; i--) {
            if (currentState[i] === 'C') {
                const nextPosition = i + 1;

                // Check if the next position is valid
                if (nextPosition < roadLength) {
                    if (
                        (lights.includes(currentState[nextPosition]) && currentState[nextPosition + 1] === 'C')
                        || currentState[nextPosition] === 'R' || currentState[nextPosition] === 'O' || currentState[nextPosition] === 'C'
                    ) {
                        continue;
                    } else {
                        currentState[nextPosition] = 'C';
                    }
                }
                currentState[i] = '.';

                for (const light of lightPositions) {
                    if (currentState[light.position] !== 'C') {
                        currentState[light.position] = light.color;
                    }
                }
            }
        }

        states.push(currentState.join(''));
    }

    return states;
}

module.exports = { trafficLights };