
import React, { useState } from "react";
import * as Tone from 'tone'


const Keyboard = ({
  play,
  currentGuess,
  setCurrentGuess,
  currentGuessIndex,
  setCurrentGuessIndex,
  pastGuesses,
  setPastGuesses,
  chord,
  gameOver,
  setGameOver,
  setWin,
  synth


}) => {
  const [mute, setMute] = useState(false);
  const checkGuess = (chord, guesses) => {

    let correct = 0;
    let guess = guesses[guesses.length - 1];
    console.log(chord);
    for (let i = 0; i < 4; i++) {
      if (guess[i] === chord[i]) {
        correct++;
      }
    }
    if (correct === 4 && !gameOver) {
      const now = Tone.now();
      setGameOver(true);
      setWin(true);

      synth.triggerAttackRelease(chord[0] + 4, "8n", now);
      synth.triggerAttackRelease(chord[1] + 4, "8n", now + 0.07);
      synth.triggerAttackRelease(chord[2] + 4, "8n", now + 0.14);
      synth.triggerAttackRelease(chord[3] + 4, "8n", now + 0.21);
    }

  }
  const handlePress = (e) => {
    if (e.target.classList[0] === 'key' && !gameOver) {
      e.target.classList.add("pressed");
      let note = e.target.innerText + 4;
      !mute && play(note);
    }
  }
  const handleRelease = (e) => {
    e.target.classList.remove("pressed");
  }
  const handleNoteClick = (e) => {
    if (e.target.classList[0] === 'key') {

      if (currentGuessIndex < 4) {
        let newCurrentGuess = [...currentGuess];
        newCurrentGuess[currentGuessIndex] = e.target.innerText;
        setCurrentGuess(newCurrentGuess);
        setCurrentGuessIndex(currentGuessIndex + 1);
      }
    }
  }
  const handleBackspace = () => {
    let newGuess = [...currentGuess]
    newGuess[currentGuessIndex - 1] = null
    setCurrentGuess(newGuess)
    if (currentGuessIndex > 0) {
      setCurrentGuessIndex(currentGuessIndex - 1)
    }

  }
  const handleGuess = () => {
    console.log(currentGuess)
    if (currentGuessIndex === 4) {
      let newPastGuesses = [...pastGuesses]
      newPastGuesses.push(currentGuess)
      setPastGuesses(newPastGuesses)
      setCurrentGuess([null, null, null, null])
      setCurrentGuessIndex(0)

      setTimeout(() => {
        checkGuess(chord, newPastGuesses)
      }, 100)
    } else {

      alert("Please finish your guess")
    }
  }

  return (
    <>
      <div className="button-row">
        <div className="mute">
          <button onClick={() => setMute(!mute)}>{mute ? "Unmute" : "Mute"}</button>
        </div>


        <div className="guess-btn">
          <button onClick={handleGuess}>Guess</button>
        </div>
        <div className="backspace">
          <button onClick={handleBackspace}>Backspace</button>
        </div>
      </div>
      <div
        tabIndex={0}
        onMouseUp={handleRelease}
        onMouseDown={handlePress}
        onClick={handleNoteClick}

        className="keyboard"
      >
        <div onMouseLeave={handleRelease} className="key white">C</div>
        <div onMouseLeave={handleRelease} className="key black">C#</div>
        <div onMouseLeave={handleRelease} className="key white">D</div>
        <div onMouseLeave={handleRelease} className="key black">D#</div>
        <div onMouseLeave={handleRelease} className="key white">E</div>
        <div onMouseLeave={handleRelease} className="key black null"></div>
        <div onMouseLeave={handleRelease} className="key white">F</div>
        <div onMouseLeave={handleRelease} className="key black">F#</div>
        <div onMouseLeave={handleRelease} className="key white">G</div>
        <div onMouseLeave={handleRelease} className="key black">G#</div>
        <div onMouseLeave={handleRelease} className="key white">A</div>
        <div onMouseLeave={handleRelease} className="key black">A#</div>
        <div onMouseLeave={handleRelease} className="key white">B</div>
        <div onMouseLeave={handleRelease} className="key black null"></div>
      </div>

    </>
  );
}
export default Keyboard;