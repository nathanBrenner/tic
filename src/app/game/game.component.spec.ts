import { BoardComponent } from './../board/board.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { SquareComponent } from '../square/square.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent,
        BoardComponent,
        SquareComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#calculateWinner returns null because the player didn\'t win yet', () => {
    const squares = Array(9).fill(null);
    expect(component.calculateWinner(squares)).toBe(null);
  });

  it('#calculateWinner returns "X" because the player won', () => {
    const squares = ['X', 'X', 'X', null, null, null, null, null, null];
    expect(component.calculateWinner(squares)).toBe('X');
  });

  it('#calculateWinner returns "O" because the player won', () => {
    const squares = ['X', 'O', 'X', 'X', 'O', null, null, 'O', null];
    expect(component.calculateWinner(squares)).toBe('O');
  });

  it('#handleClick', () => {
    // this needs to be refactored: replace callThrough with returnValue
    // because this is more like an integration test
    // maybe it would be better to write additional tests that uses returnValue on the spies
    const spy = spyOn(component, 'calculateWinner');
    spyOn(component, 'setState').and.callThrough();
    const i = 5;
    expect(component.status).toBe('Next player: X');
    component.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
    }

    const updatedState = {
      history: [
        {
          squares: Array(9).fill(null),
        },
        {
          squares: [ null, null, null, null, null, 'X', null, null, null ]
        }
      ],
      stepNumber: 1,
      xIsNext: false,
    }

    component.handleClick(i);

    expect(component.state).toEqual(updatedState);

    expect(spy.calls.count()).toEqual(3);
    expect(spy.calls.argsFor(0)).toEqual([ [null, null, null, null, null, null, null, null, null ]]);
    expect(spy.calls.argsFor(1)).toEqual([ [null, null, null, null, null, 'X', null, null, null ]]);
    expect(spy.calls.argsFor(2)).toEqual([ [null, null, null, null, null, 'X', null, null, null ]]);
    expect(component.status).toBe('Next player: O');
  });

  it('#jumpTo calls #setState', () => {
    spyOn(component, 'setState');

    component.jumpTo(2);

    expect(component.setState).toHaveBeenCalledWith({
      stepNumber: 2,
      xIsNext: true
    });

  });

  it('#setState', () => {
    const currentState = {
      history: [
        {
          squares: [ null, null, null, null, null, null, null, null, null ]
        }
      ],
      xIsNext: true,
      stepNumber: 0
    }
    const changingState = {
      history: [
        {
          squares: [ null, 'X', null, null, null, null, null, null, null ]
        }
      ],
      xIsNext: false,
      stepNumber: 1
    }

    expect(component.state).toEqual(currentState);

    component.setState(changingState);

    expect(component.state).toEqual(changingState);
  });

});
