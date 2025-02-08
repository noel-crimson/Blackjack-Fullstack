import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CardService } from './card.service';
import { BlackjackService } from '../blackjack/blackjack.service';

@Controller('card')
export class CardController {
  constructor(
    private readonly cardService: CardService,
    private readonly blackjackService: BlackjackService,
  ) {}

  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @Get('dealer')
  findAllDealerCards() {
    return this.cardService.findAllDealerCards();
  }

  @Get('draw')
  drawCard() {
    const drawnCard = this.cardService.drawCard();
    const cardValue = +drawnCard.value;
    if (drawnCard.rank == 'Ace') {
      this.blackjackService.increasePlayerAces(1);
    }
    this.blackjackService.increasePlayerScore(cardValue);

    if (
      this.blackjackService.getPlayerScore() > 21 &&
      this.blackjackService.getPlayerAces() > 0
    ) {
      this.blackjackService.increasePlayerScore(-10);
      this.blackjackService.increasePlayerAces(-1);
    }

    return drawnCard;
  }

  @Get('dealerdraw')
  dealerDrawCard() {
    const drawnCard = this.cardService.drawCard();
    const cardValue = +drawnCard.value;
    this.createDealerCard({ name: drawnCard.name });
    if (drawnCard.rank == 'Ace') {
      this.blackjackService.increaseDealerAces(1);
    }
    this.blackjackService.increaseDealerScore(cardValue);
    if (
      this.blackjackService.getDealerScore() > 21 &&
      this.blackjackService.getDealerAces() > 0
    ) {
      this.blackjackService.increaseDealerScore(-10);
      this.blackjackService.increaseDealerAces(-1);
    }
    return drawnCard;
  }

  @Get('count')
  getCardCount() {
    return this.cardService.getCardCount();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cardService.findOne(id);
  }

  @Post()
  create(
    @Body()
    card: {
      name: string;
      rank: string;
      suit: 'Hearts' | 'Clubs' | 'Spades' | 'Diamonds';
      value: string;
    },
  ) {
    return this.cardService.create(card);
  }

  @Post()
  createDealerCard(
    @Body()
    card: {
      name: string;
    },
  ) {
    return this.cardService.createDealerCard(card);
  }

  @Post('shuffle')
  shuffleDeck() {
    return this.cardService.shuffleDeck();
  }

  @Patch(':id') //PATCH /card/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updatedCard: {
      name?: string;
      rank?: string;
      suit?: 'Hearts' | 'Clubs' | 'Spades' | 'Diamonds';
      value?: string;
    },
  ) {
    return this.cardService.update(id, updatedCard);
  }

  @Delete('dealercards')
  deleteDealerCards() {
    return this.cardService.deleteDealerCards();
  }

  @Delete(':id') //DELETE /card/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.cardService.delete(id);
  }
}
