import { Module } from '@nestjs/common';
import { AuthController } from 'models/auth/auth.controller';
import { AuthService } from 'models/auth/auth.service';
import { UserModule } from '@/models/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'models/auth/strategy';

@Module({
  imports: [UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
