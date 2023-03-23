import { Module } from '@nestjs/common';
import { UserService } from 'models/user/user.service';
import { UserController } from 'models/user/user.controller';
import { PackagesModule } from '@/models/packages/packages.module';
import { TransactionsModule } from '@/models/transactions/transactions.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [PackagesModule, TransactionsModule],
})
export class UserModule {}
