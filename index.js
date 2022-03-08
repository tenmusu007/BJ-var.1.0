"use strict"
let cards = []
let dcards =[]
let type = ["c","d","h","s"]
let hands = cards.length
let psum = 0
let dsum = 0
let number = 0
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
let dealerEl = document.getElementById("dealer-el")
let dsumEl = document.getElementById("dsum-el")
let playerEl = document.getElementById("player-el")
let resultEl = document.getElementById("result-el")
let psumEl = document.getElementById("psum-el")
let picEl = document.getElementById("pic-el")
let picEl1 = document.getElementById("pic-el1")
let picEl2 = document.getElementById("pic-el2")
let picEl3 = document.getElementById("pic-el3")
let picEl4 = document.getElementById("pic-el4")
let dpicEl = document.getElementById("dpic-el")
let dpicEl1 = document.getElementById("dpic-el1")
let dpicEl2 = document.getElementById("dpic-el2")
let dpicEl3 = document.getElementById("dpic-el3")
let dpicEl4 = document.getElementById("dpic-el4")
function startRule(){
    let ruleEl = document.getElementById('rule-el');
    ruleEl.classList.add('none');
    let standEl = document.getElementById('stand-btn');
    standEl.classList.add('none')
    let hitEl = document.getElementById('hit-btn');
    hitEl.classList.add('none')

}
function againRule(){
    let ruleEl = document.getElementById('rule-el');
    ruleEl.classList.remove('none');
}
function startCard(){
    let randomType = Math.floor(Math.random()*4 );
    let randomType2 = Math.floor(Math.random()*4 );
    let kindOftype= type[randomType];
    let kindOftype2= type[randomType2];
    picEl2.classList.add('none')
    picEl3.classList.add('none')
    picEl4.classList.add('none')
    let hitEl = document.getElementById('hit-btn');
    hitEl.classList.remove('none')
    let standEl = document.getElementById('stand-btn');
    standEl.classList.remove('none')
    message ="Do you want draw a card? tap 'Hit' "
    drawCard = true
    hasBlackJack = false
    let firstcard = getRandomCard()
    let secondcard = getRandomCard()
    picEl.src ="image/card-"+ kindOftype + firstcard + ".png"
    picEl1.src ="image/card-"+ kindOftype2 + secondcard + ".png"
    let firstcard1 = getNewcard(firstcard)
    let secondcard2 = getNewcard(secondcard)
    cards = [firstcard1, secondcard2]
    psum = firstcard1 + secondcard2
    resultEl.textContent = message
    renderGame()
}
// number will be confirmed more than 10 or not
function getNewcard(cardNumber){
    if(cardNumber>= 10){
        return 10
    }else if(cardNumber <= 10){
        return cardNumber
    }
}
function getRandomCard(){
    let randomNumber = Math.floor( Math.random()*13 ) +1
    return randomNumber
}
function renderGame(){
    playerEl.textContent = "Cards: "
    for(let i = 0; i < cards.length; i++){
        playerEl.textContent +=cards[i] + " "
    }
    psumEl.textContent = "Sum: " + psum
    goresult()
}
function goresult(){
    hasBlackJack = false
    drawCard = false
    nodrawCard = true
    if(psum === 21){
        hasBlackJack = true
        message = "You've got Black Jack"
    }else if(psum > 21){
        nodrawCard = false
        message = "You Bust"
        let standEl = document.getElementById('stand-btn');
        standEl.classList.add('none')
        let hitEl = document.getElementById('hit-btn');
        hitEl.classList.add('none')
    }else if (psum < 21){
        drawCard = true
    }
}
function newCard(){
    if(drawCard === true && hasBlackJack === false){
        let card = getRandomCard()
        let card1 = getNewcard(card)
        psum += card1
        cards.push(card1)
        insertPic(card)
        message = "Do you want draw a card?"
    }else if(nodrawCard === true && drawCard === true){
        message = "Click start again"
    }
    resultEl.textContent = message
}
// card arrey からとってきてるから写真と数字が連動してる
function insertPic (num){
    let randomType = Math.floor(Math.random()*4 );
    let kindOftype= type[randomType];
    if(cards.length === 3){
        picEl2.classList.remove('none')
        picEl2.src ="image/card-" + kindOftype + num + ".png"
        renderGame()
    }else if(cards.length === 4){
        picEl3.classList.remove('none')
        picEl3.src ="image/card-" + kindOftype + num  + ".png"
        renderGame()
    }else if(cards.length === 5){
        picEl4.classList.remove('none')
        picEl4.src ="image/card-"+ kindOftype  + num  + ".png"
        renderGame()
    }

}
// dealer zone 

