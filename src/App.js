import React, { Fragment, Component } from "react";
import Title from "./components/Title.js";
import SweetAlert from "sweetalert-react";
import Answer from "./components/Answer.js";
import Hiragana from "./syllabary/Hiragana.js";
import Katakana from "./syllabary/Katakana.js";
import Character from "./components/Character.js";
import { Line } from "rc-progress";
import albanana from "./sprites/albanana.png";
import albanana2 from "./sprites/albanana2.png";
import albanana3 from "./sprites/albanana3.png";
import sanbean from "./sprites/sanbean.png";
let sprites = [albanana, albanana2, albanana3, sanbean];

export default class App extends Component {
	state = {
		alertText: "",
		alertTitle: "",
		alertActive: false,
		alertType: "success",
		characters: Object.assign(Hiragana, Katakana),
		currentCharacter: "ア",
		spriteIndex: 0,
		bossHealth: 100,
		playerHealth: 100,
		damage: 50,
	};

	randomCharacter(characters) {
		let result;
		let count = 0;
		Object.keys(characters).map(character => {
			if (Math.random() < 1 / ++count) result = character;
		});
		return result;
	}

	udpateSprite() {
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
					spriteIndex: this.udpateSprite(),
				});
			} else {
				this.setState({
					alertType: "error",
					alertTitle: "Game Over",
					alertText: "Your answer was wrong and you're out of lives! Press OK to try again",
					alertActive: true,
					characters: Object.assign(Hiragana, Katakana),
					currentCharacter: "ア",
					spriteIndex: 0,
					bossHealth: 100,
					playerHealth: 100,
					damage: 50,
				});
			}
			return 100;
		} else {
			return newHealth;
		}
	}
	checkAnswer = answer => {
		if (answer == this.state.characters[this.state.currentCharacter]) {
			let newBossHealth = this.updateHealth(this.state.bossHealth, "boss");
			if (newBossHealth < 0) {
				this.setState({
					alertType: "error",
					alertTitle: "Boss Defeated!",
					alertText: "Nice job, you defeated a boss! You're next boss will have more heatlh",
					alertActive: true,
					currentCharacter: this.randomCharacter(this.state.characters),
					bossHealth: newBossHealth,
				});
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
				alertText: "Your answer was wrong and you're out of lives! Press OK to try again",
				alertActive: true,
				characters: Object.assign(Hiragana, Katakana),
				currentCharacter: "ア",
				spriteIndex: 0,
				bossHealth: 100,
				playerHealth: 100,
				damage: 50,
			});
		} else {
			this.setState({
				alertType: "error",
				alertTitle: "Woops",
				alertText: `${this.state.currentCharacter} is "${this.state.characters[this.state.currentCharacter]}"`,
				alertActive: true,
				currentCharacter: this.randomCharacter(this.state.characters),
				playerHealth: this.updateHealth(this.state.playerHealth, "player"),
			});
		}

		// let newBossHealth = this.updateHealth(this.state.bossHealth, "boss");
		// if (newBossHealth <= 0) {
		// 	this.setState({
		// 		alertType: "error",
		// 		alertTitle: "Boss Defeated!",
		// 		alertText: "Nice job, you defeated a boss! You're next boss will have more heatlh",
		// 		alertActive: true,
		// 		currentCharacter: this.randomCharacter(this.state.characters),
		// 		bossHealth: newBossHealth,
		// 	});
		// } else {
		// 	this.setState({
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
					<p>Boss</p>
					<Line percent={this.state.bossHealth} strokeWidth="4" strokeColor="#cf8b80" strokeLinecap="square" />
					<img src={sprites[this.state.spriteIndex]}></img>
					<Title>What Is This Character?</Title>
					<Character>{this.state.currentCharacter}</Character>
					<Answer handler={this.checkAnswer} />
					<p>Player</p>
					<Line percent={this.state.playerHealth} strokeWidth="4" strokeColor="#cf8b80" strokeLinecap="square" />
				</Fragment>
			</div>
		);
	}
}
