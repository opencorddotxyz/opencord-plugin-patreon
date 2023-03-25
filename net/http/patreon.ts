import client from "./client"
import * as components from "./patreonComponents"
export * from "./patreonComponents"

/**
 * @description "Load balancer health check endpoint"
 */
export function index() {
	return client.get<null>("/")
}

/**
 * @description "Login"
 * @param req
 */
export function login(req: components.LoginRequest) {
	return client.post<components.LoginResponse>("/v1/login", req)
}

/**
 * @description "Validating Receipt of the OAuth Token"
 * @param req
 */
export function validateOAuth2Token(req: components.ValidateOAuth2TokenRequest) {
	return client.post<null>("/v1/oauth/token", req)
}

/**
 * @description "Get homepage content"
 */
export function getHomepage() {
	return client.get<components.GetHomepageResponse>("/v1/home")
}

/**
 * @description "Modify space profile"
 * @param req
 */
export function modifySpaceProfile(req: components.ModifySpaceProfileRequest) {
	return client.patch<null>("/v1/spaces/profile", req)
}

/**
 * @description "Refresh membership levels"
 */
export function refreshMembershipLevels() {
	return client.get<components.RefreshMembershipLevelsResponse>("/v1/memberships/levels")
}

/**
 * @description "Remove outdated level-role connections"
 * @param params
 */
export function removeOutdatedMembershipLevels(params: components.RemoveOutdatedMembershipLevelsRequestParams) {
	return client.delete<null>("/v1/memberships/levels/:levelId", params)
}

/**
 * @description "Modify membership level info"
 * @param params
 * @param req
 */
export function modifyMembershipLevel(params: components.ModifyMembershipLevelRequestParams, req: components.ModifyMembershipLevelRequest) {
	return client.patch<null>("/v1/memberships/levels/:levelId", params, req)
}

/**
 * @description "Assigned roles for membership level"
 * @param params
 * @param req
 */
export function assignedRolesForMembershipLevel(params: components.AssignedRolesForMembershipLevelRequestParams, req: components.AssignedRolesForMembershipLevelRequest) {
	return client.post<null>("/v1/memberships/levels/:levelId/roles", params, req)
}

/**
 * @description "Get available roles for membership level"
 * @param params
 */
export function getAvailableRolesForMembershipLevel(params: components.GetAvailableRolesForMembershipLevelRequestParams) {
	return client.get<components.GetAvailableRolesForMembershipLevelResponse>("/v1/memberships/levels/:levelId/roles", params)
}

/**
 * @description "Request new uploads"
 * @param req
 */
export function createObjectUploads(req: components.CreateUploadsRequest) {
	return client.post<components.CreateUploadsResponse>("/v1/uploads", req)
}
