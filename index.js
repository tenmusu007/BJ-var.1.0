"use strict"
let cards = []
let dcards = []
let ace
let type = ["c", "d", "h", "s"]
let hands = cards.length
let psum = 0
let dsum = 0
let number = 0
let newpsum = 0
let hasBlackJack = false
let drawCard = false
let nodrawCard = true
let dealerdrawCard = true
let dealernodrawCard = false
let tie = false
let win = false
let lose = true
let lose1 = true
let message = " "
let dsumEl = document.getElementById("dsum-el")
let playerEl = document.getElementById("player-el")
let resultEl = document.getElementById("result-el")
let psumEl = document.getElementById("psum-el")
let picEL = document.querySelectorAll('.pimg')
let dpicEl = document.querySelectorAll('.dimg')
let standEl = document.getElementById('stand-btn');
let ruleEl = document.getElementById('rule-el');
let hitEl = document.getElementById('hit-btn');

// close rule
function startRule() {
    ruleEl.classList.add('none');
    standEl.classList.add('none')
    hitEl.classList.add('none')
}
// show rule again
function againRule() {
    ruleEl.classList.remove('none');
}
// player starts to play
function startCard() {
    let randomType = Math.floor(Math.random() * 4);
    let randomType2 = Math.floor(Math.random() * 4);
    console.log(typeof(randomType2))
    let kindOftype = type[randomType];
    let kindOftype2 = type[randomType2];
    picEL[2].classList.add('none')
    picEL[3].classList.add('none')
    picEL[4].classList.add('none')
    hitEl.classList.remove('none')
    standEl.classList.remove('none')
    console.log(hitEl)
    message = "Do you want draw a card? tap 'Hit' "
    drawCard = true
    hasBlackJack = false
    let firstcard = getRandomCard()
    let secondcard = getRandomCard()
    picEL[0].src = "image/card-" + kindOftype + firstcard + ".png"
    picEL[1].src = "image/card-" + kindOftype2 + secondcard + ".png"
    let firstcard1 = getNewcard(firstcard)
    let secondcard2 = getNewcard(secondcard)
    cards = [firstcard1, secondcard2]
    psum = firstcard1 + secondcard2
    resultEl.textContent = message
    psumEl.textContent = "Sum: " + psum
    goresult()
}
// number will be confirmed more than 10 or not and having Ace or not 
function getNewcard(cardNumber) {
    if (cardNumber === 1) {
        return 11
    } else if (cardNumber >= 10) {
        return 10
    } else if (cardNumber <= 10 && cardNumber >= 2) {
        return cardNumber
    }
}
function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    return randomNumber
}

// check result
function goresult() {
    aceSystem()
    if (newpsum === 21) {
        hasBlackJack = true
        message = "You've got Black Jack"
        // resultEl.textContent = message
    } else if (newpsum > 21) {
        nodrawCard = false
        message = "You Bust"
        resultEl.textContent = message
        standEl.classList.add('none')
        hitEl.classList.add('none')
    } else if (newpsum < 21) {
        drawCard = true
    }
    resultEl.textContent = message
}
// draw cards and push new card to player hands
function newCard() {
    if (drawCard === true && hasBlackJack === false) {
        let card = getRandomCard()
        let card1 = getNewcard(card)
        psum += card1
        cards.push(card1)
        insertPic(card)
    } else if (nodrawCard === true && drawCard === true) {
        message = "Click start again"
    }
    resultEl.textContent = message
}
// checking player has Ace or not  
const aceSystem = () => {
    if (cards.includes(11)) {
        if (psum > 21) {
            newpsum = psum - 10
        }else{
            newpsum =  psum + 0
        }
    }else{
        newpsum =  psum + 0
    }
    // psumEl.textContent = "Sum: " + newpsum
}
//show card pic
function insertPic(num) {
    let randomType = Math.floor(Math.random() * 4);
    let kindOftype = type[randomType];
    if (cards.length === 3) {
        setTimeout(()=>{
            picEL[2].classList.remove('none')
            picEL[2].src = "image/card-" + kindOftype + num + ".png"
            psumEl.textContent = "Sum: " + newpsum
        },1000)
    } else if (cards.length === 4) {
        setTimeout(()=>{
            picEL[3].classList.remove('none')
            picEL[3].src = "image/card-" + kindOftype + num + ".png"
            psumEl.textContent = "Sum: " + newpsum
        },1200)
    } else if (cards.length === 5) {
        setTimeout(()=>{
            picEL[4].classList.remove('none')
            picEL[4].src = "image/card-" + kindOftype + num + ".png"
            psumEl.textContent = "Sum: " + newpsum
        },1400)
    }
    goresult()

}
// dealer zone 

