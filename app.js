const layout = document.querySelector('.layout')
const width = 80;
const height = 40;
const btn = document.querySelector('.btn')
const gameBtn = document.querySelector('.gameBtn')
const gameTitle = document.querySelector('.gameTitle')
const res = document.querySelector('.res')
const gameRes = document.querySelector('.gameRes')
const jumpBtn = document.querySelector('.jump')
const hitLaserBtn = document.querySelector('.hitLaser')
const flyBtn = document.querySelector('.fly')
const speedBtn = document.querySelector('.speed')
const moveLeftBtn = document.querySelector('.moveLeft')
const moveRightBtn = document.querySelector('.moveRight')
const punchBtn = document.querySelector('.punch')
for(let idx=0; idx<width*height; idx++){
    const square = document.createElement('div')
    layout.appendChild(square)
}
const squares = Array.from(document.querySelectorAll('.layout div'))
let supermanIdx = 2734;
const supermanPos = 2734;
let batmanIdx = 2785;
let supermanHitpointsIdx = 565;
let batmanHitpointsIdx = 610;
const superman = 564;
const batman = 609;

squares[supermanIdx].classList.add('supermanPos');
squares[batmanIdx].classList.add('batmanPos');
squares[superman].classList.add('superman')
squares[batman].classList.add('batman')
let laserIdx = supermanIdx+1;
let supermanHitpoints = 25;
let batmanHitpoints = 25;
let supermanOnLand = true;
let isSupermanOverLand = false;
let isSupermanJumping = false;
let speed = 40;

let enemnyActions=4;

for(let idx=supermanHitpointsIdx; idx<supermanHitpointsIdx+supermanHitpoints; idx++){
    squares[idx].classList.add('supermanHitpoints')
}

for(let idx=batmanHitpointsIdx; idx<batmanHitpointsIdx+batmanHitpoints; idx++){
    squares[idx].classList.add('batmanHitpoints')
}



btn.addEventListener('click', () => {
    layout.classList.remove('hideLayout')
    gameTitle.classList.add('hideLayout')
    batmanMoves()
})
gameBtn.addEventListener('click', ()=> {
    location.reload(true)
})
function supermanJump() {
    let jumpInterval = setInterval(() => {
        squares[supermanIdx].classList.remove('supermanPos');
        supermanIdx-= width;
        squares[supermanIdx].classList.add('supermanPos');
        
    }, 40);
    supermanOnLand = false;
    setTimeout(() => {
        clearInterval(jumpInterval)
        getDown()
    }, 400);
    
}
function getDown() {
    let getDownInterval = setInterval(() => {
        squares[supermanIdx].classList.remove('supermanPos');
        supermanIdx+= width;
        if(supermanIdx>squares.length-width*2){
            supermanIdx-= width;
        }
        squares[supermanIdx].classList.add('supermanPos');
    }, 40);
    setTimeout(() => {
        clearInterval(getDownInterval)
        supermanOnLand = true;
    }, 400);
}
function supermanFly() {
    let flyInterval = setInterval(() => {
        squares[supermanIdx].classList.remove('supermanPos');
        supermanIdx-= width;
        if(supermanIdx<width*2){
            supermanIdx+= width;
        }
        squares[supermanIdx].classList.add('supermanPos');
    }, 10);
    supermanOnLand = false;
    setTimeout(() => {
        clearInterval(flyInterval)
        getOverLand()
    }, 240);
}
function getOverLand() {
    squares[supermanIdx].classList.add('supermanPos');
    setTimeout(() => {
        getOnLand()
    }, 800);
}
function getOnLand() {
    let getDownInterval = setInterval(() => {
        squares[supermanIdx].classList.remove('supermanPos');
        supermanIdx+= width;
        if(supermanIdx>squares.length-width*2){
            supermanIdx-= width;
        }
        squares[supermanIdx].classList.add('supermanPos');
    }, 20);
    setTimeout(() => {
        clearInterval(getDownInterval) 
        while(!supermanOnLand){
            getSupermanOnLand()
        }
        
    }, 480);
}
function getSupermanOnLand() {
    if(supermanIdx>2797){
        squares[supermanIdx].classList.remove('supermanPos');
        supermanIdx-= width;
        squares[supermanIdx].classList.add('supermanPos');
        return 
    } else if(supermanIdx<2722){
        squares[supermanIdx].classList.remove('supermanPos');
        supermanIdx+= width;
        squares[supermanIdx].classList.add('supermanPos');
        return 
    }
    return supermanOnLand = true;
    
}
function supermanLeftMove() {

    if(supermanOnLand){
        let leftMoveInterval = setInterval(() => {
            squares[supermanIdx].classList.remove('supermanPos');
            supermanIdx-= 1;
            if(supermanIdx%width == 1){
                supermanIdx += 1;
            }
            squares[supermanIdx].classList.add('supermanPos');
        }, speed);
        setTimeout(() => {
            clearInterval(leftMoveInterval)        
        }, 240);
    }
}
function supermanRightMove() {

    if(supermanOnLand){
        let leftMoveInterval = setInterval(() => {
            squares[supermanIdx].classList.remove('supermanPos');
            supermanIdx+= 1;
            if(supermanIdx%width == width-19){
                supermanIdx -= 1;
            }
            squares[supermanIdx].classList.add('supermanPos');
        }, speed);
        setTimeout(() => {
            clearInterval(leftMoveInterval)        
        }, 240);
    }
}
function laser() {
    laserIdx = supermanIdx+6

    function moveLaser() {
        laserIdx += 1
        if(laserIdx%width==0){
            laserIdx -= 1;
        }
        if(squares[laserIdx].classList.contains('batmanPos')){
            batmanHitpoint()
            batmanHitpoints -= 4;
            
            laserIdx -= 1;
            clearInterval(laserInterval)
        }
        squares[laserIdx].classList.add('laser')
    }
    let laserInterval = setInterval(() => {
        moveLaser()
        setTimeout(() => {
            clearInterval(laserInterval);
            function removeLaser() {
                laserIdx = supermanIdx+6;
                let removeLaserInterval = setInterval(() => {
                    laserIdx +=1 
                    squares[laserIdx].classList.remove('laser')
                }, 4);
                setTimeout(() => {
                    clearInterval(removeLaserInterval)
                }, 240);
            }
            removeLaser()
        }, 280);
    }, 4);     
}

