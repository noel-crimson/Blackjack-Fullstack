import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { BlackjackController } from '../blackjack/blackjack.controller';
import { BlackjackService } from '../blackjack/blackjack.service';

@Module({
  controllers: [CardController],
  providers: [CardService, BlackjackService],
})
export class CardModule {}
