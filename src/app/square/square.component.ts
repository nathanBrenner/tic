import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {
  @Input() value;

  state;

  handleClick(value) {
    this.setState({value: 'X'});
  }

  ngOnInit() {
    this.state = {
      value: null
    }
  }

  setState(state) {
    this.state = {...this.state, ...state};
  }
}
