// Fisher-Yates shuffle algorithm for randomizing arrays
class Shuffle {
    /**
     * Shuffle an array using Fisher-Yates algorithm
     * @param {Array} array - Array to shuffle
     * @returns {Array} - New shuffled array (original array is not modified)
     */
    static array(array) {
        // Create a copy to avoid modifying the original array
        const shuffled = [...array];
        
        // Fisher-Yates shuffle algorithm
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        return shuffled;
    }

    /**
     * Shuffle an array in place (modifies the original array)
     * @param {Array} array - Array to shuffle in place
     * @returns {Array} - The same array, shuffled
     */
    static arrayInPlace(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        
        return array;
    }

    /**
     * Get a random element from an array
     * @param {Array} array - Array to pick from
     * @returns {*} - Random element from the array
     */
    static randomElement(array) {
        if (array.length === 0) return undefined;
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    /**
     * Get multiple random elements from an array (without replacement)
     * @param {Array} array - Array to pick from
     * @param {number} count - Number of elements to pick
     * @returns {Array} - Array of random elements
     */
    static randomElements(array, count) {
        if (count >= array.length) {
            return this.array(array);
        }
        
        const shuffled = this.array(array);
        return shuffled.slice(0, count);
    }

    /**
     * Shuffle multiple choice options while preserving correct answer tracking
     * @param {Array} options - Array of option objects with text and correct properties
     * @returns {Array} - Shuffled options array
     */
    static multipleChoiceOptions(options) {
        return this.array(options);
    }

    /**
     * Generate a random seed for reproducible shuffling
     * @returns {number} - Random seed
     */
    static generateSeed() {
        return Math.floor(Math.random() * 1000000);
    }

    /**
     * Seeded random number generator for reproducible shuffling
     * @param {number} seed - Seed for random generation
     * @returns {function} - Random function that uses the seed
     */
    static seededRandom(seed) {
        let currentSeed = seed;
        return function() {
            currentSeed = (currentSeed * 9301 + 49297) % 233280;
            return currentSeed / 233280;
        };
    }

    /**
     * Shuffle array with a specific seed for reproducible results
     * @param {Array} array - Array to shuffle
     * @param {number} seed - Seed for reproducible shuffling
     * @returns {Array} - Shuffled array
     */
    static arrayWithSeed(array, seed) {
        const shuffled = [...array];
        const random = this.seededRandom(seed);
        
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        return shuffled;
    }
}