function dealerStart(){
    let randomType3 = Math.floor(Math.random()*4 );
    let kindOftype3= type[randomType3];
    dealerdrawCard = true
    dealernodrawCard = false
    tie = false
    dpicEl1.classList.add('none')
    dpicEl2.classList.add('none')
    dpicEl3.classList.add('none')
    dpicEl4.classList.add('none')
    let dealercard1 = getRandomDealerCard()
    dpicEl.src ="image/card-"+ kindOftype3 + dealercard1 + ".png"
    let dealerCrad = getNewcard(dealercard1)
    dcards = [dealerCrad]
    dsum = dealerCrad
    godealaer()
}
function getRandomDealerCard() {
    let randomNumber = Math.floor( Math.random()*13 )+ 1
        return randomNumber
}
function godealaer(){
    dealerEl.textContent = "Cards: "
    for(let i  =0; i < dcards.length; i ++){
        dealerEl.textContent +=dcards[i] + " "
    }
    dsumEl.textContent = "Sum: " + dsum
}
function skipCard() {
    let hitEl = document.getElementById('hit-btn');
    hitEl.classList.add('none')
    message ="tap 'stand' until the result"
    dealerdrawCard = true
    dealernodrawCard = false
    tie = false
    win = false
    lose = true
    lose1 = true
    if(dsum < 17){
        let dcard = getRandomDealerCard()
        let dcard1 = getNewcard(dcard)
        dsum += dcard1
        dcards.push(dcard1)
        insertPic1(dcard)
        
        godealaer()
    }else if(dsum > 21){
        dealernodrawCard = true
        comparison()
    }else if(dsum === psum){
        tie = true
        comparison()
    }else if (dsum < psum){
        dealerdrawCard = false
        comparison()
    }else if (dsum > psum){
        lose1 = false
        comparison()
    }
    resultEl.textContent = message
}
// isertpic 
function insertPic1 (num){
    let randomType = Math.floor(Math.random()*4 );
    let kindOftype= type[randomType];
    if(dcards.length === 2){
        dpicEl1.classList.remove('none')
        dpicEl1.src ="image/card-" + kindOftype + num + ".png"
        renderGame()
    }else if(dcards.length === 3){
        dpicEl2.classList.remove('none')
        dpicEl2.src ="image/card-" + kindOftype + num  + ".png"
        renderGame()
    }else if(dcards.length === 4){
        dpicEl3.classList.remove('none')
        dpicEl3.src ="image/card-"+ kindOftype  + num  + ".png"
        renderGame()
    }else if(dcards.length === 5){
        dpicEl4.classList.remove('none')
        dpicEl4.src ="image/card-"+ kindOftype  + num  + ".png"
        renderGame()
    }
}
function comparison(){
    if(dealerdrawCard === true && dealernodrawCard === true){
        message = "You win!"
    }else if(dealerdrawCard === true && tie === true){
        message = "Tie"
    }else if(dealerdrawCard === true && dealernodrawCard === false){
        message ="You lose"
    }else if(dealerdrawCard === false ){
        message = "You win!"
    }else if(lose1 = false && dealerdrawCard === true ){
        message = "You Lose"
    }
    resultEl.textContent = message
    let standEl = document.getElementById('stand-btn');
        standEl.classList.add('none')
}