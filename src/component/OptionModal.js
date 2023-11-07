import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

import CompOptCardNum from "./CompOptCardNum";
import CompOptTime from "./CompOptTime";
import CompOptDifficultyDetails from "./CompOptDifficultyDetails";

import css from "../css/CommonStyle.module.css";
import modal from "../css/OptionModal.module.css";
import CompOptCardSize from "./CompOptCardSize";

export default function OptionModal(props){

    

    const [openDetail, setOpenDetail] = useState(-1);
    const [difficulty, setDifficulty] = useState({
        remains: 0, opend : 0, notOpen : 0, select : 0, pair : 0
    });
    
    useEffect(()=>{
        document.querySelector("#difficulty2").click();
    }, [])

    useEffect(()=>{
    }, [difficulty])


    console.log("optionmodal render")
    return(
        <div id="optionModal" className={`${modal.wrap} ${props.open > 0 ? modal.active: ""}`}>
            <h2>옵션</h2>
            <ul className={modal.depth}>
                <li>
                    <h3>공통 옵션</h3>
                    <ul className={`${modal.depth} ${modal.sub}`}>
                        <li className={modal.grid}>
                            <label htmlFor="inputCardNum">카드 범위</label>
                            <CompOptCardNum />
                        </li>

                        <li className={`${modal.grid} ${modal.template3}`}>
                            <label htmlFor="inputTimer">시간 제한</label>
                            <CompOptTime />
                        </li>
                        
                        <li className={`${modal.grid} ${modal.mobile}`}>
                            카드 크기
                            <CompOptCardSize />
                        </li>

                    </ul>
                </li>

                <li>
                    <h3>싱글 옵션</h3>
                    <ul className={`${modal.depth} ${modal.sub}`}>
                        <li className={modal.grid}>
                            <label htmlFor="inputCheckCard" className={`${modal.cursorPointer} ${modal.textNoWrap}`}>카드 확인 여부</label>
                            <div className={`${modal.checkboxWrap}`}>
                                <div className={`${modal.posRel} ${css.tabIndex}`} >
                                    <input type="checkbox" id="inputCheckCard" className={modal.inputHidden} />
                                    <label htmlFor="inputCheckCard" className={`${modal.checkboxStyle} ${modal.cursorPointer}`} />
                                </div>
                            </div>

                        </li>
                    </ul>
                </li>

                <li>
                    <h3>대전 옵션</h3>
                    <ul className={`${modal.depth} ${modal.sub}`}>
                        <li className={modal.grid}>
                            <label htmlFor="inputKeepTurn" className={`${modal.cursorPointer} ${modal.textNoWrap}`}>연속 선택 여부</label>
                            <div className={`${modal.checkboxWrap} ${modal.posRel} ${css.tabIndex}`}>
                                <input type="checkbox" id="inputKeepTurn" className={modal.inputHidden} />
                                <label htmlFor="inputKeepTurn" className={`${modal.checkboxStyle} ${modal.cursorPointer}`} />
                            </div>
                        </li>
                        <li className={`${modal.grid} ${modal.mobile}`}>
                            난이도
                            <ul className={modal.btnWrap}>
                                <li className={css.tabIndex}>
                                    <input type="radio" name="difficulty" id="difficulty1" 
                                        className={modal.inputHidden}
                                        onChange={()=>{
                                            setDifficulty({
                                                remains: 0,
                                                opend : 0,
                                                notOpen : 0,
                                                select : 0,
                                                pair : 0
                                            })
                                        }}
                                    />
                                    <label htmlFor="difficulty1" className={css.btnCommonStyle}>1단계</label>
                                </li>
                                <li className={css.tabIndex}>
                                    <input type="radio" name="difficulty" id="difficulty2"
                                        className={modal.inputHidden}
                                        onChange={()=>{
                                            setDifficulty({
                                                remains: 0,
                                                opend : 0,
                                                notOpen : 100,
                                                select : 40,
                                                pair : 30
                                            })
                                        }}
                                    />
                                    <label htmlFor="difficulty2" className={css.btnCommonStyle}>2단계</label>
                                </li>
                                <li className={css.tabIndex}>
                                    <input type="radio" name="difficulty" id="difficulty3"
                                        className={modal.inputHidden}
                                        onChange={()=>{
                                            setDifficulty({
                                                remains: 0,
                                                opend : 0,
                                                notOpen : 100,
                                                select : 80,
                                                pair : 70
                                            })
                                        }}
                                    />
                                    <label htmlFor="difficulty3" className={css.btnCommonStyle}>3단계</label>
                                </li>
                                <li className={css.tabIndex}>
                                    <input type="radio" name="difficulty" id="difficulty4"
                                        className={modal.inputHidden}
                                        onChange={()=>{
                                            setDifficulty({
                                                remains: 10,
                                                opend : 50,
                                                notOpen : 100,
                                                select : 100,
                                                pair : 100
                                            })
                                        }}
                                    />
                                    <label htmlFor="difficulty4" className={css.btnCommonStyle}>4단계</label>
                                </li>
                            </ul>
                        </li>
                        <li className={modal.depthDetail}>
                            <div>
                                <a href="#option_difficultyDetail" 
                                    onClick={e=>{
                                        e.preventDefault();
                                        setOpenDetail(openDetail * -1);
                                    }}
                                >
                                    난이도 세부 내용
                                    <FontAwesomeIcon icon={faCaretDown} className={`${modal.icon} ${openDetail > 0? modal.rotate: ""}`}/>
                                </a>
                            </div>
                            <div className={`${modal.detailWrap} ${openDetail > 0 ? modal.active: ""}`}>
                                <ul className={modal.depth} id="optionDifficultyDetail">
                                    <li>
                                        <p>남은 카드 비율  ※열어본 카드비율이 설정값 이하일 경우 열어 본 카드 선택 </p>
                                        <CompOptDifficultyDetails id="remains" data={difficulty.remains} />
                                    </li>
                                    <li>
                                        <p>임의선택 : 이미 열어 본 카드를 다시 선택할 확률</p>
                                        <CompOptDifficultyDetails id="opend" data={difficulty.opend} />
                                    </li>
                                    <li>
                                        <p>임의선택 : 열어보지 않은 카드를 선택할 확률</p>
                                        <CompOptDifficultyDetails id="notOpen" data={difficulty.notOpen} />
                                    </li>
                                    <li>
                                        <p>확정선택 : 현재 선택한 카드와 맞는 카드를 선택할 확률</p>
                                        <CompOptDifficultyDetails id="select" data={difficulty.select} />
                                    </li>
                                    <li>
                                        <p>확정선택 : 이미 열어 본 카드 중 짝이 맞는 카드를 선택할 확률</p>
                                        <CompOptDifficultyDetails id="pair" data={difficulty.pair} />
                                    </li>

                                </ul>
                            </div>

                        </li>
                    </ul>
                </li>
            </ul>
            <div className={modal.btnNewGameSection}>
                <p>※ 카드 크기를 제외한 변경된 옵션은 다음 게임부터 적용됩니다.</p>
                <div className={`${css.btnNewGameWrap} ${css.justifyEnd}`}>
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

        </div>
    )
}