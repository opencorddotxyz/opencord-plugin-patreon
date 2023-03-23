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

export interface CreateUploadsRequest {
  payloads: Array<UploadPayloadRequest>; // ###2022-07-08###-###
}

export interface UploadPayloadRequest {
  index: number; // ###2022-07-08###-###
  type: number; // ###2022-07-08###-### 1: avatar, 2: logo, 3: banner, 4: attachment 5: userBanner
  contentType: string; // ###2022-07-08###-###
  contentLength: number; // ###2022-07-08###-###
  ownerType: number; // ###2022-07-08###-### 1: user, 2: server
  ownerId: string; // ###2022-07-08###-### userId/serverId
}

export interface UploadSignedHeader {
  key: string; // ###2022-07-08###-###
  value: string; // ###2022-07-08###-###
}

export interface UploadPresignedObject {
  index: number; // ###2022-07-08###-###
  type: number; // ###2022-07-08###-###
  urls: string; // ###2022-07-08###-###
  headers: Array<UploadSignedHeader>; // ###2022-07-08###-###
  expiredAt: number; // ###2022-07-08###-###
}

export interface CreateUploadsResponse {
  objects: Array<UploadPresignedObject>; // ###2022-07-08###-###
}
