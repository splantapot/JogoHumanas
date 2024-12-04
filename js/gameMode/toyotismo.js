const HALF_SCREEN = SCREEN.getSize().height/2;
const AUTO_MATERIAL_SIZE = ROOM_SIZE*0.5;
const BELT_WIDTH = 150;
const BELT_SIZE = 24;
const AUTO_MATERIAL_Y = HALF_SCREEN-BELT_WIDTH-(AUTO_MATERIAL_SIZE/2)-(BELT_SIZE/2)
const WOOD_ORIGIN = {x: 50, y:AUTO_MATERIAL_Y};
const RUBBER_ORIGIN = {x:200, y:AUTO_MATERIAL_Y};
const PLASTIC_ORIGIN = {x:350, y:AUTO_MATERIAL_Y};
const TISSUE_ORIGIN = {x:500, y:AUTO_MATERIAL_Y};

const toyo_WoodAutoMaterial = new RoomAutoMaterial(
    WOOD_ORIGIN,
    AUTO_MATERIAL_SIZE,
    'rgb(255,100,100)',
    'rgb(155,50,50)',
    'Wood'
);

const toyo_WoodConveyor = new ConveyorBelt(
    BELT_SIZE,
    {x:WOOD_ORIGIN.x + (AUTO_MATERIAL_SIZE/2), y:WOOD_ORIGIN.y + (AUTO_MATERIAL_SIZE/2)},
    {x:WOOD_ORIGIN.x + (AUTO_MATERIAL_SIZE/2), y:WOOD_ORIGIN.y + BELT_WIDTH},
    {generate: false, delete: false},
    'rgb(0,0,0)',
    500,
    10
);

const toyo_RubberAutoMaterial = new RoomAutoMaterial(
    RUBBER_ORIGIN,
    AUTO_MATERIAL_SIZE,
    'rgb(255,100,100)',
    'rgb(155,50,50)',
    'Rubber'
);

const toyo_RubberConveyor = new ConveyorBelt(
    BELT_SIZE,
    {x:RUBBER_ORIGIN.x + (AUTO_MATERIAL_SIZE/2), y:RUBBER_ORIGIN.y + (AUTO_MATERIAL_SIZE/2)},
    {x:RUBBER_ORIGIN.x + (AUTO_MATERIAL_SIZE/2), y:RUBBER_ORIGIN.y + BELT_WIDTH},
    {generate: false, delete: false},
    'rgb(0,0,0)',
    500,
    10
);

const toyo_PlasticAutoMaterial = new RoomAutoMaterial(
    PLASTIC_ORIGIN,
    AUTO_MATERIAL_SIZE,
    'rgb(255,100,100)',
    'rgb(155,50,50)',
    'Plastic'
);

const toyo_PlasticConveyor = new ConveyorBelt(
    BELT_SIZE,
    {x:PLASTIC_ORIGIN.x + (AUTO_MATERIAL_SIZE/2), y:PLASTIC_ORIGIN.y + (AUTO_MATERIAL_SIZE/2)},
    {x:PLASTIC_ORIGIN.x + (AUTO_MATERIAL_SIZE/2), y:PLASTIC_ORIGIN.y + BELT_WIDTH},
    {generate: false, delete: false},
    'rgb(0,0,0)',
    500,
    10
);

const toyo_TissueAutoMaterial = new RoomAutoMaterial(
    TISSUE_ORIGIN,
    AUTO_MATERIAL_SIZE,
    'rgb(255,100,100)',
    'rgb(155,50,50)',
    'Tissue'
);

const toyo_TissueConveyor = new ConveyorBelt(
    BELT_SIZE,
    {x:TISSUE_ORIGIN.x + (AUTO_MATERIAL_SIZE/2), y:TISSUE_ORIGIN.y + (AUTO_MATERIAL_SIZE/2)},
    {x:TISSUE_ORIGIN.x + (AUTO_MATERIAL_SIZE/2), y:TISSUE_ORIGIN.y + BELT_WIDTH},
    {generate: false, delete: false},
    'rgb(0,0,0)',
    500,
    10
);

