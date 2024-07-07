import { useState, useRef } from "react";
import "./Game.css";

const Game = ({
  pickedCategory,
  pickedWord,
  letters,
  score,
  remainingTrials,
  correctLetters,
  wrongLetters,
  verifyLetter,
}) => {
  const [letterTrial, setLetterTrial] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letterTrial);
    setLetterTrial("");
    letterInputRef.current.focus();
  };

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>

      <h1>Adivinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>

      <p>Tentativas restantes: {remainingTrials}</p>

      <div className="wordContainer">
        {letters.map((letter, index) =>
          correctLetters.includes(letter) ? (
            <span className="letter" key={index}>
              {letter}
            </span>
          ) : (
            <span className="blankSquare" key={index}></span>
          )
        )}
      </div>

      <div className="letterContainer">
        <p>Tente adivinhar a letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetterTrial(e.target.value)}
            value={letterTrial.toUpperCase()}
            ref={letterInputRef}
          />
          <button className="try"></button>
        </form>
      </div>

      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, index) => (
          <span key={index}>{letter.toUpperCase()} </span>
        ))}
      </div>
    </div>
  );
};

export default Game;
