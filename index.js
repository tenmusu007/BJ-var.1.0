"use strict"
let cards = [1,2,3,4,5,6,7,8,9,10,11,12,13]
let dcards =[]
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
    let hitEl = document.getElementById('hit-btn');
    hitEl.classList.remove('none')
    let standEl = document.getElementById('stand-btn');
    standEl.classList.remove('none')
    message ="Do you want draw a card? tap 'Hit' "
    drawCard = true
    hasBlackJack = false
    let firstcard = getRandomCard()
    let secondcard = getRandomCard()
    cards = [firstcard, secondcard]
    picEl.src ="image/club/card-c" + firstcard + ".png"
    picEl1.src ="image/club/card-c" + secondcard + ".png"
    psum = firstcard + secondcard
    if (psum === 21){
        message = "You've got Black Jack"
    }
    resultEl.textContent = message
    renderGame()
}
function getRandomCard(){
    let randomNumber = cards[ Math.floor( Math.random()*cards.length)]
    if (randomNumber > 10){
        return 10
    }else{
        return randomNumber
    } 
    
}
// function picsystem(){
//     let cardNumber = randomNumber
//     picEl2.src ="image/club/card-c" + cardNumber  + ".png"
// }
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
        psum += card
        cards.push(card)
        message = "Do you want draw a card?"
        picEl2.src ="image/club/card-c" + card  + ".png"
        renderGame()
    }else if(nodrawCard === true && drawCard === true){
        message = "Click start again"
    }
    resultEl.textContent = message
}
function dealerStart(){
    dealerdrawCard = true
    dealernodrawCard = false
    tie = false
    let dealercard1 = getRandomDealerCard()
    dcards = [dealercard1]
    dsum = dealercard1
    godealaer()
}
function getRandomDealerCard() {
    let randomNumber = Math.floor( Math.random()*13 )+ 1
    if (randomNumber >10 ){
        return 10
    } else{
        return randomNumber
    } 
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
        dsum += dcard
        dcards.push(dcard)
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