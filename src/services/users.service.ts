import { HttpException, Injectable } from '@nestjs/common';   
import { HttpService } from '@nestjs/axios';
import {
	Activity as ActivityDB, 
	Follow as FollowDB, 
	MapCredit as MapCreditDB, 
	Prisma, 
	Run as RunDB,
	User,
} from '@prisma/client';
import { UserDto, UserProfileDto } from "../dto/user.dto"
import { PagedResponseDto } from "../dto/api-response.dto";
import { UserDalc } from "../dalc/users.dalc";
import { appConfig } from 'config/config';
import { lastValueFrom, map } from 'rxjs';
import { Parser, parserDefaults } from 'xml2ts';

@Injectable()
export class UsersService {
  
	constructor(
		private http: HttpService,
		private userDalc: UserDalc,
	){}

	//#region GETs
  	public getAll(skip?: number, take?: number): PagedResponseDto<UserDto[]> {
		  
		const response: UserDto[] = [
			{
				id: 1,
				steamID: "steam:123",
				alias: "jane",
				aliasLocked: true,
				avatar: "jane.jpg",
				avatarURL: "jane.jpg",
				bans: 0,
				roles: 1,
				country: "UK",
				createdAt: new Date,
				updatedAt: new Date
			},
			{
				id: 2,
				steamID: "steam:1234",
				alias: "john",
				aliasLocked: true,
				avatar: "john.jpg",
				avatarURL: "john.jpg",
				bans: 1,
				roles: 0,
				country: "US",
				createdAt: new Date,
				updatedAt: new Date
			}
		]

		return { 
			totalCount: 100,
			returnCount: response.length,
			response: response
		}
	}

	public get(id: number): UserDto {
		return {
			id: 1,
			steamID: "steam:123",
			alias: "jane",
			aliasLocked: true,
			avatar: "jane.jpg",
			avatarURL: "jane.jpg",
			bans: 0,
			roles: 1,
			country: "UK",			
			createdAt: new Date,
			updatedAt: new Date
		};
	}

	public getBySteamID(id: string): UserDto {
		return {
			id: 1,
			steamID: "steam:123",
			alias: "jane",
			aliasLocked: true,
			avatar: "jane.jpg",
			avatarURL: "jane.jpg",
			bans: 0,
			roles: 1,
			country: "UK",			
			createdAt: new Date,
			updatedAt: new Date
		};
	}

	public getProfile(id: number): UserProfileDto {
		return {
			id: 1,
			userID: 1,
			steamID: "steam:123",
			bio: "combat surf best fight me",
			alias: "jane",
			aliasLocked: true,
			avatar: "jane.jpg",
			avatarURL: "jane.jpg",
			bans: 0,
			roles: 1,
			country: "UK",	
			featuredBadgeID: 1,
			createdAt: new Date,
			updatedAt: new Date
		};
	}

	public getActivities(id: number, skip?: number, take?: number): PagedResponseDto<ActivityDB[]> {
		const response: ActivityDB[] = [];
		let totalCount = 0;

		// temp
		totalCount = 100;

		return { 
			totalCount: totalCount,
			returnCount: response.length,
			response: response
		}
	}

	public getFollowers(id: number, skip?: number, take?: number): PagedResponseDto<FollowDB[]> {
		const response: FollowDB[] = [];
		let totalCount = 0;

		// temp
		totalCount = 100;

		return { 
			totalCount: totalCount,
			returnCount: response.length,
			response: response
		}
	}

	public getFollowed(id: number, skip?: number, take?: number): PagedResponseDto<FollowDB[]> {
		const response: FollowDB[] = [];
		let totalCount = 0;

		// temp
		totalCount = 100;

		return { 
			totalCount: totalCount,
			returnCount: response.length,
			response: response
		}
	}

	public getCredits(id: number, skip?: number, take?: number): PagedResponseDto<MapCreditDB[]> {
		const response: MapCreditDB[] = [];
		let totalCount = 0;

		// temp
		totalCount = 100;

		return { 
			totalCount: totalCount,
			returnCount: response.length,
			response: response
		}
	}

