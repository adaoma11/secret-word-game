import { useState, useEffect, useCallback } from "react";
import "./App.css";

// components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

// data
import { wordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const trialsQty = 5;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [score, setScore] = useState(0);
  const [remainingTrials, setRemainingTrials] = useState(trialsQty);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * categories.length)].toLowerCase();

    const word =
      words[category][
        Math.floor(Math.random() * words[category].length)
      ].toLowerCase();

    return { category, word };
  }, [words]);

  const startGame = useCallback(() => {
    clearLettersStates();

    const { category, word } = pickWordAndCategory();

    let wordLetters = word.split("");

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    // check if the letter has already been used
    if (
      correctLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // push a guessed letter or decrease the trials qty
    if (letters.includes(normalizedLetter)) {
      setCorrectLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);

      setScore((actualScore) => (actualScore += 10));
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setRemainingTrials((actualRemainingTrials) => actualRemainingTrials - 1);
    }
  };

  const clearLettersStates = () => {
    setCorrectLetters([]);
    setWrongLetters([]);
  };

  const win = () => {
    setTimeout(() => {
      setScore((actualScore) => (actualScore += 50));
      setRemainingTrials(
        (actualRemainingTrials) => (actualRemainingTrials += 1)
      );
      startGame();
    }, 1500);
  };

  const loose = () => {
    clearLettersStates();
    setGameStage(stages[2].name);
  };

  // check if the remainingTrials are over
  useEffect(() => {
    if (remainingTrials <= 0) {
      loose();
    }
  }, [remainingTrials]);

  // check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if (
      correctLetters.length > 0 &&
      correctLetters.length === uniqueLetters.length
    ) {
      win();
    }
  }, [correctLetters, letters, startGame]);

  // restarts the game
  const retry = () => {
    setScore(0);
    setRemainingTrials(trialsQty);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          pickedCategory={pickedCategory}
          pickedWord={pickedWord}
          letters={letters}
          score={score}
          remainingTrials={remainingTrials}
          correctLetters={correctLetters}
          wrongLetters={wrongLetters}
          verifyLetter={verifyLetter}
        />
      )}
      {gameStage === "end" && (
        <GameOver pickedWord={pickedWord} score={score} retry={retry} />
      )}
    </div>
  );
}

export default App;
