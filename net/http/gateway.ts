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
export function signUp(req: components.SignUpRequest) {
	return client.post<components.SignUpResponse>("/v1/users/signup", req)
}