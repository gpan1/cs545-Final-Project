import React, { Fragment, Component } from "react";
import Title from "./components/Title.js";
import SweetAlert from "sweetalert-react";
import Answer from "./components/Answer.js";
import Hiragana from "./syllabary/Hiragana.js";
import Katakana from "./syllabary/Katakana.js";
import Character from "./components/Character.js";
import { Line, Circle } from "rc-progress";

export default class App extends Component {
	state = {
		alertText: "",
		alertTitle: "",
		alertActive: false,
		alertType: "success",
		characters: Object.assign(Hiragana, Katakana),
		currentCharacter: "ア",
		health: 100, // base health will decrement eac time and double with each correct answer set
		healthDecrement: 50,
	};

	randomCharacter(characters) {
		let result;
		let count = 0;
		Object.keys(characters).map(character => {
			if (Math.random() < 1 / ++count) result = character;
		});
		return result;
	}

	updateHealth() {
		let newHealth = this.state.health - this.state.healthDecrement;
		if (newHealth <= 0) {
			this.setState({
				healthDecrement: Math.floor(this.state.healthDecrement * 0.8),
			});
			return 100;
		} else {
			return this.state.health - this.state.healthDecrement;
		}
	}

	checkAnswer = answer => {
		if (answer == this.state.characters[this.state.currentCharacter]) {
			this.setState({
				currentCharacter: this.randomCharacter(this.state.characters),
				health: this.state.health - 25, // don't know if this will work
			});
		} else {
			this.setState({
				alertType: "error",
				alertTitle: "Woops",
				alertText: `${this.state.currentCharacter} is "${this.state.characters[this.state.currentCharacter]}"`,
				alertActive: true,
				currentCharacter: this.randomCharacter(this.state.characters),
			});
		}
		// this.setState({
		// 	currentCharacter: this.randomCharacter(this.state.characters),
		// 	health: this.updateHealth(), // don't know if this will work
		// });
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
					<Title>Guess The Character</Title>
					<Character>{this.state.currentCharacter}</Character>
					<Answer handler={this.checkAnswer} />
					<Line percent={this.state.health} strokeWidth="4" strokeColor="#D3D3D3" />
				</Fragment>
			</div>
		);
	}
}
