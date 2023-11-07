import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

import css from "../css/CommonStyle.module.css";
import over from "../css/GameOverNotice.module.css"


export default function GameOverNotice(props){
    return(
        <div className={`${over.wrap} ${props.gameOver? over.active: ""}`}>
            <div className={over.inner}>
                {props.mode==="" ? 
                    <p>새 게임 버튼으로 새로운 게임을 시작할 수 있습니다.</p> :
                    <>
                        {props.mode==="single" ?
                            <ComponentSingle scoreUser={props.score.user} /> :
                            <ComponentVs score={props.score} />}
                        <ComponentBtn />
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
            <p>최종점수 : {props.scoreUser}</p>
            <div>
                <p>게임이 끝났습니다.</p>
                <p>새 게임 버튼으로 새로운 게임을 시작할 수 있습니다.</p>
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
            <p>{props.score.user}점 : {props.score.com}점으로 {resultWord[1]}.</p>
            <div>
                <p>게임이 끝났습니다.</p>
                <p>새 게임 버튼으로 새로운 게임을 시작할 수 있습니다.</p>
            </div>
        </>
    )
}


function ComponentBtn(){
    return(
        <>
            <div className={`${css.btnNewGameWrap} ${css.justifyCenter}`}>
                <button type="button" className={`${css.btnCommonStyle} ${css.btnNewGame}`}>
                    <FontAwesomeIcon icon={faRotateRight} className={css.iconSize16} />
                    새 게임<span className={css.verticalLine}/>혼자
                </button>
                <button type="button" className={`${css.btnCommonStyle} ${css.btnNewGame}`}>
                    <FontAwesomeIcon icon={faRotateRight} className={css.iconSize16} />
                    새 게임<span className={css.verticalLine}/>대전
                </button>
            </div>
        </>
    )
}