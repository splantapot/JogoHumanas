class RoomCrafting extends Room {
    constructor(position = {x:0, y:0}, size = 100, color = 'rgb(100,255,100)', demoColor = 'rgb(100,155,100)', canTake = true) {
        super(position, size, color, demoColor);

        this.canTake = canTake;

        this.material_A = undefined;
        this.material_B = undefined;

        this.materialList = [];

        this.image = canTake? ROOMS_IMGS.Craft : ROOMS_IMGS.Craft_Auto;
        this.supportImage = !canTake? ROOMS_IMGS.Craft_Auto_Frame : undefined;
    }

    createToy(Materials = new Set([])) {
        this.materialList = [this.material_A.nameString, this.material_B.nameString];
        Materials.delete(this.material_A);
        Materials.delete(this.material_B);
        const nX = this.position.x + (this.size/2);
        const nY = this.position.y + (this.size/2);
        const TOY_SIZE = 25;
        for (let toyObj in TOY_TYPE) {
            // If toy is made of materials A and B
            if (this.materialList.includes(TOY_TYPE[toyObj].materials[0]) && this.materialList.includes(TOY_TYPE[toyObj].materials[1])) {
                const toyToAdd = new Toy(
                    {x:nX, y:nY},
                    TOY_SIZE,
                    TOY_TYPE[toyObj]
                )
                toyToAdd.canTake = this.canTake;
                Materials.add(
                    toyToAdd
                )
                break;
            }
        }
        this.material_A = undefined;
        this.material_B = undefined;
    }

    checkForMaterial(material, Materials) {
        if (material.isMaterial && !material.picked) {
            if ( 
                (material.position.x >= this.position.x && material.position.x <= this.position.x + this.size) &&
                (material.position.y >= this.position.y && material.position.y <= this.position.y + this.size)
            ) {
                if (this.material_A == undefined) {
                    this.material_A = material;
                } else if (this.material_B == undefined && material != this.material_A) {
                    this.material_B = material;
                    this.createToy(Materials);
                }
            }
        }
    }

    draw(ctx, supportCtx) {
        super.draw(ctx);

        if (this.supportImage != undefined) {
            supportCtx.drawImage(this.supportImage, this.position.x, this.position.y, this.size, this.size)
        }
    }
}