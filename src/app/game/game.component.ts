import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  state;
  status;

  constructor() { }

  ngOnInit() {
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    };
    this.status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
  }

  calculateWinner(squares: any[]): string|null {
    // squares will be an array of 9 values, and each value will either be 'X', '0', or null

    // lines represents the possible combination to win (3 boxes selected in a row)
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      // if the letter matches one of the selected combinations, return the letter
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;

  }

  handleClick(i) {
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    let current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    let winner = this.calculateWinner(current.squares);

    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });

    history = this.state.history.slice(0, this.state.stepNumber + 1);
    current = history[this.state.stepNumber];
    winner = this.calculateWinner(current.squares);
    if (winner) {
      this.status = 'Winner: ' + winner;
    } else {
      this.status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  setState(state) {
    this.state = {...this.state, ...state};
  }
}