	public getRuns(id: number, skip?: number, take?: number): PagedResponseDto<RunDB[]> {
		const response: RunDB[] = [];
		let totalCount = 0;

		// temp
		totalCount = 100;

		return { 
			totalCount: totalCount,
			returnCount: response.length,
			response: response
		}
	}
	//#endregion

	async UpdateRefreshToken(refreshToken: string, id: number): Promise<User> {
		throw new Error('Method not implemented.');
    }
	async RefreshToken(userID: number, refreshToken: string): Promise<User> {
		const updateInput: Prisma.UserAuthUpdateInput = {};
		updateInput.refreshToken = refreshToken;
        return this.userDalc.UpdateAuth(userID, updateInput);
    }
	async Update(userID: number, updateInput: UserUpdateInput): Promise<User> {
        throw new Error('Method not implemented.');
    }
	async FindOrCreateFromGame(steamID: string): Promise<User> {
		const data = {
			summaries: {},
			xmlData: {},
		};

		const getPlayerResponse = await lastValueFrom(
			this.http.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/`, {
				params: {
					key: appConfig.steam.webAPIKey,
					steamids: steamID,
				}
			}).pipe(
				map((res) => {
					return res.data;
				})
			)
		)

		if (getPlayerResponse.response.error) {
			return Promise.reject(new HttpException('Failed to get any player summaries.', 500));
		}
		if (!getPlayerResponse.response.players[0]) {			
			return Promise.reject(new HttpException('Failed to get player summary.', 500));
		}

		data.summaries = getPlayerResponse.response.players[0];
		
		const getSteamProfileResponse = await lastValueFrom(
			this.http.get(`https://steamcommunity.com/profiles/${steamID}?xml=1`).pipe(
				map(async (res) => {
					const parser = new Parser(parserDefaults);
					return await parser.parseString(res.data);
				})
			)
		)
		data.xmlData = getSteamProfileResponse;

		if (data.summaries.profilestate !== 1)
			return Promise.reject(new HttpException('We do not authenticate Steam accounts without a profile. Set up your community profile on Steam!', 403));
		if (appConfig.steam.preventLimited && data.xmlData.profile.isLimitedAccount[0] === '1')
			return Promise.reject(new HttpException('We do not authenticate limited Steam accounts. Buy something on Steam first!', 403));
		if (steamID !== data.summaries.steamid)
			return Promise.reject(new HttpException('User fetched is not the authenticated user!', 400));

		const profile: UserDto = {
			alias:  data.summaries.personaname,
			avatarURL: data.summaries.avatarfull,
			country: data.summaries.locccountrycode,
			id: 0,
			steamID: steamID,
			aliasLocked: false,
			avatar: '',
			roles: 0,
			bans: 0,
			createdAt: undefined,
			updatedAt: undefined,
		};
		
		return this.FindOrCreateFromSteamID(profile);
	}

	// TODO: openIDProfile Type
	async FindOrCreateFromWeb(openIDProfile: any): Promise<User> {

		const profile: UserDto = {
			alias: openIDProfile.alias,
			avatarURL: openIDProfile.avatarURL,
			country: openIDProfile.country,
			id: 0,
			steamID: openIDProfile.id,
			aliasLocked: false,
			avatar: '',
			roles: 0,
			bans: 0,
			createdAt: undefined,
			updatedAt: undefined,
		};

		return this.FindOrCreateFromSteamID(profile);
	}

	async FindOrCreateFromSteamID(profile: UserDto): Promise<User> {
		const whereInput: Prisma.UserWhereInput = {};
		whereInput.steamID = profile.steamID;

		const user = await this.userDalc.FindOne(whereInput)

		if(user){
			const updateInput: Prisma.UserUpdateInput = {};
			updateInput.alias = profile.alias;
			updateInput.avatar = profile.avatar;
			updateInput.country = profile.country;
			updateInput.updatedAt = new Date();

			return this.userDalc.Update(user.ID, updateInput)
		} else {
			const createInput: Prisma.UserCreateInput = {
				createdAt: new Date(),
				updatedAt: new Date(),
			};
			createInput.steamID = profile.steamID;
			createInput.alias = profile.alias;
			createInput.avatar = profile.avatarURL;
			createInput.country = profile.country;

			return this.userDalc.Insert(createInput);
		}
	}
}