function fists() {
    let fistsIdx = supermanIdx
    let fistsInterval = setInterval(() => {
        fistsIdx+=1
        if(squares[fistsIdx].classList.contains('batmanPos')){
            fistsIdx-=1
            clearInterval(fistsInterval)
            batmanHitFromFists()
            batmanHitpoints -= 2;
        }
        squares[fistsIdx].classList.add('fists')
        setTimeout(() => {
            clearInterval(fistsInterval)
            function stopUsingFists() {
                fistsIdx = supermanIdx;
                let stopUsingFistsInterval = setInterval(() => {
                    fistsIdx +=1 
                    squares[fistsIdx].classList.remove('fists')
                }, 10);
                setTimeout(() => {
                    clearInterval(stopUsingFistsInterval)
                }, 40);
            }
            stopUsingFists()
        }, 40);
    }, 10);
}
function batmanHitpoint() {
    let idx = batmanHitpointsIdx+batmanHitpoints;
    let batmanHitpointsInterval = setInterval(() => {
        squares[idx].classList.remove('batmanHitpoints')
        idx--;
        setTimeout(() => {
            clearInterval(batmanHitpointsInterval)
        }, 40);
    }, 10);
}
function batmanHitFromFists() {
    let idx = batmanHitpointsIdx+batmanHitpoints;
    let batmanHitpointsInterval = setInterval(() => {
        squares[idx].classList.remove('batmanHitpoints')
        idx--;
        setTimeout(() => {
            clearInterval(batmanHitpointsInterval)
        }, 20);
    }, 10);
}
let maxSpeed = false;
let usingLaser = false;
let canMove = true;
let canUseFists = true;
let canUseLaser = true
let canJump = true;

