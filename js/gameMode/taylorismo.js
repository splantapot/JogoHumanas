const taylor_roomMaterial = new RoomMaterial(
    {x:100, y:100},
    ROOM_SIZE,
    'rgb(255,100,100)',
    'rgb(155,50,50)'
);

const taylor_roomCraft = new RoomCrafting(
    {x:300, y:100},
    ROOM_SIZE,
    'rgb(100,100,150)',
    'rgb(50,155,50)'
);

const taylor_roomTrash = new RoomTrash(
    {x:300, y:500},
    ROOM_MIN_SIZE,
    'rgb(100,100,100)',
    'rgb(50,50,50)'
);

const taylor_roomStock = new RoomStock(
    {x:500, y:100},
    ROOM_SIZE,
    'rgb(100,100,255)',
    'rgb(50,50,155)'
);

const taylor_roomLibrary = new RoomLibrary(
    {x:400, y:300},
    ROOM_SIZE,
    'rgb(200,170,255)',
    'rgb(50,25,63)'
);

const taylor_roomShop = new RoomShop(
    {x:100, y:400},
    ROOM_SIZE,
    'rgb(255,255,150)',
    'rgb(50,25,63)'
);

function taylorismo() {
    nowTime = new Date().getTime();
    difTime = nowTime - pastTime;

    //Real time control
    P1.control(CONTROLLER.getInputs());

    Materials.forEach((material) => {
        P1.materialControl(material, CONTROLLER.getInputs());
        taylor_roomCraft.checkForMaterial(material, Materials);
        taylor_roomStock.checkForMaterial(material, Materials);
        taylor_roomTrash.checkForMaterial(material, Materials);
    })
    
    if (!CONTROLLER.isPaused) {
        //Framed updation
        if (difTime >= 1000/FPS) {
            pastTime = nowTime;
            
            //Your Game Code
            SCREEN.clear();
            
            taylor_roomMaterial.checkForPlayer(P1, CONTROLLER.getInputs(), Materials);
            taylor_roomLibrary.checkForPlayer(P1, CONTROLLER.getInputs());
            taylor_roomShop.tryWish();
            
            taylor_roomMaterial.draw(SCREEN.getContext());
            taylor_roomCraft.draw(SCREEN.getContext());
            taylor_roomStock.draw(SCREEN.getContext());
            taylor_roomTrash.draw(SCREEN.getContext());
            taylor_roomLibrary.draw(SCREEN.getContext(), SCREEN.getSupportContext(), SCREEN.getSize());
            taylor_roomShop.draw(SCREEN.getContext(), SCREEN.getContext());
            
            Materials.forEach((material) => {
                material.draw(SCREEN.getContext(), SCREEN.getSupportContext());
            });

            P1.update(SCREEN.getSize());
            
            P1.draw(SCREEN.getContext());
        }
        
        
        if (!TIMER.updateTimer()) {
            requestAnimationFrame(taylorismo);
        } else {
            //END GAME
            console.log('END GAME');
            const makedList = taylor_roomStock.getStock();
            const wishedList = taylor_roomShop.getCountWish();
            const scoreList = MathPlus.calcProduction(makedList, wishedList);
            const score = MathPlus.calcScore(scoreList);
        }
        
    }

    CONTROLLER.pause(SCREEN.getContext(), SCREEN.getSize())
    if (CONTROLLER.isPaused) {
        requestAnimationFrame(taylorismo);
    }
}