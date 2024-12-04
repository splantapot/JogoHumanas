class RoomTrash extends Room {
    constructor(position = {x:0, y:0}, size = 100, color = 'rgb(100,255,100)', demoColor = 'rgb(100,155,100)') {
        super(position, size, color, demoColor);

        this.material_A = undefined;

        this.image = ROOMS_IMGS.Trash
    }

    destroyItem(Materials) {
        const ACCEL_ANIM = 0.4;
        this.material_A.size -= ACCEL_ANIM
        this.material_A.canTake = false;
        if (this.material_A.size < 3) {
            Materials.delete(this.material_A);
            this.material_A = undefined;
        }
    }

    checkForMaterial(material, Materials) {
        if (!material.picked) {
            if ( 
                (material.position.x >= this.position.x && material.position.x <= this.position.x + this.size) &&
                (material.position.y >= this.position.y && material.position.y <= this.position.y + this.size)
            ) {
                this.material_A = material;
                this.destroyItem(Materials);
            }
        }
    }

    draw(ctx) {
        super.draw(ctx);

        // ctx.strokeStyle = 'rgb(255,255,255)';
        // ctx.strokeRect(this.position.x-1, this.position.y-1, this.size+2, this.size+2)
    }
}