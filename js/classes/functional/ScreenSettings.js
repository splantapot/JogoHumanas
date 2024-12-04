class ScreenSettings {
    constructor(width = 800, height = 600, id= "canvas", supportID="supportCanvas", backgroundColor= "rgb(50,50,50)") {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');

        this.supportCanvas = document.getElementById(supportID);
        this.supportCtx = this.supportCanvas.getContext('2d');

        this.backgroundColor = backgroundColor;
        this.width = this.canvas.width = this.supportCanvas.width = width;
        this.height = this.canvas.height = this.supportCanvas.height = height;

        this.clear();
    }
    
    clear(id = 1) {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.width,this.height);

        this.ctx.drawImage(FLOOR_IMGS[id], 0, 0, this.width, this.height)

        this.supportCtx.clearRect(0,0,this.width,this.height);
    }

    getContext() {
        return this.ctx;
    }

    getSupportContext() {
        return this.supportCtx;
    }

    getSize() {
        return {width: this.width, height: this.height};
    }
}