import { Test } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import * as pactum from 'pactum';
import { LoginDto, SignUpDto } from '@/auth/dto';
import { UpdateUserDto } from '@/user/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(5009);
    prismaService = app.get(PrismaService);
    await prismaService.cleanDB();
    pactum.request.setBaseUrl('http://localhost:5009');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const signUpDto: SignUpDto = {
      username: 'test31@gmail.com',
      password: 'test1',
      phoneNumber: '09100045991',
      fullName: 'nickz',
    };
    describe('Signup', () => {
      it('should throw if username empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: signUpDto.password,
          })
          .expectStatus(400);
        // .inspect();
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            username: signUpDto.username,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('should signup', () => {
        return pactum.spec().post('/auth/signup').withBody(signUpDto).expectStatus(201);
      });
    });

    describe('Login', () => {
      const loginDto: LoginDto = {
        username: 'test31@gmail.com',
        password: 'test1',
      };
      it('should throw if username empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            password: loginDto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            username: loginDto.username,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/login').expectStatus(400);
      });
      it('should login', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(loginDto)
          .expectStatus(200)
          .stores('accessToken', 'accessToken');
      });
    });
  });

  describe('User', () => {
    describe('userInfo', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/current')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}',
          })
          .expectStatus(200)
          .inspect();
      });
    });
    describe('Edit user', () => {
      it('should update user', () => {
        const dto: UpdateUserDto = {
          fullName: 'Vladimir',
        };
        return pactum
          .spec()
          .patch('/users/update')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.fullName);
      });
    });
  });
});
