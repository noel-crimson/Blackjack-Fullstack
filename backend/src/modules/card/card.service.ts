import { Injectable } from '@nestjs/common';

@Injectable()
export class CardService {
  private cards = [
    {
      id: 1,
      name: 'As',
      rank: 'Ace',
      suit: 'Spades',
      value: '11',
    },
    {
      id: 2,
      name: 'Qh',
      rank: 'Queen',
      suit: 'Hearts',
      value: '10',
    },
    {
      id: 3,
      name: '5c',
      rank: '5',
      suit: 'Clubs',
      value: '5',
    },
  ];

  private dealerCards = [];

  findAll() {
    //console.log('findAll called, cards:', this.cards);
    return this.cards;
  }

  findOne(id: number) {
    console.log('findOne endpoint hit');
    return this.cards.find((card) => card.id === id);
  }

  create(card: {
    name: string;
    rank: string;
    suit: 'Hearts' | 'Clubs' | 'Spades' | 'Diamonds';
    value: string;
  }) {
    if (this.cards.length < 1) {
      const newCard = {
        id: 1,
        ...card,
      };
      this.cards.push(newCard);
      return newCard;
    }
    const cardsByHighestID = [...this.cards].sort((a, b) => b.id - a.id);
    const newCard = {
      id: cardsByHighestID[0].id + 1,
      ...card,
    };

    this.cards.push(newCard);
    return newCard;
  }

  update(
    id: number,
    updatedCard: {
      name?: string;
      rank?: string;
      suit?: 'Hearts' | 'Clubs' | 'Spades' | 'Diamonds';
      value?: string;
    },
  ) {
    this.cards = this.cards.map((card) => {
      if (card.id === id) {
        return { ...card, ...updatedCard };
      }
      return card;
    });
    return this.findOne(id);
  }

  deleteDealerCards() {
    this.dealerCards = this.dealerCards.filter((card) => card.id !== card.id);
    return this.dealerCards;
  }

  deleteAll() {
    this.cards = this.cards.filter((card) => card.id !== card.id);
    return this.cards;
  }

  delete(id: number) {
    const removedCard = this.findOne(id);
    this.cards = this.cards.filter((card) => card.id !== removedCard.id);
    return removedCard;
  }

  drawCard() {
    if (this.cards.length === 0) {
      return undefined;
    }
    const cardsByHighestID = [...this.cards].sort((a, b) => b.id - a.id);
    const drawnCard = cardsByHighestID[0];
    this.delete(cardsByHighestID[0].id);
    return drawnCard;
  }

  evaluateCard = (card: string) => {
    let name = '';
    let value = '0';
    const rank = card[0];
    const suit = card[1];

    switch (rank) {
      case 'Q':
        name = 'Queen';
        value = '10';
        break;
      case 'K':
        name = 'King';
        value = '10';
        break;
      case 'J':
        name = 'Jack';
        value = '10';
        break;
      case 'A':
        name = 'Ace';
        value = '11'; // Default Ace value
        break;
      case 'X':
        name = '10';
        value = '10';
        break;
      default:
        name = rank;
        value = rank;
    }

    let suitName: 'Spades' | 'Hearts' | 'Clubs' | 'Diamonds';
    switch (suit) {
      case 'h':
        suitName = 'Hearts';
        break;
      case 's':
        suitName = 'Spades';
        break;
      case 'c':
        suitName = 'Clubs';
        break;
      case 'd':
        suitName = 'Diamonds';
        break;
    }

    return { rank: name, suit: suitName, value: value };
  };

  shuffleDeck() {
    const cardArray = [];
    //make a clean deck
    for (const suit of ['h', 'c', 's', 'd']) {
      for (const card of [
        'K',
        'Q',
        'J',
        'A',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'X',
      ]) {
        cardArray.push(card + suit);
      }
    }

    const cardArrayShuffled = [];
    //shuffle
    while (cardArray.length > 0) {
      const randomID = Math.floor(Math.random() * cardArray.length); //number between 0 and cardArray.length
      cardArrayShuffled.push(cardArray[randomID]);
      cardArray.splice(randomID, 1);
    }

    //clear deck
    console.log('shuffle: cleaning deck');
    this.deleteAll();
    //repopulate deck
    for (const cardName of cardArrayShuffled) {
      const newCard = {
        name: cardName,
        ...this.evaluateCard(cardName),
      };
      console.log('shuffle: inserting back ' + cardName);
      this.create(newCard);
    }
    this.findAll();
  }

  getCardCount() {
    return this.cards.length;
  }

  createDealerCard(card: { name: string }) {
    if (this.dealerCards.length < 1) {
      const newCard = {
        id: 1,
        ...card,
      };
      this.dealerCards.push(newCard);
      return newCard;
    }
    const cardsByHighestID = [...this.dealerCards].sort((a, b) => b.id - a.id);
    const newCard = {
      id: cardsByHighestID[0].id + 1,
      ...card,
    };

    this.dealerCards.push(newCard);
    return newCard;
  }

  findAllDealerCards() {
    return this.dealerCards;
  }
}
