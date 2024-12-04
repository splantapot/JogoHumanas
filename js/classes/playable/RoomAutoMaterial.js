class RoomAutoMaterial {
    constructor(position = {x:0, y:0}, size = 100, color = 'rgb(100,255,100)', demoColor = 'rgb(100,155,100)', materialToProduct = 'Wood', twice = false) {
        this.position = position;
        this.size = size;
        this.color = color;
        this.demoColor = demoColor;
        this.materialToProduct = materialToProduct;

        this.clawSize = this.size * 0.2;
        this.clawPosition = {
            x:position.x + size + this.clawSize+1,
            y:position.y + size/2
        }

        const buttonSize = this.size
        this.button = new Button(
            {x: position.x-(buttonSize/4), y:position.y + size/2 },
            buttonSize * 0.2,
            'rgb(255,255,255)',
            MATERIAL_IMGS[materialToProduct]
        )

        this.twice = twice;
        this.canProduct = false;
        this.materialToAdd = undefined;
        this.materialToAdd2 = undefined;

        this.CREATION_COOLDOWN = 800;
        this.ANIM_COOLDOWN = 500;
        this.creationTime = new Date().getTime();

        this.image = ROOMS_IMGS.Material_Auto;
        this.supportImage = ROOMS_IMGS.Craft_Auto_Frame;
    }

    tryCreateProduct(Materials) {
        const nowTime = new Date().getTime();
        const passedTime = nowTime - this.creationTime;
        if (passedTime > this.CREATION_COOLDOWN && this.canProduct) {
            this.creationTime = new Date().getTime();

            const nX = this.position.x+(this.size/2);
            const nY = this.position.y+(this.size/2);

            const MATERIAL_SIZE = 26

            this.materialToAdd = new Material(
                {x:nX, y:nY},
                MATERIAL_SIZE,
                MATERIAL_TYPE[this.materialToProduct]
            )
            this.materialToAdd.unsetCanTake();

            if (this.twice) {
                this.materialToAdd2 = new Material(
                    {x:nX, y:nY},
                    MATERIAL_SIZE,
                    MATERIAL_TYPE[this.materialToProduct]
                )
                this.materialToAdd2.unsetCanTake();
            }
        }

        if (passedTime > this.ANIM_COOLDOWN && this.materialToAdd != undefined) {
            Materials.add(this.materialToAdd);
            this.materialToAdd = undefined;

            if (this.twice) {
                Materials.add(this.materialToAdd2);
                this.materialToAdd2 = undefined;
            }
        }
    }

    hasPressedButton(player, input, Materials, materialList = undefined) {
        this.canProduct = this.button.isPressed(player, input);
        if (materialList == undefined) {
            this.tryCreateProduct(Materials)
        } else if (materialList.includes(this.materialToProduct)) {
            this.twice = (materialList[0] == materialList[1])
            this.tryCreateProduct(Materials)
        }
    }

    draw(ctx, supportCtx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size);

        ctx.drawImage(this.image, this.position.x, this.position.y, this.size,this.size);

        if (this.materialToAdd != undefined) {
            this.materialToAdd.draw(ctx, supportCtx);
        }

        ctx.drawImage(this.supportImage, this.position.x, this.position.y, this.size,this.size);
        
        ctx.fillStyle = 'rgb(90,90,90)'
        this.button.draw(ctx)

        // ctx.fillStyle = 'rgb(150,150,150)'
        // ctx.beginPath();
        // ctx.arc(this.clawPosition.x, this.clawPosition.y, this.clawSize, 0, Math.PI*2);
        // ctx.fill();
        // ctx.closePath();


    }
}