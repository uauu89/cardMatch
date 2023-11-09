import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

import css from "../css/CommonStyle.module.css";
import over from "../css/GameOverNotice.module.css"


export default function GameOverNotice(props){
    return(
        <div className={`${over.wrap} ${props.gameOver? over.active: ""}`}>
            <div className={over.inner}>
                {props.mode==="" ? 
                    <p className={over.wordBreak}>새 게임 버튼으로 새로운 게임을 시작할 수 있습니다.</p> :
                    <>
                        {props.mode==="single" ?
                            <ComponentSingle scoreUser={props.score.user} /> :
                            <ComponentVs score={props.score} />}
                        <ComponentBtn startNewGame={props.startNewGame} />
                    </>
                }
            </div>
        </div>
    )
}


function ComponentSingle(props){
    return(
        <>
            <h2>게임 종료</h2>
            <p className={over.wordBreak}>최종점수 : {props.scoreUser}</p>
            <div>
                <p className={over.wordBreak}>게임이 끝났습니다.</p>
                <p className={over.wordBreak}>새 게임 버튼으로 새로운 게임을 시작할 수 있습니다.</p>
            </div>
        </>
    )
}

function ComponentVs(props){

    let resultWord = [];
    if(props.score.user > props.score.com){
        resultWord = ["승리", "승리했습니다"];
    }else if(props.score.user < props.score.com){
        resultWord = ["패배", "패배했습니다"];
    }else{
        resultWord = ["무승부", "비겼습니다"];
    }

    return(
        <>
            <h2>{resultWord[0]}</h2>
            <p className={over.wordBreak}>{props.score.user}점 : {props.score.com}점 으로 {resultWord[1]}.</p>
            <div>
                <p className={over.wordBreak}>게임이 끝났습니다.</p>
                <p className={over.wordBreak}>새 게임 버튼으로 새로운 게임을 시작할 수 있습니다.</p>
            </div>
        </>
    )
}


function ComponentBtn(props){
    return(
        <>
            <div className={`${css.btnNewGameWrap} ${css.justifyCenter}`}>
                <button
                    type="button"
                    className={`${css.btnCommonStyle} ${css.btnNewGame}`}
                    onClick={()=>props.startNewGame("single")}
                >
                    <FontAwesomeIcon icon={faRotateRight} className={`${css.iconRotate} ${css.iconSize16}`} />
                    새 게임<span className={css.verticalLine}/>혼자
                </button>
                <button
                    type="button"
                    className={`${css.btnCommonStyle} ${css.btnNewGame}`}
                    onClick={()=>props.startNewGame("vs")}
                >
                    <FontAwesomeIcon icon={faRotateRight} className={`${css.iconRotate} ${css.iconSize16}`} />
                    새 게임<span className={css.verticalLine}/>대전
                </button>
            </div>
        </>
    )
}