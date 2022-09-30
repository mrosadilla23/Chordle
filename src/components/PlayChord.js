const PlayChord = ({ chord, synth }) => {
  const play = () => {
    chord.forEach((note) => {
    synth.triggerAttackRelease(note + 4, "8n");
    })
  };
  return (
    <>
      <button onClick={play}>Play Chord</button>
    </>
  );
}
export default PlayChord;