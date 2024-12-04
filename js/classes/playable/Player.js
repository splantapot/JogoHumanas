class Player {
    constructor(spawnPosition = {x:0,y:0}, size = 0, maxVelocity = 0, color = 'rgb(255,0,0)', controls = ['w','s','a','d']) {
        this.SPAWN_POSITION = spawnPosition;
        this.position = spawnPosition;

        this.size = size;

        this.maxVelocity = maxVelocity;
        this.velocity = {x:0, y:0};

        this.color = color;

        this.controls = controls;

        this.GRAB_COOLDOWN = 250;
        this.grabTimer = new Date().getTime();
        this.grabItem = undefined;
        this.grabAct = false;
    }

    diagonalControl() {
        if (Math.abs(this.velocity.x) >= this.maxVelocity && Math.abs(this.velocity.y) >= this.maxVelocity) {
            const SIGN_X = Math.sign(this.velocity.x);
            const SIGN_Y = Math.sign(this.velocity.y);
            this.velocity.x = SIGN_X * this.maxVelocity * Math.SQRT2;
            this.velocity.y = SIGN_Y * this.maxVelocity * Math.SQRT2;
        }
    }

    control(input = Set([])) {
        const ACCEL = 1;
        //Move in X axis
        if (input.has(this.controls[2])) {
            this.velocity.x = (this.velocity.x - ACCEL < this.maxVelocity*-1) ? this.maxVelocity*-1 : this.velocity.x - ACCEL;
        } else if (input.has(this.controls[3])) {
            this.velocity.x = (this.velocity.x + ACCEL > this.maxVelocity) ? this.maxVelocity : this.velocity.x + ACCEL;
        } else {
            const SIGN_X = Math.sign(this.velocity.x);
            this.velocity.x = this.velocity.x - (SIGN_X * ACCEL);

            this.diagonalControl();
        }

        //Move in Y axis
        if (input.has(this.controls[0])) {
            this.velocity.y = (this.velocity.y - ACCEL < this.maxVelocity*-1) ? this.maxVelocity*-1 : this.velocity.y - ACCEL;
        } else if (input.has(this.controls[1])) {
            this.velocity.y = (this.velocity.y + ACCEL > this.maxVelocity) ? this.maxVelocity : this.velocity.y + ACCEL;
        } else {
            const SIGN_Y = Math.sign(this.velocity.y);
            this.velocity.y = this.velocity.y - (SIGN_Y * ACCEL);

            this.diagonalControl();
        }
    }

    materialControl(material, input = Set([])) {
        const DISTANCE = (
            ((this.position.x - material.position.x)**2) + ((this.position.y - material.position.y)**2)
        ) ** (0.5);

        if (
            material.canTake && //material is takeable
            DISTANCE < this.size + material.size && //Distance OK
            input.has(this.controls[4]) && //Action Key pressed
            (new Date().getTime() - this.grabTimer > this.GRAB_COOLDOWN) //Has passed GRAB_COOLDOWN since last interaction
        ) {
            this.grabTimer = new Date().getTime();
            
            if (this.grabItem != undefined) {
                //Take away material
                this.grabItem.put();
                this.grabItem = undefined;
            } else {
                //Update material if not taked
                this.grabItem = material;
                this.grabItem.take();
            }
        }
    }

    hasAct(input = Set([])) {
        return (
            input.has(this.controls[4]) && //Action Key pressed
            (new Date().getTime() - this.grabTimer > this.GRAB_COOLDOWN) //Has passed GRAB_COOLDOWN since last interaction
        );
    }

    update(screenSize = {width:0, height:0}) {
        //Update in X
        this.position.x = 
            (this.position.x - this.size + this.velocity.x < 0) ? 
                this.size : // < 0, left border
            (this.position.x + this.size + this.velocity.x > screenSize.width) ?
                screenSize.width - this.size : // > width, right border
                this.position.x + this.velocity.x
        ;
        
        //Update in Y
        this.position.y = 
            (this.position.y - this.size + this.velocity.y < 0) ? 
                this.size : // < 0, up border
            (this.position.y + this.size + this.velocity.y > screenSize.height) ?
                screenSize.height - this.size : // > height, down border
                this.position.y + this.velocity.y
        ;

        if (this.grabItem != undefined) {
            const kx = this.position.x;
            const ky = this.position.y;
            this.grabItem.update(kx, ky);
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}