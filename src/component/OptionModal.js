import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faRotateRight } from "@fortawesome/free-solid-svg-icons";

import css from "../css/CommonStyle.module.css";
import modal from "../css/OptionModal.module.css";
import { useState, useEffect } from "react";
import CompInputRange from "./CompInputRange";
import CompTime from "./CompTime";
import CompCardNum from "./CompCardNum";

export default function OptionModal(props){

    const [openDetail, setOpenDetail] = useState(-1);
    const [difficulty, setDifficulty] = useState({
        remains: 0, opend : 0, notOpen : 0, select : 0, pair : 0
    });
    const [cardAutoSizing, setCardAutoSizing] = useState(1)

    useEffect(()=>{
        document.querySelector("#difficulty2").click();
        // document.querySelector("#cardSizeL").click();
        // document.querySelector("#input_autoSize").click();

        
        function option_cardAutoSizing(num){
            if(cardAutoSizing > 0){
                if(num < 459){
                    document.querySelector("#cardSizeS").click();
                }else if(num < 592){
                    document.querySelector("#cardSizeM").click();
                }else{
                    document.querySelector("#cardSizeL").click();
                }
            }
        }

        window.addEventListener("resize", e=>option_cardAutoSizing(window.innerWidth));

        return ()=>window.removeEventListener("resize", e=>option_cardAutoSizing(window.innerWidth));
        
    },[cardAutoSizing])

    console.log("optionmodal render")
    return(
        <div id="optionModal" className={`${modal.wrap} ${props.open > 0 ? modal.active: ""}`}>
            <h2>옵션</h2>
            <ul className={modal.depth}>
                <li>
                    <h3>공통 옵션</h3>
                    <ul className={`${modal.depth} ${modal.sub}`}>
                        <li className={modal.grid}>
                            <label htmlFor="input_cardNum">카드 범위</label>
                            <CompCardNum />
                        </li>

                        <li className={`${modal.grid} ${modal.template3}`}>
                            <label htmlFor="input_countTime">시간 제한</label>
                            <CompTime />
                        </li>
                        
                        <li className={`${modal.grid} ${modal.mobile}`}>
                            카드 크기
                            <ul className={modal.btnWrap}>
                                <li className={css.tabIndex}>
                                    <input type="radio" name="cardSize" id="cardSizeL"
                                        defaultChecked
                                        className={modal.inputHidden}
                                        onChange={()=>props.setCardSizeRatio(1)}
                                    />
                                    <label htmlFor="cardSizeL" className={css.btnCommonStyle}>대</label>
                                </li>
                                <li className={css.tabIndex}>
                                    <input type="radio" name="cardSize" id="cardSizeM"
                                        className={modal.inputHidden} 
                                        onChange={()=>props.setCardSizeRatio(0.8)}
                                    />
                                    <label htmlFor="cardSizeM" className={css.btnCommonStyle}>중</label>
                                </li>
                                <li className={css.tabIndex}>
                                    <input type="radio" name="cardSize" id="cardSizeS"
                                        className={modal.inputHidden}
                                        onChange={()=>props.setCardSizeRatio(0.6)}
                                    />
                                    <label htmlFor="cardSizeS" className={css.btnCommonStyle}>소</label>
                                </li>
                            </ul>
                            <div className={`${modal.checkboxWrap} ${modal.gridCol2}`}>
                                <label htmlFor="input_autoSize" className={modal.cursorPointer}>화면 크기에 따라 자동 변경</label>
                                <div className={`${modal.posRel} ${css.tabIndex}`} >
                                    <input type="checkbox" id="input_autoSize"
                                        className={modal.inputHidden}
                                        checked = {cardAutoSizing > 0 ? true: false}
                                        onChange={()=>setCardAutoSizing(cardAutoSizing * -1)}
                                    />
                                    <label htmlFor="input_autoSize" className={`${modal.checkboxStyle} ${modal.cursorPointer}`} />
                                </div>
                            </div>
                        </li>

                    </ul>
                </li>

                <li>
                    <h3>싱글 옵션</h3>
                    <ul className={`${modal.depth} ${modal.sub}`}>
                        <li className={modal.grid}>
                            <label htmlFor="input_noAnimation" className={`${modal.cursorPointer} ${modal.textNoWrap}`}>카드 확인 여부</label>
                            <div className={`${modal.checkboxWrap}`}>
                                <div className={`${modal.posRel} ${css.tabIndex}`} >
                                    <input type="checkbox" id="input_noAnimation" className={modal.inputHidden} defaultChecked />
                                    <label htmlFor="input_noAnimation" className={`${modal.checkboxStyle} ${modal.cursorPointer}`} />
                                </div>
                            </div>

                        </li>
                    </ul>
                </li>

                <li>
                    <h3>대전 옵션</h3>
                    <ul className={`${modal.depth} ${modal.sub}`}>
                        <li className={modal.grid}>
                            <label htmlFor="input_keepTurn" className={`${modal.cursorPointer} ${modal.textNoWrap}`}>연속 선택 여부</label>
                            <div className={`${modal.checkboxWrap} ${modal.posRel} ${css.tabIndex}`}>
                                <input type="checkbox" id="input_keepTurn" className={modal.inputHidden} />
                                <label htmlFor="input_keepTurn" className={`${modal.checkboxStyle} ${modal.cursorPointer}`} />
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
                                <ul className={modal.depth} id="option_difficultyDetail">
                                    <li>
                                        <p>남은 카드 비율  ※열어본 카드비율이 설정값 이하일 경우 열어 본 카드 선택 </p>
                                        <CompInputRange data={difficulty.remains} />
                                    </li>
                                    <li>
                                        <p>임의선택 : 이미 열어 본 카드를 다시 선택할 확률</p>
                                        <CompInputRange data={difficulty.opend} />
                                    </li>
                                    <li>
                                        <p>임의선택 : 열어보지 않은 카드를 선택할 확률</p>
                                        <CompInputRange data={difficulty.notOpen} />
                                    </li>
                                    <li>
                                        <p>확정선택 : 현재 선택한 카드와 맞는 카드를 선택할 확률</p>
                                        <CompInputRange data={difficulty.select} />
                                    </li>
                                    <li>
                                        <p>확정선택 : 이미 열어 본 카드 중 짝이 맞는 카드를 선택할 확률</p>
                                        <CompInputRange data={difficulty.pair} />
                                    </li>

                                </ul>
                            </div>

                        </li>
                    </ul>
                </li>
            </ul>
            <div className={modal.btnNewGameSection}>
                <p>※ 카드 크기를 제외한 변경된 옵션은 다음 게임부터 적용됩니다.</p>
                <div className={`${css.btnNewGameWrap} ${modal.justifyEnd}`}>
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