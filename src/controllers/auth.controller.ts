import { Body, Req, Res, Controller, Get, HttpException, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as passport from 'passport';
import { Public } from '../auth/public.decorator';
import { AuthService } from '../auth/auth.service';

@Controller("api/v1/auth")
@ApiTags("Auth")
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary: "Authenticates using steam"}) 
    @Get("steam") 
    @Public()
    public AuthSteam(@Req() req, @Res() res): void {     
		passport.authenticate('steam', { session: false })(req, res);
    }

    @ApiOperation({summary: "Return url from steam, validate and return valid JWT"}) 
    @Get("steam/return") 
    @Public()
    public async ReturnFromSteam(@Query() res): Promise<any> {
        console.log("steam/return",res);
        return res;
    }

    @ApiOperation({summary: "Gets the JWT using a steam user ticket"}) 
    @Get("steam/user") 
    @Public()
    public async GetUserFromSteam(@Query('userID') userID: string, @Query() userTicketRaw?: string): Promise<string> {
        
        if(!userID) { throw new HttpException('Missing userID', 400) }
        if(!userTicketRaw) { throw new HttpException('Missing userTicketRaw', 400) }

        const jwt = await this.authService.validateSteam(userTicketRaw, userID);
        if (!jwt) { throw new HttpException("Error validtating Steam user ticket", 500) }
        return jwt;
    }
}
