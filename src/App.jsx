import React, { useState } from "react";
import "./App.css";

// Zar resimlerini import ediyoruz
import dice1 from "./assets/images/dice1.png";
import dice2 from "./assets/images/dice2.png";
import dice3 from "./assets/images/dice3.png";
import dice4 from "./assets/images/dice4.png";
import dice5 from "./assets/images/dice5.png";
import dice6 from "./assets/images/dice6.png";

const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

function App() {
  const [playerName, setPlayerName] = useState("Player 1");
  const [playerDice, setPlayerDice] = useState(1);
  const [pcDice, setPcDice] = useState(1);
  const [result, setResult] = useState("");
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    setRolling(true);
    setResult("");

    // Animasyon: Zarlar hızlı değişiyor
    let interval = setInterval(() => {
      const randPlayer = Math.floor(Math.random() * 6) + 1;
      const randPC = Math.floor(Math.random() * 6) + 1;

      setPlayerDice(randPlayer);
      setPcDice(randPC);
    }, 100);

    // 3 saniye sonra sonuç belirleniyor
    setTimeout(() => {
      clearInterval(interval);

      const finalPlayer = Math.floor(Math.random() * 6) + 1;
      const finalPC = Math.floor(Math.random() * 6) + 1;

      setPlayerDice(finalPlayer);
      setPcDice(finalPC);

      if (finalPlayer > finalPC) setResult(`${playerName} kazandı! `);
      else if (finalPlayer < finalPC) setResult(`PC kazandı `);
      else setResult("Berabere! 🤝");

      setRolling(false);
    }, 3000);
  };

  return (
    <div className="App">
      <h1> Basit Zar Oyunu </h1>

      <div className="player-name">
        <label>
          Kullanıcı Adı:{" "}
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            disabled={rolling}
          />
        </label>
      </div>

      <div className="dice-container">
        <div>
          <h2>{playerName}</h2>
          <div className="dice">
            <img
              src={diceImages[playerDice - 1]}
              alt={`Player Dice ${playerDice}`}
            />
          </div>
        </div>

        <div>
          <h2>PC</h2>
          <div className="dice">
            <img src={diceImages[pcDice - 1]} alt={`PC Dice ${pcDice}`} />
          </div>
        </div>
      </div>

      <button onClick={rollDice} disabled={rolling}>
        {rolling ? "Zarlar atılıyor..." : "Zar At!"}
      </button>

      {result && <h2 className="result">{result}</h2>}
    </div>
  );
}

export default App;
