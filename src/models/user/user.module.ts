import { Module } from '@nestjs/common';
import { UserService } from 'models/user/user.service';
import { UserController } from 'models/user/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
