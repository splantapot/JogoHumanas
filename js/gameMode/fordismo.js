const ford_roomCraft = new RoomCrafting(
    {x:400, y:100},
    ROOM_MIN_SIZE,
    'rgb(100,255,100)',
    'rgb(50,155,50)'
);

const ford_roomTrash = new RoomTrash(
    {x:400, y:200},
    ROOM_MIN_SIZE,
    'rgb(100,100,100)',
    'rgb(50,50,50)'
);

const ford_roomStock = new RoomStock(
    {x:500, y:100},
    ROOM_SIZE,
    'rgb(100,100,255)',
    'rgb(50,50,155)'
);

const ford_roomShop = new RoomShop(
    {x:500, y:240},
    ROOM_SIZE*0.5,
    'rgb(255,255,150)',
    'rgb(50,25,63)',
    true
);

const ford_conveyorBelt_A = new ConveyorBelt(
    24,
    {x:100, y:100},
    {x:100, y:500},
    {generate: true, delete: true},
    'rgb(0,0,0)',
    500,
    4
)

const ford_conveyorBelt_B = new ConveyorBelt(
    24,
    {x:200, y:100},
    {x:200, y:500},
    {generate: true, delete: true},
    'rgb(0,0,0)',
    500,
    4
)

const ford_productionLever = new ProductionLever(
    {x:400 + ROOM_MIN_SIZE*0.3, y:350},
    ROOM_MIN_SIZE* 0.5,
);

function fordismo() {
    if (!TIMER.hasStarted) {
        ford_roomShop.autoFullWish(12);
        TIMER.start();
    }

    nowTime = new Date().getTime();
    difTime = nowTime - pastTime;

    //Real time control
    P1.control(CONTROLLER.getInputs());

    if (!CONTROLLER.isPaused) {
        
        Materials.forEach((material) => {
            P1.materialControl(material, CONTROLLER.getInputs());
            ford_roomCraft.checkForMaterial(material, Materials);
            ford_roomStock.checkForMaterial(material, Materials);
            ford_roomTrash.checkForMaterial(material, Materials);
            ford_conveyorBelt_A.updatePositionOf(material, Materials);
            ford_conveyorBelt_B.updatePositionOf(material, Materials);
        });

        //Framed updation
        if (difTime >= 1000/FPS) {
            pastTime = nowTime;
            
            //Your Game Code
            SCREEN.clear();
            
            ford_productionLever.checkForPlayer(P1, CONTROLLER.getInputs());

            ford_roomShop.checkForPlayer(P1, CONTROLLER.getInputs())
            ford_conveyorBelt_A.tryToGenerate(ford_productionLever.getMaterial(0), Materials)
            ford_conveyorBelt_B.tryToGenerate(ford_productionLever.getMaterial(1), Materials)

            ford_conveyorBelt_A.updatePositionOf(P1);
            ford_conveyorBelt_B.updatePositionOf(P1);
            
            ford_roomCraft.draw(SCREEN.getContext());
            ford_roomStock.draw(SCREEN.getContext());
            ford_roomTrash.draw(SCREEN.getContext());
            ford_roomShop.draw(SCREEN.getContext(), SCREEN.getSupportContext(), SCREEN.getSize());

            ford_conveyorBelt_A.draw(SCREEN.getContext());
            ford_conveyorBelt_B.draw(SCREEN.getContext());
            ford_productionLever.draw(SCREEN.getContext())

            Materials.forEach((material) => {
                material.draw(SCREEN.getContext(), SCREEN.getSupportContext());
            });
            
            P1.update(SCREEN.getSize());
            
            P1.draw(SCREEN.getContext());
        }
        
        if (!TIMER.updateTimer()) {
            requestAnimationFrame(fordismo);
        } else {
            //END GAME
            console.log('END GAME');
            const makedList = ford_roomStock.getStock();
            const wishedList = ford_roomShop.getCountWish();
            const scoreList = MathPlus.calcProduction(makedList, wishedList);
            const score = MathPlus.calcScore(scoreList);
        }
        
    }

    CONTROLLER.pause(SCREEN.getContext(), SCREEN.getSize())
    if (CONTROLLER.isPaused) {
        requestAnimationFrame(fordismo);
    }
}