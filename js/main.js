function offMenu() {
    const menu = document.getElementById("menu");
    menu.style.display = 'none';

    const canvas = document.getElementById("canvas");
    const sptcanvas = document.getElementById("supportCanvas");
    canvas.style.display = 'block';
    sptcanvas.style.display = 'block';
}

function startTaylorismo() {
    gameResetTimer();
    requestAnimationFrame(taylorismo);
}

// startTaylorismo();

function startFordismo() {
    gameResetTimer();
    requestAnimationFrame(fordismo);
}

// startFordismo();

function startToyotismo() {
    gameResetTimer();
    requestAnimationFrame(toyotismo);
}

// startToyotismo();

function startIndustry4_0() {
    gameResetTimer();
    requestAnimationFrame(industry4_0);
}

// startIndustry4_0()

function startSomeGame(index) {
    offMenu()
    let initFunc = undefined;
    switch(index) {
        case 0:
            initFunc = startTaylorismo
            break;
        case 1:
            initFunc = startFordismo
            break;
        case 2:
            initFunc = startToyotismo
            break;
        case 3:
            initFunc = startIndustry4_0
            break;
        default:
            console.log("error")
            break;
    }
    setTimeout(()=> {
        initFunc()
    }, 100)
}