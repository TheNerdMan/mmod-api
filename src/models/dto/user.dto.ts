import { UserActivityDB } from "../db/user.db";

export interface UserActivityDto extends UserActivityDB {
	activity_type: Activity_Type;
}

export enum Activity_Type {
	ALL = 0,
	TIME_SUBMITTED = 1,
	MAP_UPLOADED = 2,
}
