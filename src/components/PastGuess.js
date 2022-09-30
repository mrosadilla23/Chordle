

const PastGuess = ({
  guess,
  chord,
  setGameOver,
  synth,
  gameOver,
  pastGuesses


}) => {

  return (
    <>
    <div className="tile-row">
    {guess.map((note, index) => {
      let c = "tile";
      if (note === chord[index]) {
        c += " correct";
      } else if (chord.includes(note)) {
        c += " incorrect";

      }

      return <div className={c} key={index}>{note}</div>
    }
    )}
    </div>
    </>
  );
}
export default PastGuess;