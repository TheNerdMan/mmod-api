import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '../services/users.service';
import { appConfig } from '../../config/config';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private http: HttpService) {
    }
    
    async validateSteam(userTicketRaw: string, idToVerify: string): Promise<string> {
		const userTicket = Buffer.from(userTicketRaw, 'utf8').toString('hex');

        const requestConfig = {
            params: {
                key: appConfig.steam.webAPIKey,
                appid: 669270,
                ticket: userTicket
            }
        }

        const sres = await lastValueFrom(
            this.http.get<any>('https://api.steampowered.com/ISteamUserAuth/AuthenticateUserTicket/v1/',
            requestConfig).pipe(
              map((res) => {
                return res.data;
              }),
            ),
          );
        
        if(!sres) { throw new HttpException('Bad Request', 400); }

        if (sres.data.response.error) {
            throw new HttpException('Bad Request', 400);
            // Bad request, and not sending the error object just in case of hidden bans
        }

        if (sres.data.response.params.result === 'OK') {
            if (idToVerify === sres.data.response.params.steamid) {
                const user = await this.userService.FindOrCreateFromGame(idToVerify);
                const token = await this.GenAccessToken(user, true);
                return token;                                   
            } else {
                throw new UnauthorizedException(); // Generate an error here
            }
        } else {
            return JSON.stringify(sres.data); // TODO parse the error?
        }
    }

	async CreateRefreshToken(user: User, gameAuth: boolean): Promise<string> {
        const refreshToken = await this.GenRefreshToken(user.id, gameAuth);
        await this.userService.UpdateRefreshToken(user.id, refreshToken);
		return Promise.resolve(refreshToken)
	}

	async RefreshToken(userID: number, refreshToken: string): Promise<string> {
		const user = await this.VerifyRefreshToken(userID, refreshToken);
        if (user)
            return this.GenAccessToken(user);

        throw new HttpException('Forbidden', 401);
	}

	async RevokeToken(userID: number): Promise<void> {
		await this.userService.UpdateRefreshToken(userID,'');
	}

	async GenAccessToken(usr: User, gameAuth?: boolean): Promise<string> {
		const payload = {
			id: usr.id,
			steamID: usr.steamID,
			roles: usr.roles,
			bans: usr.bans,
			gameAuth: !!gameAuth,
		};
		const options = {
			issuer: appConfig.domain,
			expiresIn: gameAuth ?
                appConfig.accessToken.gameExpTime
				: appConfig.accessToken.expTime,
		};
		return await this.jwtService.sign(payload, options);
	}

	async GenRefreshToken(userID: number, gameAuth?: boolean): Promise<string> {
		const payload = {
			id: userID,
		}
		const options = {
			issuer: appConfig.domain,
			expiresIn: gameAuth ?
                appConfig.accessToken.gameRefreshExpTime
				: appConfig.accessToken.refreshExpTime,
		}
		return await this.jwtService.sign(payload, options);
	}

    // TODO: Type response
	async VerifyToken(token: string): Promise<any> {
        try {
		    return this.jwtService.verify(token);
        } catch(err) {
			const clientErrors = ['TokenExpiredError','JsonWebTokenError','NotBeforeError'];
			if (clientErrors.includes(err.name)) {
                throw new HttpException('Invalid token given', 401);
			}
		}
	}

    async VerifyRefreshToken(userID: number, refreshToken: string): Promise<User> {
        const userAuth = await this.userService.GetAuth(userID);        
        if(userAuth.refreshToken == refreshToken) {
            return this.userService.Get(userID);            
        } else {
            return;
        }        
	}
}
