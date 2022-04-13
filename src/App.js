import React, { Fragment, Component } from "react";
import Title from "./components/Title.js";
import SweetAlert from "sweetalert-react";
import Button from "./components/Button.js";
import Answer from "./components/Answer.js";
import Hiragana from "./syllabary/Hiragana.js";
import Katakana from "./syllabary/Katakana.js";
import Character from "./components/Character.js";

export default class App extends Component {
	state = {
		alertText: "",
		alertTitle: "",
		alertActive: false,
		alertType: "success",
		characters: Object.assign(Hiragana, Katakana),
		currentCharacter: "ア",
	};

	randomCharacter(characters) {
		let result;
		let count = 0;
		Object.keys(characters).map(character => {
			if (Math.random() < 1 / ++count) result = character;
		});
		return result;
	}

	checkAnswer = answer => {
		if (answer == this.state.characters[this.state.currentCharacter]) {
			this.setState({
				currentCharacter: this.randomCharacter(this.state.characters),
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
				</Fragment>
			</div>
		);
	}
}
