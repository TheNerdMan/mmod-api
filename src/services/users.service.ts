import {
	Activity as ActivityDB, 
	Follow as FollowDB, 
	MapCredit as MapCreditDB, 
	Run as RunDB
} from '@prisma/client';
import { UserDto, UserProfileDto } from "../dto/user.dto"
import { PagedResponseDto } from "../dto/api-response.dto";
import { UserDalc } from "../dalc/users.dalc";

export class UsersService {
  	public getAll(offset?: number): PagedResponseDto<UserDB[]> {
		const response: UserDB[] = [
			{
				id: 1,
				steamID: "steam:123",
				alias: "jane",
				aliasLocked: true,
				avatar: "jane.jpg",
				avatarURL: "jane.jpg",
				bans: 0,
				roles: 1,
				country: "UK"
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
				country: "US"
			}
		]

		return { 
			totalCount: 100,
			returnCount: response.length,
			response: response
		}
	}

	public get(id: number): UserDB {
		return {
			id: 1,
			steamID: "steam:123",
			alias: "jane",
			aliasLocked: true,
			avatar: "jane.jpg",
			avatarURL: "jane.jpg",
			bans: 0,
			roles: 1,
			country: "UK"
		};
	}

	public getProfile(id: number): UserProfileDB {
		return {
			id: 1,
			steamID: "steam:123",
			bio: "combat surf best fight me",
			alias: "jane",
			aliasLocked: true,
			avatar: "jane.jpg",
			avatarURL: "jane.jpg",
			bans: 0,
			roles: 1,
			country: "UK"
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
}
