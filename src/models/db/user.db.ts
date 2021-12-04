export interface UserDB {
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

export interface UserProfileDB extends UserDB{		
  	bio: string;
}
export interface UserActivityDB {
	id: number;
	type: number;
	data: number;
}

export interface UserFollowDB extends UserDB {		
	notifyOn: number;
}

export interface UserCreditDB {		
	id: number;
	type: number;
}

export interface UserRunDB {		
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
