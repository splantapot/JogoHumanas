const I4_WOOD_ORIGIN = {x:150, y:100}
const I4_RUBBER_ORIGIN = {x:150, y:180}
const I4_PLASTIC_ORIGIN = {x:150, y:SCREEN.getSize().height - 180 - AUTO_MATERIAL_SIZE}
const I4_TISSUE_ORIGIN = {x:150, y:SCREEN.getSize().height - 100 - AUTO_MATERIAL_SIZE}
const BELT_MATERIAL_WIDTH = MathPlus.distanceBetweenPoints(
    {x: I4_WOOD_ORIGIN.x+(AUTO_MATERIAL_SIZE/2), y: I4_WOOD_ORIGIN.y+(AUTO_MATERIAL_SIZE/2)},
    {x: I4_WOOD_ORIGIN.x+(AUTO_MATERIAL_SIZE/2), y: HALF_SCREEN}
) + BELT_SIZE

const i4_ProductionLever = new ProductionLever(
    {x: 500, y: 500},
    20,
    'rgb(255,100,0)'
);

const i4_ProductionButton = new Button(
    {x: 600, y:500},
    16,
    'rgb(255,0,0)'
)

const i4_WoodAutoMaterial = new RoomAutoMaterial(
    I4_WOOD_ORIGIN,
    AUTO_MATERIAL_SIZE,
    'rgb(255,100,100)',
    'rgb(155,50,50)',
    'Wood',
    true
);

const i4_RubberAutoMaterial = new RoomAutoMaterial(
    I4_RUBBER_ORIGIN,
    AUTO_MATERIAL_SIZE,
    'rgb(255,100,100)',
    'rgb(155,50,50)',
    'Rubber',
    true
);

const i4_PlasticAutoMaterial = new RoomAutoMaterial(
    I4_PLASTIC_ORIGIN,
    AUTO_MATERIAL_SIZE,
    'rgb(255,100,100)',
    'rgb(155,50,50)',
    'Plastic',
    true
);

const i4_TissueAutoMaterial = new RoomAutoMaterial(
    I4_TISSUE_ORIGIN,
    AUTO_MATERIAL_SIZE,
    'rgb(255,100,100)',
    'rgb(155,50,50)',
    'Tissue',
    true
);

const i4_downBelt = new ConveyorBelt(
    BELT_SIZE,
    {x:I4_WOOD_ORIGIN.x + (AUTO_MATERIAL_SIZE/2), y:I4_WOOD_ORIGIN.y + (AUTO_MATERIAL_SIZE/2)},
    {x:I4_WOOD_ORIGIN.x + (AUTO_MATERIAL_SIZE/2), y:I4_WOOD_ORIGIN.y + BELT_MATERIAL_WIDTH},
    {generate: false, delete: false},
    'rgb(0,0,0)',
    500,
    10
)

const i4_upBelt = new ConveyorBelt(
    BELT_SIZE,
    {x:I4_WOOD_ORIGIN.x + (AUTO_MATERIAL_SIZE/2), y:SCREEN.getSize().height - (I4_WOOD_ORIGIN.y + (AUTO_MATERIAL_SIZE/2))},
    {x:I4_WOOD_ORIGIN.x + (AUTO_MATERIAL_SIZE/2), y: SCREEN.getSize().height - (I4_WOOD_ORIGIN.y + BELT_MATERIAL_WIDTH)},
    {generate: false, delete: false},
    'rgb(0,0,0)',
    500,
    10
)

const i4_rightBelt = new ConveyorBelt(
    BELT_SIZE,
    {x:0, y:HALF_SCREEN},
    {x:400, y:HALF_SCREEN},
    {generate: false, delete: false},
    'rgb(25,0,0)',
    500,
    3
);

const i4_CraftRoom = new RoomCrafting(
    {x:400-(AUTO_MATERIAL_SIZE/2), y:HALF_SCREEN-(AUTO_MATERIAL_SIZE/2)},
    AUTO_MATERIAL_SIZE,
    'rgb(200,255,200)',
    'rgb(200,200,200)',
    false
)

