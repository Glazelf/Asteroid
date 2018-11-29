namespace Asteroid {
    export class Asteroid extends EntityBase {
        private d_image: any = null;
        private d_speed: number = (this.d_MathHelper.randomNumber (1,50))

        protected constructor() {
            //console.log("constructorAsteroid")
            super()
            this.d_Xposition = this.d_MathHelper.randomNumber(1,10)
            
        }
        protected UpdateEntity(): void {
        }
    }
}