import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import Title from "./Title.js";
import SweetAlert from "sweetalert-react";
import Answer from "./Answer.js";
import Hiragana from "../syllabary/Hiragana.js";
import Katakana from "../syllabary/Katakana.js";
import Character from "./Character.js";
import { Line } from "rc-progress";
import sprites from "../sprites/index.js";
import Button from "./Button.js";

const spriteNames = [
  "albanana",
  "albanana2",
  "albanana3",
  "sanbean",
  "lyndon bee johnson",
  "bell Lad",
];
let counter = 0;

export default class Test extends Component {
  state = {
    alertText: "",
    alertTitle: "",
    alertActive: false,
    alertType: "success",
    characters: Object.assign(Hiragana, Katakana),
    currentCharacter: this.randomCharacter(Object.assign(Hiragana, Katakana)),
    spriteIndex: 0,
    bossHealth: 100,
    playerHealth: 100,
    damage: 50,
  };

  randomCharacter(characters) {
    let result;
    let count = 0;
    Object.keys(characters).map((character) => {
      if (Math.random() < 1 / ++count) result = character;
      return result;
    });
    return result;
  }
  getCurrentBossName() {
    let str = spriteNames[this.state.spriteIndex];
    str = str.split(".")[0].toUpperCase();
    return str;
  }

  updateSprite() {
    let newSpriteIndex = this.state.spriteIndex + 1;
    if (newSpriteIndex >= sprites.length) {
      newSpriteIndex = 0;
    }
    return newSpriteIndex;
  }

  updateHealth(oldHealth, type) {
    let damage = 0;
    if (type === "boss") {
      damage = this.state.damage;
    } else {
      damage = 20;
    }
    let newHealth = oldHealth - damage;
    if (newHealth <= 0) {
      if (type === "boss") {
        this.setState({
          damage: Math.floor(this.state.damage * 0.8),
          spriteIndex: this.updateSprite(),
        });
      } else {
        this.setState({
          alertType: "error",
          alertTitle: "Game Over",
          alertText:
            "Your answer was wrong and you're out of lives! Press OK to try again",
          alertActive: true,
          characters: Object.assign(Hiragana, Katakana),
          currentCharacter: this.randomCharacter(
            Object.assign(Hiragana, Katakana)
          ),
          spriteIndex: 0,
          bossHealth: 100,
          playerHealth: 100,
          damage: 50,
        });
        counter = 0;
      }
      return 100;
    } else {
      return newHealth;
    }
  }
  checkAnswer = (answer) => {
    if (answer === this.state.characters[this.state.currentCharacter]) {
      let x = false;
      if (this.state.bossHealth - this.state.damage <= 0) {
        x = true;
      }
      let newBossHealth = this.updateHealth(this.state.bossHealth, "boss");
      if (x) {
        this.setState({
          alertType: "success",
          alertTitle: "Boss Defeated!",
          alertText:
            "Nice job, you defeated a boss! Your next boss will have more health",
          alertActive: true,
          currentCharacter: this.randomCharacter(this.state.characters),
          bossHealth: newBossHealth,
        });
        counter++;
      } else {
        this.setState({
          currentCharacter: this.randomCharacter(this.state.characters),
          bossHealth: newBossHealth,
        });
      }
    } else if (this.state.playerHealth === 20) {
      this.setState({
        alertType: "error",
        alertTitle: "Game Over",
        alertText:
          "Your answer was wrong and you're out of lives! Press OK to try again",
        alertActive: true,
        characters: Object.assign(Hiragana, Katakana),
        currentCharacter: this.randomCharacter(
          Object.assign(Hiragana, Katakana)
        ),
        spriteIndex: 0,
        bossHealth: 100,
        playerHealth: 100,
        damage: 50,
      });
      counter = 0;
    } else {
      this.setState({
        alertType: "error",
        alertTitle: "Whoops",
        alertText: `${this.state.currentCharacter} is "${
          this.state.characters[this.state.currentCharacter]
        }"`,
        alertActive: true,
        currentCharacter: this.randomCharacter(this.state.characters),
        playerHealth: this.updateHealth(this.state.playerHealth, "player"),
      });
    }
    /*
     *	Uncomment the code below this line and comment all the code above for all answers to go through as correct.
     */
    // let x = false;
    //  if (this.state.bossHealth - this.state.damage <= 0)
    //  {
    // 	x = true;
    //  }
    // let newBossHealth = this.updateHealth(this.state.bossHealth, "boss");
    // if (x) {
    // 	this.setState({
    // 		alertType: "success",
    // 		alertTitle: spriteNames[this.state.spriteIndex].toUpperCase() +" Defeated!",
    // 		alertText: "Nice job, you defeated a boss! Your next boss will have more health",
    // 		alertActive: true,
    // 		currentCharacter: this.randomCharacter(this.state.characters),
    // 		bossHealth: newBossHealth,
    // 	});
    // } else {
    // 	this.setState({
    // 		playerHealth: 100,
    // 		currentCharacter: this.randomCharacter(this.state.characters),
    // 		bossHealth: newBossHealth,
    // 	});
    // }
  };

  render() {
    return (
      <div>
        <Fragment>
          <SweetAlert
            type={this.state.alertType}
            text={this.state.alertText}
            title={this.state.alertTitle}
            show={this.state.alertActive}
            onConfirm={() => this.setState({ alertActive: false })}
          />
          <p id="bossText">{this.getCurrentBossName()}</p>
          <Line
            percent={this.state.bossHealth}
            strokeWidth="4"
            strokeColor="#bf6a5c"
            strokeLinecap="round"
            className="bossHealth"
          />
          <img
            src={sprites[this.state.spriteIndex]}
            alt="Boss"
            id="bossImage"
          ></img>
          <Title id="titleText">What Is This Character?</Title>
          <Character>{this.state.currentCharacter}</Character>
          <Answer handler={this.checkAnswer} />
          <p id="playerText">Player</p>
          <Line
            id="bottomLine"
            percent={this.state.playerHealth}
            strokeWidth="4"
            strokeColor="#cf8b80"
            strokeLinecap="round"
            className="playerHealth"
          />
          <p id="streak">STREAK: {counter}</p>
          <Link to="/study">
            <Button type="submit" id="study">
              Study!
            </Button>
          </Link>
        </Fragment>
      </div>
    );
  }
}
