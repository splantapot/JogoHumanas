//Basic Setup
const FPS = 120;
const ROOM_SIZE = 120; /* 60 px */
const ROOM_MIN_SIZE = 80;

const CONTROLLER = new GameController(); // handle inputs
const SCREEN = new ScreenSettings(); // setup canvas

// Timer setup
const TIMER = new GameTimer({x:25, y:20}, 60);
let difTime = 0, nowTime = 0;
let pastTime = new Date().getTime();

function gameResetTimer() {
    difTime = nowTime = 0;
    pastTime = new Date().getTime();
    TIMER.resetTimer();
}

// Player Setup
const P1 = new Player(
    {x:200, y:200},
    25,
    6,
    'rgb(120,60,120)',
    ['w','s','a','d',' ']
);