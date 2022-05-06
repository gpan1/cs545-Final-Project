import React, { useState } from "react";
import { Link } from "react-router-dom";
import Hiragana from "../syllabary/Hiragana.js";
import Katakana from "../syllabary/Katakana.js";
import Button from "./Button.js";

function Study() {
  const [isShown, setIsShown] = useState(false);
  const [selected, setSelected] = useState(undefined);
  let characters = Object.assign(Hiragana, Katakana);

  return (
    <div id="adamstinky">
        <br id="stink3"></br>
      {Object.keys(characters).map((char) => {
        return (
          <button id="stink"
            onClick={() => {
              if (isShown && selected === char) {
                setIsShown(false);
              } else if (isShown && selected !== char) {
                setSelected(char);
              } else {
                setIsShown(true);
                setSelected(char);
              }
            }}
          >
            {char}
          </button>
        );
      })}
      <br></br>
      <Link to="/">
        <Button type="submit" id="test">
          Test!
        </Button>
      </Link>
      {isShown && <div id="stink2">{characters[selected]}</div>}
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
