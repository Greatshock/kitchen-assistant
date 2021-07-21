import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validatePassword } from '../../helpers/password.helper';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string, pass: string) {
        try {
            const user = await this.usersService.findOneByUsername(username);
            const passwordIsValid = await validatePassword(pass, user.password);

            if (passwordIsValid) {
                return user;
            }

            return null;
        } catch {
            return null;
        }
    }

    async login(user: any) {
        const payload = { sub: user.id };

        return { access_token: this.jwtService.sign(payload) };
    }
}
