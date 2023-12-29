import { useEffect } from "react";

export default function CompCom(props){

    function dice(){
        return Math.floor(Math.random()*100);
    }

    function comTurn(){
                let comIdx;
        
        let conditionSelect = props.comAlgorithm < props.setting.select,
            conditionPair = props.comAlgorithm < props.setting.pair;

        if(props.cardArraySelected.length){         // 1. 이미 선택한 카드가 있는 경우
            if(conditionSelect){
                comIdx = comIdxSelected();              // 1-1. 선택한 카드의 짝의 위치를 아는 경우
                if(!comIdx){
                    comIdx = comIdxRandomProcess();     // 1-2. 선택한 카드의 짝의 위치를 모르는 경우
                }
            }else{
                comIdx = comIdxRandomProcess();         // 1-3. 옵션에서 설정한 1-1 확률을 충족하지 못한 경우
            }
        }else{                                      // 2. 선택한 카드가 없는 경우 ( 첫 선택인 경우 )
            if(conditionPair){                      
                comIdx = comIdxPair();                  // 2-1. 짝이 맞는 카드의 위치를 아는 경우
                if(!comIdx){        
                    comIdx = comIdxRandomProcess();     // 2-2. 짝이 맞는 카드의 위치를 모르는 경우
                }
            }else{                                      // 2-3. 옵션에서 설정한 2-1 확률을 충족하지 못한 경우
                comIdx = comIdxRandomProcess();
            }
        }
        
        
        let dom = document.querySelectorAll("[class*=Card_wrap]")[comIdx];
        let num = props.cardArrayDefault[comIdx];
        let timerComTurn = setTimeout(()=>{
            props.pushOpenCard(dom, comIdx, num);
            clearTimeout(timerComTurn);
        }, 500)
    }

    function comIdxSelected(){
        let idx = false;
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
    }
    function comIdxPair(){
        let idx = false;
        let range = props.cardArrayDefault.length / 2, 
            count = 0;
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
    function comIdxRandomProcess(){
        let idx;
        let rerollAlgorithm = dice();
        let opendRatio = props.cardArrayOpend.filter(i=>i!==null).length / props.cardArrayDefault.length * 100;
        
        let conditionRemains = opendRatio <= props.setting.remains,        
            conditionOpend = rerollAlgorithm < props.setting.opend,
            conditionNotOpen = rerollAlgorithm < props.setting.notOpen;
        
        if(conditionRemains || conditionOpend){     // 열어본 카드를 다시 선택할 확률
            idx = comIdxRandomOpend();
        }else if(conditionNotOpen){                 // 열어보지 않은 카드 중에서 선택할 확률 
            idx = comIdxRandomNotOpen();
        }else{                                      // 전체 카드에서 랜덤 선택
            idx = comIdxRandomCompletely();
        }

        if(!idx){
            idx = comIdxRandomCompletely();         // 열어본 카드 또는 열어보지 않은 카드가 없는 경우 전체 랜덤
        }

        return idx;
    }
    function comIdxRandomOpend(){
        let idx = false;
        let array = document.querySelectorAll(".opend:not(.openCard):not(correct)");
        if(array.length){
            while(true){
                idx = Math.floor(Math.random() * props.cardArrayDefault.length);

                let condition1 = props.cardArrayOpend[idx] !== null,
                    condition2 = props.cardArrayOpend[idx] !== 0,
                    condition3 = !document.querySelectorAll("[class*=Card_wrap]")[idx].classList.contains("openCard");
                if(condition1 && condition2 && condition3){
                    break;
                }
            }
        }
        return idx;
    }
    function comIdxRandomNotOpen(){

        let idx = false;
        let array = props.cardArrayOpend.filter(i => i === null);

        if(array.length){
            while(true){
                idx = Math.floor(Math.random() * props.cardArrayDefault.length);
                let condition1 = props.cardArrayOpend[idx] === null;

                if(condition1){
                    break;
                }
            }
        }
        return idx;
    }
    function comIdxRandomCompletely(){
        let idx = false;
        while(true){
            idx = Math.floor(Math.random() * props.cardArrayDefault.length);
            
            let condition1 = props.cardArrayCorrect[idx] !== 0,
                condition2 = !document.querySelectorAll("[class*=Card_wrap]")[idx].classList.contains("openCard");
            if(condition1 && condition2){
                break;
            }
        }
        return idx;
    }

    useEffect(()=>{
        if(props.whosTurn === "com" && props.play && !props.gameOver){
            comTurn();
            // console.log("compCom");
        }
    }, [props.turnCount, props.whosTurn, props.gameOver, props.play])
    
}