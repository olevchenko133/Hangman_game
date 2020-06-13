import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import {randomWord} from "./words";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord(), gameOver: false };
    this.handleGuess = this.handleGuess.bind(this);
    this.restart = this.restart.bind(this);

  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
      gameOver: (st.nWrong === st.maxWrong ? true : false)

    }));

    

  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }
restart(){
  console.log("Restart works");
  // this.setState(st=>({answer: randomWord()})
  // );
  // console.log("New answer is "+ this.state.answer);
  this.setState({
    answer: randomWord(),
    guessed: new Set(),
    nWrong:0, 
    gameOver: false
  });
}
  /** render: render game */
  render() {
    const gameOver = this.state.nWrong === this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
let left = this.props.maxWrong - this.state.nWrong;
let gameState = this.generateButtons();
if(gameOver) gameState="You lose";
if(isWinner)gameState="You win";

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={`You guessed ${this.state.nWrong} wrong letters. Guesses have left: ${left}`} />
        {!gameOver ? <p> You've made  {this.state.nWrong} wrong guesses. Guesses have left: {left} </p> : <h2> Game over !!! </h2>}
    <p className='Hangman-word'>{!gameOver ? this.guessedWord() : <span className="Hangman-answer"> {this.state.answer}</span> }</p>
        {/* {!gameOver ? <p className='Hangman-btns'>{this.generateButtons()}</p> : <div> <h4> You've lost </h4></div>} */}
        <p className='Hangman-btns'>{gameState}</p>


{/* {this.guessedWord().join("") === this.state.answer && <h2>You win!!!</h2>} */}
        {(gameOver || isWinner) && <button onClick={this.restart} className="HangmanRestart"> Restart </button>}
      </div>
    );
  }
}

export default Hangman;
