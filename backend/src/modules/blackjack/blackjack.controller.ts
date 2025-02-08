import { Controller, Get, Post, Body } from '@nestjs/common';
import { BlackjackService } from './blackjack.service';

@Controller('blackjack')
export class BlackjackController {
  constructor(private readonly blackjackService: BlackjackService) {}

  @Get('score')
  getPlayerScore() {
    return this.blackjackService.getPlayerScore();
  }

  @Get('dealerscore')
  getDealerScore() {
    return this.blackjackService.getDealerScore();
  }

  @Get('aces')
  getPlayerAces() {
    return this.blackjackService.getPlayerAces();
  }

  @Get('dealeraces')
  getDealerAces() {
    return this.blackjackService.getDealerAces();
  }

  @Post('score')
  increasePlayerScore(@Body('value') value: number) {
    return this.blackjackService.increasePlayerScore(value);
  }

  @Post('dealerscore')
  increaseDealerScore(@Body('value') value: number) {
    return this.blackjackService.increaseDealerScore(value);
  }

  @Post('ace')
  increasePlayerAces(@Body('value') value: number) {
    return this.blackjackService.increasePlayerAces(value);
  }

  @Post('dealerace')
  increaseDealerAces(@Body('value') value: number) {
    return this.blackjackService.increaseDealerAces(value);
  }

  @Post('reset')
  resetPlayerScore() {
    this.blackjackService.resetPlayerScore();
  }

  @Post('dealerreset')
  resetDealerScore() {
    this.blackjackService.resetDealerScore();
  }

  @Post('resetall')
  resetScore() {
    this.blackjackService.resetScore();
  }
}
