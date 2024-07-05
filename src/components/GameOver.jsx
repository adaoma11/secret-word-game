import "./GameOver.css";

const GameOver = ({ retry }) => {
  return (
    <div>
      <h1>Fim de Jogo</h1>
      <button onClick={retry}>Reiniciar</button>
    </div>
  );
};

export default GameOver;