function supermanFlyAction() {
    isSupermanOverLand = true;
    supermanFly()
    setTimeout(() => {
        isSupermanOverLand = false;
    }, 1600);
}
function jumpAction() {
    isSupermanJumping = true;
    supermanJump()
    setTimeout(() => {
        isSupermanJumping = false;
    }, 540);
}
function fistsAction() {
    fists();
    canMove = false;
    canUseFists = false;
    setTimeout(() => {
        canMove = true;
        canUseFists = true;
    }, 480);
}
function moveLeftAction() {
    supermanLeftMove()
    canUseFists = false;
    setTimeout(() => {
        canUseFists = true;
    }, 400);
}
function moveRightAction() {
    supermanRightMove()
    canUseFists = false;
    setTimeout(() => {
        canUseFists = true;
    }, 400);
}
function hitLaserAction() {
    usingLaser = true;
    canMove = false;
    canJump = false;
    batmanCanLaser = false;
    batmanCanFire = false
    enemnyActions/=2;
    laser();
    setTimeout(() => {
        usingLaser = false;
    }, 2400);
    setTimeout(() => {
        batmanCanLaser = true;
        batmanCanFire = true;
        enemnyActions*=2
    }, 1600);
    setTimeout(() => {
        canMove = true;
        canJump = true;
    }, 800);
}
function speedAction() {
    maxSpeed = true
    speed /=4;
    setTimeout(() => {
        speed *= 4;
    }, 4000);
    setTimeout(() => {
        maxSpeed = false
    }, 10000);
}
function supermanMoves(e) {
    if(e.key == 'w' && !isSupermanOverLand && !isSupermanJumping && canJump){
        supermanFlyAction()
    } else if(e.key == 'ArrowUp' && !isSupermanOverLand && !isSupermanJumping && canJump){
        jumpAction()
    } else if(e.key == 'ArrowRight' && !isSupermanOverLand && !isSupermanJumping && canUseFists && supermanOnLand){
        fistsAction()
    } else if(e.key == 'a' && canMove){
        moveLeftAction()
    }
    else if(e.key == 'd' && canMove){
        moveRightAction()
    } else if(e.key == 'e' && !isSupermanJumping && !isSupermanOverLand && !usingLaser && canUseLaser &&supermanOnLand){
        hitLaserAction()
    } else if(e.key == 's' && !maxSpeed){
        speedAction()
    }
}
document.addEventListener('keydown', supermanMoves)

jumpBtn.addEventListener('click', () => {
    if(!isSupermanOverLand && !isSupermanJumping && canJump){
        jumpAction()
    }
})
flyBtn.addEventListener('click', () => {
    if(!isSupermanOverLand && !isSupermanJumping && canJump){
        supermanFlyAction()
    }
})
speedBtn.addEventListener('click', () => {
    if(!maxSpeed){
        speedAction()
    }
})
hitLaserBtn.addEventListener('click', () => {
    if(!isSupermanJumping && !isSupermanOverLand && !usingLaser && canUseLaser &&supermanOnLand){
        hitLaserAction()
    }
})
moveLeftBtn.addEventListener('click', () => {
    if(canMove){
        moveLeftAction()
    }
})
moveRightBtn.addEventListener('click', () => {
    if(canMove){
        moveRightAction()
    }
})
punchBtn.addEventListener('click', () => {
    if(!isSupermanOverLand && !isSupermanJumping && canUseFists && supermanOnLand){
        fistsAction()
    }
})
function supermanHitFromFire() {
    let idx = supermanHitpointsIdx+supermanHitpoints;
    let supermanHitpointsInterval = setInterval(() => {
        squares[idx].classList.remove('supermanHitpoints')
        idx--;
        setTimeout(() => {
            clearInterval(supermanHitpointsInterval)
        }, 20);
    }, 10);
}
function supermanHitFromLaser() {
    let idx = supermanHitpointsIdx+supermanHitpoints;
    let supermanHitpointsInterval = setInterval(() => {
        squares[idx].classList.remove('supermanHitpoints')
        idx--;
        setTimeout(() => {
            clearInterval(supermanHitpointsInterval)
        }, 40);
    }, 10);
}

let batmanCanJump = true;
let batmanCanBack = true;
let batmanCanFire = true;
let batmanCanLaser = true;


