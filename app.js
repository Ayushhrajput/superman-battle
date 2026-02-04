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
const hitLaserIcon = document.querySelector('.hitLaserIcon')
const speedIcon = document.querySelector('.speedIcon')
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
squares[supermanIdx+1].classList.add('supermanPosition');
squares[batmanIdx].classList.add('batmanPos');
squares[superman].classList.add('superman')
squares[batman].classList.add('batman')
let laserIdx = supermanIdx+1;
let supermanHitpoints = 25;
let batmanHitpoints = 25;
let supermanOnLand = true;
let isSupermanOverLand = false;
let isSupermanJumping = false;
let supermanMoving = false;
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
    jumpBtn.classList.remove('hideLayout')
    hitLaserBtn.classList.remove('hideLayout')
    flyBtn.classList.remove('hideLayout')
    punchBtn.classList.remove('hideLayout')
    moveLeftBtn.classList.remove('hideLayout')
    moveRightBtn.classList.remove('hideLayout')
    speedBtn.classList.remove('hideLayout')
    batmanMoves()
})
gameBtn.addEventListener('click', ()=> {
    location.reload(true)
})

function supermanJump() {
    
    squares[supermanIdx].classList.remove('supermanPos');
    let jumpInterval = setInterval(() => {
        squares[supermanIdx].classList.remove('jumpPos');
        supermanIdx-= width;
        
        squares[supermanIdx].classList.add('jumpPos');
        
    }, 40);
    supermanOnLand = false;
    setTimeout(() => {
        squares[supermanIdx].classList.remove('jumpPos');
        clearInterval(jumpInterval)
        getDown()
    }, 400);
    
}
function getDown() {
    let getDownInterval = setInterval(() => {
        squares[supermanIdx].classList.remove('jumpPos2');
        supermanIdx+= width;
        if(supermanIdx>squares.length-width*2){
            supermanIdx-= width;
        }
        squares[supermanIdx].classList.add('jumpPos2');
    }, 40);
    setTimeout(() => {
        clearInterval(getDownInterval)
        
        squares[supermanIdx].classList.remove('jumpPos2')
        squares[supermanIdx].classList.add('supermanPos');
        supermanOnLand = true;
    }, 400);
}
function supermanFly() {
    squares[supermanIdx].classList.remove('supermanPos');
    squares[supermanIdx].classList.add('flyPos');

    setTimeout(() => {
        squares[supermanIdx].classList.remove('flyPos');
        let flyInterval = setInterval(() => {
            squares[supermanIdx].classList.remove('flyPos2');
            supermanIdx-= width;
            if(supermanIdx<width*2){
                supermanIdx+= width;
            }
            squares[supermanIdx].classList.add('flyPos2');
        }, 10);
        supermanOnLand = false;
        setTimeout(() => {
            clearInterval(flyInterval)
            squares[supermanIdx].classList.remove('flyPos2');
            squares[supermanIdx].classList.add('supermanFly');
            getOverLand()
        }, 240);
    }, 120);
}
function getOverLand() {
    let supermanFly = ['supermanFly', 'supermanFly2', 'supermanFly3', 'supermanFly2']
    let idx = 0;
    
    let flyInterval = setInterval(() => {
        squares[supermanIdx].classList.remove(supermanFly[idx]);
        idx++
        squares[supermanIdx].classList.add(supermanFly[idx]);
    }, 200);
    setTimeout(() => {
        clearInterval(flyInterval)
        getOnLand()
        squares[supermanIdx].classList.remove(supermanFly[idx]);
    }, 800);
}
function getOnLand() {
    let flyPos = ['flyPos3', 'flyPos4']
    let idx = 0;
    setTimeout(() => {
        squares[supermanIdx].classList.remove(flyPos[idx]);
        idx++
    }, 240);
    let getDownInterval = setInterval(() => {
        squares[supermanIdx].classList.remove(flyPos[idx]);
        supermanIdx+= width;
        if(supermanIdx>squares.length-width*2){
            supermanIdx-= width;
        }
        squares[supermanIdx].classList.add(flyPos[idx]);
    }, 20);
    setTimeout(() => {
        squares[supermanIdx].classList.remove(flyPos[idx]);
        squares[supermanIdx].classList.add('supermanPos');
        clearInterval(getDownInterval) 
        while(!supermanOnLand){
            getSupermanOnLand()
        }
        
    }, 480);
}
function getSupermanOnLand() {
    if(supermanIdx>2797){
        squares[supermanIdx].classList.remove('flyPos4');
        squares[supermanIdx].classList.remove('supermanPos');
        supermanIdx-= width;
        squares[supermanIdx].classList.add('supermanPos');
        return 
    } else if(supermanIdx<2722){
        squares[supermanIdx].classList.remove('flyPos4');
        squares[supermanIdx].classList.remove('supermanPos');
        supermanIdx+= width;
        squares[supermanIdx].classList.add('supermanPos');
        return 
    }
    return supermanOnLand = true;
    
}
function supermanLeftMove() {

    if(supermanOnLand){
        let runPos = ['supermanRunBack', 'supermanRunBack2', 'supermanRunBack3']
        let idx = 0;
        let supermanRunInterval = setInterval(() => {
            squares[supermanIdx].classList.remove(runPos[idx])
            idx++
        }, 80);
        squares[supermanIdx].classList.remove('supermanPos');
        let leftMoveInterval = setInterval(() => {
            squares[supermanIdx].classList.remove(runPos[idx])
            supermanIdx-= 1;
            if(supermanIdx%width == 1){
                supermanIdx += 1;
            }
            squares[supermanIdx].classList.add(runPos[idx]);
        }, speed);
        setTimeout(() => {
            squares[supermanIdx].classList.add('supermanPos');
            squares[supermanIdx].classList.remove(runPos[idx])
            clearInterval(leftMoveInterval)        
            clearInterval(supermanRunInterval)
        }, 240);
    }
}
function supermanRightMove() {

    if(supermanOnLand){
        let runPos = ['supermanRun', 'supermanRun2', 'supermanRun3']
        let idx = 0;
        let supermanRunInterval = setInterval(() => {
            squares[supermanIdx].classList.remove(runPos[idx])
            idx++
        }, 80);
        squares[supermanIdx].classList.remove('supermanPos');
        let leftMoveInterval = setInterval(() => {
            squares[supermanIdx].classList.remove(runPos[idx]);
            supermanIdx+= 1;
            if(supermanIdx%width == width-19){
                supermanIdx -= 1;
            }
            squares[supermanIdx].classList.add(runPos[idx]);
        }, speed);
        setTimeout(() => {
            squares[supermanIdx].classList.remove(runPos[idx]);
            squares[supermanIdx].classList.add('supermanPos');
            clearInterval(leftMoveInterval)    
            clearInterval(supermanRunInterval)
        }, 240);
    }
}
function laser() {
    laserIdx = supermanIdx-width*2
    squares[supermanIdx].classList.remove('supermanPos')
    laserPos = ['supermanLaser', 'supermanLaser2', 'sueprmanLaser3', 'supermanLaser4', 'sueprmanLaser3', 'supermanLaser2']
    let idx = 0;
    squares[supermanIdx].classList.add(laserPos[idx])
    let LaserPosInterval = setInterval(() => {
        squares[supermanIdx].classList.remove(laserPos[idx])
        idx++
        squares[supermanIdx].classList.add(laserPos[idx])
        setTimeout(() => {
            clearInterval(LaserPosInterval)
        },  520);
    }, 100);
    function moveLaser() {
        laserIdx += 1
        if(laserIdx%width==width-6){
            laserIdx -= 1;
        }
        if(squares[laserIdx+width*2].classList.contains('batmanPos')){
            batmanHitpoint()
            batmanHitpoints -= 4;
            
            laserIdx = laserIdx-1;
            clearInterval(laserInterval)
        }
        squares[laserIdx].classList.add('laser')
    }
    let laserInterval = setInterval(() => {
        moveLaser()
        setTimeout(() => {
            clearInterval(laserInterval);
            function removeLaser() {
                laserIdx = supermanIdx-width*2;
                let removeLaserInterval = setInterval(() => {
                    laserIdx +=1 
                    squares[laserIdx].classList.remove('laser')
                }, 4);
                setTimeout(() => {
                    squares[supermanIdx].classList.remove(laserPos[idx])
                    squares[supermanIdx].classList.add('supermanPos')
                    clearInterval(removeLaserInterval)
                }, 240);
            }
            removeLaser()
        }, 280);
    }, 4);     
}

