namespace Asteroid {
    export class MathHelper {
        /**
         * Renders a random number between min and max
         * @param {number} min - minimal time
         * @param {number} max - maximal time
         */
        public randomNumber(min: number, max: number): number {
            return Math.round(Math.random() * (max - min) + min);
        }
    }
}