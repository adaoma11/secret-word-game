import { useState, useRef, useEffect } from "react";
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

  useEffect(() => {
    letterInputRef.current.focus();
  }, [letterInputRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letterTrial);
    setLetterTrial("");
    letterInputRef.current.focus();
  };

  return (
    <div className="game">
      <h1>Qual a palavra?</h1>

      <div className="stats">
        <p>
          Pontuação: <span>{score}</span>
        </p>

        <p>
          Tentativas restantes: <span>{remainingTrials}</span>
        </p>

        <p>
          Dica sobre a palavra: <span>{pickedCategory}</span>
        </p>
      </div>

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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            autoComplete="off"
            required
            onChange={(e) => setLetterTrial(e.target.value)}
            value={letterTrial.toUpperCase()}
            ref={letterInputRef}
          />
          <button className="try"></button>
        </form>
      </div>

      <div className="wrongLettersContainer">
        <p>Letras erradas:</p>
        {wrongLetters.map((letter, index) => (
          <span key={index}>{letter} </span>
        ))}
      </div>
    </div>
  );
};

export default Game;
