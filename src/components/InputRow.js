
const InputRow = ({
  currentGuess,
  setCurrentGuess,
  currentGuessIndex,
  setCurrentGuessIndex,
}) => {




  return (
    <div className="tile-row">
    {currentGuess.map((note, index) => {
      return <div className="tile pulse" key={index}>{note}</div>
    }
    )}
    </div>
  );
}
export default InputRow;