import { 
	User,
	Profile
} from '@prisma/client';

export interface UserDto extends User {
	avatarURL: string;
}

export interface UserProfileDto extends UserDto, Profile { }
