import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export function getHashedPassword(pass: string) {
    return bcrypt.hash(pass, SALT_ROUNDS);
}

export function validatePassword(pass: string, hashedPass: string) {
    return bcrypt.compare(pass, hashedPass);
}
