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
        <form>
          <input type="text" name="letter" maxLength="1" required />
          <span className="try"></span>
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
