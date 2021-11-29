import {
	Controller,
	Get,
	Path,
	Query,
	Route
} from "tsoa";
import { 
	User, 
	UserProfile, 
	UserActivity, 
	UserFollow, 
	UserCredit, 
	UserRun
} from "../models/user.model";
import { PagedResponse } from "../models/api-response.model";
import { UsersService } from "../services/user.service";

@Route("users")
export class UsersController extends Controller {
	@Get()
	public async GetAllUsers(@Query() skip?: number): Promise<PagedResponse<User[]>> {
		return new UsersService().getAll(skip);
	}

	@Get("{userId}")
	public async GetUser(@Path() userId: number): Promise<User> {
		return new UsersService().get(userId);
	}

	@Get("{userId}/profile")
	public async GetUserProfile(@Path() userId: number): Promise<UserProfile> {
		return new UsersService().getProfile(userId);
	}

	@Get("{userId}/activities")
	public async GetActivities(@Path() userId: number, @Query() skip?: number): Promise<PagedResponse<UserActivity[]>> {
		return new UsersService().getActivities(userId, skip);
	}

	@Get("{userId}/followers")
	public async GetFollowers(@Path() userId: number, @Query() skip?: number): Promise<PagedResponse<UserFollow[]>> {
		return new UsersService().getFollowers(userId, skip);
	}

	@Get("{userId}/follows")
	public async GetFollowed(@Path() userId: number, @Query() skip?: number): Promise<PagedResponse<UserFollow[]>> {
		return new UsersService().getFollowed(userId, skip);
	}

	@Get("{userId}/credits")
	public async GetCredits(@Path() userId: number, @Query() skip?: number): Promise<PagedResponse<UserCredit[]>> {
		return new UsersService().getCredits(userId, skip);
	}

	@Get("{userId}/runs")
	public async GetRuns(@Path() userId: number, @Query() skip?: number): Promise<PagedResponse<UserRun[]>> {
		return new UsersService().getRuns(userId, skip);
	}
}
