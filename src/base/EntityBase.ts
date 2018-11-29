namespace Asteroid {
    export abstract class EntityBase {
        protected readonly d_CanvasHelper: CanvasHelper;
        protected readonly d_MathHelper: MathHelper;
        protected readonly d_KeyboardHelper: KeyboardHelper;
        protected d_Xposition: number = -1;
        protected d_Yposition: number = -1;

        protected constructor() {
            
        }
        public Update(): void {

        }

        protected abstract UpdateEntity(): void;
    }
}