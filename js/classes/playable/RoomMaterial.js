class RoomMaterial extends Room {
    constructor(position = {x:0, y:0}, size = 100, color = 'rgb(100,255,100)', demoColor = 'rgb(100,155,100)') {
        super(position, size, color, demoColor);

        this.playerX = false;
        this.playerY = false;

        this.CREATION_COOLDOWN = 300;
        this.creationTime = new Date().getTime();

        this.image = ROOMS_IMGS.Material;
        this.supportImage = ROOMS_IMGS.Material_Frame;
    }

    takeMaterial(Materials) {
        //If has passed a time since last creation
        const timeCheck = (new Date().getTime())
        if (timeCheck - this.creationTime >= this.CREATION_COOLDOWN) {
            this.creationTime = timeCheck;

            const creationPosition = (this.playerX+1) + (this.playerY*2);

            let toyTypeName = '';
            let nX = this.position.x + (this.size/4);
            let nY = this.position.y + (this.size/4);
            switch (creationPosition) {
                case 1:
                    toyTypeName = 'Wood'
                break;

                case 2:
                    toyTypeName = 'Rubber'
                    nX += this.size/2;
                break;

                case 3:
                    toyTypeName = 'Tissue'
                    nY += this.size/2;
                break;

                case 4:
                    toyTypeName = 'Plastic'
                    nX += this.size/2;
                    nY += this.size/2;
                break
            }

            const MATERIAL_SIZE = 26

            Materials.add(
                new Material(
                    {x:nX, y:nY},
                    MATERIAL_SIZE,
                    MATERIAL_TYPE[toyTypeName]
                ),
            )
        }
    }

    checkForPlayer(player, input, Materials) {
        super.checkForPlayer(player);

        if (this.hasPlayer){
            this.playerX = 
                !(player.position.x >= this.position.x && player.position.x <= this.position.x + (this.size/2))
            ;

            this.playerY =
                !(player.position.y >= this.position.y && player.position.y <= this.position.y + (this.size/2))
            ;

            if (player.hasAct(input)) {
                this.takeMaterial(Materials);
            }
        }
    }

    draw(ctx) {
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
        super.draw(ctx)

        if (this.hasPlayer) {
            ctx.fillStyle = `rgba(255,255,255,0.4)`/*this.demoColor*/;
            ctx.fillRect(
                this.position.x+(Number(this.playerX) * this.size/2),
                this.position.y+(Number(this.playerY) * this.size/2),
                this.size / 2,
                this.size / 2
            )
            if (this.supportImage != undefined) {
                ctx.drawImage(this.supportImage, this.position.x, this.position.y, this.size, this.size)
            }
        }
    }
}