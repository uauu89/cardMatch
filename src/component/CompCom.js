import { useEffect, useState } from "react";




export default function CompCom(props){


    const [testNotice, setTestNotice] = useState("");
    const [testNoticeRandom, setTestNoticeRandom] = useState("");

    function dice(){
        return Math.floor(Math.random()*100);
    }




        /*

        props.comAlgorithm

        props.setting.remains
        props.setting.opend
        props.setting.notOpen
        props.setting.select

        props.setting.pair
        */

    function comTurn(){
        setTestNoticeRandom("")
        let comIdx;
        
        let conditionSelect = props.comAlgorithm < props.setting.select,
            conditionPair = props.comAlgorithm < props.setting.pair;

        if(props.cardArraySelected.length){         // 1. 이미 선택한 카드가 있는 경우
            if(conditionSelect){
                comIdx = comIdxSelected();              // 1-1. 선택한 카드의 짝의 위치를 아는 경우
                
                if(!comIdx){
                    setTestNotice("1-2")
                    comIdx = comIdxRandomProcess();     // 1-2. 선택한 카드의 짝의 위치를 모르는 경우
                }else{
                    setTestNotice("1-1")
                }
            }else{
                setTestNotice("1-3")
                comIdx = comIdxRandomProcess();         // 1-3. 옵션에서 설정한 1-1 확률을 충족하지 못한 경우
            }
        }else{                                      // 2. 선택한 카드가 없는 경우 ( 첫 선택인 경우 )
            if(conditionPair){                      
                comIdx = comIdxPair();                  // 2-1. 짝이 맞는 카드의 위치를 아는 경우
                if(!comIdx){        
                    setTestNotice("2-2")
                    comIdx = comIdxRandomProcess();     // 2-2. 짝이 맞는 카드의 위치를 모르는 경우
                }else{
                    setTestNotice("2-1")
                }
            }else{                                      // 2-3. 옵션에서 설정한 2-1 확률을 충족하지 못한 경우
                setTestNotice("2-3")
                comIdx = comIdxRandomProcess();
            }
            
        }
        
        let dom = document.querySelectorAll("[class*=Card_wrap]")[comIdx];
        let num = props.cardArrayDefault[comIdx];
        setTimeout(()=>{
            props.pushOpenCard(dom, comIdx, num);
        }, 2000)
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
        let rerollAlgorith = dice();
        let opendRatio = props.cardArrayOpend.filter(i=>i!==null).length / props.cardArrayDefault.length * 100;

        let conditionRemains = opendRatio <= props.setting.remains,        
            conditionOpend = rerollAlgorith < props.setting.opend,
            conditionNotOpen = rerollAlgorith < props.setting.notOpen;

        if(conditionRemains || conditionOpend){     // 열어본 카드를 다시 선택할 확률
            idx = comIdxRandomOpend();
            setTestNoticeRandom("opend")
        }else if(conditionNotOpen){                 // 열어보지 않은 카드 중에서 선택할 확률 
            idx = comIdxRandomNotOpen();
            setTestNoticeRandom("notOpen")
        }else{                                      // 전체 카드에서 랜덤 선택
            idx = comIdxRandomCompletely();
            setTestNoticeRandom("completely")
        }
        if(!idx){
            idx = comIdxRandomCompletely();         // 열어본 카드 또는 열어보지 않은 카드가 없는 경우 전체 랜덤
            setTestNoticeRandom("return false")
        }

        return idx;
    }
    function comIdxRandomOpend(){
        let idx = false;

        let array = props.cardArrayOpend.filter(i => i !== null);
        
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
        // let diceroll = dice();
        let array = props.cardArrayCorrect.filter(i => i !== 0);
        let idx = false;
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
 
    
    return(
        <div>
            <p>percentage = {props.comAlgorithm}</p>
            <p>algorithm case = {testNotice}</p>
            <p>randomCase = {testNoticeRandom}</p>
        </div>
    )
}