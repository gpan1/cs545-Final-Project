import React, { useState } from "react";
import Hiragana from "../syllabary/Hiragana.js";
import Katakana from "../syllabary/Katakana.js";
import Button from "./Button.js";


function Study() {
  const [isShown, setIsShown] = useState(false);
  let characters = Object.assign(Hiragana, Katakana);

  return (
    <div id="adamstinky">
      {Object.keys(characters).map((char) => {
        return (
          <div id="adamstinky">
            <Button
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
            >
              {char}
            </Button>
            {isShown && <div id="adamstinky">{characters[char]}</div>}
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
