namespace Asteroid {
    export abstract class ViewBase {
        protected readonly canvas: HTMLCanvasElement;
        protected readonly ctx: CanvasRenderingContext2D
        protected readonly d_CanvasHelper: CanvasHelper;
        protected readonly d_MathHelper: MathHelper;
        protected readonly d_KeyboardHelper: KeyboardHelper
        protected abstract renderScreen(): void;
        private d_alive: boolean = true;

        protected constructor(aCanvas: HTMLCanvasElement) {
            //console.log("Constructor ViewBase")
            this.canvas = aCanvas
            this.d_CanvasHelper = new CanvasHelper(aCanvas)
        }

        public render(): void {
            this.renderScreen();
        }

        public BeforeExit(): void {
            // Clear any lingering events.
            this.d_alive = false; // workaround for now
        }
    }
}