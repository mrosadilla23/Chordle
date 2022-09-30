import InputRow from "./InputRow";
import PastGuess from "./PastGuess";
const InputGrid = ({
  currentGuess,
  setCurrentGuess,
  currentGuessIndex,
  setCurrentGuessIndex,
  pastGuesses,
  setPastGuesses,
  chord,
  gameOver,
  setGameOver,
  synth
}) => {
  if (pastGuesses.length >  5) {
    setGameOver(true);
  }
  let dummyRowsNum = 5 - pastGuesses.length;
  let dummyRows = [];
  for (let i = 0; i < dummyRowsNum; i++) {
    dummyRows.push(<div className="tile-row" key={i}>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
    </div>);
  }


  return (
    <div className="input-grid">
    {
      pastGuesses.map((guess, index) => {
        return <PastGuess
                  guess={guess}
                  chord = {chord}
                  key={index}
                  setGameOver={setGameOver}
                  synth = {synth}
                  gameOver={gameOver}
                  pastGuesses = {pastGuesses}

               />
      })
    }
    {
      !gameOver ?
<InputRow
      currentGuess={currentGuess}
      setCurrentGuess={setCurrentGuess}
      currentGuessIndex={currentGuessIndex}
      setCurrentGuessIndex={setCurrentGuessIndex}
    />
    :
    pastGuesses.length < 6 &&
    <div className="tile-row">
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
      <div className="tile"></div>
    </div>
    }
    {dummyRows}

    </div>
  );
};
export default InputGrid;