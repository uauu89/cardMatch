import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faCaretDown, faInfinity, faRotateRight, faX } from "@fortawesome/free-solid-svg-icons";

import OptionModal from "./OptionModal";

import css from "../css/CommonStyle.module.css";
import header from "../css/Header.module.css";


export default function Header(props){

    const [openBtn, setOpenBtn] = useState(-1);
    const [openModal, setOpenModal] = useState(-1);

    console.log("header render");

    return(
        <header className={header.wrap}>
            <div className={header.ui}>
                <div className={header.scoreWrap}>
                    <p className={header.score_user}>유저 : <span></span></p>
                    <p className={header.score_com}>컴퓨터 : <span></span></p>
                </div>

                <div className={header.timerWrap}>
                    <div className={`${header.clockHands} ${header.half}`}></div>
                    <div className={`${header.clockHands} ${header.full}`}></div>
                    <div className={`${header.clockHands} ${header.cover}`}></div>
                    <div className={header.clockNum}>
                        <FontAwesomeIcon icon={faInfinity} />
                    </div>
                </div>

                <a href="#optionModal"
                    className={header.btnOpenOption}
                    onClick={e=>{
                        e.preventDefault();
                        setOpenModal(openModal * -1);
                    }}
                >
                    {openModal > 0 ? 
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
                    <button type="button" className={`${css.btnCommonStyle} ${css.btnNewGame}`}>
                        <FontAwesomeIcon icon={faRotateRight} className={css.iconSize16} />
                        새 게임<span className={css.verticalLine}/>혼자
                    </button>
                    <button type="button" className={`${css.btnCommonStyle} ${css.btnNewGame}`}>
                        <FontAwesomeIcon icon={faRotateRight} className={css.iconSize16} />
                        새 게임<span className={css.verticalLine}/>대전
                    </button>
                </div>
            </div>


            
            <OptionModal 
                open={openModal}
                setCardSizeRatio={props.setCardSizeRatio}
            />

            
        </header>
    )
}
