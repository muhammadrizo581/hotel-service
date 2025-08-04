import { Module } from '@nestjs/common';
import { LoyaltyClientsService } from './loyalty-clients.service';
import { LoyaltyClientsController } from './loyalty-clients.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LoyaltyClientsController],
  providers: [LoyaltyClientsService],
})
export class LoyaltyClientsModule {}
