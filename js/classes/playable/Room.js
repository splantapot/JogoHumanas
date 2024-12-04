class Room {
    constructor(position = {x:0, y:0}, size = 100, color = 'rgb(100,255,100)', demoColor = 'rgb(100,155,100)') {
        this.position = position;
        this.size = size;
        this.color = color;
        this.demoColor = demoColor;

        this.hasPlayer = false;

        this.image = undefined;
    }

    checkForPlayer(player) {
        this.hasPlayer = 
            (player.position.x >= this.position.x && player.position.x <= this.position.x + this.size) &&
            (player.position.y >= this.position.y && player.position.y <= this.position.y + this.size)
        ;
    }

    draw(ctx) {
        ctx.fillStyle = /*this.hasPlayer? this.demoColor : */ this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size);

        if (this.image != undefined) {
            ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size)
        }
    }
}