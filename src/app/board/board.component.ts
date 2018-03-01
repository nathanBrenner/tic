import { SquareComponent } from './../square/square.component';
import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() value;
  @Output() onClick = new EventEmitter();
  state;
  status;

  ngOnInit() {
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
    this.status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
  }

  handleClick(i) {

    const squares = this.state.squares.slice();

    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });

    const winner = this.calculateWinner(this.state.squares);
    if (winner) {
      this.status = 'Winner: ' + winner;
    } else {
      this.status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

  }

  setState(state) {
    this.state = {...this.state, ...state};
  }

  calculateWinner(squares) {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

}
