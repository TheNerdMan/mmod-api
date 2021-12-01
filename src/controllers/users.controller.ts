import {
	Controller,
	Get,
	Path,
	Query,
	Route,
	Tags
} from "tsoa";
import { 
	User, 
	UserProfile, 
	UserActivity, 
	UserFollow, 
	UserCredit, 
	UserRun
} from "../models/user.model";
import { PagedResponse } from "../dto/api-response.model";
import { UsersService } from "../services/users.service";

@Route("users")
@Tags("Users")
export class UsersController extends Controller {
	/**
	 * Gets all users.
	 * @param offset Offset this many records (paging).
     * @isInt offset
	 * @returns Returns all users (100 at a time). 
	 */
	@Get()
	public async GetAllUsers(@Query() offset?: number): Promise<PagedResponse<User[]>> {
		return new UsersService().getAll(offset);
	}

	/**
	 * Gets a specific user.
	 * @param userID Target user ID.
     * @isInt userID
	 * @returns Returns a single user.
	 */
	@Get("{userID}")
	public async GetUser(@Path() userID: number): Promise<User> {
		return new UsersService().get(userID);
	}

	/**
	 * Gets a specific user's profile.
	 * @param userID Target user ID.
     * @isInt userID
	 * @returns Returns a single user's profile.
	 */
	@Get("{userID}/profile")
	public async GetUserProfile(@Path() userID: number): Promise<UserProfile> {
		return new UsersService().getProfile(userID);
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
	public async GetActivities(@Path() userID: number, @Query() offset?: number): Promise<PagedResponse<UserActivity[]>> {
		return new UsersService().getActivities(userID, offset);
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
	public async GetFollowers(@Path() userID: number, @Query() offset?: number): Promise<PagedResponse<UserFollow[]>> {
		return new UsersService().getFollowers(userID, offset);
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
	public async GetFollowed(@Path() userID: number, @Query() offset?: number): Promise<PagedResponse<UserFollow[]>> {
		return new UsersService().getFollowed(userID, offset);
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
	public async GetCredits(@Path() userID: number, @Query() offset?: number): Promise<PagedResponse<UserCredit[]>> {
		return new UsersService().getCredits(userID, offset);
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
	public async GetRuns(@Path() userID: number, @Query() offset?: number): Promise<PagedResponse<UserRun[]>> {
		return new UsersService().getRuns(userID, offset);
	}
}