const i4_StockRoom = new RoomStock(
    {x:700-(AUTO_MATERIAL_SIZE/2), y:HALF_SCREEN-(AUTO_MATERIAL_SIZE/2)},
    AUTO_MATERIAL_SIZE,
    'rgb(100,100,255)'
)

const i4_StockBelt = new ConveyorBelt(
    BELT_SIZE,
    {x:400, y:HALF_SCREEN},
    {x:700, y:HALF_SCREEN},
    {generate: false, delete: false},
    'rgb(25,0,0)',
    500,
    3
);

i4_WoodAutoMaterial.button = i4_ProductionButton;
i4_RubberAutoMaterial.button = i4_ProductionButton;
i4_PlasticAutoMaterial.button = i4_ProductionButton;
i4_TissueAutoMaterial.button = i4_ProductionButton;

function industry4_0() {
    if (!TIMER.hasStarted) {
        TIMER.start();
    }

    nowTime = new Date().getTime();
    difTime = nowTime - pastTime;

    //Real time control
    P1.control(CONTROLLER.getInputs());

    if (!CONTROLLER.isPaused) {
        const actualMaterials = [
            i4_ProductionLever.getMaterial(0),
            i4_ProductionLever.getMaterial(1),
        ]
        
        Materials.forEach((material) => {
            P1.materialControl(material, CONTROLLER.getInputs());
            i4_downBelt.updatePositionOf(material, Materials);
            i4_upBelt.updatePositionOf(material, Materials);
            i4_rightBelt.updatePositionOf(material, Materials);
            i4_StockBelt.updatePositionOf(material, Materials);

            i4_CraftRoom.checkForMaterial(material, Materials)
            i4_StockRoom.checkForMaterial(material, Materials)
        });

        //Framed updation
        if (difTime >= 1000/FPS) {
            pastTime = nowTime;
            
            //Your Game Code
            SCREEN.clear();
            
            //Shop lever
            i4_ProductionLever.checkForPlayer(P1, CONTROLLER.getInputs())
            i4_WoodAutoMaterial.hasPressedButton(P1, CONTROLLER.getInputs(), Materials, actualMaterials)
            i4_RubberAutoMaterial.hasPressedButton(P1, CONTROLLER.getInputs(), Materials, actualMaterials)
            i4_PlasticAutoMaterial.hasPressedButton(P1, CONTROLLER.getInputs(), Materials, actualMaterials)
            i4_TissueAutoMaterial.hasPressedButton(P1, CONTROLLER.getInputs(), Materials, actualMaterials)

            //Drawing Controls
            i4_ProductionLever.draw(SCREEN.getContext())
            i4_ProductionButton.draw(SCREEN.getContext())

            //Belts draw
            i4_downBelt.draw(SCREEN.getContext())
            i4_upBelt.draw(SCREEN.getContext())
            i4_rightBelt.draw(SCREEN.getContext())
            i4_StockBelt.draw(SCREEN.getContext())
            
            //Auto Material Rooms
            i4_WoodAutoMaterial.draw(SCREEN.getContext(), SCREEN.getSupportContext())
            i4_RubberAutoMaterial.draw(SCREEN.getContext(), SCREEN.getSupportContext())
            i4_PlasticAutoMaterial.draw(SCREEN.getContext(), SCREEN.getSupportContext())
            i4_TissueAutoMaterial.draw(SCREEN.getContext(), SCREEN.getSupportContext())

            
            //Rooms
            i4_CraftRoom.draw(SCREEN.getContext(), SCREEN.getSupportContext())
            i4_StockRoom.draw(SCREEN.getContext())
            
            Materials.forEach((material) => {
                material.draw(SCREEN.getContext(), SCREEN.getSupportContext());
            });
            
            P1.update(SCREEN.getSize());
            
            P1.draw(SCREEN.getContext());
        }
        
        if (!TIMER.updateTimer()) {
            requestAnimationFrame(industry4_0);
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
        requestAnimationFrame(industry4_0);
    }
}