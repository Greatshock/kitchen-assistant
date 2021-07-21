import { Controller, Get, Request } from '@nestjs/common';

@Controller()
export class AppController {
    @Get('protected')
    public protectedEndpoint(@Request() req) {
        return 'You have an access to protected infrastructure. User id = ' + req.user.id;
    }
}
