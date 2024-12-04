class GameTimer {
    constructor(position = {x:100, y:100}, TIMER_LIMIT = 60, TIMER_LABEL_ID = 'gameTimer') {
        this.TIMER_LIMIT = TIMER_LIMIT;
        this.TIMER_LABEL = document.getElementById(TIMER_LABEL_ID);

        this.startTime = 0;
        this.TIMER_LABEL.style.left = `${position.x}px`;
        this.TIMER_LABEL.style.top = `${position.y}px`;

        this.timer = 0;

        this.hasStarted = false;
    }
    
    show() {
        this.TIMER_LABEL.style.display = 'block';
    }

    hide() {
        this.TIMER_LABEL.style.display = 'none';
    }

    start() {
        this.hasStarted = true;
    }

    resetTimer() {
        this.startTime = new Date().getTime();
        this.timer = 0;
        this.hasStarted = false;
    }

    updateTimer() {
        const timePassed = new Date().getTime();
        if (timePassed - this.startTime > 1000) {
            this.startTime = timePassed;
            this.timer += 1
        }

        this.TIMER_LABEL.innerHTML = this.TIMER_LIMIT - this.timer;

        return (this.TIMER_LIMIT <= this.timer);
    }
}