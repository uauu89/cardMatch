let cardArray, openCard, cardArrayCopy;
let userDelay = false;


document.querySelector("#newGame").addEventListener("click", e=>{
    init();
})

function init(){
    setCardArray();
    cardShuffleSimple(cardArrayCopy);
    insertCard(cardArrayCopy);
    
    cardCheck();


    turn_user();

}

    function setCardArray(){
        cardArray = [];
        let i = 0;
        while(i < document.querySelector("#inputNum").value){
            cardArray.push(i+1)
            i++;
        }

        cardArrayCopy = [...cardArray, ...cardArray];
        openCard = "x".repeat(cardArray.length*2).split("");
    }

    function cardShuffleSimple(array){
        array.sort(()=>Math.random() - 0.5);
    }

    function insertCard(array){
        let dom_insertHTML = "";
        array.forEach((i, idx)=>{
            dom_insertHTML += `
            <div class="card_wrap" data-value=${i} data-index=${idx}>
                <div class="card card_front">${i}</div>
                <div class="card card_back"></div>
            </div>`;
        });
        document.querySelector(".wrap").innerHTML = dom_insertHTML;
    }

    function cardCheck(){
        document.querySelectorAll(".card_wrap").forEach((card, idx)=>{
            setTimeout(() => {
                card.classList.add("card_open")
            }, idx*200);

            setTimeout(() => {
                card.classList.remove("card_open")
            }, idx*100+(cardArray.length*2*200)+3000);
        })
        setTimeout(()=>{userDelay = true}, (cardArray.length*2*300+3000));
    }


function gamePlay(){
    turn_user();
}

    function turn_user(){
        let userSelectedCard = [];
        document.querySelectorAll(".card_wrap").forEach((card, idx) => {

            card.addEventListener("click", e=>{

                if(userDelay && !card.classList.contains("card_open") && !card.classList.contains("correct")){
                    userDelay = false;

                    e.currentTarget.classList.add("card_open");
                    openCard[idx] = e.currentTarget.dataset.value;

                    userSelectedCard.push(e.currentTarget.dataset.value);

                    setTimeout(()=>{
                        userDelay = true;

                        if(userSelectedCard.length === 2){
                            if(userSelectedCard[0] === userSelectedCard[1]){
                                console.log("match success")
                                for(let i of document.querySelectorAll(".card_open")){
                                    i.setAttribute("class", "card_wrap correct user");
                                }
                            }else{
                                for(let i of document.querySelectorAll(".card_open")){
                                    i.classList.remove("card_open");
                                }
                            }
                            userSelectedCard = [];
                        }
                    }, 500);
                }
            })
        });
    }
    function turn_com(){
        // const getElCount = arr => arr.reduce((ac, v) => (
        //     { ...ac, [v]: (ac[v] || 0) + 1 }), {});
        
        // const array = ['A', 'B', 'C', 'D', 'A', 'A', 'C', 'E', 'D', 'E', 'A'];
        // const test = getElCount(array);
        // console.log(test);
    }


    function checkPair(){
        let checkArray = [];

        // document.querySelectorAll(".card_wrap:not(.correct)")
    }
    
/*
function cardShuffle(array){
    let cardArrayCopy = [...array, ...array];
    let cardArrayCount = cardArrayCopy.length;
    let cardArrayShuffle = [];

    for(let i = 0; i < array.length*2; i++){
        cardArrayShuffle.push(cardArrayCopy.splice([Math.floor(Math.random() * cardArrayCount)], 1)[0]);
        --cardArrayCount;
    }
    return cardArrayShuffle;
}
*/


let cardWrap = document.querySelectorAll(".card_wrap"),
    notice = document.querySelector(".notice span")
    

let checkCardNum = 2,
    selectedNum = [],
    score = 0;

notice.innerText = score;



// 인덱스 번호 구하기 위해 forEach로 바꾸기







/*
for(let i of cardWrap){
    i.addEventListener("click", (e)=>{
        // console.log(e.currentTarget.dataset.value);
        if(!e.currentTarget.classList.contains("card_open") && !e.currentTarget.classList.contains("correct") && checkCardNum < 2){
            i.classList.add("card_open");
            checkCardNum++;
            // console.log(e.currentTarget.dataset.value)
            selectedNum.push(e.currentTarget.dataset.value);
            console.log(selectedNum);
            if(checkCardNum == 2){
                setTimeout(()=>{
                    if(selectedNum[0] == selectedNum[1]){
                        for(let j of document.querySelectorAll(".card_open")){
                            j.setAttribute("class", "card_wrap correct");
                        }
                        score += 100
                    }else{
                        for(let j of cardWrap){
                            j.classList.remove("card_open");
                        }
                        score -= 10
                    }
                    checkCardNum = 0;
                    selectedNum = [];
                    notice.innerText = score;
                }, 800)
            }
        }
    })
}
*/