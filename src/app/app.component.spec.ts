import { BoardComponent } from './board/board.component';
import { GameComponent } from './game/game.component';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SquareComponent } from './square/square.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GameComponent,
        BoardComponent,
        SquareComponent,
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
