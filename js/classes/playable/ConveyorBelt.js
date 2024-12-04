class ConveyorBelt {
    constructor(size = 3, origin = {x:0, y:0}, end = {x:0, y:0}, properties = {generate: false, delete: false, reversed:1}, color = 'rgb(100,255,100)', cooldown = 600,
        velocity = 4
    ) {
        this.size = size;

        this.origin = origin;
        this.end = end;
        this.properties = properties;

        this.color = color;

        this.direction = MathPlus.angleBetweenPoints(origin, end);
        this.direction = 
            end.x < origin.x? 
                MathPlus.degToRad(180):
            this.direction;
        this.direction = Math.abs(this.direction)
        this.direction *= origin.y < end.y? -1 : 1;

        this.C_WIDTH = Math.round(MathPlus.distanceBetweenPoints(this.origin, this.end));
        this.C_HEIGHT = this.size;
        this.velocity = velocity;

        this.CREATION_COOLDOWN = cooldown;
        this.creationTime = 0;
        this.startCreationTime = new Date().getTime();
        this.nowCreationTime = new Date().getTime();

        this.trash = undefined
        if (this.properties.delete) {
            const newSize = size * 0.8
            this.trash = new RoomTrash(
                {x:end.x - newSize, y:end.y - newSize},
                newSize * 2,
                'rgba(255,255,255,0.3)',
                'rgba(0,255,0,0.3)',
            )
        }

        this.working = true;
    }

    setWorking(condition = false) {
        this.working = condition;
    }

    tryToGenerate(materialName, Materials) {
        if (this.properties.generate) {
            this.nowCreationTime = new Date().getTime();
            this.creationTime += this.nowCreationTime - this.startCreationTime;
            this.startCreationTime = this.nowCreationTime;
            if (this.creationTime >= this.CREATION_COOLDOWN) {
                this.creationTime = 0;

                const nX = this.origin.x;
                const nY = this.origin.y;
                
                const MATERIAL_SIZE = 26

                Materials.add(
                    new Material(
                        {x:nX, y:nY},
                        MATERIAL_SIZE,
                        MATERIAL_TYPE[materialName]
                    ),
                )
            }
        }
    }

    updatePositionOf(material, Materials) {   
        if (this.properties.delete && material.isMaterial != undefined) {
            this.trash.checkForMaterial(material, Materials)
        }
        
        let shortestPoint = 0;
        let longestPoint = 0;
        const originToMaterial = MathPlus.distanceBetweenPoints(material.position, this.origin);
        if ( originToMaterial <= MathPlus.distanceBetweenPoints(material.position, this.end)) {
            shortestPoint = this.origin;
            longestPoint = this.end
        } else {
            shortestPoint = this.end;
            longestPoint = this.origin;
        }
        const A = MathPlus.distanceBetweenPoints(shortestPoint, material.position);
        const B = this.C_WIDTH;
        const C = MathPlus.distanceBetweenPoints(longestPoint, material.position);
        const COS_ANGLE = ((B**2)+(C**2)-(A**2)) / (2*B*C);
        const SIN_ANGLE = (1-(COS_ANGLE**2))**(2);
        // + sin² x = 1 cos² x
        const HEIGHT = (SIN_ANGLE * C)*this.size;

        if (this.working) {
            if (    
                (HEIGHT < 1 && C < this.C_WIDTH)
                ||
                originToMaterial < (this.size*0.1 + material.size)
            ) {
                // console.log('collided')
                material.position.x += Math.cos(this.direction) * this.velocity;
                material.position.y += Math.sin(-this.direction) * this.velocity;
            }
        }
    }

    draw(ctx) {
        if (this.trash != undefined) {
            this.trash.draw(ctx)
        }

        ctx.fillStyle = this.color;

        ctx.save();

        ctx.fillStyle = 'rgba(0,0,0,1)'
        ctx.beginPath();
        ctx.arc(this.origin.x, this.origin.y, this.C_HEIGHT/2, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.end.x, this.end.y, this.C_HEIGHT/2, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();

        //Draw belt
        const translateX = this.origin.x-((this.size/2) * Math.sin(this.direction));
        const translateY = this.origin.y-((this.size/2) * Math.cos(this.direction));
        ctx.translate(translateX, translateY);
        ctx.rotate(-this.direction);
        ctx.translate(-translateX, -translateY);
        ctx.fillRect(
            translateX, 
            translateY,
            this.C_WIDTH,
            this.C_HEIGHT
        );
        
        ctx.restore();

        // ctx.fillStyle = 'rgba(255,0,0,0.2)'
        // ctx.beginPath();
        // ctx.arc(this.origin.x, this.origin.y, this.size*1.3, 0, Math.PI*2);
        // ctx.fill();
        // ctx.closePath();
        // ctx.beginPath();
        // ctx.arc(this.end.x, this.end.y, this.size*1.3, 0, Math.PI*2);
        // ctx.fill();
        // ctx.closePath();

        // ctx.fillStyle = 'rgb(0,255,255)'
        // ctx.beginPath();
        // ctx.arc(this.origin.x, this.origin.y, 2, 0, Math.PI*2);
        // ctx.fill();
        // ctx.closePath();
        // ctx.beginPath();
        // ctx.arc(this.end.x, this.end.y, 2, 0, Math.PI*2);
        // ctx.fill();
        // ctx.closePath();

        //Line between origin and end
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.beginPath();
        ctx.moveTo(this.origin.x, this.origin.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.stroke();
        ctx.closePath();
    }
}