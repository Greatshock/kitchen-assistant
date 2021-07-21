import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getHashedPassword } from '../../helpers/password.helper';
import { User } from './models/user.entity';
import { CreateUserDto } from './models/user.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async create({ password, ...rest }: CreateUserDto): Promise<number> {
        const hash = await getHashedPassword(password);
        const user = await this.usersRepository.save({ ...rest, password: hash });

        return user.id;
    }

    async findOne(id: number): Promise<User> {
        try {
            return await this.usersRepository.findOneOrFail(id);
        } catch (e) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    async findOneByUsername(username: string): Promise<User> {
        try {
            return await this.usersRepository.findOneOrFail({ where: { username } });
        } catch (e) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    async remove(id: number): Promise<User> {
        const user = await this.findOne(id);
        return await this.usersRepository.remove(user);
    }
}
