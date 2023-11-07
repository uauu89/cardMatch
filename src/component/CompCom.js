import { useEffect } from "react";




export default function CompCom(props){


    function dice(){
        return Math.floor(Math.random()*100);
    }






    function comTurn(){
        // let comIdx = comSelectRandomCompletely();
        // let comIdx = comSelectRandomNotOpen();
        let comIdx = comIdxSelected();

        let dom = document.querySelectorAll("[class*=Card_wrap]")[comIdx];
        let num = props.cardArrayDefault[comIdx];
        setTimeout(()=>{
            props.pushOpenCard(dom, comIdx, num);
        }, 500)
        /*
        if(이미 선택한 카드가 있는 경우){
            if(선택한 카드와 짝이 맞는 카드의 위치를 아는 경우){

            }else{ 선택한 카드와 짝이 맞는 카드의 위치를 모르는 경우

            }

        }else{ 선택한 카드가 없는 경우 (첫 선택인 경우)
            if(짝이 맞는 카드가 이미 공개되어있는 경우){

            }else{ 랜덤선택

            }
        }
        
        */
    }


    function comIdxSelected(){

        let idx = comSelectRandomNotOpen();

        let selected = props.cardArraySelected[0];
        if(selected){
            let dom = document.querySelectorAll("[class*=Card_wrap]");
    
            let firstIndex = props.cardArrayOpend.indexOf(selected),
                lastIndex = props.cardArrayOpend.lastIndexOf(selected);

            let condition1 = firstIndex !== lastIndex;

            if(condition1){
                idx = dom[firstIndex].classList.contains("openCard")? lastIndex: firstIndex;
            }
        }

        return idx;



        // return dom[firstIndex].classList.contains("openCard")? lastIndex: firstIndex;
    }

    function comIdxPair(){
        let idx;
        let range = props.cardArrayDefault.length / 2, 
            count = 0;
        let firstIndex, lastIndex;

        while(count < range){
            count++;
            let firstIndex = props.cardArrayOpend.indexOf(count),
                lastIndex = props.cardArrayOpend.lastIndexOf(count);

            let condition1 = firstIndex !== -1,
                condition2 = firstIndex !== lastIndex;

            if(condition1 && condition2){
                idx = firstIndex;
                break;
            }
        }
        return idx;
    }



    function comSelectRandomNotOpen(){

        let idx;
        let array = props.cardArrayOpend.filter(i=>i===null);

        if(array.length){
            while(true){
                idx = Math.floor(Math.random() * props.cardArrayDefault.length);
                let condition1 = props.cardArrayOpend[idx] === null;

                if(condition1){
                    break;
                }
            }
        }else{
            idx = comSelectRandomCompletely();
        }
        return idx;
    }

    function comSelectRandomCompletely(){
        let diceroll = dice();
        // let targetArray = cardArrayCorrect;
        let array = props.cardArrayCorrect.filter(i => i !== 0);
        let idx; 
        if(array.length){
            while(true){
                idx = Math.floor(Math.random() * props.cardArrayDefault.length);
                
                let condition1 = props.cardArrayCorrect[idx] !== 0,
                    condition2 = !document.querySelectorAll("[class*=Card_wrap]")[idx].classList.contains("openCard");
                if(condition1 && condition2){
                    break;
                }
            }
        }
        return idx;

    /*
        let opendRatio = (document.querySelectorAll(".opend").length + document.querySelectorAll(".correct").length) / cardArrayCopy.length * 100;
        
        if((difficulty.Remains !== 0 && difficulty.Remains > opendRatio) || diceResult < difficulty.Opend){
            targetArray = document.querySelectorAll(".opend:not(.card_open)");
            if(targetArray.length === 0){       //오픈했던 카드가 존재하지 않는 경우 미오픈 카드를 선택
                targetArray = document.querySelectorAll(".card_wrap:not(.correct):not(.card_open):not(.opend)");
            }
        }else if(diceResult < difficulty.NotOpen){
            targetArray = document.querySelectorAll(".card_wrap:not(.correct):not(.card_open):not(.opend)");
        }else{
            targetArray = document.querySelectorAll(".card_wrap:not(.correct):not(.card_open)");
        }
    
        if(targetArray.length === 0){
            targetArray = document.querySelectorAll(".card_wrap:not(.correct):not(.card_open)");
            // 미오픈 카드가 최종적으로 존재하지 않을 경우 카드 전체에서 랜덤선택
            // notOpen 조건에 not:(.opend) 가 있어서 선택되지 않는 경우
        }
        let selectedIdx = targetArray[Math.floor(Math.random()*targetArray.length)].dataset.index;
        return selectedIdx;
        */
    }


    useEffect(()=>{
        if(props.whosTurn === "com" && props.play && !props.gameOver){
            comTurn();
        }
    }, [props.turnCount, props.whosTurn, props.gameOver])
    
}