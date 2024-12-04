class RoomStock extends Room {
    constructor(position = {x:0, y:0}, size = 100, color = 'rgb(100,255,100)', demoColor = 'rgb(100,155,100)') {
        super(position, size, color, demoColor);

        this.material_A = undefined;

        this.toys = {
            Ioio: 0,
            Train: 0,
            Slingshot: 0,
            Spinning_Top: 0,
            Elastic: 0,
            Food: 0,
            Ball: 0,
            Puzzle: 0,
            Lego: 0,
            Plush: 0
        }

        this.image = ROOMS_IMGS.Stock;
    }

    getStock() {
        const data = this.toys;
        return data;
    }

    addToyToStock(Materials) {
        this.materialName = this.material_A.nameString;
        Materials.delete(this.material_A);

        this.toys[this.materialName]++;
        this.material_A = undefined;
    }

    checkForMaterial(material, Materials) {
        if (!material.isMaterial && !material.picked) {
            if (
                (material.position.x >= this.position.x && material.position.x <= this.position.x + this.size) &&
                (material.position.y >= this.position.y && material.position.y <= this.position.y + this.size)
            ) {
                if (this.material_A == undefined) {
                    this.material_A = material;

                    this.addToyToStock(Materials);
                }
            }
        }
    }
}