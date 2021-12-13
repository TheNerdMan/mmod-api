import { Injectable } from '@nestjs/common';   
import {
	Activity as ActivityDB, 
	Follow as FollowDB, 
	MapCredit as MapCreditDB, 
	Run as RunDB
} from '@prisma/client';
import { UserDto, UserProfileDto } from "../dto/user.dto"
import { PagedResponseDto } from "../dto/api-response.dto";
import { UserDalc } from "../dalc/users.dalc";

@Injectable()
export class UsersService {
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
}
