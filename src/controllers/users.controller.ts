import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
	Activity, 
	Follow, 
	MapCredit, 
	Run
} from '@prisma/client';
import { UserDto, UserProfileDto } from "../dto/user.dto"
import { PagedResponseDto } from "../dto/api-response.dto";
import { UsersService } from "../services/users.service";

@Controller("users")
@ApiTags("Users")
export class UsersController {

	constructor(private readonly usersService: UsersService) {}

	/**
	 * Gets all users.
	 * @param offset Offset this many records (paging).
     * @isInt offset
	 * @returns Returns all users (100 at a time). 
	 */
	@Get()
	public async GetAllUsers(@Query() skip?: number, @Query() take?: number): Promise<PagedResponseDto<UserDto[]>> {
		return this.usersService.getAll(skip, take);
	}

	/**
	 * Gets a specific user.
	 * @param userID Target user ID.
     * @isInt userID
	 * @returns Returns a single user.
	 */
	@Get("{userID}")
	public async GetUser(@Param() userID: number): Promise<UserDto> {
		return this.usersService.get(userID);
	}

	/**
	 * Gets a specific user's profile.
	 * @param userID Target user ID.
     * @isInt userID
	 * @returns Returns a single user's profile.
	 */
	@Get("{userID}/profile")
	public async GetUserProfile(@Param() userID: number): Promise<UserProfileDto> {
		return this.usersService.getProfile(userID);
	}

	/**
	 * Gets a specific user's activities.
	 * @param userID Target user ID.
     * @isInt userID
	 * @param offset Offset this many records (paging).
     * @isInt offset
	 * @returns Returns a list of a single user's activities (100 at a time).
	 */
	@Get("{userID}/activities")
	public async GetActivities(@Param() userID: number, @Query() skip?: number, @Query() take?: number): Promise<PagedResponseDto<Activity[]>> {
		return this.usersService.getActivities(userID, skip, take);
	}

	/**
	 * Gets a specific user's followers.
	 * @param userID Target user ID.
     * @isInt userID 
	 * @param offset Offset this many records (paging).
     * @isInt offset
	 * @returns Returns a list of a single user's followers (100 at a time).
	 */
	@Get("{userID}/followers")
	public async GetFollowers(@Param() userID: number, @Query() skip?: number, @Query() take?: number): Promise<PagedResponseDto<Follow[]>> {
		return this.usersService.getFollowers(userID, skip, take);
	}

	/**
	 * Gets all users that a user follows.
	 * @param userID Target user ID.
     * @isInt userID
	 * @param offset Offset this many records (paging).
     * @isInt offset
	 * @returns Returns users that this user follows (100 at a time).
	 */
	@Get("{userID}/follows")
	public async GetFollowed(@Param() userID: number, @Query() skip?: number, @Query() take?: number): Promise<PagedResponseDto<Follow[]>> {
		return this.usersService.getFollowed(userID, skip, take);
	}

	/**
	 * Gets all of a user's credits.
	 * @param userID Target user ID.
     * @isInt userID
	 * @param offset Offset this many records (paging).
     * @isInt offset
	 * @returns Returns a list of this user's credits (100 at a time).
	 */
	@Get("{userID}/credits")
	public async GetCredits(@Param() userID: number, @Query() skip?: number, @Query() take?: number): Promise<PagedResponseDto<MapCredit[]>> {
		return this.usersService.getCredits(userID, skip, take);
	}

	/**
	 * Gets all of a user's runs.
	 * @param userID Target user ID.
     * @isInt userID
	 * @param offset Offset this many records (paging).
     * @isInt offset
	 * @returns Returns a list of this user's runs (100 at a time).
	 */
	@Get("{userID}/runs")
	public async GetRuns(@Param() userID: number, @Query() skip?: number, @Query() take?: number): Promise<PagedResponseDto<Run[]>> {
		return this.usersService.getRuns(userID, skip, take);
	}
}
