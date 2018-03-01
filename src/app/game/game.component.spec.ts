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

  it('#handleClick');

  it('#jumpTo');

  it('#setState');

});