function dealerStart() {
    dsumEl.classList.add('none')
    let randomType3 = Math.floor(Math.random() * 4);
    let kindOfType3 = type[randomType3];
    dealerdrawCard = true
    dealernodrawCard = false
    tie = false
    dpicEl[1].classList.add('none')
    dpicEl[2].classList.add('none')
    dpicEl[3].classList.add('none')
    dpicEl[4].classList.add('none')
    let dealercard1 = Math.floor(Math.random() * 13) + 1
    dpicEl[0].src = "image/card-" + kindOfType3 + dealercard1 + ".png"
    let dealerCrad = getNewcard(dealercard1)
    dcards = [dealerCrad]
    dsum = dealerCrad
}
function skipCard() {
    hitEl.classList.add('none')
    dealerdrawCard = true
    dealernodrawCard = false
    if (dsum <= 16) {
        for (let i = 0; dsum <= 16; i++) {
            // dealer starts to draw
            let dcard = Math.floor(Math.random() * 13) + 1
            let dcard1 = getNewcard(dcard)
            dsum += dcard1
            dcards.push(dcard1)
            insertPic1(dcard)
            if (dsum >= 17 && dsum <= 21) {
                if (dsum === newpsum) {
                    tie = true
                } else if (dsum < newpsum) {
                    dealerdrawCard = false
                } else if (dsum > newpsum) {
                    lose1 = true
                }
            } else if (dsum > 21) {
                dealernodrawCard = true
            }
        }

    } else if (dsum > 17) {
        if (dsum < newpsum) {
            dealerdrawCard = false
        } else if (dsum > newpsum) {
            lose1 = false
        }
    }

    resultEl.textContent = message
}
// insert dealer pic
function insertPic1(num) {
    let randomType = Math.floor(Math.random() * 4);
    let kindOftype = type[randomType];
    if (dcards.length === 2) {
        setTimeout(() => {
            dpicEl[1].classList.remove('none')
            dpicEl[1].src = "image/card-" + kindOftype + num + ".png"
        }, 1000)
    } else if (dcards.length === 3) {
        setTimeout(() => {
            dpicEl[2].classList.remove('none')
            dpicEl[2].src = "image/card-" + kindOftype + num + ".png"
        }, 1500)
    } else if (dcards.length === 4) {
        setTimeout(() => {
            dpicEl[3].classList.remove('none')
            dpicEl[3].src = "image/card-" + kindOftype + num + ".png"
        }, 2000)
    } else if (dcards.length === 5) {
        setTimeout(() => {
            dpicEl[4].classList.remove('none')
            dpicEl[4].src = "image/card-" + kindOftype + num + ".png"
        }, 2500)
    }
    setTimeout(() => {
        comparison()
    }, 2500)
}

// check final result
function comparison() {
    dsumEl.classList.remove('none')
    dsumEl.textContent = "Sum: " + dsum
    setTimeout(() =>{
        if (dealerdrawCard === true && dealernodrawCard === true) {
            message = "You win!"
        } else if (dealerdrawCard === true && tie === true) {
            message = "Tie"
        } else if (dealerdrawCard === true && dealernodrawCard === false) {
            message = "You lose"
        } else if (dealerdrawCard === false) {
            message = "You win!"
        } else if (lose1 = false && dealerdrawCard === true) {
            message = "You Lose"
        }
        resultEl.textContent = message
    }, 1000)
    standEl.classList.add('none')
}
console.log(psum)
console.log(newpsum)
console.log(cards)
console.log(dsum)
console.log(dcards)
console.log(cards.includes(11))
