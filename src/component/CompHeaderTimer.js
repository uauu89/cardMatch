import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfinity, faRobot, faSpinner, faTrophy } from "@fortawesome/free-solid-svg-icons";
import timer from "../css/CompHeaderTimer.module.css";
import { useEffect, useState } from "react";

export default function CompHeaderTimer(props){
    const [intervalTimer, setIntervalTimer] = useState();

    function initClearTimeAll(){
        clearInterval(intervalTimer);
    }
    function changeOptTimeValue(){
        document.documentElement.style.setProperty("--turn_count", `${props.count}s`);
    }

    changeOptTimeValue();

    useEffect(()=>{

        document.querySelector("#timerDisplay").innerText = "";
        initClearTimeAll();

        function timer(){
            document.querySelector("#timerDisplay").innerText = props.count;
            let time = props.count;
            let timer = setInterval(()=>{
                time = time - 1;
                document.querySelector("#timerDisplay").innerText = time;
                if(time === 0){
                    clearInterval(timer);
                    props.setTimeout(true);
                    props.setPlay(false);
                }
            }, 1000)
            setIntervalTimer(timer);
        }

        if(!props.noCount && !props.gameOver && props.play){
            if(props.whosTurn === "single" || props.whosTurn === "user"){
                timer();
            }
        }
    }, [props.play])

    let condition1 = props.whosTurn === "single" || props.whosTurn === "user",
        condition2 = props.play,
        condition3 = props.noCount === false,
        condition4 = props.gameOver === false;

    let timerTrigger = condition1 && condition2 && condition3 && condition4;

    return(
        <div 
            className={`${timer.wrap} 
                        ${props.whosTurn === "single" ? 
                            timer.single : 
                            props.play && props.whosTurn === "user" ? 
                                timer.user : 
                                props.play && props.whosTurn === "com" ? 
                                    timer.com : "" 
                        } ${timerTrigger? timer.animation:""}`}>
            <div className={`${timer.clockHands} ${timer.half}`}></div>
            <div className={`${timer.clockHands} ${timer.full}`}></div>
            <div className={`${timer.clockHands} ${timer.cover}`}></div>
            <div id="timerDisplay" />
            <FontAwesomeIcon 
                className={timerTrigger ? timer.hidden: ""}
                icon={
                    props.gameOver? faTrophy :  
                        props.play && props.whosTurn === "com" ? 
                            faRobot: 
                            props.noCount? faInfinity : faSpinner
                }
            />
        </div>
    )
}