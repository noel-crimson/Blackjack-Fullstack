import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const passHash = await argon2.hash(createUserDto.password);
    try {
      return await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          password: passHash,
        },
      });
    } catch (error) {
      if (error.code == 'P2002')
        throw new ConflictException('User already exists');
    }
  }

  async findOne(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
