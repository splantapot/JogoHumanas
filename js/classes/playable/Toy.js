const TOY_TYPE = {
    Ioio: {
        nameString: 'Ioio',
        color: 'rgb(255, 0, 0)',
        materials: ['Wood', 'Tissue']
    },
    Train: {
        nameString: 'Train',
        color: 'rgb(0, 255, 0)',
        materials: ['Wood', 'Plastic']
    },
    Slingshot: {
        nameString: 'Slingshot',
        color: 'rgb(0, 0, 255)',
        materials: ['Wood', 'Rubber']
    },
    Spinning_Top: {
        nameString: 'Spinning_Top',
        color: 'rgb(255, 255, 0)',
        materials: ['Wood', 'Wood']
    },
    Elastic: {
        nameString: 'Elastic',
        color: 'rgb(255, 0, 255)',
        materials: ['Rubber', 'Tissue']
    },
    Food: {
        nameString: 'Food',
        color: 'rgb(0, 255, 255)',
        materials: ['Rubber', 'Plastic']
    },
    Ball: {
        nameString: 'Ball',
        color: 'rgb(255, 165, 0)',
        materials: ['Rubber', 'Rubber']
    },
    Puzzle: {
        nameString: 'Puzzle',
        color: 'rgb(255, 192, 203)',
        materials: ['Plastic', 'Tissue']
    },
    Lego: {
        nameString: 'Lego',
        color: 'rgb(128, 128, 128)',
        materials: ['Plastic', 'Plastic']
    },
    Plush: {
        nameString: 'Plush',
        color: 'rgb(165, 42, 42)',
        materials: ['Tissue', 'Tissue']
    }
}

class Toy extends Material {
    constructor(position = {x:0, y:0}, size = 10, type = TOY_TYPE['NAME']) {
        super(position, size, type);
        
        this.isMaterial = false;
    }
}