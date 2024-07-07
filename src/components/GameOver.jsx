import "./GameOver.css";

const GameOver = ({ score, retry }) => {
  return (
    <div>
      <h1>Fim de Jogo</h1>
      <h2>
        Pontuação: <span>{score}</span>
      </h2>
      <button onClick={retry}>Reiniciar</button>
    </div>
  );
};

export default GameOver;
