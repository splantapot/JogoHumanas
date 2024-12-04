class GameController {
    constructor(pauseButton = 'Enter') {
        this.pauseButton = pauseButton.toLowerCase();
        this.isPaused = false;
        this.PAUSE_COOLDOWN = 400;
        this.pauseStart = new Date().getTime() - this.PAUSE_COOLDOWN;

        this.inputs = new Set([]);
        
        window.addEventListener('keydown', (e) => {
            if (!this.inputs.has(e.key.toLowerCase())) {
                this.inputs.add(e.key.toLowerCase());
            }
        });

        window.addEventListener('keyup', (e) => {
            this.inputs.delete(e.key.toLowerCase());
        });
    }

    getInputs() {
        return this.inputs;
    }

    pause(ctx, screenSize) {
        const nowTime = new Date().getTime();
        const passedTime = nowTime - this.pauseStart;
        if (this.inputs.has(this.pauseButton) && passedTime > this.PAUSE_COOLDOWN) {
            this.pauseStart = new Date().getTime();
            this.isPaused = !this.isPaused;

            // console.log('hi')
        }

        if (this.isPaused) {
            const FONT_SIZE = 30;
            ctx.fillStyle = 'rgb(255,255,255)';
            ctx.font = `${FONT_SIZE}px monospace`;
            ctx.fillText('Pausado', (screenSize.width/2)-(3.5*FONT_SIZE/2), (screenSize.height/2)-(FONT_SIZE/2));
        }
    }
}