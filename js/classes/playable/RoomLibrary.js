class RoomLibrary extends Room {
    constructor(position = {x:0, y:0}, size = 100, color = 'rgb(100,255,100)', demoColor = 'rgb(100,155,100)') {
        super(position, size, color, demoColor);
        
        this.OPENNING_COOLDOWN = 300;
        this.openningTime = new Date().getTime();
        this.isOpened = false;
        this.initialMaxVelocity = 0;

        this.image = ROOMS_IMGS.Library;
        this.supportImage = ROOMS_IMGS.Library_Frame;
        this.book = BOOK_IMGS.Craft
    }

    updateBook(player) {
        //If has passed a time since last opened
        const timeCheck = (new Date().getTime())
        if (timeCheck - this.openningTime >= this.OPENNING_COOLDOWN) {
            this.openningTime = timeCheck;

            if (!this.isOpened) {
                const normalPlayerSpeed = player.maxVelocity;
                this.initialMaxVelocity = normalPlayerSpeed;

                player.maxVelocity = 0;
            } else {
                const normalPlayerSpeed = this.initialMaxVelocity;
                player.maxVelocity = normalPlayerSpeed;
            }

            this.isOpened = !this.isOpened;
        }
    }

    checkForPlayer(player, input) {
        super.checkForPlayer(player);

        if (this.hasPlayer && player.grabItem == undefined) {
            if (player.hasAct(input)) {
                this.updateBook(player);
            }
        }
    }

    draw(ctx, supportCtx, screenSize) {
        super.draw(ctx);

        ctx.fillStyle = `rgba(255,255,255,${this.hasPlayer*0.4})`;
        ctx.fillRect(this.position.x,this.position.y,this.size, this.size);

        if (this.supportImage != undefined) {
            ctx.drawImage(this.supportImage, this.position.x, this.position.y, this.size, this.size)
        }

        // ctx.strokeStyle = 'rgb(255,0,0)';
        // ctx.strokeRect(this.position.x-1, this.position.y-1, this.size+2, this.size+2)

        if (this.isOpened) {
            this.drawBook(supportCtx, screenSize)
        }
    }

    drawBook(ctx, screenSize) {
        const BOOK_WIDTH = 700;
        const BOOK_HEIGHT = 500;
        ctx.drawImage(
            this.book, 
            (screenSize.width/2)-(BOOK_WIDTH/2), 
            (screenSize.height/2)-(BOOK_HEIGHT/2),
            BOOK_WIDTH,
            BOOK_HEIGHT
        )
        // ctx.fillStyle = 'rgb(150,150,150)'
        // ctx.fillRect(
        //     (screenSize.width/2)-(BOOK_WIDTH/2),
        //     (screenSize.height/2)-(BOOK_HEIGHT/2),
        //     BOOK_WIDTH,
        //     BOOK_HEIGHT
        // )
    }
}