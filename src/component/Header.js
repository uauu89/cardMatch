import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faCaretDown, faRotateRight, faX } from "@fortawesome/free-solid-svg-icons";

import OptionModal from "./OptionModal";

import css from "../css/CommonStyle.module.css";
import header from "../css/Header.module.css";
import CompHeaderTimer from "./CompHeaderTimer";


export default function Header(props){

    const [openBtn, setOpenBtn] = useState(-1);
    // const [openModal, setOpenModal] = useState(-1);

    console.log("header render");

    return(
        <header className={header.wrap}>
            <div className={header.ui}>
                <div className={header.scoreWrap}>
                    {props.setting.mode==="single" ?
                    <>
                        <p>점수 : {props.score.user}</p>
                        <p>콤보 : {props.score.combo}</p>
                    </>:
                    <>
                        <p className={header.score}>유저 : {props.score.user}<small>콤보 : {props.score.combo}</small></p>
                        <p className={header.score}>컴퓨터 : {props.score.com}<small>콤보 : {props.score.comCombo}</small></p>
                    </>
                    }
                    
                </div>

                <CompHeaderTimer 
                    whosTurn={props.whosTurn}
                    // setWhosTurn={props.setWhosTurn}
                    count={props.setting.count}
                    noCount={props.setting.noCount}
                    setTimeout={props.setTimeout}
                    // playing={props.setting.newGame}
                    gameOver={props.gameOver}
                    play={props.play} setPlay={props.setPlay}
                />

                <a href="#optionModal"
                    className={header.btnOpenOption}
                    onClick={e=>{
                        e.preventDefault();
                        props.setOpenModal(props.openModal * -1);
                    }}
                >
                    {props.openModal > 0 ? 
                        <FontAwesomeIcon icon={faX} /> : 
                        <FontAwesomeIcon icon={faGear} className={header.iconGear}/>
                    }
                </a>
                <a href="#btnNewGame"
                    className={header.btnOpenNewGame}
                    onClick={e=>{
                        e.preventDefault();
                        setOpenBtn(openBtn * -1);
                    }}
                >
                    <FontAwesomeIcon icon={faCaretDown} className={`${header.icon} ${openBtn > 0? header.rotate: ""}`}/>
                </a>

            </div>

            <div id="btnNewGame" className={`${header.btnNewGameSection} ${openBtn > 0? header.active: ""}`}>
                <div className={css.btnNewGameWrap}>
                    <button 
                        type="button"
                        className={`${css.btnCommonStyle} ${css.btnNewGame} ${header.btnMargin} ${header.btnMarginTop}`}
                        onClick={()=>props.startNewGame("single")}
                    >
                        <FontAwesomeIcon icon={faRotateRight} className={`${css.iconRotate} ${css.iconSize16}`} />
                        새 게임<span className={css.verticalLine}/>혼자
                    </button>
                    <button
                        type="button"
                        className={`${css.btnCommonStyle} ${css.btnNewGame} ${header.btnMargin} ${header.btnMarginBottom}`}
                        onClick={()=>props.startNewGame("vs")}
                    >
                        <FontAwesomeIcon icon={faRotateRight} className={`${css.iconRotate} ${css.iconSize16}`} />
                        새 게임<span className={css.verticalLine}/>대전
                    </button>
                </div>
            </div>


            
            <OptionModal
                open = {props.openModal}
                startNewGame = {props.startNewGame}
            />

            
        </header>
    )
}