function fists() {
    let fistsIdx = supermanIdx

    let fistsPos = ['supermanPos', 'fistsPos', 'fistsPos2', 'fistsPos3', 'fistsPos4']
    fistsPos.forEach(src => {
        const img = new Image();
        img.src = src;
    })
    let idx = 0;
    let fistsPosInterval = setInterval(() => {
        squares[supermanIdx].classList.remove(fistsPos[idx])
        idx++;
        squares[supermanIdx].classList.add(fistsPos[idx])
        
        setTimeout(() => {
            clearInterval(fistsPosInterval)
            squares[supermanIdx].classList.remove(fistsPos[idx])
        }, 480);
    }, 120);
    
    let fistsInterval = setInterval(() => {
        fistsIdx+=1
        if(squares[fistsIdx].classList.contains('batmanPos')){
            fistsIdx+=1
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
                }, 60);
                setTimeout(() => {
                    squares[supermanIdx].classList.add('supermanPos')
                    clearInterval(stopUsingFistsInterval)
                }, 240);
            }
            stopUsingFists()
        }, 240);
    }, 60);
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
let usedFists = false;



function supermanFlyAction() {
    isSupermanOverLand = true;
    if(!supermanMoving){
        supermanFly()
    }
    setTimeout(() => {
        isSupermanOverLand = false;
    }, 1600);
}
function jumpAction() {
    if(!supermanMoving){
        supermanJump()
    }
    isSupermanJumping = true;
    canJump = false;
    
    setTimeout(() => {
        isSupermanJumping = false;
    }, 540);
    setTimeout(() => {
        canJump = true;
    }, 800);
}
function fistsAction() {
    fists();
    canMove = false;
    usedFists = true
    canUseFists = false;
    setTimeout(() => {
        canMove = true;
        canUseFists = true;
        usedFists = false
    }, 600);
}
function moveLeftAction() {
    supermanLeftMove()
    supermanMoving = true
    canJump = false
    canUseFists = false;
    canMove = false
    canUseLaser = false
    setTimeout(() => {
        canUseFists = true;
        canJump = true;
        canUseLaser = true
        supermanMoving = false
        canMove = true
    }, 240);
}
function moveRightAction() {
    supermanRightMove()
    canMove = false;
    supermanMoving = true
    canJump = false
    canUseLaser = false
    canUseFists = false;
    setTimeout(() => {
        supermanMoving = false
        canUseFists = true;
        canUseLaser = true
        canJump = true;
        canMove = true;
    }, 240);
}
function hitLaserAction() {
    usingLaser = true;
    canMove = false;
    canJump = false;
    batmanCanFire = false
    enemnyActions/=2;
    laser();
    hitLaserIcon.classList.add('noPower')
    setTimeout(() => {
        usingLaser = false;
        hitLaserIcon.classList.remove('noPower')
    }, 2400);
    setTimeout(() => {
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
    speedIcon.classList.add('noPower')
    setTimeout(() => {
        speed *= 4;
    }, 4000);
    setTimeout(() => {
        maxSpeed = false
        speedIcon.classList.remove('noPower')
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
let supermanPositions = ['supermanPos', 'supermanRun','supermanRun2', 'supermanRun3', 'supermanRunBack', 'supermanRunBack2', 'supermanRunBack3', 'supermanLaser', 'supermanLaser2', 'supermanLaser3', 'supermanLaser4']
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
        if(batmanMoveIdx == 1){
            if(batmanCanJump && usingLaser){
                batmanJump()
            } 
        } else if(batmanMoveIdx == 1 && !usingLaser){
            if(batmanCanLaser){
                batmanFires()
            }
        } else if(batmanMoveIdx == 2 && !usingLaser){
            if(batmanCanFire ){
                batmanFires()
            }
        } else if(batmanMoveIdx == 2 ){
            if(batmanCanJump && usingLaser){         
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
        if(supermanHitpoints<=0 || batmanHitpoints<=0){
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
                squares[batmanIdx].classList.remove('batmanPos')
                batmanIdx += width
                squares[batmanIdx].classList.add('batmanPos')
            }, 400);
        }, 40);
    }
    
    
    function batmanFires() {
        canUseLaser = false;
        let fireIdx = batmanIdx-1;
        let batmanFiresPos = ['batmanPos', 'batmanFires', 'batmanFires2'];
        let idx = 0;
        let batmanFiresPosInterval = setInterval(() => {
            squares[batmanIdx].classList.remove('batmanPos');
            squares[batmanIdx].classList.remove(batmanFiresPos[idx])
            idx++
            squares[batmanIdx].classList.add(batmanFiresPos[idx])
            setTimeout(() => {
                clearInterval(batmanFiresPosInterval)
                squares[batmanIdx].classList.remove(batmanFiresPos[idx])
            }, 240);
        }, 200);       
        let batmanFiresInterval = setInterval(() => {
            squares[fireIdx].classList.remove('fires')
            fireIdx -= 1;
            if(fireIdx%width == width-1){
                fireIdx+=1
                clearInterval(batmanFiresInterval)
            }
            if(supermanPositions.some((pos) => (
                squares[fireIdx].classList.contains(pos)
            ))){
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
            squares[batmanIdx].classList.add('batmanPos')
            setTimeout(() => {
                squares[fireIdx].classList.remove('fires')
                clearInterval(batmanFiresInterval)
                canUseLaser = true;
            }, 800);
        }, 10);
    }
    function batmanLaser() {
        let batmanLaserIdx = batmanIdx-width
        squares[batmanIdx].classList.remove('batmanPos');
        let batmanLaserPos = ['batmanLaserPos', 'batmanLaserPos2', 'batmanLaserPos3'];
        let idx = 0;
        let batmanLaserPosInterval = setInterval(() => {
            squares[batmanIdx].classList.remove(batmanLaserPos[idx])
            idx++;
            squares[batmanIdx].classList.add(batmanLaserPos[idx])
            setTimeout(() => {
                clearInterval(batmanLaserPosInterval)
                
            }, 100);
        }, 100);   
        let batmanLaserInterval = setInterval(() => {
            batmanLaserIdx -= 1;
            if(batmanLaserIdx%width == 6){
                batmanLaserIdx+=1
                clearInterval(batmanLaserInterval)
            }
            if(supermanPositions.some((pos) => (
                squares[batmanLaserIdx+width].classList.contains(pos)
            ))){
                batmanLaserIdx= batmanLaserIdx+1
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
            squares[batmanIdx].classList.add(batmanLaserPos[idx])
            
            setTimeout(() => {
                squares[batmanLaserIdx].classList.remove('batmanLaser')
                clearInterval(batmanLaserInterval)
                function batmanLaserRemove() {
                    let batmanLaserIdx = batmanIdx-width;
                    let batmanLaserInterval = setInterval(() => {
                        squares[batmanLaserIdx].classList.remove('batmanLaser')
                        batmanLaserIdx--
                        setTimeout(() => {
                            squares[batmanIdx].classList.add('batmanPos');
                            squares[batmanIdx].classList.remove(batmanLaserPos[idx])
                            clearInterval(batmanLaserInterval)
                        }, 400);
                    }, 4);
                }
                batmanLaserRemove()
            }, 400);
        }, 4);   
    }
}