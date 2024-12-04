const MATERIAL_IMGS = {
    Wood: new Image(),
    Rubber: new Image(),
    Plastic: new Image(),
    Tissue: new Image(),
    Ioio: new Image(),
    Train: new Image(),
    Slingshot: new Image(),
    Spinning_Top: new Image(),
    Elastic: new Image(),
    Food: new Image(),
    Ball: new Image(),
    Puzzle: new Image(),
    Lego: new Image(),
    Plush: new Image(),
    Check: new Image(),
    Trash: new Image()
}

for (const name in MATERIAL_IMGS) {
    MATERIAL_IMGS[name].src = `./images/material/${name}.png`
}

const BOOK_IMGS = {
    Craft: new Image(),
    Empty: new Image()
}

for (const name in BOOK_IMGS) {
    BOOK_IMGS[name].src = `./images/book/${name}.png`
}

const SPEAK_IMGS = {
    right_up: new Image(),
    right_down: new Image(),
}

for (const name in SPEAK_IMGS) {
    SPEAK_IMGS[name].src = `./images/speak/${name}.png`;
}

const ROOMS_IMGS = {
    Craft: new Image(),
    Library: new Image(),
    Library_Frame: new Image(),
    Stock: new Image(),
    Trash: new Image(),
    Material: new Image(),
    Material_Frame: new Image(),
    Manager: new Image(),
    Manager_Frame: new Image(),
    Lever: new Image(),
    Craft_Auto: new Image(),
    Craft_Auto_Frame: new Image(),
    Material_Auto: new Image(),
    Client: new Image()
}

for (const name in ROOMS_IMGS) {
    ROOMS_IMGS[name].src = `./images/rooms/${name}.png`
}

const FLOOR_IMGS = {
    0: new Image(),
    1: new Image()
}

for (const name in FLOOR_IMGS) {
    FLOOR_IMGS[name].src = `./images/floor/${name}.png`
}