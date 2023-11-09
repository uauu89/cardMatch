import { useEffect, useState } from "react";
import card from "../css/Card.module.css"

export default function Card(props){
    const [data, setData] = useState({
        idx : props.idx,
        num : props.num,
        cardLength : props.cardLength,
        mode : props.mode,
        checkCard : props.checkCard
    });

    useEffect(()=>{
        let thisCard = document.querySelectorAll("div[class*=Card_wrap]")[data.idx];

        function cardSettingAnimation(){
            setTimeout(()=>{thisCard.classList.remove("init")}, data.idx * 50);
            setTimeout(()=>{thisCard.classList.add("initAnimation")}, (data.idx+1)*50);
            setTimeout(()=>{thisCard.classList.remove("initAnimation")}, (data.idx+1)*50+300);
        }
        function cardCheckAnimation(){
            let removeTime = (data.cardLength * 200) + 3000 + data.idx * 200;
            // 모든 카드 오픈 시간 + 확인 3초 + 차례대로 뒤집는 시간
            if(data.mode==="single" && data.checkCard){
                setTimeout(()=>{
                    setTimeout(()=>{thisCard.classList.add("openCard")}, data.idx * 200)
                    setTimeout(()=>{thisCard.classList.remove("openCard")}, removeTime)
                } ,data.cardLength*50+300);    
            }
        }
        cardSettingAnimation();
        cardCheckAnimation();
    }, [data])

    return(
        <div className={`${card.wrap} init`}
            onClick={e=>props.selectCard(e.currentTarget, props.idx, props.num)}
        >
            <div className={`${card.card} ${card.front}`}>
                <div className={`${card.deco} ${card.border} ${card.top} ${card.left}`} />
                <div className={`${card.deco} ${card.border} ${card.top} ${card.right}`} />
                <div className={`${card.deco} ${card.border} ${card.bottom} ${card.left}`} />
                <div className={`${card.deco} ${card.border} ${card.bottom} ${card.right}`} />
                <div className={`${card.deco} ${card.top} ${card.left}`} />
                <div className={`${card.deco} ${card.top} ${card.right}`} />
                <div className={`${card.deco} ${card.bottom} ${card.left}`} />
                <div className={`${card.deco} ${card.bottom} ${card.right}`} />
                {props.num}
            </div>
            <div className={`${card.card} ${card.back}`}>
                <div className={`${card.deco} ${card.border} ${card.top} ${card.left}`} />
                <div className={`${card.deco} ${card.border} ${card.top} ${card.right}`} />
                <div className={`${card.deco} ${card.border} ${card.bottom} ${card.left}`} />
                <div className={`${card.deco} ${card.border} ${card.bottom} ${card.right}`} />
                <div className={`${card.deco} ${card.top} ${card.left}`} />
                <div className={`${card.deco} ${card.top} ${card.right}`} />
                <div className={`${card.deco} ${card.bottom} ${card.left} `} />
                <div className={`${card.deco} ${card.bottom} ${card.right}`} />
            </div>
        </div>
    )
}

