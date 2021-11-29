export interface User {
	id: number;
	steamID: string;
	alias: string;
	aliasLocked: boolean;
	avatar: string;
	avatarURL: string; //ViewModel
	roles: number;
	bans: number;
	country: string;
}

export interface UserProfile extends User{		
  	bio: string;
}
export interface UserActivity {
	id: number;
	type: Activity_Type;
	data: number;
}

export enum Activity_Type {
	ALL = 0,
	TIME_SUBMITTED = 1,
	MAP_UPLOADED = 2,
}

export interface UserFollow extends User {		
	notifyOn: number;
}

export interface UserCredit {		
	id: number;
	type: number;
}

export interface UserRun {		
	id: number;
	track: number;
	zoneNum: number;
	tick: number;
	tickRate: number;
	time: number; // ViewModel?
	flags: number;
	file: string;
	hash: string;	
}
