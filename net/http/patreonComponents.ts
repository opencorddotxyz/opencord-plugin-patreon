export interface LoginRequest {
  code: string;
}

export interface LoginResponse {
  token: string;
  manageable: boolean;
  setup: boolean;
  connected: boolean;
  eligible: boolean;
  minted: boolean;
  spaceProfile?: SpaceProfile;
  membershipLevels?: Array<MembershipLevel>;
  corrMembershipLevel?: MembershipLevel;
  outdatedMembershipLevels?: Array<MembershipLevel>;
}

export interface SpaceProfile {
  avatar: string;
  name: string;
  intro: string;
  patreonURL: string;
}

export interface MembershipLevel {
  id: string;
  image: string;
  name: string;
  intro: string;
  roles: Array<Role>;
}

export interface Role {
  id: string;
  name: string;
  color: string;
}
export interface ValidateOAuth2TokenRequest {
  code: string;
}

export interface GetHomepageResponse {
  setup: boolean;
  manageable: boolean;
  spaceProfile?: SpaceProfile;
  connected: boolean;
  membershipLevels?: Array<MembershipLevel>;
  outdatedMembershipLevels?: Array<MembershipLevel>;
  eligible: boolean;
  minted: boolean;
  corrMembershipLevel?: MembershipLevel;
}

export interface ModifySpaceProfileRequest {
  avatar?: string;
  name?: string;
  intro?: string;
}

export interface RefreshMembershipLevelsResponse {
  membershipLevels: Array<MembershipLevel>;
  outdatedMembershipLevels: Array<MembershipLevel>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RemoveOutdatedMembershipLevelsRequest {}

export interface RemoveOutdatedMembershipLevelsRequestParams {
  levelId: string;
}

export interface ModifyMembershipLevelRequest {
  avatar?: string;
  name?: string;
  intro?: string;
}

export interface ModifyMembershipLevelRequestParams {
  levelId: string;
}

export interface AssignedRolesForMembershipLevelRequest {
  roleIds: Array<string>;
}

export interface AssignedRolesForMembershipLevelRequestParams {
  levelId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetAvailableRolesForMembershipLevelRequest {}

export interface GetAvailableRolesForMembershipLevelRequestParams {
  levelId: string;
}

export interface GetAvailableRolesForMembershipLevelResponse {
  roles: Array<Role>;
}
