const MATERIAL_TYPE = {
    Wood: {
        nameString: 'Wood',
        color: 'rgb(110, 38, 14)',
        price: 7
    },
    Rubber: {
        nameString: 'Rubber',
        color: 'rgb(247, 255, 51)',
        price: 3
    },
    Tissue: {
        nameString: 'Tissue',
        color: 'rgb(226, 152, 194)',
        price: 4
    },
    Plastic: {
        nameString: 'Plastic',
        color: 'rgb(206, 218, 219)',
        price: 6
    }
}

const Materials = new Set();

class Material {
    constructor(position = {x:0, y:0}, size = 10, type = MATERIAL_TYPE['NAME']) {
        this.position = position;

        this.nameString = type.nameString;
        this.color = type.color;

        this.size = size;

        this.isMaterial = true;

        this.picked = false;

        this.canTake = true;
    }

    
    take() {
        this.picked = true;
    }

    put() {
        this.picked = false;
    }

    unsetCanTake() {
        this.canTake = false;
    }

    setCanTake() {
        this.canTake = true;
    }

    update(x, y) {
        this.position = {x:x, y:y};
    }

    draw(ctx, supportCtx) {
        if (this.picked) {
            ctx = supportCtx
        }

        
        ctx.fillStyle = 'rgba(255,255,255,1)'//this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
        
        const drawItemSize = this.size*1.8
        ctx.drawImage(MATERIAL_IMGS[this.nameString], this.position.x-(drawItemSize/2), this.position.y-(drawItemSize/2), drawItemSize, drawItemSize)

        if (this.picked) {
            ctx.strokeStyle = 'rgb(255,255,255)';
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.size, 0, 2*Math.PI);
            ctx.stroke();
            ctx.closePath();
        }

        // ctx.font = `${this.size}px Dosis 800`
        // ctx.fillStyle = 'rgb(0,255,255)';
        // ctx.fillText(this.nameString, this.position.x, this.position.y);
        // ctx.fillStyle = 'rgb(0,0,0)';
        // ctx.fillText(this.nameString, this.position.x+0.5, this.position.y+0.5);
    }
}