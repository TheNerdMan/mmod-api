import { User, 
	UserProfile, 
	UserActivity, 
	UserFollow, 
	UserCredit, 
	UserRun
} from "../models/user.model";
import { PagedResponse } from "../models/api-response.model";
import { UserDalc } from "../dalc/user.dalc";

export class UsersService {
  	public getAll(skip?: number): PagedResponse<User[]> {
		const response: User[] = [
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

	public get(id: number): User {
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

	public getProfile(id: number): UserProfile {
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

	public getActivities(id: number, skip?: number): PagedResponse<UserActivity[]> {
		const response: UserActivity[] = [];
		let totalCount: number = 0;

		// temp
		totalCount = 100;

		return { 
			totalCount: totalCount,
			returnCount: response.length,
			response: response
		}
	}

	public getFollowers(id: number, skip?: number): PagedResponse<UserFollow[]> {
		const response: UserFollow[] = [];
		let totalCount: number = 0;

		// temp
		totalCount = 100;

		return { 
			totalCount: totalCount,
			returnCount: response.length,
			response: response
		}
	}

	public getFollowed(id: number, skip?: number): PagedResponse<UserFollow[]> {
		const response: UserFollow[] = [];
		let totalCount: number = 0;

		// temp
		totalCount = 100;

		return { 
			totalCount: totalCount,
			returnCount: response.length,
			response: response
		}
	}

	public getCredits(id: number, skip?: number): PagedResponse<UserCredit[]> {
		const response: UserCredit[] = [];
		let totalCount: number = 0;

		// temp
		totalCount = 100;

		return { 
			totalCount: totalCount,
			returnCount: response.length,
			response: response
		}
	}

	public getRuns(id: number, skip?: number): PagedResponse<UserRun[]> {
		const response: UserRun[] = [];
		let totalCount: number = 0;

		// temp
		totalCount = 100;

		return { 
			totalCount: totalCount,
			returnCount: response.length,
			response: response
		}
	}
}
