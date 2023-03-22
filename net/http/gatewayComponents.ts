export interface LoginRequest {
  code: string;
}

export interface Role {
	id:string;
	name:  string;
	color: string;
}

export interface SpaceInfo {
	avatar:string;
	name:string;
  intro: string;
	patreonURL:string;
}

export interface MembershipNFTPass {
	image: string ;
	name: string ;
	intro:string ;
	roles: Role[] ;
}

export interface LoginResponse {
  token: string; 
  setup: boolean;
  manageable: boolean;
  spaceInfo?: SpaceInfo;
  connected: boolean;
  membershipNFTPasses?: any;
  eligible: boolean;
  minted: boolean;
  corrMembershipNFTPass?:any
}

export interface ValidateOAuth2TokenRequest { 
  code: string;
}

export interface ValidateOAuth2TokenResponse { 
}