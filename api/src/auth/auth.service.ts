import { Injectable, UnauthorizedException, HttpStatus, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto, response: Response) {
    try {
      const { account_type, name, email, password } = registerAuthDto;

      console.log('registerAuthDto', registerAuthDto.email);

      if (account_type.trim() === '') {
        throw new HttpException('Account type is required', HttpStatus.BAD_REQUEST);
      }

      if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
        throw new HttpException('All fields are required', HttpStatus.BAD_REQUEST);
      }

      const hashedPassword = await bcrypt.hash(password, roundsOfHashing);

      registerAuthDto.password = hashedPassword;

      const user = await this.prismaService.user.create({
        data: {
          account_type,
          name,
          email,
          password: hashedPassword,
        },
      });

      const jwt = await this.jwtService.signAsync({ id: user.id });

      response.cookie(process.env.JWT_NAME, jwt, { httpOnly: true, sameSite: 'lax' });

      return {
        message: 'Register Successfully',
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // P2002 - is prisma error code for unique constraint violation...
        if (e.code === 'P2002') {
          throw new HttpException('This account is not available.', HttpStatus.BAD_REQUEST);
        }
      }
    }
  }

  async login(loginAuthDto: LoginAuthDto, response: Response) {
    try {
      const { email, password } = loginAuthDto;

      if (email === '' || password === '') {
        throw new HttpException('Email and password is required', HttpStatus.BAD_REQUEST);
      }

      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          email: true,
          password: true,
        },
      });

      if (!user) {
        throw new HttpException('Account not found', HttpStatus.BAD_REQUEST);
      }

      const isPasswordValue = await bcrypt.compare(password, user.password);

      if (!isPasswordValue) {
        throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
      }

      const jwt = await this.jwtService.signAsync({ id: user.id });

      response.cookie(process.env.JWT_NAME, jwt, { httpOnly: true, sameSite: 'lax' });

      return {
        message: 'Login Successfully',
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async logout(response: Response) {
    try {
      response.clearCookie(process.env.JWT_NAME);

      return {
        message: 'Log out successfully',
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async users() {
    try {
      const usersData = await this.prismaService.user.findMany({
        select: {
          id: true,
          account_type: true,
          name: true,
          email: true,
          password: true,
          created_at: true,
          updated_at: true,
        },
      });

      return usersData;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async user(request: Request) {
    try {
      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      const userData = await this.prismaService.user.findFirst({
        where: {
          id: cookieData.id,
        },
        select: {
          id: true,
          account_type: true,
          name: true,
          email: true,
          password: true,
          created_at: true,
          updated_at: true,
        },
      });

      return userData;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async userById(id: string, request: Request) {
    try {
      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      const userByIdData = await this.prismaService.user.findFirst({
        where: {
          id,
        },
        select: {
          id: true,
          account_type: true,
          name: true,
          email: true,
          password: true,
          created_at: true,
          updated_at: true,
        },
      });

      return userByIdData;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
