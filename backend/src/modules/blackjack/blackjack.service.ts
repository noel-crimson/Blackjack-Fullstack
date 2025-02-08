import { Injectable } from '@nestjs/common';

@Injectable()
export class BlackjackService {
  private static playerScore = 0;
  private static dealerScore = 0;
  private static playerAces = 0;
  private static dealerAces = 0;

  getPlayerScore(): number {
    return BlackjackService.playerScore;
  }

  getDealerScore(): number {
    return BlackjackService.dealerScore;
  }

  getPlayerAces(): number {
    return BlackjackService.playerAces;
  }

  getDealerAces(): number {
    return BlackjackService.dealerAces;
  }

  increasePlayerAces(value: number): number {
    BlackjackService.playerAces += value;
    return BlackjackService.playerAces;
  }

  increaseDealerAces(value: number): number {
    BlackjackService.dealerAces += value;
    return BlackjackService.dealerAces;
  }

  increasePlayerScore(value: number): number {
    BlackjackService.playerScore += value;
    return BlackjackService.playerScore;
  }

  increaseDealerScore(value: number): number {
    BlackjackService.dealerScore += value;
    return BlackjackService.dealerScore;
  }

  resetPlayerScore(): void {
    BlackjackService.playerScore = 0;
    BlackjackService.playerAces = 0;
  }

  resetDealerScore(): void {
    BlackjackService.dealerScore = 0;
    BlackjackService.dealerAces = 0;
  }

  resetScore(): void {
    this.resetDealerScore();
    this.resetPlayerScore();
  }
}
