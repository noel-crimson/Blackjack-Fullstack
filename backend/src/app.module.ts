import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './modules/todo/todo.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './modules/token/token.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CardController } from './modules/card/card.controller';
import { CardService } from './modules/card/card.service';
import { CardModule } from './modules/card/card.module';
import { BlackjackController } from './modules/blackjack/blackjack.controller';
import { BlackjackService } from './modules/blackjack/blackjack.service';
import { BlackjackModule } from './modules/blackjack/blackjack.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TodoModule,
    PrismaModule,
    TokenModule,
    UserModule,
    AuthModule,
    CardModule,
    BlackjackModule,
  ],
  controllers: [AppController, CardController, BlackjackController],
  providers: [AppService, CardService, BlackjackService],
})
export class AppModule {}
