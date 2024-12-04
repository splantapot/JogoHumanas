class RoomShop extends RoomLibrary {
    constructor(position = {x:0, y:0}, size = 100, color = 'rgb(100,255,100)', demoColor = 'rgb(100,155,100)', viewWishes = false, isClient = false) {
        super(position, size, color, demoColor);

        this.DISPLAY_TIME = 3000;
        this.WISH_COOLDOWN = 10000;
        this.speakTime = new Date().getTime() - this.WISH_COOLDOWN + 2400;

        //apostando alto, filme
        this.WISH_PROB_LIST = [1,1,1,1,1,2,2,2,2,3] // lista
        this.wishList = [];
        this.wishAdded = false;

        this.wishToys = {
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

        this.viewWishes = viewWishes;
        this.OPENNING_COOLDOWN = 300;
        this.openningTime = new Date().getTime();
        this.isOpened = false;
        this.initialMaxVelocity = 0;

        this.image = !isClient? ROOMS_IMGS.Manager : undefined;
        this.supportImage = !isClient? ROOMS_IMGS.Manager_Frame : ROOMS_IMGS.Client;
        this.book = BOOK_IMGS.Empty
    }

    setTimes(DISPLAY_TIME = 2500, WISH_COOLDOWN = 8000) {
        this.DISPLAY_TIME = DISPLAY_TIME;
        this.WISH_COOLDOWN = WISH_COOLDOWN;
    }

    checkForPlayer(player, input) {
        if (this.viewWishes) {
            super.checkForPlayer(player, input);
        }
    }

    clearWishList() {
        this.wishList = [];
    }

    clearWishToys() {
        this.wishToys = {
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
    }

    generateToy() {
        //Sort a random toy
        const randomTOY = TOY_ARRAY[MathPlus.rng(TOY_ARRAY.length)];
        //Sort a random quantity
        // 50% - 1 >> sort 10, take 5
        // 40% - 2 >> sort 10, take 4
        // 10% - 3 >> sort 10, take 3
        const randomQNT = this.WISH_PROB_LIST[MathPlus.rng(this.WISH_PROB_LIST.length)];
        this.wishList.push({
            nameString: randomTOY,
            quantity: randomQNT
        });
    }

    //Taylorismo
    tryWish() {
        const nowTime = (new Date().getTime())
        const timerPassed = nowTime - this.speakTime;
        if (timerPassed > this.WISH_COOLDOWN) {
            this.speakTime = nowTime;

            this.generateToy()
            this.wishAdded = true;
        }
    }

    //Fordismo
    autoFullWish(quantity = 10) {
        this.clearWishList();
        this.clearWishToys();
        for (let i = 0; i < quantity; i++) {
            this.generateToy();
        }
    }

    //Score
    getCountWish(clear = true) {
        if (clear) {
            this.clearWishToys();
        }

        for (let i = 0; i < this.wishList.length; i++) {
            this.wishToys[this.wishList[i].nameString] += this.wishList[i].quantity;
        }
        const data = this.wishToys;
        return data;
    }

    drawBook(ctx, screenSize) {
        const BOOK_WIDTH = 700;
        const BOOK_HEIGHT = 500;
        const MARGIN = 10

        super.drawBook(ctx, screenSize);

        const toys_list = this.getCountWish(true);
        let i = 0;
        for (const toyName in toys_list) {
            ctx.drawImage(MATERIAL_IMGS[toyName], (screenSize.width/2)-(BOOK_WIDTH/2)+75 + ((i>=5)*BOOK_WIDTH*0.45), screenSize.height-(BOOK_HEIGHT) + ((i%5)*70), 60, 60)
            ctx.fillStyle = 'rgb(0,0,0)'
            ctx.font = '30px Dosis'
            ctx.fillText('x '+toys_list[toyName], (screenSize.width/2)-(BOOK_WIDTH/2)+75 + ((i>=5)*BOOK_WIDTH*0.45) + 80, screenSize.height-(BOOK_HEIGHT) + ((i%5)*70) + 35, 60, 60)
            i++
        }
    }

    draw(ctx, supportCtx, screenSize) {
        if (this.wishAdded) {
            const nowTime = (new Date().getTime())
            const timerPassed = nowTime - this.speakTime;
            if (timerPassed < this.DISPLAY_TIME) {
                const IMG_SIZE = 60;
                const speakX = this.position.x-IMG_SIZE-5;
                const speakY = this.position.y-(IMG_SIZE/2)-2.5;
                supportCtx.drawImage(SPEAK_IMGS.right_down, speakX, speakY, IMG_SIZE, IMG_SIZE)
                supportCtx.drawImage(SPEAK_IMGS.right_up, speakX, speakY+IMG_SIZE+2.5, IMG_SIZE, IMG_SIZE)

                supportCtx.font = '20px Dosis'
                supportCtx.fillStyle = 'rgb(0,0,0)'
                supportCtx.fillText(this.wishList[this.wishList.length-1].quantity.toString()+' x', speakX+(IMG_SIZE/2)-8, speakY+(IMG_SIZE/2)+8);
                // supportCtx.fillText(this.wishList[this.wishList.length-1].nameString, this.position.x+(this.size/2), this.position.y-10);
                const IMG_TOY_SIZE = 40;
                supportCtx.drawImage(MATERIAL_IMGS[this.wishList[this.wishList.length-1].nameString], 
                    speakX + (IMG_TOY_SIZE/4), 
                    speakY + (IMG_SIZE*1.5)-(IMG_TOY_SIZE*0.4), 
                    IMG_TOY_SIZE, 
                    IMG_TOY_SIZE
                )
            }
        }

        super.draw(ctx, supportCtx, screenSize);
    }
}