function batmanMoves() {
    let batmanMovesInterval = setInterval(() => {
        let batmanMoveIdx = Math.floor(Math.random()*enemnyActions+1)
        if(batmanMoveIdx == 1 && usingLaser){
            if(batmanCanJump){
                batmanJump()
            }
        
        } else if(batmanMoveIdx == 1 && !usingLaser){
            if(batmanCanBack){
                batmanGetBack()
            }
        } else if(batmanMoveIdx == 2 && !usingLaser){
            if(batmanCanBack ){
                batmanGetBack()
            }
        } else if(batmanMoveIdx == 2 && usingLaser){
            if(batmanCanJump ){
                batmanJump()
            }
        } else if(batmanMoveIdx == 3){
            if(batmanCanFire ){
                batmanFires()
            }
        } else if(batmanMoveIdx == 4){
            if(batmanCanLaser && !isSupermanJumping){
                batmanLaser()
            }
        }
        if(supermanHitpoints<0 || batmanHitpoints<0){
            clearInterval(batmanMovesInterval);
            res.classList.add('showRes')
            if(supermanHitpoints<0){
                gameRes.innerHTML = 'Batman Won'
            } else{
                gameRes.innerHTML = 'Superman Won'
            }
        }
    }, 1200);
    
    function batmanJump() {
        let batmanJumpInterval = setInterval(() => {
            squares[batmanIdx].classList.remove('batmanPos')
            batmanIdx -= width
            squares[batmanIdx].classList.add('batmanPos')
            setTimeout(() => {
                clearInterval(batmanJumpInterval)
                batmanGetDown()
            }, 400);
            
        }, 40);
    }
    function batmanGetDown() {
        squares[batmanIdx].classList.remove('batmanPos')
        batmanIdx += width
        squares[batmanIdx].classList.add('batmanPos')
    }
    function batmanGetBack() {
        let batmanBackInterval = setInterval(() => {
            squares[batmanIdx].classList.remove('batmanPos')
            batmanIdx += 1
            squares[batmanIdx].classList.add('batmanPos')
            setTimeout(() => {
                clearInterval(batmanBackInterval)
                squares[batmanIdx].classList.remove('batmanPos')
                batmanIdx -= 1
                squares[batmanIdx].classList.add('batmanPos')
            }, 120);
        }, 20);
    }
    function batmanFires() {
        canUseLaser = false;
        let fireIdx = batmanIdx-1;
        let batmanFiresInterval = setInterval(() => {
            squares[fireIdx].classList.remove('fires')
            fireIdx -= 1;
            if(fireIdx%width == width-1){
                fireIdx+=1
                clearInterval(batmanFiresInterval)
            }
            if(squares[fireIdx].classList.contains('supermanPos')){
                fireIdx+=1
                clearInterval(batmanFiresInterval)
                supermanHitFromFire()
                supermanHitpoints-=2
            }
            if(squares[fireIdx].classList.contains('laser')){
                fireIdx++
                clearInterval(batmanFiresInterval)
            }
            squares[fireIdx].classList.add('fires')
            setTimeout(() => {
                squares[fireIdx].classList.remove('fires')
                clearInterval(batmanFiresInterval)
                canUseLaser = true;
            }, 800);
        }, 10);
    }
    function batmanLaser() {
        canUseLaser = false;
        let batmanLaserIdx = batmanIdx-6
        let batmanLaserInterval = setInterval(() => {
            batmanLaserIdx -= 1;
            if(batmanLaserIdx%width == width-1){
                batmanLaserIdx+=0
                clearInterval(batmanLaserInterval)
            }
            if(squares[batmanLaserIdx].classList.contains('supermanPos')){
                batmanLaserIdx+=1
                clearInterval(batmanLaserInterval)
                supermanHitFromLaser()
                supermanHitpoints-=5
            }
            if(squares[batmanLaserIdx].classList.contains('laser')){
                batmanLaserIdx++
                batmanLaserRemove()
                clearInterval(batmanLaserInterval)
            }
            squares[batmanLaserIdx].classList.add('batmanLaser')
            setTimeout(() => {
                squares[batmanLaserIdx].classList.remove('batmanLaser')
                clearInterval(batmanLaserInterval)
                function batmanLaserRemove() {
                    let batmanLaserIdx = batmanIdx-1;
                    let batmanLaserInterval = setInterval(() => {
                        squares[batmanLaserIdx].classList.remove('batmanLaser')
                        batmanLaserIdx--
                        setTimeout(() => {
                            canUseLaser= true
                            clearInterval(batmanLaserInterval)
                        }, 400);
                    }, 4);
                }
                batmanLaserRemove()
                
            }, 400);
        }, 4);
    }
}

