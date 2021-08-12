import { Component, OnInit } from '@angular/core';
import { TrelloService } from './../../services/trello.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private trelloService: TrelloService) {}
  trelloBoardName: string = '';
  trelloListName: string = '';
  trelloCardName: string = '';
  trelloKey: string = '';
  trelloToken: string = '';
  ngOnInit() {}

  public createTrealloBoard() {
    this.trelloService.createTrelloBoards(this.trelloBoardName);
  }

  public addCardOnTrelloBoardList() {
    this.trelloService.addCardOnTrelloBoardList(
      this.trelloCardName,
      this.trelloListName
    );
  }
  public removeCardOnTrelloBoardList() {
    this.trelloService.removeCardOnTrelloBoardList(this.trelloCardName);
  }

  public addListOnTrelloBoard() {
    this.trelloService.addListOnTrelloBoard(this.trelloListName);
  }

  public removeListOnTrelloBoard() {
    this.trelloService.removeListOnTrelloBoard(this.trelloListName);
  }

  public saveTrealloBoardKeyAndToken() {
    this.trelloService.saveTrelloKeyAndToken(this.trelloKey, this.trelloToken);
  }
}
