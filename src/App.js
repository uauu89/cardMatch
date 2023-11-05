// import './App.css';
import Header from "./component/Header";

import Gameboard from "./component/Gameboard";
import { useEffect, useState } from "react";
function App() {

  const [cardSizeRatio, setCardSizeRatio] = useState(1)
  const [score, setScore] = useState({
    user : 0,
    com : 0,
    combo : 0,
    comCombo : 0,
  })
  const [whosTurn, setWhosTurn] = useState()
  const [timeout, setTimeout] = useState(false);
  // const [gameStart, setGameStart] = useState(false);
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
    })
  }
  


  
  useEffect(()=>{

    function option_changeCardSize(){
      document.documentElement.style.setProperty("--cardSize_ratio", cardSizeRatio);
    }

    option_changeCardSize();
  }, [cardSizeRatio])

  console.log("App render");
  return (
    <>
      <Header 
        setting={setting} setSetting={setSetting}
        setCardSizeRatio={setCardSizeRatio}
        startNewGame={startNewGame}
        whosTurn={whosTurn} setWhosTurn={setWhosTurn}
        score={score}
        setTimeout={setTimeout}
      />
      <Gameboard
        setting={setting} setSetting={setSetting}
        whosTurn={whosTurn} setWhosTurn={setWhosTurn}
        score={score} setScore={setScore}
        timeout={timeout} setTimeout={setTimeout}
      />
    </>
  );
}

export default App;
