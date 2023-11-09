// import './App.css';
import Header from "./component/Header";

import Gameboard from "./component/Gameboard";
import { useState } from "react";
function App() {

  const [openModal, setOpenModal] = useState(-1);
  const [openBtn, setOpenBtn] = useState(-1);
  
  
  const [score, setScore] = useState({
    user : 0, com : 0, combo : 0, comCombo : 0,
  })

  const [whosTurn, setWhosTurn] = useState("")
  const [play, setPlay] = useState(false);
  const [timeout, setTimeout] = useState(false);
  const [gameOver, setGameOver] = useState(true);

  const [setting, setSetting] = useState({
    newGame : false,
    mode : "",
    cardNum : 0,
    count : 0,
    noCount : false,
    checkCard : true,
    keepTurn : false,
    remains : 0,
    opend : 0,
    notOpen : 0,
    select : 0,
    pair : 0,
  })


  async function setStartFalse(){
    setSetting({...setting, newGame : false})
  }
  function startNewGame(setMode){
    setStartFalse().then(()=>{
      setSetting({
        newGame : true,
        mode : setMode,
        cardNum : document.querySelector("#inputCardNum").value,
        count : document.querySelector("#inputTimer").value,
        noCount : document.querySelector("#inputNoCount").checked,
        checkCard : document.querySelector("#inputCheckCard").checked,
        keepTurn : document.querySelector("#inputKeepTurn").checked,
        remains : document.querySelector("#difficultyDetail_remains").value,
        opend : document.querySelector("#difficultyDetail_opend").value,
        notOpen : document.querySelector("#difficultyDetail_notOpen").value,
        select : document.querySelector("#difficultyDetail_select").value,
        pair : document.querySelector("#difficultyDetail_pair").value,
      })
      setWhosTurn("");
      setOpenModal(-1);
      setOpenBtn(-1);
    })
  }

  return (
    <>
      <Header 
        openModal={openModal} setOpenModal={setOpenModal}
        openBtn={openBtn} setOpenBtn={setOpenBtn}
        setting={setting} setSetting={setSetting}
        startNewGame={startNewGame}
        whosTurn={whosTurn} setWhosTurn={setWhosTurn}
        play={play} setPlay={setPlay}
        score={score}
        setTimeout={setTimeout}
        gameOver={gameOver}
      />
      <Gameboard
        setOpenModal={setOpenModal}
        setting={setting} setSetting={setSetting}
        startNewGame={startNewGame}
        whosTurn={whosTurn} setWhosTurn={setWhosTurn}
        play={play} setPlay={setPlay}
        score={score} setScore={setScore}
        timeout={timeout} setTimeout={setTimeout}
        gameOver={gameOver} setGameOver={setGameOver}
      />
    </>
  );
}

export default App;
