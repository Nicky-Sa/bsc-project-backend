import { Module } from '@nestjs/common';
import { TransactionsService } from 'models/transactions/transactions.service';
import { TransactionsController } from 'models/transactions/transactions.controller';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
