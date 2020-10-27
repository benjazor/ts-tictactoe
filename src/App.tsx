import React, { Component } from 'react';
import './App.css';


const initialState = {
  turn: 0,
  grid: ["", "", "", "", "", "", "", "", ""],
  message: 'X is playing',
  win: false
};
type State = Readonly<typeof initialState>;

class App extends Component<any, State> {
  readonly state: State = initialState;

  private resetState = (): void => {
    this.setState({
      turn: 0,
      grid: ['', '', '', '', '', '', '', '', ''],
      message: 'X is playing',
      win: false
    });
    // this.setState(initialState);
    // console.log("Game has been reset");
  }

  private play = (index: number): void => {
    if (this.state.grid[index] !== "" || this.state.win) {
      return;
    }
    let _grid = this.state.grid;
    _grid[index] = (this.state.turn % 2 === 0) ? 'X' : 'O';
    this.setState({
      turn: this.state.turn + 1,
      grid: _grid,
      message: ((this.state.turn % 2 === 0) ? 'O' : 'X') + ' is playing',
      win: this.state.win
    });
  }

  private checkWin = (): boolean => {
    let player = (this.state.turn % 2 === 0) ? 'O' : 'X';
    let victory = // Check diagonal
      (this.state.grid[0] === player && this.state.grid[4] === player && this.state.grid[8] === player) ||
      (this.state.grid[2] === player && this.state.grid[4] === player && this.state.grid[6] === player);
    if (!victory) { // Check lines and columns
      for (let x of [0, 1, 2]) {
        let line = true;
        let column = true;
        for (let y of [0, 1, 2]) {
          line = line && this.state.grid[3 * x + y] === player;
          column = column && this.state.grid[3 * y + x] === player;
        }
        victory = victory || line || column;
      }
    }
    return victory;
  }

  private checkDraw(): boolean {
    let draw = true;
    this.state.grid.forEach(box => {
      if (box === '') {
        draw = false;
      }
    })
    return draw;
  }

  componentDidUpdate = (): void => {
    if (this.state.win) {
      return;
    }
    let message = '';
    if (this.checkWin()) {
      message=((this.state.turn % 2 === 0) ? 'O' : 'X') + ' won the game!';
    }
    if (this.checkDraw()) {
      message = 'The game is draw!';
    }
    if (message !== '') {
      this.setState({
        turn: this.state.turn,
        grid: this.state.grid,
        message: message,
        win: true
      });
    }
  }

  render() {
    return (
      <div className="App">
        <p className="MessageBox">{this.state.message}</p>
        <div className="GameBoard">
          <button className="Box" onClick={() => this.play(0)}>{this.state.grid[0]}</button>
          <button className="Box" onClick={() => this.play(1)}>{this.state.grid[1]}</button>
          <button className="Box" onClick={() => this.play(2)}>{this.state.grid[2]}</button>
          <button className="Box" onClick={() => this.play(3)}>{this.state.grid[3]}</button>
          <button className="Box" onClick={() => this.play(4)}>{this.state.grid[4]}</button>
          <button className="Box" onClick={() => this.play(5)}>{this.state.grid[5]}</button>
          <button className="Box" onClick={() => this.play(6)}>{this.state.grid[6]}</button>
          <button className="Box" onClick={() => this.play(7)}>{this.state.grid[7]}</button>
          <button className="Box" onClick={() => this.play(8)}>{this.state.grid[8]}</button>
        </div>
        <button className="ResetButton" onClick={() => this.resetState()}>New game</button>
      </div>
    );
  }
}

export default App;
