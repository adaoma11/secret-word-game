import "./GameOver.css";

const GameOver = ({ pickedWord, score, retry }) => {
  return (
    <div className="gameover_container">
      <h1>Fim de Jogo</h1>

      <p className="score">
        Pontuação: <span>{score}</span>
      </p>

      <div className="reveal_word">
        <p>A palavra era:</p>
        <span>{pickedWord}</span>
      </div>

      <button onClick={retry}>Reiniciar</button>
    </div>
  );
};

export default GameOver;