const toyo_CraftConveyor = new ConveyorBelt(
    BELT_SIZE,
    {x:WOOD_ORIGIN.x + (AUTO_MATERIAL_SIZE/2) - (BELT_SIZE*2), y:WOOD_ORIGIN.y + BELT_WIDTH /*(BELT_SIZE/2)*/},
    {x:TISSUE_ORIGIN.x + (AUTO_MATERIAL_SIZE/2) + BELT_SIZE*2, y:TISSUE_ORIGIN.y + BELT_WIDTH /*(BELT_SIZE/2)*/},
    {generate:false, delete:false},
    'rgb(0,0,0)',
    500,
    2
);

const toyo_CraftRoom = new RoomCrafting(
    {x:TISSUE_ORIGIN.x + (AUTO_MATERIAL_SIZE), y:TISSUE_ORIGIN.y+BELT_WIDTH-(AUTO_MATERIAL_SIZE/2)},
    AUTO_MATERIAL_SIZE,
    'rgb(100,255,100)',
    'rgb(50,155,50)',
    false
);

const toyo_TrashConveyor = new ConveyorBelt(
    BELT_SIZE,
    {x:toyo_CraftRoom.position.x+(toyo_CraftRoom.size/2)-(BELT_SIZE/2), y:toyo_CraftRoom.position.y+(toyo_CraftRoom.size/2)},
    {x:toyo_CraftRoom.position.x+(toyo_CraftRoom.size/2)+150, y:toyo_CraftRoom.position.y+(toyo_CraftRoom.size/2)},
    {generate:false, delete:true},
    'rgb(0,0,0)',
    500,
    2
);

const toyo_TrashButton = new Button(
    {x:TISSUE_ORIGIN.x + (AUTO_MATERIAL_SIZE*2.5), y:HALF_SCREEN-(AUTO_MATERIAL_SIZE*1.5)},
    AUTO_MATERIAL_SIZE/4,
    'rgb(255,0,0)',
    MATERIAL_IMGS.Trash
);

const toyo_StockConveyor = new ConveyorBelt(
    BELT_SIZE,
    {x:toyo_CraftRoom.position.x+(toyo_CraftRoom.size/2)/*+(BELT_SIZE/2)*/, y:toyo_CraftRoom.position.y+(toyo_CraftRoom.size/2)},
    {x:toyo_CraftRoom.position.x+(toyo_CraftRoom.size/2)/*+(BELT_SIZE/2)*/, y:toyo_CraftRoom.position.y+(toyo_CraftRoom.size/2)+150},
    {generate:false, delete:false},
    'rgb(0,0,0)',
    500,
    2
);

const toyo_StockButton = new Button(
    {x:TISSUE_ORIGIN.x + (AUTO_MATERIAL_SIZE*2.5), y:HALF_SCREEN+AUTO_MATERIAL_SIZE+(AUTO_MATERIAL_SIZE*0.2)},
    AUTO_MATERIAL_SIZE/4,
    'rgb(0,255,0)',
    MATERIAL_IMGS.Check
);

const toyo_ShopRoom = new RoomShop(
    {x:TISSUE_ORIGIN.x + (AUTO_MATERIAL_SIZE*0.5), y:TISSUE_ORIGIN.y+BELT_WIDTH-(AUTO_MATERIAL_SIZE/2)+150},
    AUTO_MATERIAL_SIZE*2,
    'rgb(255,255,150)',
    'rgb(50,25,63)',
    false,
    true
);
toyo_ShopRoom.setTimes(8000,10000)

const toyo_StockRoom = new RoomStock(
    {x:TISSUE_ORIGIN.x + (AUTO_MATERIAL_SIZE*0.5), y:TISSUE_ORIGIN.y+BELT_WIDTH-(AUTO_MATERIAL_SIZE/2)+150},
    AUTO_MATERIAL_SIZE*2,
    'rgb(100,255,255)',
    'rgb(50,25,63)'
);

