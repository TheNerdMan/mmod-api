import { Body, Controller, Get, HttpException, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as passport from 'passport';
import { Public } from '../auth/public.decorator';
import { AuthService } from '../auth/auth.service';

@Controller("auth")
@ApiTags("Auth")
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary: "Authenticates using steam"}) 
    @Get("steam") 
    @Public()
    public AuthSteam(): void {
        passport.authenticate('steam', {failureRedirect: '/', successRedirect: '/steam/return'})
    }

    @ApiOperation({summary: "Return url from steam, validate and return valid JWT"}) 
    @Get("steam/return") 
    @Public()
    public async ReturnFromSteam(@Body() body: any): Promise<any> {
        return body;
    }

    @ApiOperation({summary: "Gets the JWT using a steam user ticket"}) 
    @Get("steam/user") 
    @Public()
    public async GetUserFromSteam(@Param('userID') userID: string, @Body() userTicketRaw?: string): Promise<string> {
        const jwt = await this.authService.validateSteam(userTicketRaw, userID);
        if (!jwt) { throw new HttpException("Error validtating Steam user ticket", 500) }
        return jwt;
    }
}
