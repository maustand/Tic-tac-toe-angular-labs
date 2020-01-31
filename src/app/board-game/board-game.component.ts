import { Component, OnInit } from '@angular/core';
import { MarksOfGame, WinnerCasesOfGame } from '../core/tic-tac-toe';

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.scss']
})
export class BoardGameComponent implements OnInit {

  turn: MarksOfGame;
  numOfTurn: number;
  isThereWinner: boolean;
  isGameOver: boolean;
  winnerSign: string;
  cellsOfGame: string[] = [];

  // default user cases to determine if there is a winner.
  private winnerCases: number[][] = WinnerCasesOfGame;

  constructor() { }

  ngOnInit() {
    this.initBoardGame();
  }

  private initBoardGame() {
    this.turn = MarksOfGame.Cross; // set first turn
    this.winnerSign = '';
    this.numOfTurn = 0;
    this.isThereWinner = false;
    this.isGameOver = false;

    this.cellsOfGame.length = 9;
    this.cellsOfGame.fill('', 0, this.cellsOfGame.length);

  }

  startAgain() {
    this.initBoardGame();
  }

  onGameCellClick(idx: number) {

    // avoids overrite cells
    if (this.cellsOfGame[idx] === '' && !this.isGameOver) {

      this.numOfTurn += 1;
      this.cellsOfGame[idx] = this.turn;
      this.turn = (this.turn === MarksOfGame.Cross) ? MarksOfGame.Nought : MarksOfGame.Cross;


      // only it should begin to check after the move #3.
      if (this.numOfTurn > 3) {


        // check if there is a winner, keeping in mind the winner cases array
        for (const item of this.winnerCases) {
          if (this.cellsOfGame[item[0]] === this.cellsOfGame[item[1]] &&
            this.cellsOfGame[item[1]] === this.cellsOfGame[item[2]] && this.cellsOfGame[item[0]] !== '') {

            this.isGameOver = true;
            this.isThereWinner = true;
            this.winnerSign = this.cellsOfGame[item[0]];
            break;
          }
        }

        // after 9 moves and if still there is not a winner, the game is tie
        if (this.numOfTurn === 9 && !this.isThereWinner) {
          this.isGameOver = true;
        }

      }
    }
  }
}