function toyotismo() {
    if (!TIMER.hasStarted) {
        TIMER.start();
    }

    nowTime = new Date().getTime();
    difTime = nowTime - pastTime;

    //Real time control
    P1.control(CONTROLLER.getInputs());

    if (!CONTROLLER.isPaused) {
        
        Materials.forEach((material) => {
            P1.materialControl(material, CONTROLLER.getInputs());
            //Conveyor
            toyo_WoodConveyor.updatePositionOf(material, Materials);
            toyo_RubberConveyor.updatePositionOf(material, Materials);
            toyo_PlasticConveyor.updatePositionOf(material, Materials);
            toyo_TissueConveyor.updatePositionOf(material, Materials);
            toyo_CraftConveyor.updatePositionOf(material, Materials);
            toyo_TrashConveyor.updatePositionOf(material, Materials);
            if (!material.isMaterial) {
                toyo_StockConveyor.updatePositionOf(material, Materials);
                toyo_StockRoom.checkForMaterial(material, Materials)
            }
            //CraftRoom
            toyo_CraftRoom.checkForMaterial(material, Materials);
        });

        //Framed updation
        if (difTime >= 1000/FPS) {
            pastTime = nowTime;
            
            //Your Game Code
            SCREEN.clear();

            //Check if can create a new Material
            toyo_WoodAutoMaterial.hasPressedButton(P1, CONTROLLER.getInputs(), Materials);
            toyo_RubberAutoMaterial.hasPressedButton(P1, CONTROLLER.getInputs(), Materials);
            toyo_PlasticAutoMaterial.hasPressedButton(P1, CONTROLLER.getInputs(), Materials);
            toyo_TissueAutoMaterial.hasPressedButton(P1, CONTROLLER.getInputs(), Materials);

            //Trash Conveyor and Stock Conveyor
            toyo_TrashConveyor.setWorking(toyo_TrashButton.isPressed(P1, CONTROLLER.getInputs()))
            toyo_StockConveyor.setWorking(toyo_StockButton.isPressed(P1, CONTROLLER.getInputs()))

            //Drawing belts
            toyo_CraftConveyor.draw(SCREEN.getContext());
            toyo_WoodConveyor.draw(SCREEN.getContext());
            toyo_RubberConveyor.draw(SCREEN.getContext());
            toyo_PlasticConveyor.draw(SCREEN.getContext());
            toyo_TissueConveyor.draw(SCREEN.getContext());
            toyo_TrashConveyor.draw(SCREEN.getContext());
            toyo_StockConveyor.draw(SCREEN.getContext());

            //Shop Room
            toyo_ShopRoom.tryWish()

            //Drawing common rooms
            toyo_CraftRoom.draw(SCREEN.getContext(), SCREEN.getSupportContext())
            //Drawing Material Rooms
            toyo_WoodAutoMaterial.draw(SCREEN.getContext(), SCREEN.getSupportContext());
            toyo_RubberAutoMaterial.draw(SCREEN.getContext(), SCREEN.getSupportContext());
            toyo_PlasticAutoMaterial.draw(SCREEN.getContext(), SCREEN.getSupportContext());
            toyo_TissueAutoMaterial.draw(SCREEN.getContext(), SCREEN.getSupportContext());
            toyo_ShopRoom.draw(SCREEN.getContext(), SCREEN.getSupportContext(), SCREEN.getSize())
            //Buttons
            toyo_TrashButton.draw(SCREEN.getContext());
            toyo_StockButton.draw(SCREEN.getContext());

            Materials.forEach((material) => {
                material.draw(SCREEN.getContext(), SCREEN.getSupportContext());
            });
            
            P1.update(SCREEN.getSize());
            
            P1.draw(SCREEN.getContext());
        }
        
        if (!TIMER.updateTimer()) {
            requestAnimationFrame(toyotismo);
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
        requestAnimationFrame(toyotismo);
    }
}