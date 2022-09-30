//react component named Main
import * as Tone from 'tone'
import { useState } from 'react';
import Keyboard from './components/Keyboard';
import InputGrid from './components/InputGrid';
import PlayChord from './components/PlayChord';
import chords from './chords';
import Header from './components/Header';

const Main = () => {
  let synth = new Tone.Sampler({
    urls: {
      "C4": "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      "A4": "A4.mp3",
    },
    release: 3,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
  }).toDestination();
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false)
  const [pastGuesses , setPastGuesses] = useState([])
  const [currentGuess, setCurrentGuess] = useState([null, null, null, null]);
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [chord, setChord] = useState(chords[ Math.floor(Math.random() * chords.length) ]);
let play = (note) => {
  console.log(synth);
  synth.triggerAttackRelease(note, "8n");
}
const handleCopyScore = () => {
  let score = win? pastGuesses.length: 'X'
  let scoreGrid = [];
  let scoreString = "Your score is " + score + " out of 6. \n";
  for (let i = 0; i < pastGuesses.length; i++) {
    let row = [];
    pastGuesses[i].forEach((note, ind) => {
      if (note === chord[ind]) {
        row.push("🟩");
      } else if(chord.includes(note)) {
        row.push("🟨");
      } else {
        row.push("⬛️");
      }
    }
    )
    scoreGrid.push(row);
    scoreString += row.join(" ") + "\n";
  }
  console.log(scoreString, pastGuesses, chord);
  navigator.clipboard.writeText(scoreString);
}


  return (

    <div className='main'>
      <Header />
      {
        gameOver &&
        <>
         <div className="grey-out">

          </div>
          <div className="game-over" onClick={handleCopyScore}>
          <h1>Game Over</h1>
          <h2>{win ? "You Win!" : "You Lose!"}</h2>
          <button onClick={() => {
            setGameOver(false);
            setPastGuesses([]);
            setCurrentGuess([null, null, null,
            null]);
            setWin(false);
            setCurrentGuessIndex(0);
            setChord(chords[ Math.floor(Math.random() * chords.length) ]);
          }}>Play Again</button>
        </div>
        </>


      }
      <PlayChord
        chord={chord}
        synth={synth}
      />
      <InputGrid
        currentGuess={currentGuess}
        setCurrentGuess={setCurrentGuess}
        currentGuessIndex={currentGuessIndex}
        setCurrentGuessIndex={setCurrentGuessIndex}
        pastGuesses={pastGuesses}
        setPastGuesses={setPastGuesses}
        chord = {chord}
        gameOver={gameOver}
        setGameOver={setGameOver}
        synth = {synth}
      />
      <Keyboard
        currentGuess={currentGuess}
        setCurrentGuess={setCurrentGuess}
        currentGuessIndex={currentGuessIndex}
        setCurrentGuessIndex={setCurrentGuessIndex}
        pastGuesses={pastGuesses}
        setPastGuesses={setPastGuesses}
        chord = {chord}
        gameOver={gameOver}
        setGameOver={setGameOver}
        setWin={setWin}
        synth = {synth}
        play = {play}/>
        {/* <div className="chord">
          {
            chord.map((note, index) => {
              return <div className="tile" key={index}>{note}</div>
            }
            )}

        </div> */}



    </div>

  );
}
export default Main;