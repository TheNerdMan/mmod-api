import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { User } from '@prisma/client';
import { UsersService } from '../services/users.service';
import { appConfig } from '../../config/config';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private http: HttpService) {
    }
    
    async validateSteam(userTicketRaw: string, idToVerify: number): Promise<string> {
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
                const user: User = this.userService.findOrCreateFromGame(idToVerify);
                const token = await this.genAccessToken(user, true);
                return token;                                   
            } else {
                throw new UnauthorizedException(); // Generate an error here
            }
        } else {
            return JSON.stringify(sres.data); // TODO parse the error?
        }
    }

	async createRefreshToken(user: User, gameAuth: boolean): Promise<string> {
        const refreshToken = await this.genRefreshToken(user.id, gameAuth);
        await this.userService.updateRefreshToken(refreshToken, user.id);
		return Promise.resolve(refreshToken)
	}

	async refreshToken(userID: number, refreshToken: string): Promise<string> {
		const user = await this.userService.refreshToken(userID, refreshToken);
        if (user)
            return this.genAccessToken(user);

        throw new HttpException('Forbidden', 401);
	}

	async revokeToken(userID: number): Promise<void> {
		await this.userService.update(userID,{ refreshToken: '' });
	}

	async genAccessToken(usr: User, gameAuth: boolean): Promise<string> {
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
		return await createJWT(payload, appConfig.accessToken.secret, options);
	}

	async genRefreshToken(userID: number): Promise<string> {
		const payload = {
			id: userID,
		}
		const options = {
			issuer: appConfig.domain,
		}
		return await createJWT(payload, appConfig.accessToken.secret, options);
	}

	async verifyToken(token: string): Promise<string> {
        try {
		    return await verifyJWT(token, appConfig.accessToken.secret)
        } catch(err) {
			const clientErrors = ['TokenExpiredError','JsonWebTokenError','NotBeforeError'];
			if (clientErrors.includes(err.name)) {
                throw new HttpException('Invalid token given', 401);
			}
		}
	}

}
