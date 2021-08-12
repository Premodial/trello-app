import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class TrelloService {
  TRELLO_ACCESS_KEY: string = '';
  TRELLO_ACCES_TOKEN: string = '';
  trelloBoardId: string = '';
  trelloListId: string = '';
  trelloCardId: string = '';
  requestStatus: number = 0;
  trelloListIdMap = new Map();
  trelloCardMap = new Map();
  constructor(private toastr: ToastrService) {}

  public createTrelloBoards(boardName: string) {
    fetch(
      'https://api.trello.com/1/boards/?key=' +
        this.TRELLO_ACCESS_KEY +
        '&token=' +
        this.TRELLO_ACCES_TOKEN +
        '&name=' +
        boardName,
      {
        method: 'POST',
      }
    )
      .then((response) => {
        this.requestStatus = response.status;
        return response.text();
      })
      .then((text) => {
        if (this.requestStatus === 200) {
          this.toastr.success(
            'Board has been added successfully',
            'Successful'
          );

          this.trelloBoardId = JSON.parse(text).id;
        }
      })
      .catch((err) => {
        this.toastr.error(err.message);
      });
  }

  public addCardOnTrelloBoardList(cardName: string, listName: string) {
    if (this.trelloCardMap.has(cardName)) {
      this.toastr.error(
        'Unfortunately , Failed to add card as card name already exist',
        'Failed'
      );
      return;
    }
    fetch(
      'https://api.trello.com/1/cards?key=' +
        this.TRELLO_ACCESS_KEY +
        '&token=' +
        this.TRELLO_ACCES_TOKEN +
        '&idList=' +
        this.trelloListIdMap.get(listName) +
        '&name=' +
        cardName,
      {
        method: 'POST',
      }
    )
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        this.requestStatus = response.status;

        return response.text();
      })
      .then((text) => {
        if (this.requestStatus === 200) {
          this.trelloCardId = JSON.parse(text).id;
          this.trelloCardMap.set(cardName, this.trelloCardId);
          this.toastr.success('Card has been added successfully', 'Successful');
        }
      })
      .catch((err) => {
        this.toastr.error(err.message);
      });
  }

  public removeCardOnTrelloBoardList(cardName: string) {
    fetch(
      'https://api.trello.com/1/cards/' +
        this.trelloCardMap.get(cardName) +
        '?key=' +
        this.TRELLO_ACCESS_KEY +
        '&token=' +
        this.TRELLO_ACCES_TOKEN,
      {
        method: 'DELETE',
      }
    )
      .then((response) => {
        if (response.status === 200) {
          this.toastr.success(
            'Card has been removed successfully',
            'Successful'
          );
        }

        return response.text();
      })
      .then((text) => console.log(text))
      .catch((err) => {
        this.toastr.error(err.message);
      });
  }

  public addListOnTrelloBoard(listName: string) {
    if (this.trelloListIdMap.has(listName)) {
      this.toastr.error(
        'Unfortunately , Failed to add list as list name already exist',
        'Failed'
      );
      return;
    }
    fetch(
      'https://api.trello.com/1/lists?key=' +
        this.TRELLO_ACCESS_KEY +
        '&token=' +
        this.TRELLO_ACCES_TOKEN +
        '&name=' +
        listName +
        '&idBoard=' +
        this.trelloBoardId,
      {
        method: 'POST',
      }
    )
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        this.requestStatus = response.status;
        if (response.status === 200) {
          this.toastr.success('List has been added successfully', 'Successful');
        }
        return response.text();
      })
      .then((text) => {
        if (this.requestStatus === 200) {
          this.trelloListId = JSON.parse(text).id;

          this.trelloListIdMap.set(listName, this.trelloListId);
        }
      })
      .catch((err) => {
        this.toastr.error(err.message);
      });
  }

  public removeListOnTrelloBoard(listName: string) {
    fetch(
      'https://api.trello.com/1/lists/' +
        this.trelloListIdMap.get(listName) +
        '/archiveAllCards?key=' +
        this.TRELLO_ACCESS_KEY +
        '&token=' +
        this.TRELLO_ACCES_TOKEN,
      {
        method: 'POST',
      }
    )
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);

        if (response.status === 200) {
          this.toastr.success(
            'List has been removed successfully',
            'Successful'
          );
        }
        return response.text();
      })
      .then((text) => console.log(text))
      .catch((err) => {
        this.toastr.error(err.message);
      });
  }

  public saveTrelloKeyAndToken(key: string, token: string) {
    if (key === '' || token === '') {
      this.toastr.error('Access token and access key are required', 'Failed');
      return;
    }
    this.TRELLO_ACCESS_KEY = key;
    this.TRELLO_ACCES_TOKEN = token;
    this.toastr.success(
      'Access keys has been added successfully',
      'Successful'
    );
  }
}
