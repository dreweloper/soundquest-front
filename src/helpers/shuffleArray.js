/**
 * Shuffles the elements of an array in place and returns the first element.
 * This function uses the Fisher-Yates (Knuth) shuffle algorithm to randomly rearrange the elements of the input array.
 * 
 * @function shuffleArray
 * @param {Array} arr - The array to be shuffled.
 * @returns {*} The first element of the shuffled array.
 */
export const shuffleArray = (arr) => {

    for (let i = arr.length - 1; i > 0; i--) {
        /**
         * Generates a random index within the range [0, i] using the Math.random() function.
         * @type {Number} The randomly generated index.
         * @param {Number} i - The upper bound of the range for the random index (inclusive).
         * @returns {Number} A random integer between 0 and the specified upper bound.
         */
        const randomIndex = Math.floor(Math.random() * (i + 1));
        /**
         * Holds the original value of an element from the input array during the array shuffling process.
         * @type {*}
         */
        const originalIndex = arr[i];

        arr[i] = arr[randomIndex];

        arr[randomIndex] = originalIndex;

    };

    return arr[0];

};