class ProductionLever {
    constructor(position = {x:0, y:0}, size = 20, color = 'rgb(255,128,13)', demoColor = 'rgb(128,64,6)') {
        this.position = position;
        this.size = size;

        this.color = color;
        this.demoColor = demoColor;

        this.toyIx = 0;
        this.toyList = []
        for (const toyName in TOY_TYPE) {
            this.toyList.push({
                nameString: TOY_TYPE[toyName].nameString,
                materials: TOY_TYPE[toyName].materials
            });
        }

        this.hasPlayer = false;
    
        this.CHANGE_COOLDOWN = 300;
        this.changeTime = new Date().getTime();

        this.image = ROOMS_IMGS.Lever
    }

    setRandomToy() {
        this.toyIx = MathPlus.rng(this.toyList.length);
    }

    setNextToy() {
        const nowTime = new Date().getTime();
        const passedTime = nowTime - this.changeTime;
        if (passedTime > this.CHANGE_COOLDOWN) {
            this.changeTime = nowTime;
            this.toyIx = this.toyIx+1 >= this.toyList.length? 0 : this.toyIx + 1;
            // console.log(this.getMaterial(0))
        }
    }

    getMaterial(i = 0) {
        return this.toyList[this.toyIx].materials[i]
    }

    checkForPlayer(player, input) {
        this.hasPlayer = MathPlus.distanceBetweenPoints(this.position, player.position) < (player.size + this.size)
        if (this.hasPlayer && player.hasAct(input) && player.grabItem == undefined) {
            this.setNextToy()
        }
    }

    draw(ctx) {
        const TOY_IMAGE_SIZE = this.size*1.6
        ctx.drawImage(MATERIAL_IMGS[this.toyList[this.toyIx].nameString], this.position.x-(this.size*0.8), this.position.y-this.size, TOY_IMAGE_SIZE, TOY_IMAGE_SIZE)

        ctx.fillStyle = `rgba(255,255,255,${0.4*this.hasPlayer}`/*this.color*/;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();

        ctx.drawImage(this.image, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2)

        // ctx.font = '10px monospace'
        // ctx.fillStyle = 'rgb(255,255,255)'
        // ctx.fillText(this.toyList[this.toyIx].nameString, this.position.x-this.size, this.position.y-this.size)
    }
}