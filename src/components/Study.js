import React, { useState } from "react";
import Hiragana from "../syllabary/Hiragana.js";
import Katakana from "../syllabary/Katakana.js";

function Study() {
  const [isShown, setIsShown] = useState(false);
  let characters = Object.assign(Hiragana, Katakana);

  return (
    <div>
      {Object.keys(characters).map((char) => {
        return (
          <div>
            <button
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
            >
              {char}
            </button>
            {isShown && <div>{characters[char]}</div>}
          </div>
        );
      })}
    </div>
  );
}

export default Study;

/*
function App() {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="App">
      {charList.map((char) => {
        <button
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}>
          char.key
        </button>
        {isShown && (
          <div>
            char.value
          </div>
        )}
      }
    </div>
  );
}
*/
