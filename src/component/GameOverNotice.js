import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

import css from "../css/CommonStyle.module.css";
import over from "../css/GameOverNotice.module.css"


export default function GameOverNotice(props){
/*
    let score_com, score_user

    let result = [];
    if(score_com > score_user){
        result = ["패배", "패배했습니다"];
    }else if(score_com < score_user){
        result = ["승리", "승리했습니다"];
    }else{
        result = ["무승부", "비겼습니다"];
    }
*/
    /*
    document.querySelector(".gameOver_inner").innerHTML = `
        <h2>${result[0]}</h2>
        <p>${score_user}점 : ${score_com}점으로 ${result[1]}.</p>
        <div>
            <p>게임이 끝났습니다.</p>
            <p>새 게임 버튼으로 새로운 게임을 시작할 수 있습니다.</p>
        </div>
    `
*/


    return(
        <div className={`${over.wrap} ${props.gameOver? over.active: ""}`}>
            <div className={over.inner}>
                {props.mode==="" ? 
                    <p>새 게임 버튼으로 새로운 게임을 시작할 수 있습니다.</p>:
                    props.mode==="single" ?
                    <>
                        <h2>게임 종료</h2>
                        <p>최종점수 : {props.score.user}</p>
                        <div>
                            <p>게임이 끝났습니다.</p>
                            <p>새 게임 버튼으로 새로운 게임을 시작할 수 있습니다.</p>
                        </div>

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
                    </> : ""
                }
            </div>
        </div>
    )
}
