import client from "./client"
import * as components from "./gatewayComponents"

/**
 * @description "Load Balancer Health Check"
 */
export function index() {
	return client.get<null>("/")
}

/**
 * @description "Sign up"
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
	return client.post<components.ValidateOAuth2TokenResponse>("/v1/oauth2/token", req)
}