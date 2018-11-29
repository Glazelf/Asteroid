namespace Asteroid {
    export class Player extends EntityBase {

        private d_image: any = null;
        private d_moveUp: boolean = false;
        private d_moveDown: boolean = false;
        private d_moveRight: boolean = false;
        private d_moveLeft: boolean = false;

        protected constructor() {
            //console.log("constructorPlayer")
            super()
            this.d_Xposition = this.d_CanvasHelper.GetCenter().X
            this.d_Yposition = this.d_CanvasHelper.GetCenter().Y

            // this.d_KeyboardHelper.addKeyDownCallBack('ArrowUp', (): void => {
            //     this.d_moveUp = true
            //     this.d_moveDown = false
            // })
            // this.d_KeyboardHelper.addKeyDownCallBack('ArrowRight', (): void => {
            //     this.d_moveRight = true
            //     this.d_moveLeft = false
            // })
            // this.d_KeyboardHelper.addKeyDownCallBack('ArrowDown', (): void => {
            //     this.d_moveDown = true
            //     this.d_moveUp = false
            // })
            // this.d_KeyboardHelper.addKeyDownCallBack('ArrowLeft', (): void => {
            //     this.d_moveLeft = true
            //     this.d_moveRight = false
            // })

            // this.d_KeyboardHelper.addKeyUpCallBack('ArrowUp', (): void => {
            //     this.d_moveUp = false
            // })
            // this.d_KeyboardHelper.addKeyUpCallBack('ArrowRight', (): void => {
            //     this.d_moveRight = false
            // })
            // this.d_KeyboardHelper.addKeyUpCallBack('ArrowDown', (): void => {
            //     this.d_moveDown = false
            // })
            // this.d_KeyboardHelper.addKeyUpCallBack('ArrowLeft', (): void => {
            //     this.d_moveLeft = false
            // })
        };


        protected UpdateEntity(): void {
            if (this.d_moveUp || this.d_moveDown || this.d_moveRight || this.d_moveLeft) {
                if (this.d_moveUp) 
                this.d_Yposition -= 2;
                if (this.d_moveDown)
                this.d_Yposition += 3;
                if (this.d_moveRight)
                this.d_Xposition += 3;
                if (this.d_moveLeft)
                this.d_Xposition -= 3;
            }
        }
    }
}