import { Body, Controller, Get, HttpException, Param, Redirect } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/app.module';
import { AuthService } from '../auth/auth.service';

@Controller("auth")
@ApiTags("Auth")
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary: "Authenticates using steam"}) 
    @Get("steam") 
    @Public()
    public AuthSteam(): string {
        return 'token';
    }

    @ApiOperation({summary: "Return url from steam"}) 
    @Get("steam/return") 
    @Public()
    public ReturnFromSteam(): void {
        Redirect('www.google.com');
    }

    @ApiOperation({summary: "Gets the JWT using a steam user ticket"}) 
    @Get("steam/user") 
    @Public()
    public async GetUserFromSteam(@Param('userID') userID: number, @Body() userTicketRaw?: string): Promise<string> {
        const jwt = await this.authService.validateSteam(userTicketRaw, userID);
        if (!jwt) { throw new HttpException("Error validtating Steam user ticket", 500) }
        return jwt;
    }
}
