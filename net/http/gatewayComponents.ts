export interface SignUpRequest {
  credential: string; // ###2022-07-08###-###
  nickname: string; // ###2022-07-08###-###
}

export interface ServerMemberRoleOverview {
  id: string; // ###2022-07-08###-###
  name: string; // ###2022-07-08###-###
  addedWith: number; // ###2022-07-08###-###
}

export interface SignUpResponse {
	token: string // ###2022-07-08###-###
	userId: string // ###2022-07-08###-###
}
