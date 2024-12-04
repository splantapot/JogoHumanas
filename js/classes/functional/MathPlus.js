TOY_ARRAY = [
    'Ioio',
    'Train',
    'Slingshot',
    'Spinning_Top',
    'Elastic',
    'Food',
    'Ball',
    'Puzzle',
    'Lego',
    'Plush',
]
class MathPlus {
    static rng(qnt = 2) {
        const RANDOM_NUMBER = Math.random();
        return Math.floor(RANDOM_NUMBER * qnt);
    }

    static distanceBetweenPoints(p1, p2) {
        return ((((p1.x - p2.x)**2) + ((p1.y - p2.y)**2)) ** (0.5));
    }

    static angleBetweenPoints(c1, c2) {
        const A = c2.y - c1.y;
        const B = c2.x - c1.x;
        let angle = Math.atan(A/B);
        return angle;
    }

    static polarToCartesian(r, angle) {
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);
        return {x: x, y: y};
    }

    static cartesianToPolar(x, y) {
        const r = ((x**2) + (y**2))**0.5;
        const angle = Math.atan(y/x);
        return {r: r, angle: angle};
    }

    static radToDeg(rad) {
        return rad*180/Math.PI
    }

    static degToRad(deg) {
        return deg*Math.PI/180
    }

    static calcProduction(makedList, wishedList) {
        for (let i = 0; i < TOY_ARRAY.length; i++) {
            makedList[TOY_ARRAY[i]] -= wishedList[TOY_ARRAY[i]]
        }
        const data = makedList;
        return data;
    }

    static calcScore(scoreList) {
        let score = 0;
        for (const toy_name in scoreList) {
            const finishQuantity = scoreList[toy_name];
            for (const material_name of TOY_TYPE[toy_name].materials) {
                score += MATERIAL_TYPE[material_name].price * finishQuantity;
            }
        }
        console.log(score);
        return score;
    }
    // static sortRoomPositions(qnt = 5, size = 0, width = 0, height = 0) {
        
    //     const POSITIONS_ARRAY = [];

    //     const TILE_SIZE = 10;
    //     const TILES_IN_SIZE = size/TILE_SIZE;
    //     const TILES_IN_WIDTH = width/TILE_SIZE;
    //     const TILES_IN_HEIGHT = height/TILE_SIZE;

    //     let newX = this.rng(TILES_IN_WIDTH);
    //     if (newX * size > )

    // }
}