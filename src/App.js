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
				});
			}
			return 100;
		} else {
			return newHealth;
		}
	}

	checkAnswer = answer => {
		// if (answer == this.state.characters[this.state.currentCharacter]) {
		// 	this.setState({
		// 		currentCharacter: this.randomCharacter(this.state.characters),
		// 		health: this.state.health - 25, // don't know if this will work
		// 	});
		// } else {
		// 	this.setState({
		// 		alertType: "error",
		// 		alertTitle: "Woops",
		// 		alertText: `${this.state.currentCharacter} is "${this.state.characters[this.state.currentCharacter]}"`,
		// 		alertActive: true,
		// 		currentCharacter: this.randomCharacter(this.state.characters),
		// 		playerHealth: this.updateHealth(this.state.playerHealth, "player"),
		// 	});
		// }
		this.setState({
			currentCharacter: this.randomCharacter(this.state.characters),
			bossHealth: this.updateHealth(this.state.bossHealth, "boss"), // don't know if this will work
		});
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
					<img src={sprites[this.state.spriteIndex]}></img>
					<Title>Guess The Character</Title>
					<Character>{this.state.currentCharacter}</Character>
					<Answer handler={this.checkAnswer} />
					<p>Boss</p>
					<Line percent={this.state.bossHealth} strokeWidth="4" strokeColor="#D3D3D3" />
					<p>Player</p>
					<Line percent={this.state.playerHealth} strokeWidth="4" strokeColor="#D3D3D3" />
				</Fragment>
			</div>
		);
	}
}
