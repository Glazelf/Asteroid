abstract class ViewBase {
    protected readonly canvas: HTMLCanvasElement;
    protected readonly ctx: CanvasRenderingContext2D
    protected readonly d_CanvasHelper: CanvasHelper;
    protected readonly d_MathHelper: MathHelper;
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

    protected abstract OnClick(xPosition: number, yPosition: number): void;
    /**
      * RenderScreen
      * @AccessModifier {Protected}
      * Handles the internal redirection of the click event.
      * @param {MouseEvent} Event - the class containing information for the event
      */
    protected abstract renderScreen(): void;
}