import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_KEY } from './jwt.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // TODO add expiration and use refresh tokens
            ignoreExpiration: true,
            secretOrKey: JWT_KEY,
        });
    }

    async validate(payload: any) {
        return { id: payload.sub };
    }
}
