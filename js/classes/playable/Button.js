class Button {
    constructor(position = {x:0, y:0}, size = 0, color="rgba(255,255,255,0.4)", image = undefined) {
        this.position = position;
        this.size = size;
        this.color = color;

        this.image = image;
    }

    isPressed(player, input) {
        return (player.hasAct(input) && (MathPlus.distanceBetweenPoints(player.position, this.position) < player.size+this.size))
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath()

        if (this.image) {
            ctx.drawImage(this.image, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2)
        }
    }
}